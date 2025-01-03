import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Oleo+Script:wght@400;700&display=swap" rel="stylesheet" /> */}
        <link href="https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
