'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function RobotArm() {
  const group = useRef<THREE.Group>(null);
  const joint1 = useRef<THREE.Group>(null);
  const joint2 = useRef<THREE.Group>(null);
  const joint3 = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (joint1.current) {
      joint1.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    }
    if (joint2.current) {
      joint2.current.rotation.z = Math.sin(t * 0.7) * 0.4;
    }
    if (joint3.current) {
      joint3.current.rotation.x = Math.sin(t * 0.9) * 0.3;
    }

    if (group.current) {
      group.current.rotation.y = t * 0.1;
    }
  });

  const armMaterial = new THREE.MeshStandardMaterial({
    color: '#00e8c6',
    emissive: '#00e8c6',
    emissiveIntensity: 0.2,
    metalness: 0.8,
    roughness: 0.2,
  });

  const jointMaterial = new THREE.MeshStandardMaterial({
    color: '#ffb454',
    emissive: '#ffb454',
    emissiveIntensity: 0.3,
    metalness: 0.9,
    roughness: 0.1,
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.3, 32]} />
        <primitive object={jointMaterial} attach="material" />
      </mesh>

      {/* Joint 1 */}
      <group ref={joint1} position={[0, 0.15, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 1, 0.3]} />
          <primitive object={armMaterial} attach="material" />
        </mesh>

        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <primitive object={jointMaterial} attach="material" />
        </mesh>

        {/* Joint 2 */}
        <group ref={joint2} position={[0, 1, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.25, 1, 0.25]} />
            <primitive object={armMaterial} attach="material" />
          </mesh>

          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <primitive object={jointMaterial} attach="material" />
          </mesh>

          {/* Joint 3 */}
          <group ref={joint3} position={[0, 1, 0]}>
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[0.2, 0.6, 0.2]} />
              <primitive object={armMaterial} attach="material" />
            </mesh>

            {/* End effector */}
            <mesh position={[0, 0.6, 0]}>
              <coneGeometry args={[0.15, 0.3, 32]} />
              <primitive object={jointMaterial} attach="material" />
            </mesh>

            {/* Gripper */}
            <mesh position={[-0.1, 0.75, 0]}>
              <boxGeometry args={[0.05, 0.2, 0.05]} />
              <primitive object={armMaterial} attach="material" />
            </mesh>
            <mesh position={[0.1, 0.75, 0]}>
              <boxGeometry args={[0.05, 0.2, 0.05]} />
              <primitive object={armMaterial} attach="material" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export default function RoboticArm3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 3, 5]} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00e8c6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffb454" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#00ff9f"
        />

        <Suspense fallback={null}>
          <RobotArm />
        </Suspense>

        {/* Grid floor */}
        <gridHelper args={[20, 20, '#00e8c6', '#1f2430']} position={[0, -1.5, 0]} />
      </Canvas>
    </div>
  );
}
