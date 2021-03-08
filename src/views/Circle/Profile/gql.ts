import gql from 'graphql-tag'

import { CircleAvatar } from '~/components'

import SubscriptionBanner from '../SubscriptionBanner'
import AuthorWidget from './AuthorWidget'
import DropdownActions from './DropdownActions'
import FollowButton from './FollowButton'

const fragments = {
  circle: {
    public: gql`
      fragment ProfileCirclePublic on Circle {
        id
        name
        displayName
        description
        cover
        owner {
          id
        }
        isMember
        members(input: { first: 0 }) {
          totalCount
        }
        followers(input: { first: 0 }) {
          totalCount
        }
        ...AvatarCircle
        ...AuthorWidgetCircle
        ...FollowButtonCirclePrivate
        ...DropdownActionsCirclePublic
        ...DropdownActionsCirclePrivate
        ...SubscriptionBannerCirclePublic
        ...SubscriptionBannerCirclePrivate
      }
      ${CircleAvatar.fragments.circle}
      ${AuthorWidget.fragments.circle}
      ${FollowButton.fragments.circle.private}
      ${DropdownActions.fragments.circle.public}
      ${DropdownActions.fragments.circle.private}
      ${SubscriptionBanner.fragments.circle.public}
      ${SubscriptionBanner.fragments.circle.private}
    `,
    private: gql`
      fragment ProfileCirclePrivate on Circle {
        id
        owner {
          id
        }
        isMember
        ...FollowButtonCirclePrivate
        ...DropdownActionsCirclePrivate
        ...SubscriptionBannerCirclePrivate
      }
      ${FollowButton.fragments.circle.private}
      ${DropdownActions.fragments.circle.private}
      ${SubscriptionBanner.fragments.circle.private}
    `,
  },
}

export const CIRCLE_PROFILE_PUBLIC = gql`
  query CircleProfileCirclePublic($name: String!) {
    circle(input: { name: $name }) {
      id
      ...ProfileCirclePublic
      ...ProfileCirclePrivate
    }
  }
  ${fragments.circle.public}
  ${fragments.circle.private}
`

export const CIRCLE_PROFILE_PRIVATE = gql`
  query CircleProfileCirclePrivate($name: String!) {
    circle(input: { name: $name }) {
      id
      ...ProfileCirclePrivate
    }
  }
  ${fragments.circle.private}
`
