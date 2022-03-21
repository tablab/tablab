import { createElement, useEffect, useRef } from 'react'
import Vex from 'vexflow'
// import { Artist, VexTab } from 'vextab'

type Props = {
  value: string
}

const MusicStaff = ({ value }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  // const Renderer = Vex.Flow.Renderer()

  useEffect(() => {
    const VF = Vex.Flow
    const musicCanvas = canvasRef.current
    // const artist = Artist

    // const artist = new Artist(10, 10, 600, { scale: 0.8 })
    // const tab = new VexTab(artist)

    const renderer = new VF.Renderer(musicCanvas, VF.Renderer.Backends.SVG)

    console.log('---> renderer', renderer)
    // const artist = new Artist(10, 30, 800, { scale: 0.7 })

    // new VexTab(artist).parse(value)

    // artist.render(renderer)
    // const Renderer = VexFlow.Renderer()
    // const renderer = Renderer(canvasRef.current, Vex.Flow.Renderer.Backends.SVG)
    console.log('----> content', value)
    console.log('----> canvasRef', canvasRef.current)
  }, [])

  return <div ref={canvasRef} id="canvas"></div>
}

export default MusicStaff
