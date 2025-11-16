'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  color: string;
}

interface GripperEffectsProps {
  gripperPosition?: THREE.Vector3;
  camera?: THREE.Camera;
  onParticleBurst?: (x: number, y: number) => void;
}

export default function GripperEffects({
  gripperPosition,
  camera,
  onParticleBurst
}: GripperEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Ripple[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering near gripper (simplified distance check)
      if (gripperPosition && camera) {
        const projected = project3DTo2D(gripperPosition, camera, canvas);
        if (projected) {
          const distance = Math.sqrt(
            Math.pow(e.clientX - projected.x, 2) +
            Math.pow(e.clientY - projected.y, 2)
          );
          setIsHovering(distance < 100);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create impact ripple
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 100 + Math.random() * 50,
        life: 1,
        color: ['#f5f5f0', '#ff3333', '#39bae6', '#ff3b3b'][Math.floor(Math.random() * 4)],
      });

      // Trigger particle burst if callback provided
      if (onParticleBurst) {
        onParticleBurst(e.clientX, e.clientY);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [gripperPosition, camera, onParticleBurst]);

  // Smooth glow intensity transition
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity((prev) => {
        const target = isHovering ? 1 : 0;
        const delta = target - prev;
        return prev + delta * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isHovering]);

  const project3DTo2D = (
    position: THREE.Vector3,
    camera: THREE.Camera,
    canvas: HTMLCanvasElement
  ): { x: number; y: number } | null => {
    const vector = position.clone();
    vector.project(camera);

    // Convert to screen coordinates
    const x = (vector.x * 0.5 + 0.5) * canvas.width;
    const y = (vector.y * -0.5 + 0.5) * canvas.height;

    // Check if behind camera
    if (vector.z > 1) return null;

    return { x, y };
  };

  const drawEnergyBeam = (
    ctx: CanvasRenderingContext2D,
    from: { x: number; y: number },
    to: { x: number; y: number },
    intensity: number
  ) => {
    const distance = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
    );

    // Don't draw if too far
    if (distance > 500) return;

    const alpha = intensity * (1 - distance / 500);
    if (alpha <= 0) return;

    // Create gradient beam
    const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    gradient.addColorStop(0, `rgba(0, 232, 198, ${alpha})`);
    gradient.addColorStop(0.5, `rgba(57, 186, 230, ${alpha * 0.7})`);
    gradient.addColorStop(1, `rgba(255, 51, 51, ${alpha * 0.3})`);

    ctx.save();

    // Main beam
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);

    // Add some wave to the beam
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;
      const wave = Math.sin(t * Math.PI * 4 + Date.now() * 0.01) * 5 * intensity;
      const perpX = -(to.y - from.y) / distance;
      const perpY = (to.x - from.x) / distance;
      ctx.lineTo(x + perpX * wave, y + perpY * wave);
    }

    ctx.stroke();

    // Outer glow
    ctx.strokeStyle = `rgba(0, 232, 198, ${alpha * 0.3})`;
    ctx.lineWidth = 6;
    ctx.stroke();

    // Energy particles along beam
    for (let i = 0; i < 5; i++) {
      const t = (Date.now() * 0.002 + i * 0.2) % 1;
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;

      const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
      particleGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
      particleGradient.addColorStop(0.5, `rgba(0, 232, 198, ${alpha * 0.5})`);
      particleGradient.addColorStop(1, 'rgba(0, 232, 198, 0)');

      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawGripperGlow = (
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    intensity: number
  ) => {
    if (intensity <= 0) return;

    ctx.save();

    // Pulsing effect
    const pulse = 0.8 + Math.sin(Date.now() * 0.005) * 0.2;
    const radius = 40 * pulse * intensity;

    // Outer glow
    const outerGradient = ctx.createRadialGradient(
      position.x, position.y, 0,
      position.x, position.y, radius * 2
    );
    outerGradient.addColorStop(0, `rgba(0, 232, 198, ${0.3 * intensity})`);
    outerGradient.addColorStop(0.3, `rgba(0, 255, 159, ${0.2 * intensity})`);
    outerGradient.addColorStop(0.6, `rgba(57, 186, 230, ${0.1 * intensity})`);
    outerGradient.addColorStop(1, 'rgba(0, 232, 198, 0)');

    ctx.fillStyle = outerGradient;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Inner core
    const innerGradient = ctx.createRadialGradient(
      position.x, position.y, 0,
      position.x, position.y, radius
    );
    innerGradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 * intensity})`);
    innerGradient.addColorStop(0.5, `rgba(0, 232, 198, ${0.4 * intensity})`);
    innerGradient.addColorStop(1, 'rgba(0, 232, 198, 0)');

    ctx.fillStyle = innerGradient;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Rotating energy ring
    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      const angle = (Date.now() * 0.001 + i * (Math.PI * 2 / ringCount)) % (Math.PI * 2);
      const ringRadius = radius * 1.5;
      const x = position.x + Math.cos(angle) * ringRadius;
      const y = position.y + Math.sin(angle) * ringRadius;

      const ringGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
      ringGradient.addColorStop(0, `rgba(0, 255, 159, ${0.8 * intensity})`);
      ringGradient.addColorStop(1, 'rgba(0, 255, 159, 0)');

      ctx.fillStyle = ringGradient;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const drawRipples = (ctx: CanvasRenderingContext2D) => {
    ripples.current = ripples.current.filter((ripple) => {
      ripple.radius += (ripple.maxRadius - ripple.radius) * 0.1;
      ripple.life -= 0.02;

      if (ripple.life <= 0) return false;

      ctx.save();

      // Multiple ripple rings
      for (let i = 0; i < 3; i++) {
        const offset = i * 20;
        const alpha = ripple.life * (1 - i * 0.3);

        ctx.strokeStyle = ripple.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.lineWidth = 3 - i;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius + offset, 0, Math.PI * 2);
        ctx.stroke();

        // Glow
        ctx.strokeStyle = ripple.color.replace(')', `, ${alpha * 0.3})`).replace('rgb', 'rgba');
        ctx.lineWidth = 8 - i * 2;
        ctx.stroke();
      }

      ctx.restore();
      return true;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = 'rgba(10, 14, 20, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw effects
      if (gripperPosition && camera) {
        const projected = project3DTo2D(gripperPosition, camera, canvas);

        if (projected) {
          // Draw energy beam from gripper to cursor
          drawEnergyBeam(ctx, projected, mousePos.current, glowIntensity);

          // Draw gripper glow
          drawGripperGlow(ctx, projected, glowIntensity);
        }
      }

      // Draw impact ripples
      drawRipples(ctx);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gripperPosition, camera, glowIntensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9997,
      }}
    />
  );
}
