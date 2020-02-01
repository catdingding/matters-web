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
import { DownvoteComment } from './__generated__/DownvoteComment'

const fragments = {
  comment: gql`
    fragment DownvoteComment on Comment {
      id
      upvotes
      downvotes
      myVote
    }
  `
}

const DownvoteButton = ({
  comment,
  onClick,
  disabled
}: {
  comment: DownvoteComment
  onClick?: () => any
  disabled?: boolean
}) => {
  const [unvote] = useMutation<UnvoteComment>(UNVOTE_COMMENT, {
    variables: { id: comment.id },
    optimisticResponse: {
      unvoteComment: {
        id: comment.id,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes - 1,
        myVote: null,
        __typename: 'Comment'
      }
    }
  })
  const [downvote] = useMutation<VoteComment>(VOTE_COMMENT, {
    variables: { id: comment.id, vote: 'down' },
    optimisticResponse: {
      voteComment: {
        id: comment.id,
        upvotes:
          comment.myVote === 'up' ? comment.upvotes - 1 : comment.upvotes,
        downvotes: comment.downvotes + 1,
        myVote: 'down' as any,
        __typename: 'Comment'
      }
    }
  })

  if (comment.myVote === 'down') {
    return (
      <button
        type="button"
        onClick={() => {
          onClick ? onClick() : unvote()
        }}
        disabled={disabled}
      >
        <TextIcon
          icon={<Icon.DownVoteActive />}
          color="green"
          weight="md"
          spacing="xxtight"
        >
          {comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined}
        </TextIcon>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick ? onClick() : downvote()
      }}
      disabled={disabled}
    >
      <TextIcon
        icon={<Icon.DownVote color="grey" />}
        color="grey"
        weight="md"
        spacing="xxtight"
      >
        {comment.downvotes > 0 ? numAbbr(comment.downvotes) : undefined}
      </TextIcon>
    </button>
  )
}

DownvoteButton.fragments = fragments

export default DownvoteButton