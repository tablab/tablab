import {
  json,
  MetaFunction,
  useLoaderData,
  useFetcher,
  ActionFunction,
} from 'remix'
import type { LoaderFunction } from 'remix'

import { db } from '~/db.server'
import MusicStaff from '~/components/tab/music-render.client'
import { useState, useEffect, useRef } from 'react'

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
  // console.log('---> new content', newContent)

  // if (typeof newContent !== 'string') {
  //   console.log('---> error content')
  //   console.error('error loading content')
  //   // throw new Error(`Form not submitted correctly.`)
  // }

  console.log('---> Update tab', intId, newContent)
  await db.tab.update({
    where: { id: intId },
    data: { content: newContent },
  })
}

export default function Tab() {
  const tab = useLoaderData()
  const fetcher = useFetcher()

  const [mounted, setMounted] = useState(false)
  const [tabValue, setTabValue] = useState(tab.content)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e) => {
    const content = e.currentTarget.value
    console.log('---> content', content)
    setTabValue(content)
    fetcher.submit({ content: content }, { method: 'post' })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main>
      <h1>{tab.title}</h1>
      <p>
        by
        {tab.artist.map((artist) => (
          <span key={artist.artistId}> {artist.artist.name}</span>
        ))}
      </p>
      <fetcher.Form>
        <textarea
          name="tabContent"
          spellCheck="false"
          autoCapitalize="false"
          defaultValue={tabValue}
          onChange={handleChange}
          ref={editorRef}
        />
      </fetcher.Form>
      {mounted ? <MusicStaff value={tabValue} /> : null}
    </main>
  )
}
