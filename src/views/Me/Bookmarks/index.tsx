import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ArticleDigestFeed,
  EmptyBookmark,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
} from '~/components'

import { mergeConnections } from '~/common/utils'

import { MeBookmarkFeed } from './__generated__/MeBookmarkFeed'

const ME_BOOKMARK_FEED = gql`
  query MeBookmarkFeed($after: String) {
    viewer {
      id
      subscriptions(input: { first: 10, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...ArticleDigestFeedArticlePublic
            ...ArticleDigestFeedArticlePrivate
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

const BaseMeBookmarks = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<MeBookmarkFeed>(
    ME_BOOKMARK_FEED
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.subscriptions'
  const { edges, pageInfo } = data?.viewer?.subscriptions || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyBookmark />
  }

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <InfiniteScroll
      hasNextPage={pageInfo.hasNextPage}
      loadMore={loadMore}
      pullToRefresh={refetch}
    >
      <List>
        {edges.map(({ node, cursor }) => (
          <List.Item key={cursor}>
            <ArticleDigestFeed article={node} />
          </List.Item>
        ))}
      </List>
    </InfiniteScroll>
  )
}

const MeBookmarks = () => (
  <Layout.Main>
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={<Layout.Header.Title id="myBookmarks" />}
    />

    <Head title={{ id: 'myBookmarks' }} />

    <BaseMeBookmarks />
  </Layout.Main>
)

export default MeBookmarks
