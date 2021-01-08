import { vec3 } from 'gl-matrix';
import { createProjectionMatrix, createViewMatrix, toRadians } from './maths';

const DEFAULT_OPTIONS = {
  fov: 60,
  aspect: 1.33,
  zNear: 0.01,
  zFar: 1000,
  position: vec3.create(),
  rotation: vec3.fromValues(-90, 0, 0),
  up: vec3.fromValues(0, 1, 0),
  speed: 0.05
};

export default class Camera {
  constructor(options) {
    const { fov, aspect, zNear, zFar, position, rotation, up, speed } = Object.assign(
      Object.create(DEFAULT_OPTIONS),
      options
    );

    this._fov = fov;
    this._aspect = aspect;
    this._zNear = zNear;
    this._zFar = zFar;
    this._position = vec3.clone(position);
    this._rotation = vec3.clone(rotation);
    this._front = vec3.fromValues(0, 0, -1);
    this._up = vec3.clone(up);
    this._speed = speed;

    this.calculateFront();
    this.calculateMatrix();
  }

  onMouseMove(delta) {
    this.rotation[0] += -delta[0];
    this.rotation[1] += delta[1];

    if (this.rotation[1] > 89.0) this.rotation[1] = 89.0;
    if (this.rotation[1] < -89.0) this.rotation[1] = -89.0;

    this.calculateFront();
  }

  calculateMatrix() {
    this._projectionMat = createProjectionMatrix(this._fov, this._aspect, this._zNear, this._zFar);
    this._viewMat = createViewMatrix(this._position, this._front, this._up);
  }

  calculateFront() {
    let yaw = toRadians(this._rotation[0]);
    let pitch = toRadians(this._rotation[1]);

    this._front[0] = Math.cos(pitch) * Math.cos(yaw);
    this._front[1] = Math.sin(pitch);
    this._front[2] = Math.cos(pitch) * Math.sin(yaw);
  }

  getViewMatrix() {
    return this._viewMat;
  }

  getProjectionMatrix() {
    return this._projectionMat;
  }

  moveForward() {
    vec3.scaleAndAdd(this._position, this._position, this._front, this._speed);
  }

  moveBack() {
    vec3.scaleAndAdd(this._position, this._position, this._front, -this._speed);
  }

  moveLeft() {
    let dir = vec3.create();

    vec3.normalize(dir, vec3.cross(dir, this._front, this._up));
    vec3.scaleAndAdd(this._position, this._position, dir, -this._speed);
  }

  moveRight() {
    let dir = vec3.create();

    vec3.normalize(dir, vec3.cross(dir, this._front, this._up));
    vec3.scaleAndAdd(this._position, this._position, dir, this._speed);
  }

  set position(position) {
    this._position = position;
  }

  get position() {
    return this._position;
  }

  set rotation(rotation) {
    this._rotation = rotation;
  }

  get rotation() {
    return this._rotation;
  }

  get front() {
    return this._front;
  }

  set up(up) {
    this._up = up;
  }

  get up() {
    return this._up;
  }

  set fov(fov) {
    this._fov = fov;
  }

  get fov() {
    return this._fov;
  }

  set aspect(aspect) {
    this._aspect = aspect;
  }

  get aspect() {
    return this._aspect;
  }

  set zNear(zNear) {
    this._zNear = zNear;
  }

  get zNear() {
    return this._zNear;
  }

  set zFar(zFar) {
    this._zFar = zFar;
  }

  get zFar() {
    return this._zFar;
  }

  set speed(speed) {
    this._speed = speed;
  }

  get speed() {
    return this._speed;
  }
}
