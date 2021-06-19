export class PlyLoader {
  constructor(url) {
    this.url = url;

    this.streamReader = null;
    this.bodyReached = false;
    this.incompleteLines = '';
    this.vertexData = {
      positions: [],
      colors: [],
    };
    this.decoder = new TextDecoder('utf-8');
  }

  parseLine(line) {
    if (line === '') {
      return;
    }

    const vertex = line.split(' ', 9);

    this.vertexData.positions.push(
      parseFloat(vertex[0]),
      parseFloat(vertex[1]),
      parseFloat(vertex[2])
    );
    this.vertexData.colors.push(
      parseFloat(vertex[6] / 255),
      parseFloat(vertex[7] / 255),
      parseFloat(vertex[8] / 255)
    );
  }

  parseChunk(chunk) {
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
      chunkLines.forEach(this.parseLine.bind(this));
    }
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

  async parseFile() {
    try {
      const response = await fetch(this.url);
      this.streamReader = response.body.getReader();

      for await (let chunk of this.chunks()) {
        this.parseChunk(chunk);
      }

      return this.vertexData;
    } catch (err) {
      console.log(err);

      throw err;
    }
  }

}

export default PlyLoader;
