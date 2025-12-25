'use client';

/**
 * Advanced Robotic Arm 3D - Interactive IK-Powered System
 * Features: Cursor tracking, inverse kinematics, particle effects, smooth animations
 */

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Trail, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface ArmConfig {
  baseHeight: number;
  shoulderLength: number;
  elbowLength: number;
  wristLength: number;
  gripperLength: number;
}

const ARM_CONFIG: ArmConfig = {
  baseHeight: 0.8,
  shoulderLength: 3.0,
  elbowLength: 2.5,
  wristLength: 1.2,
  gripperLength: 0.6,
};

const JOINT_LIMITS = {
  base: { min: -Math.PI * 2, max: Math.PI * 2 },
  shoulder: { min: -Math.PI / 2, max: Math.PI / 2 },
  elbow: { min: -Math.PI * 0.8, max: Math.PI * 0.1 },
  wristPitch: { min: -Math.PI / 2, max: Math.PI / 2 },
  wristRoll: { min: -Math.PI, max: Math.PI },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function smoothDamp(
  current: number,
  target: number,
  velocity: { value: number },
  smoothTime: number,
  deltaTime: number
): number {
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity.value + omega * change) * deltaTime;
  velocity.value = (velocity.value - omega * temp) * exp;
  return target + (change + temp) * exp;
}

// ============================================================================
// INVERSE KINEMATICS SOLVER
// ============================================================================

interface IKResult {
  baseRotation: number;
  shoulderRotation: number;
  elbowRotation: number;
  wristPitchRotation: number;
  wristRollRotation: number;
}

function solveIK(
  target: THREE.Vector3,
  config: ArmConfig,
  currentAngles: IKResult
): IKResult {
  const result = { ...currentAngles };

  // Base rotation to face target
  // Using atan2 with X and Z to get angle in XZ plane
  result.baseRotation = Math.atan2(target.x, target.z);

  // 2D IK in side view
  const distXZ = Math.sqrt(target.x * target.x + target.z * target.z);
  const targetHeight = target.y - config.baseHeight;
  const targetDist = Math.sqrt(distXZ * distXZ + targetHeight * targetHeight);

  const totalReach = config.shoulderLength + config.elbowLength + config.wristLength;

  if (targetDist > totalReach * 0.95) {
    const angle = Math.atan2(targetHeight, distXZ);
    result.shoulderRotation = angle;
    result.elbowRotation = 0;
    result.wristPitchRotation = 0;
    return result;
  }

  const l1 = config.shoulderLength;
  const l2 = config.elbowLength + config.wristLength;

  const cosElbow = (l1 * l1 + l2 * l2 - targetDist * targetDist) / (2 * l1 * l2);
  const clampedCosElbow = clamp(cosElbow, -1, 1);
  result.elbowRotation = -(Math.PI - Math.acos(clampedCosElbow));

  const angle1 = Math.atan2(targetHeight, distXZ);
  const angle2 = Math.acos(
    clamp((l1 * l1 + targetDist * targetDist - l2 * l2) / (2 * l1 * targetDist), -1, 1)
  );
  result.shoulderRotation = angle1 + angle2;

  result.wristPitchRotation = -(result.shoulderRotation + result.elbowRotation);

  result.shoulderRotation = clamp(
    result.shoulderRotation,
    JOINT_LIMITS.shoulder.min,
    JOINT_LIMITS.shoulder.max
  );
  result.elbowRotation = clamp(
    result.elbowRotation,
    JOINT_LIMITS.elbow.min,
    JOINT_LIMITS.elbow.max
  );
  result.wristPitchRotation = clamp(
    result.wristPitchRotation,
    JOINT_LIMITS.wristPitch.min,
    JOINT_LIMITS.wristPitch.max
  );

  return result;
}

// ============================================================================
// PARTICLE SYSTEM
// ============================================================================

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
}

function Particles({ particles }: { particles: Particle[] }) {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position;
    const colors = particlesRef.current.geometry.attributes.color;

    particles.forEach((particle, i) => {
      particle.life -= delta;
      if (particle.life > 0) {
        particle.position.add(particle.velocity.clone().multiplyScalar(delta));
        particle.velocity.y -= 9.8 * delta;

        positions.setXYZ(i, particle.position.x, particle.position.y, particle.position.z);

        const alpha = particle.life / particle.maxLife;
        colors.setXYZ(i, 0, 0.9 * alpha, 0.78 * alpha);
      } else {
        positions.setXYZ(i, 0, -1000, 0);
      }
    });

    positions.needsUpdate = true;
    colors.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    const colors = new Float32Array(100 * 3);

    for (let i = 0; i < 100; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -1000;
      positions[i * 3 + 2] = 0;
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 0.9;
      colors[i * 3 + 2] = 0.78;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geo;
  }, []);

  return (
    <points ref={particlesRef}>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} />
    </points>
  );
}

// ============================================================================
// LASER BEAM
// ============================================================================

function LaserBeam({ start, end, active }: { start: THREE.Vector3; end: THREE.Vector3; active: boolean }) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame(() => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      positions.setXYZ(0, start.x, start.y, start.z);
      positions.setXYZ(1, end.x, end.y, end.z);
      positions.needsUpdate = true;
    }
  });

  const lineObject = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({
      color: '#f5f5f0',
      transparent: true,
      opacity: 0.3,
    });
    return new THREE.Line(geo, material);
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.color.set(active ? '#ff3b3b' : '#f5f5f0');
      material.opacity = active ? 0.8 : 0.3;
    }
  }, [active]);

  return <primitive object={lineObject} ref={lineRef} />;
}

// ============================================================================
// ROBOTIC ARM COMPONENT
// ============================================================================

interface RobotArmProps {
  onGripperUpdate?: (position: THREE.Vector3) => void;
  onCameraUpdate?: (camera: THREE.Camera) => void;
  onParticleBurst?: (x: number, y: number) => void;
}

function RobotArm({ onGripperUpdate, onCameraUpdate, onParticleBurst }: RobotArmProps) {
  const { camera } = useThree();

  const baseRef = useRef<THREE.Group>(null);
  const shoulderRef = useRef<THREE.Group>(null);
  const elbowRef = useRef<THREE.Group>(null);
  const wristPitchRef = useRef<THREE.Group>(null);
  const wristRollRef = useRef<THREE.Group>(null);
  const gripperLeftRef = useRef<THREE.Mesh>(null);
  const gripperRightRef = useRef<THREE.Mesh>(null);
  const endEffectorRef = useRef<THREE.Group>(null);

  const targetPos = useRef(new THREE.Vector3(0, 2, 3));
  const intersectionPoint = useRef(new THREE.Vector3());
  const pointerNDC = useRef(new THREE.Vector2(0, 0));
  const planeAnchor = useRef(targetPos.current.clone());
  const cameraDirection = useRef(new THREE.Vector3(0, 0, -1));
  const [gripperOpen, setGripperOpen] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Plane will track the camera direction so cursor mapping stays accurate even over UI overlays
  const workingPlane = useMemo(() => new THREE.Plane(), []);

  const angles = useRef<IKResult>({
    baseRotation: 0,
    shoulderRotation: 0.5,
    elbowRotation: -0.5,
    wristPitchRotation: 0,
    wristRollRotation: 0,
  });

  const velocities = useRef({
    base: { value: 0 },
    shoulder: { value: 0 },
    elbow: { value: 0 },
    wristPitch: { value: 0 },
    wristRoll: { value: 0 },
  });

  const gripperState = useRef({ current: 0, target: 0, velocity: 0 });
  const endEffectorPos = useRef(new THREE.Vector3());

  useEffect(() => {
    if (onCameraUpdate) {
      onCameraUpdate(camera);
    }
  }, [camera, onCameraUpdate]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerNDC.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerNDC.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      setIsGrabbing(true);
      setGripperOpen(false);

      if (onParticleBurst) {
        onParticleBurst(event.clientX, event.clientY);
      }

      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = 2 + Math.random() * 2;
        newParticles.push({
          position: endEffectorPos.current.clone(),
          velocity: new THREE.Vector3(
            Math.cos(angle) * speed,
            Math.random() * 3 + 2,
            Math.sin(angle) * speed
          ),
          life: 1 + Math.random() * 0.5,
          maxLife: 1.5,
          size: 0.1,
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setIsGrabbing(false);
        setGripperOpen(true);
      }, 500);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [onParticleBurst]);

  useFrame((state, delta) => {
    // Update target position from mouse using raycaster
    const intersection = intersectionPoint.current;
    state.camera.getWorldDirection(cameraDirection.current);
    workingPlane.setFromNormalAndCoplanarPoint(cameraDirection.current, planeAnchor.current);
    state.raycaster.setFromCamera(pointerNDC.current, state.camera);
    const hasIntersection = state.raycaster.ray.intersectPlane(workingPlane, intersection);

    if (hasIntersection) {
      // Clamp to maximum reach
      const maxReach = ARM_CONFIG.shoulderLength + ARM_CONFIG.elbowLength + ARM_CONFIG.wristLength - 0.5;
      const horizontalDist = Math.sqrt(intersection.x * intersection.x + intersection.z * intersection.z);

      if (horizontalDist > maxReach) {
        const scale = maxReach / horizontalDist;
        intersection.x *= scale;
        intersection.z *= scale;
      }

      // Clamp vertical position
      intersection.y = clamp(intersection.y, 0.5, 6.5);

      targetPos.current.lerp(intersection, 0.25);
    }

    planeAnchor.current.lerp(targetPos.current, 0.15);

    const targetAngles = solveIK(targetPos.current, ARM_CONFIG, angles.current);

    angles.current.baseRotation = smoothDamp(
      angles.current.baseRotation,
      targetAngles.baseRotation,
      velocities.current.base,
      0.1,
      delta
    );
    angles.current.shoulderRotation = smoothDamp(
      angles.current.shoulderRotation,
      targetAngles.shoulderRotation,
      velocities.current.shoulder,
      0.15,
      delta
    );
    angles.current.elbowRotation = smoothDamp(
      angles.current.elbowRotation,
      targetAngles.elbowRotation,
      velocities.current.elbow,
      0.15,
      delta
    );
    angles.current.wristPitchRotation = smoothDamp(
      angles.current.wristPitchRotation,
      targetAngles.wristPitchRotation,
      velocities.current.wristPitch,
      0.1,
      delta
    );

    angles.current.wristRollRotation = Math.sin(state.clock.elapsedTime * 2) * 0.2;

    if (baseRef.current) baseRef.current.rotation.y = angles.current.baseRotation;
    if (shoulderRef.current) shoulderRef.current.rotation.z = angles.current.shoulderRotation;
    if (elbowRef.current) elbowRef.current.rotation.z = angles.current.elbowRotation;
    if (wristPitchRef.current) wristPitchRef.current.rotation.z = angles.current.wristPitchRotation;
    if (wristRollRef.current) wristRollRef.current.rotation.y = angles.current.wristRollRotation;

    gripperState.current.target = gripperOpen ? 0 : 0.3;
    const gripperDiff = gripperState.current.target - gripperState.current.current;
    gripperState.current.velocity += gripperDiff * 10 * delta;
    gripperState.current.velocity *= 0.8;
    gripperState.current.current += gripperState.current.velocity * delta;

    if (gripperLeftRef.current && gripperRightRef.current) {
      gripperLeftRef.current.position.x = -0.15 + gripperState.current.current;
      gripperRightRef.current.position.x = 0.15 - gripperState.current.current;
    }

    if (endEffectorRef.current) {
      endEffectorRef.current.getWorldPosition(endEffectorPos.current);
      if (onGripperUpdate) {
        onGripperUpdate(endEffectorPos.current);
      }
    }

    setParticles((prev) => prev.filter((p) => p.life > 0));
  });

  const armMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f5f5f0',
        emissive: '#f5f5f0',
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  const jointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#4a90e2',
        emissive: '#4a90e2',
        emissiveIntensity: 0.7,
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );

  const gripperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isGrabbing ? '#ff3b3b' : '#f5f5f0',
        emissive: isGrabbing ? '#ff3b3b' : '#f5f5f0',
        emissiveIntensity: isGrabbing ? 0.8 : 0.5,
        metalness: 0.9,
        roughness: 0.1,
      }),
    [isGrabbing]
  );

  return (
    <group position={[0, 0, 0]}>
      <group ref={baseRef} position={[0, 0, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.0, 1.2, 0.5, 32]} />
          <primitive object={jointMaterial} />
        </mesh>

        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[1.2, 0.1, 16, 32]} />
          <primitive object={armMaterial} />
        </mesh>

        <group ref={shoulderRef} position={[0, ARM_CONFIG.baseHeight, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <primitive object={jointMaterial} />
          </mesh>

          <Trail width={0.8} length={6} color="#f5f5f0" attenuation={(width) => width * width}>
            <mesh position={[0, ARM_CONFIG.shoulderLength / 2, 0]}>
              <boxGeometry args={[0.4, ARM_CONFIG.shoulderLength, 0.4]} />
              <primitive object={armMaterial} />
            </mesh>
          </Trail>

          <group ref={elbowRef} position={[0, ARM_CONFIG.shoulderLength, 0]}>
            <mesh>
              <sphereGeometry args={[0.4, 32, 32]} />
              <primitive object={jointMaterial} />
            </mesh>

            <Trail width={0.6} length={6} color="#f5f5f0" attenuation={(width) => width * width}>
              <mesh position={[0, ARM_CONFIG.elbowLength / 2, 0]}>
                <boxGeometry args={[0.35, ARM_CONFIG.elbowLength, 0.35]} />
                <primitive object={armMaterial} />
              </mesh>
            </Trail>

            <group ref={wristPitchRef} position={[0, ARM_CONFIG.elbowLength, 0]}>
              <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <primitive object={jointMaterial} />
              </mesh>

              <mesh position={[0, ARM_CONFIG.wristLength / 2, 0]}>
                <cylinderGeometry args={[0.2, 0.25, ARM_CONFIG.wristLength, 16]} />
                <primitive object={armMaterial} />
              </mesh>

              <group ref={wristRollRef} position={[0, ARM_CONFIG.wristLength, 0]}>
                <mesh>
                  <sphereGeometry args={[0.25, 32, 32]} />
                  <primitive object={jointMaterial} />
                </mesh>

                <group ref={endEffectorRef} position={[0, ARM_CONFIG.gripperLength / 2, 0]}>
                  <mesh>
                    <cylinderGeometry args={[0.25, 0.18, ARM_CONFIG.gripperLength, 16]} />
                    <primitive object={gripperMaterial} />
                  </mesh>

                  <mesh ref={gripperLeftRef} position={[-0.25, ARM_CONFIG.gripperLength / 2, 0]}>
                    <boxGeometry args={[0.12, 0.6, 0.12]} />
                    <primitive object={gripperMaterial} />
                  </mesh>

                  <mesh ref={gripperRightRef} position={[0.25, ARM_CONFIG.gripperLength / 2, 0]}>
                    <boxGeometry args={[0.12, 0.6, 0.12]} />
                    <primitive object={gripperMaterial} />
                  </mesh>

                  <pointLight
                    position={[0, ARM_CONFIG.gripperLength / 2 + 0.2, 0]}
                    intensity={isGrabbing ? 2 : 0.5}
                    distance={2}
                    color={isGrabbing ? '#ff3b3b' : '#f5f5f0'}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Target indicator - hidden for cleaner look */}
      {/* <Sphere args={[0.15]} position={targetPos}>
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere> */}

      <LaserBeam start={endEffectorPos.current} end={targetPos.current} active={isGrabbing} />

      <Particles particles={particles} />
    </group>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface RoboticArm3DProps {
  onGripperUpdate?: (position: THREE.Vector3) => void;
  onCameraUpdate?: (camera: THREE.Camera) => void;
  onParticleBurst?: (x: number, y: number) => void;
}

export default function RoboticArm3D(props: RoboticArm3DProps) {
  return (
    <div className="w-full h-full cursor-crosshair">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 6, 12]} fov={50} />

        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f5f5f0" />
        <pointLight position={[-10, 5, -10]} intensity={1.2} color="#4a90e2" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color="#ff3b3b"
          castShadow
        />

        <hemisphereLight args={['#f5f5f0', '#4a90e2', 0.8]} />

        <RobotArm {...props} />

        <gridHelper args={[30, 30, '#f5f5f0', '#1a1d2e']} position={[0, 0, 0]} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </Canvas>

      <div className="absolute bottom-4 left-4 text-white/70 text-sm font-mono pointer-events-none">
        <div>Move mouse to control arm</div>
        <div>Click to grab with gripper</div>
      </div>
    </div>
  );
}
