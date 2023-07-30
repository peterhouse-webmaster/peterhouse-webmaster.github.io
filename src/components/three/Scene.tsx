// import './App.css'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Bounds, useGLTF, MeshDistortMaterial } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { GLTF } from 'three-stdlib'
import { Vector3 } from 'three'
// import { Perf } from 'r3f-perf'

// extend(geometry)

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
    Cube003: THREE.Mesh
    Cube003_1: THREE.Mesh
    Windows: THREE.Mesh
    Minute_Hand: THREE.Mesh
    Hour_Hand: THREE.Mesh
    Sphere: THREE.Mesh
    Sphere_1: THREE.Mesh
    Backdrop: THREE.Mesh
  }
  materials: {
    // PaletteMaterial001: THREE.MeshStandardMaterial
    PaletteMaterial001: THREE.MeshStandardMaterial
    PaletteMaterial002: THREE.MeshStandardMaterial
  }
}

const diffuseMaterial = new THREE.MeshStandardMaterial({
  // wireframe: true,
  color: '#d6d6d6',
})

interface RigProps {
  strength: number
}

function Rig(props: RigProps) {
  const { camera, pointer } = useThree()
  const vec = new Vector3()
  const initialPosition = new Vector3(0, 0.7, 3)
  camera.position.copy(initialPosition)

  return useFrame(() => {
    // console.log(pointer.y)
    vec.set(
      initialPosition.x - pointer.x * props.strength,
      initialPosition.y - Math.min(0, pointer.y) * props.strength,
      camera.position.z,
    )
    camera.position.lerp(vec, 0.05)
    camera.lookAt(0, 1, 0)
  })
}
interface SceneProps {
  nerf: boolean
}
export default function Scene({ nerf }: SceneProps) {
  // const nerf=false
  const { invalidate } = useThree()
  const hourHand = useRef<THREE.Mesh>(new THREE.Mesh())
  const minuteHand = useRef<THREE.Mesh>(new THREE.Mesh())

  const { nodes, materials } = useGLTF(import.meta.env.BASE_URL+'/Peterhouse JCR Merged with Backdrop-transformed.glb') as GLTFResult

  // const curve = useMemo(()=>{
  //   new THREE.EllipseCurve()
  // }, [])

  useEffect(() => {
    // console.log(nodes.Cube003_1.geometry.computeBoundingBox())
    const interval = setInterval(() => {
      const d = new Date()
      // setHourAngle((((-1 * d.getHours()) % 12) / 6) * Math.PI)
      // setMinuteAngle(((-1 * d.getMinutes()) / 30) * Math.PI)
      hourHand.current.rotation.z = (((-1 * d.getHours()) % 12) / 6 + (-1 * d.getMinutes()) / 30 / 12) * Math.PI
      minuteHand.current.rotation.z = ((-1 * d.getMinutes()) / 30) * Math.PI
      invalidate()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      
        <Bounds clip damping={6} margin={1}>
          <group dispose={null}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane.geometry}
              // material={<MeshDistortMaterial></MeshDistortMaterial>}}
              position={[0.024, 1.424, -0.004]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <MeshDistortMaterial speed={2}></MeshDistortMaterial>
            </mesh>
            <group position={[0.913, 0.012, 0]}>
              <mesh castShadow receiveShadow geometry={nodes.Cube003.geometry} material={diffuseMaterial} />
              {/* <mesh castShadow receiveShadow geometry={nodes.Cube003_1.geometry} material={diffuseMaterial} /> */}
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Windows.geometry}
              material={diffuseMaterial}
              position={[0.553, 0.508, 0.002]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Minute_Hand.geometry}
              material={materials.PaletteMaterial002}
              position={[0, 0.991, 0.014]}
              ref={minuteHand}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Hour_Hand.geometry}
              material={materials.PaletteMaterial002}
              position={[0, 0.991, 0.014]}
              ref={hourHand}
            />
            <mesh castShadow receiveShadow geometry={nodes.Sphere.geometry} material={diffuseMaterial} />
            <mesh castShadow receiveShadow geometry={nodes.Sphere_1.geometry} material={diffuseMaterial} />
          </group>
        </Bounds>

        {/* <Carousel pathSurroundGeometery={nodes.Sphere.geometry}></Carousel> */}

        <Rig strength={0.15}></Rig>
        {nerf ? (
          <></>
        ) : (
          <>
            <AccumulativeShadows temporal frames={100} scale={4} opacity={0.3}>
              <RandomizedLight amount={8} radius={25} position={[0, 10, -30]} />
            </AccumulativeShadows>
          </>
        )}
      

      <ambientLight intensity={0.1} />

      <directionalLight
        castShadow
        // color={'#ffe4aa'}
        color={new THREE.Color(1, 0.779, 0.4)}
        position={[-6, 3.5, 4]}
        intensity={0.6}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-radius={10}
        shadow-bias={-0.000005}
      />

      <rectAreaLight
        position={[5, 1.5, 2]}
        //@ts-ignore
        lookAt={new THREE.Vector3(0, 0.5, 0)}
        color={'#8fa9cd'}
        intensity={0.2}
      ></rectAreaLight>
      <rectAreaLight
        position={[-6, 3.5, 2]}
        //@ts-ignore
        lookAt={new THREE.Vector3(0, 0.5, 0)}
        color={'#FFE4AA'}
        intensity={0.1}
      ></rectAreaLight>

      {/* <Perf deepAnalyze></Perf> */}
    </>
  )
}

useGLTF.preload(import.meta.env.BASE_URL+'/Peterhouse JCR Merged with Backdrop-transformed.glb')
