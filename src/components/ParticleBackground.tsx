import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Setup Three.js scene
    const scene = new THREE.Scene();
    
    // Ambient fog
    scene.fog = new THREE.FogExp2(0xfcfcfd, 0.015);

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 200;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Particles Data
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 2); // X and Y drift speeds

    // Grid bounds
    const rangeX = 400;
    const rangeY = 400;
    const rangeZ = 300;

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates
      const x = (Math.random() - 0.5) * rangeX;
      const y = (Math.random() - 0.5) * rangeY;
      const z = (Math.random() - 0.5) * rangeZ - 100;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Random drift velocities (Y: upward, X: sideways)
      speeds[i * 2] = (Math.random() - 0.5) * 0.15; // X speed
      speeds[i * 2 + 1] = 0.2 + Math.random() * 0.35; // Y speed
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Texture - Draw a clean soft circle programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(245, 158, 11, 1)'); // Amber
      gradient.addColorStop(0.3, 'rgba(245, 158, 11, 0.8)');
      gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Material with custom transparency and sizing
    const material = new THREE.PointsMaterial({
      color: 0xF59E0B, // Amber-500
      size: 2.2,
      transparent: true,
      opacity: 0.75,
      map: texture,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
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

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // 1. Particle Drift Physics
      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Drift X
        arr[i * 3] += speeds[i * 2];
        // Drift Y upward
        arr[i * 3 + 1] += speeds[i * 2 + 1];

        // Reset if particles go too high (above viewport boundary)
        if (arr[i * 3 + 1] > rangeY / 2) {
          arr[i * 3 + 1] = -rangeY / 2;
          arr[i * 3] = (Math.random() - 0.5) * rangeX; // random new X
        }
        
        // Reset if drift too far left/right
        if (Math.abs(arr[i * 3]) > rangeX / 2) {
          speeds[i * 2] = -speeds[i * 2];
        }
      }
      posAttr.needsUpdate = true;

      // 2. Mouse Parallax Interpolation (smooth lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Shift camera or particles subtly
      particles.rotation.y = targetX * 0.06;
      particles.rotation.x = -targetY * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
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
      id="particle-bg"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#fcfcfd' }}
    />
  );
}
