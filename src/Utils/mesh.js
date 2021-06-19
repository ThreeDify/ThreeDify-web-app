export class Mesh {
  constructor(vertexBuffer, colorBuffer, vertexCount) {
    this.vertexBuffer = vertexBuffer;
    this.colorBuffer = colorBuffer;
    this.vertexCount = vertexCount;
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

    gl.drawArrays(gl.POINTS, 0, this.vertexCount);
  }
}

export default Mesh;
