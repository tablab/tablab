import { createElement, RefObject, useEffect, useRef } from 'react'
// import Vex from 'vexflow'
import { Vex, Artist, VexTab } from '../../../vendor/vextab'

type Props = {
  value: string
  editor: RefObject<HTMLTextAreaElement>
}

const MusicStaff = ({ value, editor }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  // const Renderer = Vex.Flow.Renderer()

  useEffect(() => {
    const VF = Vex.Flow
    const musicCanvas = canvasRef.current

    const renderer = new VF.Renderer(musicCanvas, VF.Renderer.Backends.SVG)

    console.log('---> renderer', renderer)
    const artist = new Artist(10, 30, 800, { scale: 0.7, bottom_spacing: 0 })
    const tab = new VexTab(artist)

    try {
      tab.parse('tabstave notation=false\n')
      artist.render(renderer)
    } catch (e) {
      console.log('---> error', e)
    }

    console.log('----> content', value)
    console.log('----> Editor content', editor.current.value)
    console.log('----> canvasRef', canvasRef.current)
  }, [])

  return <div ref={canvasRef} id="canvas"></div>
}

export default MusicStaff
