import { Html, Head, Main, NextScript } from 'next/document'
import i18nextConfig from '../next-i18next.config'
import CustomHead from '../components/head'

export default function Document(props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ??
    i18nextConfig.i18n.defaultLocale
  return (
    <Html lang={currentLocale}>
      <Head>
        <title>Kashmir HomeStays – Where good ideas find you. </title>
        <link href="/css/style.css" rel="stylesheet" />
        <link
          lazyload="lazyload"
          loading="lazy"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap')
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
        <CustomHead/>

      </body>
    </Html>
  )
}