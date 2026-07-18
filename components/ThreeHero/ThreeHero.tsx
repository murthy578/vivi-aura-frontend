"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Shirt() {
  return (
    <mesh rotation={[0.3, 0.4, 0]}>
      <boxGeometry args={[2, 3, 0.4]} />
      <meshStandardMaterial color="#111111" />
    </mesh>
  );
}

export default function ThreeHero() {
  return (
    <div style={{ width: "100%", height: "700px" }}>
      <Canvas camera={{ position: [0, 0, 6] }}>

        <ambientLight intensity={2} />

        <directionalLight position={[5, 5, 5]} />

        <Shirt />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />

      </Canvas>
    </div>
  );
}