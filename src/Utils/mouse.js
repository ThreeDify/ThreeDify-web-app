import { vec2 } from 'gl-matrix';

class Mouse {
  constructor(sensitivity) {
    this.down = false;
    this.first = true;
    this.sensitivity = sensitivity || 0.05;
    this.position = vec2.fromValues(0, 0);
    this.oldPosition = vec2.fromValues(0, 0);
    this.mouseMoveListeners = [];
  }

  onMouseDown(e) {
    this.down = true;
    this.oldPosition = vec2.clone(this.position);
    this.position = vec2.fromValues(e.clientX, e.clientY);
  }

  onMouseUp(e) {
    this.down = false;
    this.oldPosition = vec2.clone(this.position);
    this.position = vec2.fromValues(e.clientX, e.clientY);
  }

  onMouseMove(e) {
    this.oldPosition = vec2.clone(this.position);
    this.position = vec2.fromValues(e.clientX, e.clientY);

    if (this.down && !this.frist) {
      let delta = vec2.create();
      vec2.sub(delta, this.position, this.oldPosition);
      vec2.scale(delta, delta, this.sensitivity);

      this.mouseMoveListeners.forEach(callback => {
        callback(delta);
      });
    }

    this.first = false;
  }
}

export default Mouse;
