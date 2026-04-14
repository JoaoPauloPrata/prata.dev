import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Moon3D() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const moonRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    // Create moon sphere
    const geometry = new THREE.SphereGeometry(2, 64, 64)
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const ctx = canvas.getContext('2d')

    // Draw moon texture
    ctx.fillStyle = '#e8e8e8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add craters
    ctx.fillStyle = '#b0b0b0'
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const r = Math.random() * 80 + 10
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.MeshPhongMaterial({ map: texture })
    const moon = new THREE.Mesh(geometry, material)

    scene.add(moon)
    moonRef.current = moon

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    sceneRef.current = scene

    // Animation loop
    let scrollY = 0
    const onScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate moon
      moon.rotation.x += 0.0005
      moon.rotation.y += 0.001

      // Parallax: move moon based on scroll
      const parallaxStrength = 0.0003
      moon.position.y = scrollY * parallaxStrength

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  )
}
