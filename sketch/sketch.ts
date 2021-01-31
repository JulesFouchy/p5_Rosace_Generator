const gui = new dat.GUI()
let pg: p5.Graphics
let myShader: p5.Shader

// -------------------
//     Parameters
// -------------------

const params = {
    Base_Size: 0.8,
    Size_Ratio: 1.414,
    N: 12,
    Colors_Seed: 0,
    Stroke_Weight: 7,
    Show_Base_Circle: true,
    Download_Image: () => save()
}

gui.add(params, 'Base_Size', 0, 2, 0.1)
gui.add(params, 'Size_Ratio', 0, 3, 0.01)
gui.add(params, 'N', 2, 20, 1)
gui.add(params, 'Colors_Seed', 0, 20, 1)
gui.add(params, 'Stroke_Weight', 0, 20, 1)
gui.add(params, 'Show_Base_Circle')
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    const diameter = height * params.Base_Size
    // Draw rosace on the p5.Graphics
    pg.push()
        // Clear background
        pg.background(0)
        // Set (0, 0) as the center
        pg.translate(width/2, height/2)
        // Set angle 0 to point vertically
        pg.rotate(TAU/4)
        // Stroke
        pg.stroke(255)
        pg.strokeWeight(params.Stroke_Weight * params.Base_Size)
        // Fill
        pg.fill(255, 30)
        // Base circle
        if (params.Show_Base_Circle)
            pg.ellipse(0, 0, diameter)
        // All the circles on the base one
        for (let k = 0; k < params.N; ++k) {
            const p = p5.Vector.fromAngle(k * TAU / params.N).mult(diameter / 2)
            pg.ellipse(p.x, p.y, diameter * params.Size_Ratio)
        }
    pg.pop()
    // Post-processing shader to colorize
    shader(myShader)
    myShader.setUniform("uTexture", pg)
    myShader.setUniform("uSeed", params.Colors_Seed + 0.72)
    noStroke()
    rect(-width/2, -height/2, width, height)
    resetShader()
}

// -------------------
//    Boring Stuff
// -------------------

function preload() {
    myShader = loadShader("shader/myShader.vert", "shader/myShader.frag")
}

function setup() {
    template_CreateCanvas()
    pg = createGraphics(width, height)
}

function windowResized() {
    template_ResizeCanvas()
    pg.resizeCanvas(width, height)
}