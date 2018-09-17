//Vertex Shader program
//Vertex shader describes the traits (Position, etc) of a vertex
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main(){\n' +
    'gl_Position = a_Position;\n' +
    '}\n';

//Fragment Shader describes the traits (color, etc) of the fragments
var FSHADER_SOURCE =
    'void main(){\n' +
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

function main() {
    //Retrieve canvas element
    var canvas = document.getElementById('webgl');

    //set gl Context
    var gl = getWebGLContext(canvas);
    //check if gl context was recieved
    if (!gl) {
        console.log('Failed to get the rendering contex for WebGL');
        return;
    }

    //initalize and check if shaders were recieved
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initalize shaders');
        return;
    }

    // write positions of verticies to a vertex shader
    var n = initVertexBuffers(gl);
    //check if n was recieved
    if (n < 0) {
        console.log('Failed to fill positions of verticies');
        return;
    }
    //set clear color to black
    gl.clearColor(0, 0, 0, 1);

    //clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //draw triangle
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
    //create vertex points
    var verticies = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var n = 3;

    //Create buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to get vertex Buffer');
        return -1;
    }
    //bind buffer to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, verticies, gl.STATIC_DRAW);

    //set a_position and check if recieved
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get storage location of a_Position');
        return -1;
    }
    //Assign buffer object to a_Position variable (buffer is an array of unformated memory, stores vertex and pixel data)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);


    //returns positinos of verticies on the vertex shader
    return n;
}

