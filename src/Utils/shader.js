import { compileShaders, enableVertexAttribArray } from './webgl';

export class Shader {
  constructor(gl, vertexShader, fragmentShader) {
    this.gl = gl;
    this.program = {};
    this.attribLocations = {};
    this.uniformLocations = {};

    this.compile(vertexShader, fragmentShader);
  }

  compile(vsSource, fsSource) {
    requestAnimationFrame(() => {
      this.program = compileShaders(this.gl, vsSource, fsSource);

      this.attribLocations = {
        vertexPosition: this.gl.getAttribLocation(
          this.program,
          'aVertexPosition'
        ),
        vertexColor: this.gl.getAttribLocation(this.program, 'aVertexColor'),
      };
      this.uniformLocations = {
        projectionMatrix: this.gl.getUniformLocation(
          this.program,
          'uProjectionMatrix'
        ),
        viewMatrix: this.gl.getUniformLocation(this.program, 'uViewMatrix'),
        modelMatrix: this.gl.getUniformLocation(this.program, 'uModelMatrix'),
      };
    });
  }

  use() {
    this.gl.useProgram(this.program);
  }

  setCamera(camera) {
    this.setMatrix(
      this.uniformLocations.projectionMatrix,
      camera.getProjectionMatrix()
    );
    this.setMatrix(this.uniformLocations.viewMatrix, camera.getViewMatrix());
  }

  setMatrix(loc, mat) {
    this.gl.uniformMatrix4fv(loc, false, mat);
  }

  enableBuffer(attribLoc, elementCount, buffer) {
    enableVertexAttribArray(
      this.gl,
      elementCount,
      attribLoc,
      buffer,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }
}

export class DefaultShader extends Shader {
  constructor(gl) {
    super(
      gl,
      `
        attribute vec3 aVertexPosition;
        attribute vec3 aVertexColor;

        uniform mat4 uModelMatrix;
        uniform mat4 uViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec3 vColor;

        void main(void) {
          gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
          gl_PointSize = 1.0;
          vColor = aVertexColor;
        }
      `,
      `
        varying lowp vec3 vColor;

        void main(void) {
          gl_FragColor = vec4(vColor, 1.0);
        }
      `
    );
  }
}

export default Shader;
