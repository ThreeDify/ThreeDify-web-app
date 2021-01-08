import { vec3 } from 'gl-matrix';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Icon from './Icon';
import Mouse from '../Utils/mouse';
import Camera from '../Utils/camera';
import Keyboard from '../Utils/keyboard';
import { getAxiosInstance } from '../Utils/axios';
import { createModelMatrix } from '../Utils/maths';
import { clear, compileShaders, enableVertexAttribArray, generateFloatBuffer } from '../Utils/webgl';

const vsSource = `
  attribute vec3 aVertexPosition;
  attribute vec3 aVertexColor;

  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec3 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
    vColor = aVertexColor;
  }
`;

const fsSource = `
  varying lowp vec3 vColor;

  void main(void) {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

export default class PlyPlayer extends Component {

  constructor(props) {
    super(props);

    this.gl = null;
    this.canvas = document.createElement('canvas');
    this.programInfo = {};
    this.buffers = {};
    this.animation = null;
    this.camera = new Camera({
      fov: 45,
      aspect: this.props.width / this.props.height,
      zNear: 0.1,
      zFar: 100.0,
      position: vec3.fromValues(0, 0, 15),
      speed: 0.5
    });
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();

    this.mouse.mouseMoveListeners.push(this.camera.onMouseMove.bind(this.camera));
    window.addEventListener('keydown', this.keyboard.onKeyDown.bind(this.keyboard));
    window.addEventListener('keyup', this.keyboard.onKeyUp.bind(this.keyboard));

    this.state = {
      error: false,
      loading: true,
      url: this.props.url,
    };
  }

  async parseFile(fileUrl) {
    try {
      const vertexData = [];
      const response = await getAxiosInstance().get(fileUrl);
      const lines = response.data.split('\n');
      const head_end = lines.findIndex((line) => line === 'end_header');

      await lines.slice(head_end + 1).forEach((line) => {
        return new Promise(resolve => {
          const vertex = line.split(' ', 9);
          vertexData.push({
            x: parseFloat(vertex[0]),
            y: parseFloat(vertex[1]),
            z: parseFloat(vertex[2]),
            nx: parseFloat(vertex[3]),
            ny: parseFloat(vertex[4]),
            nz: parseFloat(vertex[5]),
            r: parseFloat(vertex[6] / 255),
            g: parseFloat(vertex[7] / 255),
            b: parseFloat(vertex[8] / 255),
          });

          resolve();
        });
      });

      this.buffers = await this.initBuffers(vertexData);

      this.setState({
        loading: false,
        url: fileUrl
      });
    } catch (err) {
      console.log(err);

      this.setState({
        loading: false,
        error: true
      });
    }
  }

  initBuffers(vertexData) {
    return new Promise((resolve) => {
      const positionBuffer = generateFloatBuffer(this.gl, this.gl.ARRAY_BUFFER, vertexData.reduce((acc, data) => {
        acc.push(data.x, data.y, data.z);
        return acc;
      }, []));

      const colorBuffer = generateFloatBuffer(this.gl, this.gl.ARRAY_BUFFER, vertexData.reduce((acc, data) => {
        acc.push(data.r, data.g, data.b);
        return acc;
      }, []));

      resolve({
        color: colorBuffer,
        position: positionBuffer,
        vertexCount: vertexData.length
      });
    });
  }

  createShaders() {
    return new Promise(resolve => {
      const shaderProgram = compileShaders(this.gl, vsSource, fsSource);
      this.programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexColor: this.gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
          projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          viewMatrix: this.gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
          modelMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
        },
      };

      resolve();
    });
  }

  moveCamera() {
    if (this.keyboard.isKeyPressed('KeyW')) {
      this.camera.moveForward();
    } else if (this.keyboard.isKeyPressed('KeyS')) {
      this.camera.moveBack();
    }

    if (this.keyboard.isKeyPressed('KeyA')) {
      this.camera.moveLeft();
    } else if (this.keyboard.isKeyPressed('KeyD')) {
      this.camera.moveRight();
    }
  }

  drawScene() {
    clear(this.gl);

    if (this.buffers.position && this.buffers.color) {
      const modelMatrix = createModelMatrix(vec3.fromValues(0, 0, 0), vec3.fromValues(-90, 0, 0));

      enableVertexAttribArray(this.gl, 3, this.programInfo.attribLocations.vertexPosition, this.buffers.position, this.gl.FLOAT, false, 0, 0);
      enableVertexAttribArray(this.gl, 3, this.programInfo.attribLocations.vertexColor, this.buffers.color, this.gl.FLOAT, false, 0, 0);

      this.gl.useProgram(this.programInfo.program);
      this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.projectionMatrix,
        false,
        this.camera.getProjectionMatrix()
      );
      this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.viewMatrix,
        false,
        this.camera.getViewMatrix()
      );
      this.gl.uniformMatrix4fv(
        this.programInfo.uniformLocations.modelMatrix,
        false,
        modelMatrix
      );

      this.gl.drawArrays(this.gl.POINTS, 0, this.buffers.vertexCount);
    }
  }

  updateViewport() {
    this.canvas.width = this.props.width;
    this.canvas.height = this.props.height;
    this.gl.viewport(0, 0, this.props.width, this.props.height);

    if (!this.programInfo.program) {
      this.createShaders();
    }
  }

  gameLoop() {
    cancelAnimationFrame(this.animation);

    const loop = () => {
      this.moveCamera();
      this.camera.calculateMatrix();
      this.drawScene();
      this.animation = requestAnimationFrame(loop);
    };

    this.animation = requestAnimationFrame(loop);
  }

  async componentDidMount() {
    this.gl = this.canvas.getContext('webgl');
    if (this.gl === null) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

    this.canvas.addEventListener('mousedown', this.mouse.onMouseDown.bind(this.mouse));
    this.canvas.addEventListener('mouseup', this.mouse.onMouseUp.bind(this.mouse));
    this.canvas.addEventListener('mousemove', this.mouse.onMouseMove.bind(this.mouse));

    this.parseFile(this.props.url);

    this.updateViewport();
    this.gameLoop();
    this.mount.appendChild(this.canvas);
  }

  componentDidUpdate() {
    if (this.props.url != this.state.url) {
      this.parseFile(this.props.url);
    }

    this.updateViewport();
  }

  render() {
    return (
      <div ref={ref => this.mount = ref} className='player'>
        {(this.state.loading) &&
          <div className='loading'>
            <Icon name='spinner' size='3x' spin={true} />
          </div>
        }
        {(this.state.error) &&
          <div className='error'>
            <div className='mb-2'><Icon name='exclamation-circle' size='3x'></Icon></div>
            <h5>Error occurred while loading.</h5>
          </div>
        }
      </div>
    );
  }
}

PlyPlayer.propTypes = {
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
