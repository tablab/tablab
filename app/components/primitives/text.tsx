import { styled } from '../../../stitches.config'

type TextProps = {
  children: React.ReactNode
  as: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const TextElement = styled('span', {
  fontFamily: '$body',
  fontSize: '$1',
  lineHeight: '$default',
})

const Text = ({ children, ...props }: TextProps) => (
  <TextElement {...props}>{children}</TextElement>
)

export default Text
