import type { MetaFunction } from 'remix'
import Text from '../components/primitives/text'

export const meta: MetaFunction = () => {
  return {
    title: 'TabLab',
    description: 'TabLab',
  }
}

export default function Index() {
  return (
    <main>
      <Text as="h1" css={{ fontSize: '$10', letterSpacing: '$heading' }}>
        Welcome to TabLab!
      </Text>
    </main>
  )
}
