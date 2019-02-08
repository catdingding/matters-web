import App, { Container, NextAppContext } from 'next/app'
import React from 'react'

export default class CustomApp extends App {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  public render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
