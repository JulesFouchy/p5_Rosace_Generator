var ASPECT_RATIO = 1;
var MARGIN_SIZE = 25;
function desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (ASPECT_RATIO > windowRatio) {
        return windowWidth - MARGIN_SIZE * 2;
    }
    else {
        return desiredCanvasHeight() * ASPECT_RATIO;
    }
}
function desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (ASPECT_RATIO > windowRatio) {
        return desiredCanvasWidth() / ASPECT_RATIO;
    }
    else {
        return windowHeight - MARGIN_SIZE * 2;
    }
}
var canvas;
function _centerCanvas() {
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function template_CreateCanvas() {
    canvas = createCanvas(desiredCanvasWidth(), desiredCanvasHeight(), WEBGL);
    _centerCanvas();
}
function template_ResizeCanvas() {
    resizeCanvas(desiredCanvasWidth(), desiredCanvasHeight());
    _centerCanvas();
}
var gui = new dat.GUI();
var pg;
var myShader;
var params = {
    Base_Size: 0.8,
    Size_Ratio: 1.414,
    N: 12,
    Colors_Seed: 0,
    Stroke_Weight: 7,
    Show_Base_Circle: true,
    Download_Image: function () { return save(); }
};
gui.add(params, 'Base_Size', 0, 2, 0.1);
gui.add(params, 'Size_Ratio', 0, 3, 0.01);
gui.add(params, 'N', 2, 20, 1);
gui.add(params, 'Colors_Seed', 0, 20, 1);
gui.add(params, 'Stroke_Weight', 0, 20, 1);
gui.add(params, 'Show_Base_Circle');
gui.add(params, "Download_Image");
function draw() {
    var diameter = height * params.Base_Size;
    pg.push();
    pg.background(0);
    pg.translate(width / 2, height / 2);
    pg.rotate(TAU / 4);
    pg.stroke(255);
    pg.strokeWeight(params.Stroke_Weight * params.Base_Size);
    pg.fill(255, 30);
    if (params.Show_Base_Circle)
        pg.ellipse(0, 0, diameter);
    for (var k = 0; k < params.N; ++k) {
        var p = p5.Vector.fromAngle(k * TAU / params.N).mult(diameter / 2);
        pg.ellipse(p.x, p.y, diameter * params.Size_Ratio);
    }
    pg.pop();
    shader(myShader);
    myShader.setUniform("uTexture", pg);
    myShader.setUniform("uSeed", params.Colors_Seed + 0.72);
    noStroke();
    rect(-width / 2, -height / 2, width, height);
    resetShader();
}
function preload() {
    myShader = loadShader("shader/myShader.vert", "shader/myShader.frag");
}
function setup() {
    template_CreateCanvas();
    pg = createGraphics(width, height);
}
function windowResized() {
    template_ResizeCanvas();
    pg.resizeCanvas(width, height);
}
//# sourceMappingURL=../sketch/sketch/build.js.map