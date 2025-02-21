import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='application-name' content='OpenWeather Now' />
        <meta name='description' content='OpenWeather Now' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#000' />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icon-32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icon-16.png' />
        <link rel='shortcut icon' href='/favicon.ico' />

        <link rel='manifest' href='/manifest.json' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
