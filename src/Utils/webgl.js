function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function compileShaders(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return shaderProgram;
}

export function generateFloatBuffer(gl, bufferType, data) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(bufferType, buffer);
  gl.bufferData(bufferType,
    new Float32Array(data),
    gl.STATIC_DRAW
  );

  return {
    id: buffer,
    type: bufferType,
  };
}

export function enableVertexAttribArray(gl, numComponents, attribLocation, buffer, type, normalize, stride, offset) {
  gl.bindBuffer(buffer.type, buffer.id);
  gl.vertexAttribPointer(
    attribLocation,
    numComponents,
    type || gl.FLOAT,
    normalize || false,
    stride || 0,
    offset || 0
  );
  gl.enableVertexAttribArray(attribLocation);
}

export function clear(gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
