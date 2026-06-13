import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AbstractSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 12;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Group to hold meshes
    const group = new THREE.Group();

    // 1. OUTER WIREFRAME ICOSAHEDRON (aesthetic brutalist geometry)
    const outerGeom = new THREE.IcosahedronGeometry(3.2, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B, // Amber-500
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeom, outerMat);
    group.add(outerMesh);

    // 2. INNER WIREFRAME SPARKLER (rotating opposite)
    const innerGeom = new THREE.OctahedronGeometry(1.6, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xFCD34D, // Amber-glow
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    group.add(innerMesh);

    // 3. CORE SUBTLE POINT INTENSITY (solid center orb)
    const coreGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    group.add(coreMesh);

    scene.add(group);

    // Light highlights (add standard ambient lights if needed but BasicMaterial is self-illuminated)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Tracking Cursor for slight sphere interactive offsets
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = x / (rect.width / 2);
      mouseY = y / (rect.height / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation variables
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Lerp mouse coordinates
      targetX += (mouseX * 0.5 - targetX) * 0.05;
      targetY += (mouseY * 0.5 - targetY) * 0.05;

      // Rotate Outer and Inner meshes in opposite directions
      outerMesh.rotation.x = time * 0.15 + targetY;
      outerMesh.rotation.y = time * 0.2 + targetX;

      innerMesh.rotation.x = -time * 0.35 + targetY;
      innerMesh.rotation.y = -time * 0.25 - targetX;

      // Subtle scaling breathe
      const breathe = 1 + Math.sin(time * 2.0) * 0.04;
      group.scale.set(breathe, breathe, breathe);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center relative select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(252,211,77,0.04)_0%,rgba(255,255,255,0)_60%] pointer-events-none rounded-full blur-2xl z-0" />
    </div>
  );
}
