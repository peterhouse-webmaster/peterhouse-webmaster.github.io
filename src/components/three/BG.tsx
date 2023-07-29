import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

export function BG() {
  const { scene } = useThree()

  const texture = new THREE.TextureLoader().load('bgTexture.jpg')

  useEffect(() => {
    scene.background = texture
  }, [])

  return <></>
}
