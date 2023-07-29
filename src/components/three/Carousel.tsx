import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface CarouselProps {
  pathSurroundGeometery: THREE.BufferGeometry
}

export default function Carousel(props: CarouselProps) {
  const numCards = 10;
  
  // const cardRefs = useRef()
  const pathCurve = useMemo(() => {
    props.pathSurroundGeometery.computeBoundingSphere()
    // get xz circumcircle
    return new THREE.EllipseCurve(
      0,0,
      (props.pathSurroundGeometery.boundingSphere?.radius === undefined
        ? 1
        : props.pathSurroundGeometery.boundingSphere?.radius) * 0.3,
      (props.pathSurroundGeometery.boundingSphere?.radius === undefined
        ? 1
        : props.pathSurroundGeometery.boundingSphere?.radius) * 2,
        0, Math.PI*2, true, Math.PI/2
    )
  }, [])
  
  return (<>
    <group>
      {Array(numCards).fill(1).map((_point, index)=>{
        return (
          <Card key={index} n={numCards} i={index} pathCurve={pathCurve}/>
        )          
        
        
      })}
    </group>
  </>)
}

interface CardProps extends React.ComponentPropsWithoutRef<"mesh">{
  n : number;
  pathCurve: THREE.EllipseCurve
  i: number;

}
function Card({n, pathCurve, i}:CardProps){
  // const [visible, setVisible] = useState(true)
  const ref = useRef(new THREE.Group())
  const speed = 0.01;
  // const yAxis = useMemo(()=>new THREE.Vector3(0,1,0), [])
  let currT = i/n;
  // console.log(currT)
  const curvePoint = pathCurve.getPoint(currT)
  const position = new THREE.Vector3(curvePoint.x, 0.8, curvePoint.y)
  // const position = new THREE.Vector3(curvePoint.x, 0.5, curvePoint.y)

  // console.log(position)

  useFrame((_state, delta)=>{
    currT -= delta*speed
    const newPoint = pathCurve.getPoint(currT)
    ref.current.position.x = newPoint.x;
    ref.current.position.y = position.y;
    ref.current.position.z = newPoint.y;

  })
  

  return(
    // <Icosahedron ref={ref} args={[0.1, 0]} position={position}/>
    // <Billboard ref={ref} position={position}>
    // <mesh></mesh>
    <group position={position} ref={ref}>
      
    </group>
      
    // </Billboard>
  )
}


