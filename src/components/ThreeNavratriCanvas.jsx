import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeNavratriCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch (e) {
      console.warn("WebGL not available for 3D canvas:", e);
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 25;

    // Ambient and Point lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 2.5, 50);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    // Group for orbiting festive elements
    const festiveGroup = new THREE.Group();
    scene.add(festiveGroup);

    // Golden Torus / Sacred Ring
    const torusGeometry = new THREE.TorusGeometry(12, 0.15, 16, 100);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x442200,
    });
    const torus = new THREE.Mesh(torusGeometry, goldMaterial);
    torus.rotation.x = Math.PI / 3;
    festiveGroup.add(torus);

    // Floating 3D golden diamonds/stars
    const diamondGeo = new THREE.OctahedronGeometry(0.6, 0);
    const starCount = window.innerWidth < 768 ? 14 : 28;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(diamondGeo, goldMaterial);
      const angle = (i / starCount) * Math.PI * 2;
      const radius = 10 + (i % 3) * 2;
      star.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle) * radius) * 0.4,
        (Math.random() - 0.5) * 8
      );
      star.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      festiveGroup.add(star);
      stars.push({
        mesh: star,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.01 + Math.random() * 0.02,
      });
    }

    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;


      festiveGroup.rotation.y = elapsedTime * 0.08;
      festiveGroup.rotation.z = Math.sin(elapsedTime * 0.15) * 0.05;

      stars.forEach((s) => {
        s.mesh.rotation.x += s.rotSpeedX;
        s.mesh.rotation.y += s.rotSpeedY;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeometry.dispose();
      goldMaterial.dispose();
      diamondGeo.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-5 opacity-40 mix-blend-screen"
    />
  );
}
