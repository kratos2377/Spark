import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import Layout from "../components/Layout"
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
      import("bootstrap/dist/js/bootstrap")
  } , [])
  return (
    <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}
