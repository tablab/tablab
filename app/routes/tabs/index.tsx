import { json, Link, MetaFunction, useLoaderData } from 'remix'
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
          {tabs.map((tab) => (
            <li key={tab.id}>
              {console.log(tab.title)}
              <Link to={tab}>
                {tab.title} by
                {tab.artist.map((artist) => (
                  <> {artist.artist.name}</>
                ))}
              </Link>
              <p>edited by {tab.author.username}</p>
              <ul>
                {tab.genres.map((genre) => (
                  <li key={genre.genreId}>{genre.genre.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
