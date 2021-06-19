import { vec3 } from 'gl-matrix';

import { Mesh } from './mesh';
import { PlyLoader } from './plyloader';
import { createModelMatrix } from './maths';
import { generateFloatBuffer } from './webgl';

export class PlyModel {
  constructor(gl, url) {
    this.gl = gl;
    this.url = url;
    this.position = vec3.fromValues(0, 0, 0);
    this.rotation = vec3.fromValues(-90, 0, 0);

    this.meshes = [];

    this.generateMesh();
  }

  async generateMesh() {
    let loader = new PlyLoader(this.url);
    for await (let mesh of loader.parseFile()) {
      this.meshes.push(new Mesh(
        generateFloatBuffer(this.gl, this.gl.ARRAY_BUFFER, mesh.positions),
        generateFloatBuffer(this.gl, this.gl.ARRAY_BUFFER, mesh.colors),
        mesh.positions.length / 3
      ));
    }
  }

  update() {
    this.modelMatrix = createModelMatrix(
      this.position,
      this.rotation
    );
  }

  render(shader) {

    shader.setMatrix(shader.uniformLocations.modelMatrix, this.modelMatrix);

    for(let mesh of this.meshes) {
      mesh.render(this.gl, shader);
    }
  }
}

export default PlyModel;
