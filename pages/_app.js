import '../styles/globals.css'
import { CardProvider } from './productList/CardList'

function MyApp({ Component, pageProps }) {
  return (
    <CardProvider>
      <Component {...pageProps} />
    </CardProvider>
  
  )
}

export default MyApp
