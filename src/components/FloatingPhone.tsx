import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingPhone() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create SCENE
    const scene = new THREE.Scene();

    // GET BOUNDS
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // GROUP TO HOLD PHONE
    const phoneGroup = new THREE.Group();

    // 1. PHONE CASE / FRAME (Matte Titanium build with rounded bevel appearance)
    const phoneWidth = 4.3;
    const phoneHeight = 8.6;
    const phoneDepth = 0.38;
    
    const phoneCaseGeom = new THREE.BoxGeometry(phoneWidth, phoneHeight, phoneDepth);
    const phoneCaseMat = new THREE.MeshStandardMaterial({
      color: 0x1E1E24, // Sophisticated Titanium Dark Gray
      roughness: 0.18,
      metalness: 0.95,
      bumpScale: 0.05,
    });
    const phoneCase = new THREE.Mesh(phoneCaseGeom, phoneCaseMat);
    phoneGroup.add(phoneCase);

    // Dynamic polished silver/chrome outer framing rim for luxury 3D reflections
    const borderOuterGeom = new THREE.BoxGeometry(phoneWidth + 0.04, phoneHeight + 0.04, phoneDepth - 0.04);
    const borderOuterMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B, // Amber gold metallic frame rim
      roughness: 0.1,
      metalness: 0.98,
    });
    const borderOuterRim = new THREE.Mesh(borderOuterGeom, borderOuterMat);
    phoneGroup.add(borderOuterRim);

    // 2. PHONE SCREEN LAYER (High-gloss dark front plate)
    const screenWidth = 4.05;
    const screenHeight = 8.32;
    const screenDepth = 0.04;
    const screenGeom = new THREE.BoxGeometry(screenWidth, screenHeight, screenDepth);
    
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x09090C,
      emissive: 0x111116,
      roughness: 0.05,
      metalness: 0.95,
    });
    const screen = new THREE.Mesh(screenGeom, screenMat);
    // Position it slightly forward
    screen.position.z = phoneDepth / 2 + screenDepth / 2 - 0.01;
    phoneGroup.add(screen);

    // 3. FRONT SCREEN INTERACTIVE UI ELEMENTS (3D layered objects looking like a premium app interface)
    // Dynamic island notch
    const notchGeom = new THREE.BoxGeometry(1.4, 0.28, 0.02);
    const notchMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const notch = new THREE.Mesh(notchGeom, notchMat);
    notch.position.set(0, 3.8, phoneDepth / 2 + screenDepth / 2 + 0.005);
    phoneGroup.add(notch);

    // Premium UI Header Card (Amber-tinted gradient simulation)
    const headerCardGeom = new THREE.BoxGeometry(3.6, 1.4, 0.02);
    const headerCardMat = new THREE.MeshStandardMaterial({
      color: 0x1B1510,
      emissive: 0xEA580C,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.8,
    });
    const headerCard = new THREE.Mesh(headerCardGeom, headerCardMat);
    headerCard.position.set(0, 2.6, phoneDepth / 2 + screenDepth / 2 + 0.01);
    phoneGroup.add(headerCard);

    // Custom Profile Orb inside Header Card
    const pOrbGeom = new THREE.SphereGeometry(0.3, 32, 32);
    const pOrbMat = new THREE.MeshStandardMaterial({
      color: 0xF97316,
      emissive: 0xFDBA74,
      emissiveIntensity: 0.3,
    });
    const profileOrb = new THREE.Mesh(pOrbGeom, pOrbMat);
    profileOrb.position.set(-1.1, 2.6, phoneDepth / 2 + screenDepth / 2 + 0.035);
    phoneGroup.add(profileOrb);

    // Text Line Simulators inside Header Card
    const textBar1Geom = new THREE.BoxGeometry(1.6, 0.12, 0.01);
    const textBarMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const textBar1 = new THREE.Mesh(textBar1Geom, textBarMat);
    textBar1.position.set(0.1, 2.75, phoneDepth / 2 + screenDepth / 2 + 0.025);
    phoneGroup.add(textBar1);

    const textBar2Geom = new THREE.BoxGeometry(1.2, 0.08, 0.01);
    const textBar2Mat = new THREE.MeshBasicMaterial({ color: 0xA1A1AA });
    const textBar2 = new THREE.Mesh(textBar2Geom, textBar2Mat);
    textBar2.position.set(-0.1, 2.5, phoneDepth / 2 + screenDepth / 2 + 0.025);
    phoneGroup.add(textBar2);

    // Center UI Card (Database Graph Simulator)
    const chartCardGeom = new THREE.BoxGeometry(3.6, 2.4, 0.02);
    const chartCardMat = new THREE.MeshStandardMaterial({
      color: 0x16161D,
      roughness: 0.15,
      metalness: 0.9,
    });
    const chartCard = new THREE.Mesh(chartCardGeom, chartCardMat);
    chartCard.position.set(0, 0.4, phoneDepth / 2 + screenDepth / 2 + 0.01);
    phoneGroup.add(chartCard);

    // Interactive Graph Bars with active emissive sparks
    const barCount = 5;
    const bars: THREE.Mesh[] = [];
    for (let i = 0; i < barCount; i++) {
      const barH = 0.6 + Math.random() * 1.1;
      const barG = new THREE.BoxGeometry(0.35, barH, 0.02);
      const barM = new THREE.MeshStandardMaterial({
        color: 0xEA580C,
        emissive: 0xF97316,
        emissiveIntensity: 0.8 + i * 0.1,
        roughness: 0.2,
      });
      const barMesh = new THREE.Mesh(barG, barM);
      barMesh.position.set(-1.1 + i * 0.55, 0.4 + (barH / 2) - 0.9, phoneDepth / 2 + screenDepth / 2 + 0.025);
      phoneGroup.add(barMesh);
      bars.push(barMesh);
    }

    // Bottom Action List Grid (2 elements)
    const btn1Geom = new THREE.BoxGeometry(1.68, 0.85, 0.02);
    const btnMat = new THREE.MeshStandardMaterial({
      color: 0x27272A,
      roughness: 0.2,
      metalness: 0.8,
    });
    const btn1 = new THREE.Mesh(btn1Geom, btnMat);
    btn1.position.set(-0.95, -1.6, phoneDepth / 2 + screenDepth / 2 + 0.01);
    phoneGroup.add(btn1);

    const btn2Geom = new THREE.BoxGeometry(1.68, 0.85, 0.02);
    const btnActiveMat = new THREE.MeshStandardMaterial({
      color: 0x1E1B4B,
      emissive: 0x4F46E5,
      emissiveIntensity: 0.4,
      roughness: 0.2,
    });
    const btn2 = new THREE.Mesh(btn2Geom, btnActiveMat);
    btn2.position.set(0.95, -1.6, phoneDepth / 2 + screenDepth / 2 + 0.01);
    phoneGroup.add(btn2);

    // Navigation bar dots
    const navBarGeom = new THREE.BoxGeometry(1.8, 0.1, 0.01);
    const navBarMat = new THREE.MeshBasicMaterial({ color: 0x52525B });
    const navBar = new THREE.Mesh(navBarGeom, navBarMat);
    navBar.position.set(0, -3.8, phoneDepth / 2 + screenDepth / 2 + 0.01);
    phoneGroup.add(navBar);

    // 4. BACK SIDE CAMERAS (Visible during rotation spin-arounds)
    const cameraHousingGeom = new THREE.BoxGeometry(1.6, 2.2, 0.1);
    const cameraHousingMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      roughness: 0.1,
      metalness: 0.9,
    });
    const cameraHousing = new THREE.Mesh(cameraHousingGeom, cameraHousingMat);
    cameraHousing.position.set(1.0, 2.6, -phoneDepth / 2 - 0.04);
    phoneGroup.add(cameraHousing);

    const lensGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.12, 32);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.01,
      metalness: 0.98,
    });
    const lens1 = new THREE.Mesh(lensGeom, lensMat);
    lens1.rotation.x = Math.PI / 2;
    lens1.position.set(1.0, 3.2, -phoneDepth / 2 - 0.1);
    phoneGroup.add(lens1);

    const lensInnerGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.13, 32);
    const lensInnerMat = new THREE.MeshBasicMaterial({ color: 0xEA580C });
    const lensInner = new THREE.Mesh(lensInnerGeom, lensInnerMat);
    lensInner.rotation.x = Math.PI / 2;
    lensInner.position.set(1.0, 3.2, -phoneDepth / 2 - 0.1);
    phoneGroup.add(lensInner);

    const lens2 = new THREE.Mesh(lensGeom, lensMat);
    lens2.rotation.x = Math.PI / 2;
    lens2.position.set(1.0, 2.1, -phoneDepth / 2 - 0.1);
    phoneGroup.add(lens2);

    scene.add(phoneGroup);

    // STATIC PEDESTAL (Doesn't float with phone, added directly to scene)
    const pedestalGeom = new THREE.CylinderGeometry(3.6, 3.9, 0.25, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xF3F4F6, // Sleek off-white
      roughness: 0.1,
      metalness: 0.15,
    });
    const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
    pedestal.position.set(0, -4.6, 0);
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // orbitGroup for tilted gold/orange orbit paths and particles
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = 0.5; // Tilt forward
    orbitGroup.rotation.z = -0.3; // Tilt sideways
    orbitGroup.position.set(0, -0.5, 0);
    scene.add(orbitGroup);

    // First Ellipse wireframe
    const ringGeom1 = new THREE.RingGeometry(4.8, 4.82, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xFBAF24, // Light gold/orange
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.rotation.x = Math.PI / 2; // Lie flat in orbit group
    orbitGroup.add(ring1);

    // Second Ellipse wireframe (slightly larger radius)
    const ringGeom2 = new THREE.RingGeometry(5.8, 5.82, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xEA580C, // Deep orange
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    orbitGroup.add(ring2);

    // Particle 1 on inner orbit
    const partGeom1 = new THREE.SphereGeometry(0.18, 16, 16);
    const partMat1 = new THREE.MeshStandardMaterial({
      color: 0xEA580C,
      emissive: 0xEA580C,
      emissiveIntensity: 1.5,
    });
    const particle1 = new THREE.Mesh(partGeom1, partMat1);
    orbitGroup.add(particle1);

    // Particle 2 on outer orbit
    const partGeom2 = new THREE.SphereGeometry(0.12, 16, 16);
    const partMat2 = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      emissive: 0xF59E0B,
      emissiveIntensity: 1.2,
    });
    const particle2 = new THREE.Mesh(partGeom2, partMat2);
    orbitGroup.add(particle2);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Rich Glowing direct light (Sunset Amber Point Light)
    const amberPointLight = new THREE.PointLight(0xF97316, 25, 40);
    amberPointLight.position.set(6, 6, 8);
    scene.add(amberPointLight);

    const violetPointLight = new THREE.PointLight(0x6366F1, 15, 30);
    violetPointLight.position.set(-6, 2, 6);
    scene.add(violetPointLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(8, 8, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.85);
    fillLight.position.set(-8, -4, 8);
    scene.add(fillLight);

    // Mouse tilt tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      mouseX = x / (rect.width / 2); // range -1 to 1
      mouseY = y / (rect.height / 2); // range -1 to 1
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

      // 1. Hover spring tilt interpolation
      targetTiltX += (mouseY * 0.4 - targetTiltX) * 0.08;
      targetTiltY += (mouseX * 0.4 - targetTiltY) * 0.08;

      // 2. Slow auto rotation around Y axis (constant spin)
      const baseRotationY = time * 0.3;

      // Make graph bars breathe dynamically
      bars.forEach((bar, index) => {
        const factor = Math.sin(time * 3.5 + index * 1.2) * 0.28 + 0.8;
        bar.scale.y = factor;
        bar.position.y = 0.4 + (factor * 0.7) - 1.1; // adjust pivot
      });

      // Position orbiting particles on their coordinate ellipses
      const pos1 = time * 0.45;
      particle1.position.x = Math.cos(pos1) * 4.8;
      particle1.position.z = Math.sin(pos1) * 4.8;

      const pos2 = -time * 0.65 + 2.0; // opposite direction and starting offset
      particle2.position.x = Math.cos(pos2) * 5.8;
      particle2.position.z = Math.sin(pos2) * 5.8;

      // Apply transforms (Floating physics + Cursor tilts)
      phoneGroup.position.y = Math.sin(time * 1.6) * 0.55; // float up and down
      phoneGroup.rotation.x = targetTiltX + 0.15; // default subtle pitch
      phoneGroup.rotation.y = baseRotationY + targetTiltY;
      phoneGroup.rotation.z = Math.sin(time * 0.85) * 0.05; // subtle pivot sway

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
      className="w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
    >
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(234,88,12,0.08)_0%,rgba(0,0,0,0)_65%] pointer-events-none rounded-full blur-3xl" />
    </div>
  );
}
