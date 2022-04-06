import { globalCss } from '../../../stitches.config'

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Untitled Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: `url(/assets/fonts/untitled-sans-regular.woff2) format('woff2')`,
    },
    {
      fontFamily: 'Untitled Sans',
      fontStyle: 'bold',
      fontWeight: 700,
      fontDisplay: 'swap',
      src: `url(/assets/fonts/untitled-sans-medium.woff2) format('woff2')`,
    },
  ],
  /*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
  */
  '*': {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',

    '&:before, &:after': {
      boxSizing: 'border-box',
    },
  },
  'html, body': {
    height: '100%',
    '-webkit-font-smoothing': 'antialiased',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  body: {
    backgroundColor: '$bodyBgColor',
    fontFamily: '$body',
  },
})

export default globalStyles
