import gql from 'graphql-tag'

import { Icon, TextIcon } from '~/components'
import { useMutation } from '~/components/GQL'
import {
  UNVOTE_COMMENT,
  VOTE_COMMENT
} from '~/components/GQL/mutations/voteComment'

import { numAbbr } from '~/common/utils'

import { UnvoteComment } from '~/components/GQL/mutations/__generated__/UnvoteComment'
import { VoteComment } from '~/components/GQL/mutations/__generated__/VoteComment'
import { UpvoteComment } from './__generated__/UpvoteComment'

const fragments = {
  comment: gql`
    fragment UpvoteComment on Comment {
      id
      upvotes
      downvotes
      myVote
    }
  `
}

const UpvoteButton = ({
  comment,
  onClick,
  disabled
}: {
  comment: UpvoteComment
  onClick?: () => any
  disabled?: boolean
}) => {
  const [unvote] = useMutation<UnvoteComment>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes - 1,
        downvotes: comment.downvotes,
        myVote: null,
        __typename: 'Comment'
      }
    }
  })
  const [upvote] = useMutation<VoteComment>(VOTE_COMMENT, {
    variables: { id: comment.id, vote: 'up' },
    optimisticResponse: {
      voteComment: {
        id: comment.id,
        upvotes: comment.upvotes + 1,
        downvotes:
          comment.myVote === 'down' ? comment.downvotes - 1 : comment.downvotes,
        myVote: 'up' as any,
        __typename: 'Comment'
      }
    }
  })

  if (comment.myVote === 'up') {
    return (
      <button
        type="button"
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
      >
        <TextIcon
          icon={<Icon.UpVoteActive />}
          color="green"
          weight="md"
          spacing="xxtight"
        >
          {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
        </TextIcon>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick ? onClick() : upvote()
      }}
      disabled={disabled}
    >
      <TextIcon
        icon={<Icon.UpVote color="grey" />}
        color="grey"
        weight="md"
        spacing="xxtight"
      >
        {comment.upvotes > 0 ? numAbbr(comment.upvotes) : undefined}
      </TextIcon>
    </button>
  )
}

UpvoteButton.fragments = fragments

export default UpvoteButton