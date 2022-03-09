import { json, useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'

import { db } from '~/db.server'
import { Vex, VexTab } from 'vextab'

export const loader: LoaderFunction = async ({ params }) => {
  const intId = Number(params.id)
  return json(
    await db.tab.findUnique({
      where: {
        id: intId,
      },
      include: {
        artist: { include: { artist: true } },
        author: true,
        genres: true,
      },
    })
  )
}

export const meta: MetaFunction = (page) => {
  return {
    title: `${page.data.title} - TabLab`,
    description: 'Tablature music notation for ' + page.data.title,
  }
}

const Renderer = (tab) => {
  console.log('-----> content', tab.value)
  return null
}

export default function Tab() {
  const tab = useLoaderData()
  return (
    <main>
      <h1>{tab.title}</h1>
      <p>
        by
        {tab.artist.map((artist) => (
          <span key={artist.artistId}> {artist.artist.name}</span>
        ))}
      </p>

      <textarea
        spellCheck="false"
        autoCapitalize="false"
        id="editor"
        defaultValue={tab.content}
      />
      <Renderer value={tab.content} />
    </main>
  )
}
