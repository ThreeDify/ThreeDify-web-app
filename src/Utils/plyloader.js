export class PlyLoader {
  constructor(url) {
    this.url = url;

    this.streamReader = null;
    this.bodyReached = false;
    this.incompleteLines = '';
    this.decoder = new TextDecoder('utf-8');
  }

  parseLine(meshData, line) {
    if (line === '') {
      return meshData;
    }

    const vertex = line.split(' ', 9);

    meshData.positions.push(
      parseFloat(vertex[0]),
      parseFloat(vertex[1]),
      parseFloat(vertex[2])
    );
    meshData.colors.push(
      parseFloat(vertex[6] / 255),
      parseFloat(vertex[7] / 255),
      parseFloat(vertex[8] / 255)
    );

    return meshData;
  }

  parseChunk(chunk) {
    const meshData = {
      positions: [],
      colors: [],
    };
    const chunkText = this.incompleteLines + this.decoder.decode(chunk);
    const lastNewLinePos = chunkText.lastIndexOf('\n');
    let chunkLines = chunkText.substr(0, lastNewLinePos + 1).split('\n');
    this.incompleteLines = chunkText.substr(lastNewLinePos + 1);

    if (!this.bodyReached) {
      const endOfHead = chunkLines.findIndex((line) => line === 'end_header');
      if (endOfHead !== -1) {
        chunkLines = chunkLines.slice(endOfHead + 1);
        this.bodyReached = true;
      }
    }

    if (this.bodyReached) {
      chunkLines.reduce(this.parseLine.bind(this), meshData);
    }

    return meshData;
  }

  async *chunks() {
    let { done, value } = await this.streamReader.read();
    while (!done) {
      yield value;

      let chunk = await this.streamReader.read();
      done = chunk.done;
      value = chunk.value;
    }
  }

  async *parseFile() {
    try {
      const response = await fetch(this.url);
      this.streamReader = response.body.getReader();

      for await (let chunk of this.chunks()) {
        yield this.parseChunk(chunk);
      }
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

}

export default PlyLoader;
