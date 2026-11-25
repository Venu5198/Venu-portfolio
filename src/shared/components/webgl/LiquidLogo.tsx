"use client";

import React, { useEffect, useRef, useState } from "react";

interface LiquidLogoProps {
  text?: string;
  subtext?: string;
  theme?: "light" | "dark";
  className?: string;
  fontSize?: number;
}

const LIQUID_VERT = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const LIQUID_FRAG = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uTextTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform int uIsLight;

void main() {
  vec2 uv = vUv;

  // Wave ripple offsets inspired by paper-design/liquid-logo
  float distToMouse = length(uv - uMouse);
  float mouseWave = sin(distToMouse * 24.0 - uTime * 4.0) * exp(-distToMouse * 3.5);

  float idleWaveX = sin(uv.y * 14.0 + uTime * 2.2) * 0.008 + cos(uv.x * 10.0 - uTime * 1.8) * 0.005;
  float idleWaveY = cos(uv.x * 12.0 + uTime * 2.5) * 0.008 + sin(uv.y * 8.0 - uTime * 1.5) * 0.005;

  vec2 distortedUv = uv + vec2(idleWaveX, idleWaveY) + mouseWave * 0.022;

  // Sample text alpha mask
  float alphaCenter = texture(uTextTexture, distortedUv).a;
  if (alphaCenter < 0.02) {
    discard;
  }

  // Calculate surface normals from texture gradient for specular lighting
  float delta = 0.004;
  float aRight = texture(uTextTexture, distortedUv + vec2(delta, 0.0)).a;
  float aLeft  = texture(uTextTexture, distortedUv - vec2(delta, 0.0)).a;
  float aUp    = texture(uTextTexture, distortedUv + vec2(0.0, delta)).a;
  float aDown  = texture(uTextTexture, distortedUv - vec2(0.0, delta)).a;

  vec3 normal = normalize(vec3(
    (aLeft - aRight) * 3.0 + idleWaveX * 8.0,
    (aDown - aUp) * 3.0 + idleWaveY * 8.0,
    0.65
  ));

  // Dynamic light direction (tracking mouse)
  vec3 lightDir = normalize(vec3(uMouse.x - 0.5, 0.5 - uMouse.y, 0.8));
  vec3 viewDir  = vec3(0.0, 0.0, 1.0);
  vec3 halfDir  = normalize(lightDir + viewDir);

  float diff = max(dot(normal, lightDir), 0.0);
  float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);

  // Chrome liquid-metal palette synthesis
  vec3 chromeBase;
  vec3 chromeHighlight;
  vec3 iridescentFringe;

  if (uIsLight == 1) {
    // Light Mode: Molten Mercury Titanium with Spider-Verse Cyan / Crimson Glint
    chromeBase = vec3(0.12, 0.12, 0.14);
    chromeHighlight = vec3(1.0, 1.0, 1.0);
    iridescentFringe = mix(vec3(0.0, 0.94, 1.0), vec3(1.0, 0.0, 0.33), sin(uTime * 1.5 + uv.x * 6.0) * 0.5 + 0.5);
  } else {
    // Dark Mode: Dark Titanium / Liquid Obsidian with Cyan Glint
    chromeBase = vec3(0.85, 0.88, 0.92);
    chromeHighlight = vec3(1.0, 1.0, 1.0);
    iridescentFringe = vec3(0.06, 0.75, 0.95);
  }

  vec3 col = chromeBase * (0.6 + 0.4 * diff);
  col += chromeHighlight * (spec * 1.4);
  col += iridescentFringe * (pow(spec, 4.0) * 0.65);

  fragColor = vec4(col, alphaCenter);
}
`;

export function LiquidLogo({
  text = "VENU.K",
  subtext = "STUDIO ⚡",
  theme = "light",
  className = "",
  fontSize = 32,
}: LiquidLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
    if (!gl) return;

    // Helper to generate the text texture using 2D canvas
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    if (!textCtx) return;

    const updateTextTexture = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      textCanvas.width = w;
      textCanvas.height = h;

      textCtx.clearRect(0, 0, w, h);
      textCtx.fillStyle = "#ffffff";
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";

      // Draw Main Display Headline Text
      const scaledFontSize = Math.round(fontSize * dpr);
      textCtx.font = `900 ${scaledFontSize}px Anton, Syne, Inter, system-ui, sans-serif`;
      textCtx.fillText(text, w / 2, h / 2 - (subtext ? 6 * dpr : 0));

      if (subtext) {
        textCtx.font = `bold ${Math.round(scaledFontSize * 0.32)}px "JetBrains Mono", monospace`;
        textCtx.fillText(subtext, w / 2, h / 2 + Math.round(scaledFontSize * 0.5));
      }
    };

    updateTextTexture();

    // WebGL Shader setup
    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = createShader(gl.VERTEX_SHADER, LIQUID_VERT);
    const fs = createShader(gl.FRAGMENT_SHADER, LIQUID_FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);

    // Quad geometry
    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // Create Text Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);

    const uTimeLoc = gl.getUniformLocation(prog, "uTime");
    const uMouseLoc = gl.getUniformLocation(prog, "uMouse");
    const uResLoc = gl.getUniformLocation(prog, "uResolution");
    const uIsLightLoc = gl.getUniformLocation(prog, "uIsLight");

    let animId: number;
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      updateTextTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    };

    resize();
    window.addEventListener("resize", resize);

    setWebglReady(true);

    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;

      gl.useProgram(prog);
      gl.bindVertexArray(vao);

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform1i(uIsLightLoc, theme === "light" ? 1 : 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      gl.deleteBuffer(buf);
      gl.deleteVertexArray(vao);
      gl.deleteTexture(texture);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [text, subtext, theme, fontSize]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: 0.5, y: 0.5 };
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative inline-flex items-center justify-center select-none overflow-hidden ${className}`}
      style={{ minHeight: `${fontSize * 1.5}px` }}
    >
      {/* WebGL Liquid Chrome Surface */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-300 ${
          webglReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Fallback & Initial Render (Clean SVG & CSS text) */}
      {!webglReady && (
        <div className="flex flex-col items-center justify-center text-center">
          <span
            className="font-black tracking-tight uppercase leading-none"
            style={{ fontSize: `${fontSize}px` }}
          >
            {text}
          </span>
          {subtext && (
            <span className="font-mono text-[10px] font-bold text-zinc-600 mt-1">
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
