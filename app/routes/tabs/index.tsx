import { json, Link, MetaFunction, useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'
import type { Tab } from '@prisma/client'
import type { Artist } from '@prisma/client'
import type { Genre } from '@prisma/client'

import { db } from '~/db.server'
import Tab from './$id'

type LoaderData = Tab[] & {
  artist: Artist[]
  genres: Genre[]
}

export const loader: LoaderFunction = async ({ params }) => {
  return json(
    await db.tab.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
        artist: {
          include: {
            artist: true,
          },
        },
        genres: {
          include: {
            genre: true,
          },
        },
      },
    })
  )
}

export const meta: MetaFunction = () => {
  return {
    title: 'TabLab - All Tabs',
    description: 'All we got',
  }
}

export default function ProductCategory() {
  const tabs = useLoaderData<LoaderData>()
  return (
    <>
      <div>
        <p>{tabs.length} Tabs</p>
      </div>
      <div>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <Link to={tab.id.toString()}>
                ID: {tab.id} - {tab.title} by
                {tab.artist.map((artist) => (
                  <span key={artist.artistId}> {artist.artist.name}</span>
                ))}
              </Link>
              <p>edited by {tab.author.username}</p>
              <ul>
                {tab.genres.map((genre) => (
                  <li key={genre.genreId}>
                    ID: {genre.genreId} - {genre.genre.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
