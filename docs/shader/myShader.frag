precision mediump float;

varying vec2 vTexCoord;
uniform float uSeed;
uniform sampler2D uTexture;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {
    float t = texture2D(uTexture, vTexCoord).r;
    vec3 col = vec3(
        rand(vec2(t, uSeed + 0.)),
        rand(vec2(t, uSeed + 1.)),
        rand(vec2(t, uSeed + 2.))
    );
    gl_FragColor = vec4(col, 1.);
}