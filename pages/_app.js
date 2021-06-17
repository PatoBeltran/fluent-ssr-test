import '../styles/globals.css'
import { initializeIcons } from '@fluentui/react/lib-commonjs'

initializeIcons();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
