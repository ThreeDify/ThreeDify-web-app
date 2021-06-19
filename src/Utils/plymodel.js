import { vec3 } from 'gl-matrix';

import PlyLoader from './plyloader';
import { createModelMatrix } from './maths';
import { generateFloatBuffer } from './webgl';

export class PlyModel {
  constructor(vertexBuffer, colorBuffer, vertexCount) {
    this.vertexBuffer = vertexBuffer;
    this.colorBuffer = colorBuffer;
    this.vertexCount = vertexCount;
    this.position = vec3.fromValues(0, 0, 0);
    this.rotation = vec3.fromValues(-90, 0, 0);
  }

  static async loadModel(gl, url) {
    let loader = new PlyLoader(url);
    await loader.parseFile();

    return new PlyModel(
      generateFloatBuffer(gl, gl.ARRAY_BUFFER, loader.vertexData.positions),
      generateFloatBuffer(gl, gl.ARRAY_BUFFER, loader.vertexData.colors),
      loader.vertexData.positions.length / 3
    );
  }

  update() {
    this.modelMatrix = createModelMatrix(
      this.position,
      this.rotation
    );
  }

  render(gl, shader) {
    shader.enableBuffer(
      shader.attribLocations.vertexPosition,
      3,
      this.vertexBuffer
    );
    shader.enableBuffer(
      shader.attribLocations.vertexColor,
      3,
      this.colorBuffer
    );

    shader.setMatrix(shader.uniformLocations.modelMatrix, this.modelMatrix);

    gl.drawArrays(gl.POINTS, 0, this.vertexCount);
  }
}

export default PlyModel;
