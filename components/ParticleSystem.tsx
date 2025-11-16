'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
  type: 'spark' | 'dot' | 'trail';
  rotation: number;
  rotationSpeed: number;
}

interface ParticleSystemProps {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

export default function ParticleSystem({ canvasRef }: ParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  // Color palette matching the theme
  const colors = useMemo(() => [
    new THREE.Color('#e6e6e6'), // off-white
    new THREE.Color('#ff3333'), // red
    new THREE.Color('#39bae6'), // blue
    new THREE.Color('#f5f5f0'), // cyan
    new THREE.Color('#ff3b3b'), // green
  ], []);

  useEffect(() => {
    // Create or use existing canvas
    let canvasElement: HTMLCanvasElement;

    if (canvasRef?.current) {
      canvasElement = canvasRef.current;
    } else {
      canvasElement = document.createElement('canvas');
      canvasElement.style.position = 'fixed';
      canvasElement.style.top = '0';
      canvasElement.style.left = '0';
      canvasElement.style.width = '100%';
      canvasElement.style.height = '100%';
      canvasElement.style.pointerEvents = 'none';
      canvasElement.style.zIndex = '9998';
      containerRef.current?.appendChild(canvasElement);
    }

    setCanvas(canvasElement);
    ctx.current = canvasElement.getContext('2d');

    const handleResize = () => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!canvasRef?.current && containerRef.current?.contains(canvasElement)) {
        containerRef.current.removeChild(canvasElement);
      }
    };
  }, [canvasRef]);

  const createParticleBurst = (x: number, y: number) => {
    const particleCount = 30 + Math.random() * 20;
    const types: Array<'spark' | 'dot' | 'trail'> = ['spark', 'dot', 'trail'];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      const type = types[Math.floor(Math.random() * types.length)];

      particles.current.push({
        position: new THREE.Vector3(x, y, 0),
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed - 1,
          0
        ),
        life: 1,
        maxLife: 0.5 + Math.random() * 0.5,
        size: type === 'spark' ? 2 + Math.random() * 3 : type === 'trail' ? 1.5 : 3 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)].clone(),
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }
  };

  const updateAndRender = () => {
    if (!ctx.current || !canvas) return;

    const context = ctx.current;

    // Clear with fade effect for trails
    context.fillStyle = 'rgba(10, 14, 20, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Update and render particles
    particles.current = particles.current.filter((particle) => {
      // Update physics
      particle.velocity.y += 0.15; // gravity
      particle.velocity.multiplyScalar(0.98); // air resistance
      particle.position.add(particle.velocity);
      particle.life -= 0.016 / particle.maxLife;
      particle.rotation += particle.rotationSpeed;

      if (particle.life <= 0) return false;

      // Render particle
      const alpha = particle.life;
      context.save();
      context.translate(particle.position.x, particle.position.y);
      context.rotate(particle.rotation);

      // Get color with alpha
      const color = particle.color;
      const r = Math.floor(color.r * 255);
      const g = Math.floor(color.g * 255);
      const b = Math.floor(color.b * 255);

      switch (particle.type) {
        case 'spark':
          // Draw elongated spark
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          context.lineWidth = particle.size;
          context.lineCap = 'round';
          context.beginPath();
          context.moveTo(-particle.size * 2, 0);
          context.lineTo(particle.size * 2, 0);
          context.stroke();

          // Glow effect
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
          context.lineWidth = particle.size * 2;
          context.stroke();
          break;

        case 'trail':
          // Draw trailing line
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          context.lineWidth = particle.size;
          context.lineCap = 'round';
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(-particle.velocity.x * 3, -particle.velocity.y * 3);
          context.stroke();
          break;

        case 'dot':
        default:
          // Draw glowing dot
          const gradient = context.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          context.fillStyle = gradient;
          context.beginPath();
          context.arc(0, 0, particle.size * 2, 0, Math.PI * 2);
          context.fill();
          break;
      }

      context.restore();
      return true;
    });

    animationFrameRef.current = requestAnimationFrame(updateAndRender);
  };

  useEffect(() => {
    if (!canvas) return;

    const handleClick = (e: MouseEvent) => {
      createParticleBurst(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    animationFrameRef.current = requestAnimationFrame(updateAndRender);

    return () => {
      window.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvas]);

  return <div ref={containerRef} />;
}
