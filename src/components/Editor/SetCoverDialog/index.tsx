import { useEffect, useState } from 'react'

import { Dialog, Translate } from '~/components'

import Selector from './Selector'
import styles from './styles.css'
import Uploader, { UploadEntity } from './Uploader'

import { Asset } from '~/components/GQL/fragments/__generated__/Asset'

export type BaseSetCoverDialogProps = {
  cover?: string
  assets: Asset[]

  onEdit: (asset?: Asset) => any
  refetchAssets: () => any
  saving?: boolean
} & UploadEntity

type SetCoverDialogProps = BaseSetCoverDialogProps & {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseSetCoverDialog = ({
  cover,
  assets,

  onEdit,
  saving,

  children,

  ...uploadEntity
}: SetCoverDialogProps) => {
  // dialog
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  // cover
  const filter = (ast: Asset) => ast.path === cover
  const [selected, setSelected] = useState(assets.find(filter))
  const onSave = async () => {
    const result = await onEdit(selected)
    // set selected cover if fallback cover specified by server
    if (cover && cover === result.data?.putDraft?.cover && !selected) {
      setSelected(assets.find(filter))
    }
    close()
  }

  useEffect(() => {
    setSelected(assets.find(filter))
  }, [cover])

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="setCover"
          close={close}
          closeTextId="close"
          rightButton={
            <Dialog.Header.RightButton
              onClick={onSave}
              text={<Translate id="save" />}
              loading={saving}
            />
          }
        />

        <Dialog.Content hasGrow>
          <section className="container">
            {/* Uploader */}
            <Uploader setSelected={setSelected} {...uploadEntity} />

            {/* Selector */}
            {assets.length > 0 && (
              <Selector
                assets={assets}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <style jsx>{styles}</style>
          </section>
        </Dialog.Content>
      </Dialog>
    </>
  )
}

const SetCoverDialog = (props: SetCoverDialogProps) => (
  <Dialog.Lazy mounted={<BaseSetCoverDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default SetCoverDialog
