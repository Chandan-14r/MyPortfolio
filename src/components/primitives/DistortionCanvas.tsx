"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Texture, Program, Mesh, Plane } from "ogl";
import { useApp } from "@/providers/AppProvider";
import { useQualityTier } from "@/lib/quality";

const vertex = `
  attribute vec2 uv;
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uDistortion;
  uniform float uAlpha;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // RGB split based on distortion
    float r = texture2D(tMap, uv + vec2(uDistortion * 0.05, 0.0)).r;
    float g = texture2D(tMap, uv).g;
    float b = texture2D(tMap, uv - vec2(uDistortion * 0.05, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, uAlpha);
  }
`;

// Global store for the active image URL
export const globalWebGLState = {
  activeUrl: null as string | null,
  activeRect: null as DOMRect | null,
  velocity: 0,
};

export function DistortionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion } = useApp();
  const tier = useQualityTier();

  useEffect(() => {
    if (reducedMotion || tier !== "high" || !canvasRef.current) return;

    const renderer = new Renderer({ canvas: canvasRef.current, alpha: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();
    const geometry = new Plane(gl);

    // Initial empty texture
    const emptyTexture = new Texture(gl);
    
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: emptyTexture },
        uDistortion: { value: 0 },
        uAlpha: { value: 0 },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let rafId: number;
    let targetDistortion = 0;
    let currentDistortion = 0;
    let targetAlpha = 0;
    let currentAlpha = 0;
    let loadedUrl: string | null = null;
    let textureCache: Record<string, Texture> = {};

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      // We want to map 1 WebGL unit to pixel sizes based on camera fov
      // But for orthogonal-like projection we can just use setPosition and scale
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      const fov = camera.fov * (Math.PI / 180);
      const height = 2 * Math.tan(fov / 2) * camera.position.z;
      const width = height * camera.aspect;
      mesh.scale.set(width, height, 1);
    };

    window.addEventListener("resize", resize);
    resize();

    const update = () => {
      rafId = requestAnimationFrame(update);

      if (globalWebGLState.activeUrl && globalWebGLState.activeRect) {
        // Load texture if needed
        if (loadedUrl !== globalWebGLState.activeUrl) {
          loadedUrl = globalWebGLState.activeUrl;
          if (!textureCache[loadedUrl]) {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = loadedUrl;
            const tex = new Texture(gl, { generateMipmaps: false });
            img.onload = () => { tex.image = img; };
            textureCache[loadedUrl] = tex;
          }
          program.uniforms.tMap.value = textureCache[loadedUrl];
        }

        // Update mesh position and scale to match the DOM rect
        const rect = globalWebGLState.activeRect;
        
        // Orthographic mapping
        const aspect = gl.canvas.width / gl.canvas.height;
        const fov = camera.fov * (Math.PI / 180);
        const height = 2 * Math.tan(fov / 2) * camera.position.z;
        const width = height * aspect;

        const w = (rect.width / window.innerWidth) * width;
        const h = (rect.height / window.innerHeight) * height;
        const x = (rect.left / window.innerWidth) * width - width / 2 + w / 2;
        const y = -(rect.top / window.innerHeight) * height + height / 2 - h / 2;

        mesh.scale.set(w, h, 1);
        mesh.position.set(x, y, 0);

        targetDistortion = globalWebGLState.velocity;
        targetAlpha = 1;
      } else {
        targetDistortion = 0;
        targetAlpha = 0;
      }

      // Lerp values
      currentDistortion += (targetDistortion - currentDistortion) * 0.1;
      currentAlpha += (targetAlpha - currentAlpha) * 0.1;

      program.uniforms.uDistortion.value = currentDistortion;
      program.uniforms.uAlpha.value = currentAlpha;

      if (currentAlpha > 0.01) {
        renderer.render({ scene, camera });
      } else if (targetAlpha === 0) {
        // Clear when not active
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    };

    update();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [reducedMotion, tier]);

  if (reducedMotion || tier !== "high") return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}
