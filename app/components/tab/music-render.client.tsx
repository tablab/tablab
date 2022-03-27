import { useEffect, useRef, useState } from 'react'
// import Vex from 'vexflow'
import { Vex, Artist, VexTab } from '../../../vendor/vextab'

type Props = {
  value: string
}

const MusicStaff = ({ value }: Props) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const errorMessageRef = useRef<HTMLDivElement>(null)

  const [artist, setArtist] = useState<Artist>(
    new Artist(10, 30, 800, { scale: 1, bottom_spacing: 8 })
  )
  const [tab, setTab] = useState<VexTab>(new VexTab(artist))
  const [renderer, setRenderer] = useState<Vex.IRenderer | null>(null)

  useEffect(() => {
    const VF = Vex.Flow
    const musicCanvas = canvasRef.current
    setRenderer(new VF.Renderer(musicCanvas, VF.Renderer.Backends.SVG))
  }, [])

  useEffect(() => {
    if (canvasRef.current && renderer) {
      try {
        artist.reset()
        setTab(new VexTab(artist))

        tab.parse(value)
        artist.render(renderer)
      } catch (e) {
        console.log('----> error', e)
      }
    }
  }, [value])

  return (
    <>
      <div ref={canvasRef} id="canvas"></div>
      <div ref={errorMessageRef} />
    </>
  )
}

export default MusicStaff
