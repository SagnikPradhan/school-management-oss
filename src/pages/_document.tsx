import React from "react"
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from 'next/document'

class AppDocument extends Document {
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
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Open+Sans&display=swap" rel="stylesheet" /> 
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
