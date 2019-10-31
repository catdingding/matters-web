import * as Sentry from '@sentry/browser'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import App from 'next/app'
import getConfig from 'next/config'
import React from 'react'
import { ApolloProvider } from 'react-apollo'

import {
  AnalyticsProvider,
  GlobalStyles,
  LanguageProvider,
  Layout,
  ModalProvider
} from '~/components'
import ErrorBoundary from '~/components/ErrorBoundary'

import withApollo from '~/common/utils/withApollo'

// start Sentry
const {
  publicRuntimeConfig: { SENTRY_DSN }
} = getConfig()

Sentry.init({ dsn: SENTRY_DSN || '' })

class MattersApp extends App<{ apollo: ApolloClient<InMemoryCache> }> {
  render() {
    const { Component, pageProps, apollo } = this.props

    return (
      <ErrorBoundary>
        <ApolloProvider client={apollo}>
          <LanguageProvider>
            <AnalyticsProvider>
              <ModalProvider>
                <GlobalStyles />

                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ModalProvider>
            </AnalyticsProvider>
          </LanguageProvider>
        </ApolloProvider>
      </ErrorBoundary>
    )
  }
}

export default withApollo(MattersApp)
