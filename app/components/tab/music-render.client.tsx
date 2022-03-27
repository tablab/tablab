import { useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
// import Vex from 'vexflow'
import { Vex, Artist, VexTab } from '../../../vendor/vextab'

type Props = {
  value: string
}

const MusicStaff = ({ value }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const errorMessageRef = useRef<HTMLDivElement>(null)

  const VF = Vex.Flow

  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas) {
      canvas.innerHTML = ''
    }

    const renderer = new VF.Renderer(canvas, VF.Renderer.Backends.SVG)
    const artist = new Artist(10, 30, 800, { scale: 1, bottom_spacing: 8 })
    const tab = new VexTab(artist)

    try {
      errorMessageRef.current.innerHTML = ''
      tab.parse(value)
      artist.render(renderer)
    } catch (e) {
      console.error(e)
      errorMessageRef.current.innerHTML = e.message
    }
  }, [value])

  return (
    <>
      <div ref={errorMessageRef} />
      <div ref={canvasRef} id="canvas"></div>
    </>
  )
}

export default MusicStaff
