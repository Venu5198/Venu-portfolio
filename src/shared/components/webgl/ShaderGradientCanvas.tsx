"use client";

import React, { useEffect, useRef, useState } from "react";

interface ShaderGradientCanvasProps {
  theme?: "light" | "dark";
  opacity?: number;
  speed?: number;
  className?: string;
}

const VERTEX_SHADER = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform int uIsLight;
uniform float uOpacity;

// Simplex-style 2D noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;

  vec2 mouseOffset = (uMouse - 0.5) * 0.35;
  vec2 p = st * 1.35 + mouseOffset;

  float t = uTime * 0.18;

  // Layered fluid octave synthesis (inspired by ruucm/shadergradient)
  float n1 = snoise(p + vec2(t * 0.45, -t * 0.35));
  float n2 = snoise(p * 2.1 + vec2(-t * 0.35 + n1 * 0.5, t * 0.55));
  float n3 = snoise(p * 3.4 + vec2(n2 * 0.6, -t * 0.4));

  float fluid = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

  vec3 col;
  if (uIsLight == 1) {
    // Light Mode (STUDIO MODE): Warm Alabaster with Acid Volt, Spider Cyan & Crimson Neon
    vec3 cAlabaster = vec3(0.96, 0.96, 0.94);
    vec3 cAcidVolt  = vec3(0.776, 1.0, 0.0);      // #C6FF00
    vec3 cCyan      = vec3(0.0, 0.94, 1.0);       // #00F0FF
    vec3 cCrimson   = vec3(1.0, 0.0, 0.33);       // #FF0055
    vec3 cWarmAmber = vec3(0.99, 0.88, 0.28);     // #FDE047

    float w1 = smoothstep(-0.8, 0.2, fluid);
    float w2 = smoothstep(-0.2, 0.8, fluid);
    float w3 = smoothstep(0.3, 1.2, fluid);

    vec3 mixed = mix(cAlabaster, cAcidVolt, w1 * 0.45);
    mixed = mix(mixed, cCyan, w2 * 0.4);
    mixed = mix(mixed, cCrimson, w3 * 0.25);
    mixed = mix(mixed, cWarmAmber, sin(uTime * 0.25 + fluid) * 0.15 + 0.15);

    col = mixed;
  } else {
    // Dark Mode (DOSSIER): Obsidian Slate with Hairline Cyan & Deep Emerald
    vec3 cObsidian = vec3(0.035, 0.035, 0.043);  // #09090B
    vec3 cSlate    = vec3(0.07, 0.07, 0.09);     // #121217
    vec3 cCyanDeep = vec3(0.02, 0.45, 0.55);     // Restrained Cyan
    vec3 cEmerald  = vec3(0.04, 0.45, 0.32);     // Restrained Emerald

    float w1 = smoothstep(-0.5, 0.3, fluid);
    float w2 = smoothstep(0.0, 0.9, fluid);

    vec3 mixed = mix(cObsidian, cSlate, w1);
    mixed = mix(mixed, cCyanDeep, w2 * 0.35);
    mixed = mix(mixed, cEmerald, sin(t + fluid) * 0.15 + 0.1);

    col = mixed;
  }

  // Chromatic dispersion vignette on edges
  float vignette = smoothstep(1.5, 0.2, length((vUv - 0.5) * 1.2));
  fragColor = vec4(col, uOpacity * vignette);
}
`;

export function ShaderGradientCanvas({
  theme = "light",
  opacity,
  speed = 1.0,
  className = "",
}: ShaderGradientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animFrameRef = useRef<number | null>(null);

  const effectiveOpacity =
    opacity !== undefined ? opacity : theme === "light" ? 0.35 : 0.18;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Shader compilation utility
    const createShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn("WebGL Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!vertShader || !fragShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("WebGL Program link error:", gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full screen quad buffer
    const quadVertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uResLoc = gl.getUniformLocation(program, "uResolution");
    const uMouseLoc = gl.getUniformLocation(program, "uMouse");
    const uIsLightLoc = gl.getUniformLocation(program, "uIsLight");
    const uOpacityLoc = gl.getUniformLocation(program, "uOpacity");

    let startTime = performance.now();
    let isVisible = true;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl?.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = (now: number) => {
      if (!gl || !canvas) return;

      if (isVisible && !document.hidden) {
        const elapsed = (now - startTime) * 0.001 * speed;

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        gl.uniform1f(uTimeLoc, elapsed);
        gl.uniform2f(uResLoc, canvas.width, canvas.height);
        gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
        gl.uniform1i(uIsLightLoc, theme === "light" ? 1 : 0);
        gl.uniform1f(uOpacityLoc, effectiveOpacity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (gl) {
        gl.deleteBuffer(buffer);
        gl.deleteVertexArray(vao);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, [theme, effectiveOpacity, speed]);

  if (!webglSupported) {
    // Graceful CSS Fallback
    return (
      <div
        className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
        style={{
          background:
            theme === "light"
              ? "radial-gradient(ellipse at 30% 20%, rgba(198,255,0,0.2), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(0,240,255,0.18), transparent 60%)"
              : "radial-gradient(ellipse at 40% 30%, rgba(6,182,212,0.08), transparent 65%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full -z-10 ${className}`}
      style={{
        opacity: effectiveOpacity,
        mixBlendMode: theme === "light" ? "multiply" : "screen",
      }}
    />
  );
}
