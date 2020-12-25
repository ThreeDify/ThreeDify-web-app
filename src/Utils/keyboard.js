class Keyboard {
  constructor() {
    this.keys = {};
  }

  onKeyDown(e) {
    this.keys[e.code] = true;
  }

  onKeyUp(e) {
    this.keys[e.code] = false;
  }

  isKeyPressed(key) {
    return this.keys[key] || false;
  }
}

export default Keyboard;
