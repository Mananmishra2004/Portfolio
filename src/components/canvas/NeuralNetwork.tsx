import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const { nodes, connections } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const connections: [number, number][] = [];
    
    // Create layers
    const layers = [4, 6, 6, 4];
    const layerSpacing = 2;
    const nodeSpacing = 0.8;
    
    let nodeCount = 0;
    const layerNodes: number[][] = [];
    
    layers.forEach((count, l) => {
      const currentLayerNodes: number[] = [];
      for (let i = 0; i < count; i++) {
        const x = (l - (layers.length - 1) / 2) * layerSpacing;
        const y = (i - (count - 1) / 2) * nodeSpacing;
        nodes.push(new THREE.Vector3(x, y, 0));
        currentLayerNodes.push(nodeCount++);
      }
      layerNodes.push(currentLayerNodes);
    });
    
    // Create connections between layers
    for (let l = 0; l < layers.length - 1; l++) {
      layerNodes[l].forEach(from => {
        layerNodes[l + 1].forEach(to => {
          connections.push([from, to]);
        });
      });
    }
    
    return { nodes, connections };
  }, []);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(connections.length * 6);
    connections.forEach(([from, to], i) => {
      positions[i * 6] = nodes[from].x;
      positions[i * 6 + 1] = nodes[from].y;
      positions[i * 6 + 2] = nodes[from].z;
      positions[i * 6 + 3] = nodes[to].x;
      positions[i * 6 + 4] = nodes[to].y;
      positions[i * 6 + 5] = nodes[to].z;
    });
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [nodes, connections]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
};
