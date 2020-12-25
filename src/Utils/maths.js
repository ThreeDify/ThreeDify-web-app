import { glMatrix, mat4, quat, vec3 } from 'gl-matrix';

glMatrix.setMatrixArrayType(Array);

export function createProjectionMatrix(fov, aspect, zNear, zFar) {
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix,
    fov * Math.PI / 180,
    aspect,
    zNear,
    zFar
  );

  return projectionMatrix;
}

export function createViewMatrix(eyePos, viewLocation, upVector) {
  const viewMatrix = mat4.create();

  mat4.lookAt(viewMatrix, eyePos, viewLocation, upVector);

  return viewMatrix;
}

export function createModelMatrix(translate, rotation, scale) {
  const modelMatrix = mat4.create();

  const rotationQat = quat.fromEuler(quat.create(), rotation[0], rotation[1], rotation[2]);
  mat4.fromRotationTranslationScaleOrigin(modelMatrix, rotationQat, translate, scale || vec3.fromValues(1, 1, 1), vec3.fromValues(0, 0, 0));
  
  return modelMatrix;
}
