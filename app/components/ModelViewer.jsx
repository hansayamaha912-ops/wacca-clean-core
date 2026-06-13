import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars, PerspectiveCamera, Center } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  const { scene } = useGLTF('/assets/master.glb');
  return (
    <Center>
      {/* scaleをさらに小さくして、全体を収まりやすくします */}
      <primitive object={scene} scale={0.15} />
    </Center>
  );
}

export default function ModelViewer() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas>
        {/* Y=10 を 0 にして正面からに。Z=30 を 50 にしてさらに引いた視点に */}
        <PerspectiveCamera makeDefault position={[0, 0, 50]} />
        
        <Stars radius={100} depth={50} count={3000} factor={4} fade />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* 正面からの視点を維持するため、上下の回転範囲を制限 */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2} 
          maxPolarAngle={Math.PI / 2} 
        />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}