"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SystemNode {
  id: string;
  name: string;
  type: string;
  protocol: string;
  color: string;
  position: [number, number, number];
}

const NODES: SystemNode[] = [
  {
    id: "redis-core",
    name: "Redis Stream Core",
    type: "EVENT_BUS",
    protocol: "RESP3 :6379",
    color: "#FF0055",
    position: [0, 0, 0],
  },
  {
    id: "fastapi-gateway",
    name: "FastAPI Async Gateway",
    type: "API_ROUTER",
    protocol: "HTTP/2 + ASGI",
    color: "#C6FF00",
    position: [-2.2, 1.2, 0.4],
  },
  {
    id: "k8s-workers",
    name: "Kubernetes Worker Fleet",
    type: "POD_ORCHESTRATION",
    protocol: "gRPC + mTLS",
    color: "#00F0FF",
    position: [2.1, 1.4, -0.3],
  },
  {
    id: "async-pipeline",
    name: "Async ETL & Normalizer",
    type: "PAYLOAD_AST",
    protocol: "Celery / Redis",
    color: "#FDE047",
    position: [-1.9, -1.3, -0.2],
  },
  {
    id: "ai-agents",
    name: "Autonomous Agent Mesh",
    type: "LLM_GRAPH_DAG",
    protocol: "Stateful Worktrees",
    color: "#A855F7",
    position: [2.0, -1.2, 0.5],
  },
  {
    id: "telemetry",
    name: "Prometheus & OpenTelemetry",
    type: "OBSERVABILITY",
    protocol: "PromQL :9090",
    color: "#2563EB",
    position: [0.2, -2.1, 0.1],
  },
];

export function SystemsCluster3D({
  theme = "light",
  className = "",
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<SystemNode | null>(NODES[0]);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === "light" ? 1.6 : 1.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.5, 30);
    pointLight.position.set(4, 5, 6);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(theme === "light" ? 0x00f0ff : 0x06b6d4, 2.0, 20);
    pointLight2.position.set(-5, -4, 4);
    scene.add(pointLight2);

    // 3. Node Mesh Generation
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    const interactiveMeshes: THREE.Mesh[] = [];

    NODES.forEach((node) => {
      const isCore = node.id === "redis-core";
      const geom = isCore
        ? new THREE.IcosahedronGeometry(0.7, 1)
        : new THREE.DodecahedronGeometry(0.42, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.25,
        metalness: 0.75,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(...node.position);
      mesh.userData = { nodeData: node };

      // Wireframe aura shell
      const wireframeGeom = isCore
        ? new THREE.IcosahedronGeometry(0.85, 1)
        : new THREE.DodecahedronGeometry(0.55, 0);
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: theme === "light" ? 0.35 : 0.55,
      });
      const wireframeMesh = new THREE.Mesh(wireframeGeom, wireframeMat);
      mesh.add(wireframeMesh);

      clusterGroup.add(mesh);
      interactiveMeshes.push(mesh);
    });

    // 4. Energy Splines / Connecting Data Conduits
    const corePos = new THREE.Vector3(...NODES[0].position);
    const curvePointsList: THREE.Vector3[][] = [];

    NODES.slice(1).forEach((node) => {
      const targetPos = new THREE.Vector3(...node.position);
      const midPoint = new THREE.Vector3()
        .addVectors(corePos, targetPos)
        .multiplyScalar(0.5);
      // Lift midpoint outward for curved arc
      midPoint.z += 0.45;

      const curve = new THREE.QuadraticBezierCurve3(corePos, midPoint, targetPos);
      const points = curve.getPoints(36);
      curvePointsList.push(points);

      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: theme === "light" ? 0x0a0a0a : 0x00f0ff,
        transparent: true,
        opacity: theme === "light" ? 0.22 : 0.45,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      clusterGroup.add(line);
    });

    // 5. Pulsing Data Packets (Travelling along curves)
    const packetGeom = new THREE.SphereGeometry(0.065, 8, 8);
    const packets: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = [];

    curvePointsList.forEach((_, idx) => {
      const packetMat = new THREE.MeshBasicMaterial({
        color: NODES[idx + 1].color,
      });
      const pMesh = new THREE.Mesh(packetGeom, packetMat);
      clusterGroup.add(pMesh);
      packets.push({
        mesh: pMesh,
        curveIndex: idx,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
      });
    });

    // 6. Interactive Raycasting & Mouse Rotation
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    const targetRotation = { x: 0, y: 0 };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 + 1);
      mouse.x = x;
      mouse.y = y;

      targetRotation.y = x * 0.45;
      targetRotation.x = y * 0.25;

      // Raycast for hover
      raycaster.setFromCamera(new THREE.Vector2(x, -(((e.clientY - rect.top) / rect.height) * 2 - 1)), camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hovered = intersects[0].object.userData.nodeData as SystemNode;
        setActiveNode(hovered);
      }
    };

    container.addEventListener("mousemove", onPointerMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth damping rotation
      clusterGroup.rotation.y += (targetRotation.y - clusterGroup.rotation.y) * 0.05 + 0.002;
      clusterGroup.rotation.x += (targetRotation.x - clusterGroup.rotation.x) * 0.05;

      // Idle float & node pulsations
      interactiveMeshes.forEach((mesh, idx) => {
        mesh.rotation.y += 0.012 * (idx % 2 === 0 ? 1 : -1);
        mesh.rotation.x += 0.008;

        const isCore = idx === 0;
        const scalePulse = 1.0 + Math.sin(time * 3.0 + idx) * (isCore ? 0.05 : 0.03);
        mesh.scale.set(scalePulse, scalePulse, scalePulse);
      });

      // Advance data packets along Bezier curves
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const points = curvePointsList[p.curveIndex];
        const ptIndex = Math.min(Math.floor(p.progress * (points.length - 1)), points.length - 2);
        const nextIndex = ptIndex + 1;
        const subT = (p.progress * (points.length - 1)) % 1;

        p.mesh.position.lerpVectors(points[ptIndex], points[nextIndex], subT);
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div className={`relative w-full rounded-3xl overflow-hidden border-2 border-[#0A0A0A] ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-[360px] sm:h-[420px] cursor-grab active:cursor-grabbing" />

      {/* Interactive HUD Node Inspector Badge */}
      {activeNode && (
        <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] max-w-[280px] pointer-events-none transition-all">
          <div className="flex items-center gap-2 pb-1 border-b border-[#0A0A0A]/10">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: activeNode.color }}
            />
            <span className="font-mono text-[10px] font-black uppercase text-[#0A0A0A]">
              {activeNode.type}
            </span>
          </div>
          <div className="pt-1.5 space-y-0.5">
            <div className="font-mono text-xs font-black text-[#0A0A0A]">
              {activeNode.name}
            </div>
            <div className="font-mono text-[10px] text-zinc-600 font-bold">
              PROTOCOL: {activeNode.protocol}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-[#0A0A0A] text-[#C6FF00] font-mono text-[10px] font-black border border-[#0A0A0A] shadow-[2px_2px_0px_#00F0FF] pointer-events-none">
        INTERACTIVE 3D SYSTEMS MESH // MOVE CURSOR TO INSPECT
      </div>
    </div>
  );
}
