import { Dialog, Translate, useDialogSwitch, useMutation } from '~/components'
import TOGGLE_BLOCK_USER from '~/components/GQL/mutations/toggleBlockUser'

import { ADD_TOAST } from '~/common/enums'

import ViewBlocksButton from './ViewBlocksButton'

import { ToggleBlockUser } from '~/components/GQL/mutations/__generated__/ToggleBlockUser'
import { BlockUserPrivate } from '../__generated__/BlockUserPrivate'
import { BlockUserPublic } from '../__generated__/BlockUserPublic'

interface BlockUserDialogProps {
  user: BlockUserPublic & Partial<BlockUserPrivate>
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BlockUserDialog = ({ user, children }: BlockUserDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  const [blockUser] = useMutation<ToggleBlockUser>(TOGGLE_BLOCK_USER, {
    variables: { id: user.id, enabled: true },
    optimisticResponse: {
      toggleBlockUser: {
        id: user.id,
        isBlocked: true,
        __typename: 'User',
      },
    },
  })

  const onBlock = async () => {
    await blockUser()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate id="successBlock" />,
          customButton: <ViewBlocksButton />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <Dialog.Header title="blockUser" close={close} mode="inner" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant={`封鎖之後，${user.displayName} 將無法評論、關聯你的作品，不能 @ 你，並且不能加入你的圍爐。你可以在設置裏管理你的封鎖用戶列表。`}
              zh_hans={`封锁之后，${user.displayName} 将无法评论、关联你的作品，不能 @ 你，并且不能加入你的围炉。你可以在设置里管理你的封锁用户列表。`}
              en={`${user.displayName} won't be able to comment and collect your article. Besides, he or she can't @ you and subscribe your circle. You can manage blocked list in settings.`}
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onBlock()
              close()
            }}
          >
            <Translate id="block" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyBlockUserDialog = (props: BlockUserDialogProps) => (
  <Dialog.Lazy mounted={<BlockUserDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyBlockUserDialog
