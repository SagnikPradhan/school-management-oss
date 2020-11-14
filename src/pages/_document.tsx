import React from "react"
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext 
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps( ctx )
    return { ...initialProps }
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta name="title" content="School Management" />
          <meta name="description" content="Simple school management in matter of  some clicks. Dashboard for students, teachers and school admins." />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://school-management-oss.vercel.app/" />
          <meta property="og:title" content="School Management" />
          <meta property="og:description" content="Simple school management in matter of  some clicks. Dashboard for students, teachers and school admins." />

          <meta property="twitter:url" content="https://school-management-oss.vercel.app/" />
          <meta property="twitter:title" content="School Management" />
          <meta property="twitter:description" content="Simple school management in matter of  some clicks. Dashboard for students, teachers and school admins." />
        
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet" /> 
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
