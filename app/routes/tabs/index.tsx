import type { Artist, Genre, Tab, User } from '@prisma/client'
import { Link, MetaFunction, json, useLoaderData } from 'remix'
import type { LoaderFunction } from 'remix'

import { db } from '~/db.server'

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
  const tabs = useLoaderData()
  return (
    <>
      <div>
        <p>{tabs.length} Tabs</p>
      </div>
      <div>
        <ul>
          {tabs.map(
            (tab: Tab & { author: User; artist: any[]; genres: any[] }) => (
              <li key={tab.id}>
                <Link to={tab.id.toString()}>
                  ID: {tab.id} - {tab.title} by
                  {tab.artist.map((artist: { artist: Artist }) => (
                    <span key={artist.artist.id}> {artist.artist.name}</span>
                  ))}
                </Link>
                <p>edited by {tab.author.username}</p>
                <ul>
                  {tab.genres.map((genre: { genre: Genre }) => (
                    <li key={genre.genre.id}>
                      ID: {genre.genre.id} - {genre.genre.name}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  )
}
