import { json, MetaFunction, useLoaderData, ActionFunction } from 'remix'
import type { LoaderFunction } from 'remix'
import TabBody from '~/components/tab/tab-body'

import { db } from '~/db.server'

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

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData()
  const intId = Number(params.id)
  const newContent = form.get('content')?.toString()
  // // we do this type check to be extra sure and to make TypeScript happy
  // // we'll explore validation next!

  if (typeof newContent !== 'string') {
    throw new Error(`Form not submitted correctly.`)
  }

  await db.tab.update({
    where: { id: intId },
    data: { content: newContent },
  })

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
      <TabBody defaultValue={tab.content} tabId={tab.id} />
    </main>
  )
}
