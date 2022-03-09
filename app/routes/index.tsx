import type { MetaFunction } from 'remix'

export const meta: MetaFunction = () => {
  return {
    title: 'TabLab',
    description: 'TabLab',
  }
}

export default function Index() {
  return (
    <main>
      <h1>Welcome to TabLab!</h1>
    </main>
  )
}
