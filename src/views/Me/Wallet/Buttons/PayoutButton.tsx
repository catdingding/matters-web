import { ButtonProps, Dialog, PayoutDialog, Translate } from '~/components'

type PayoutButtonProps = {
  hasStripeAccount: boolean
} & ButtonProps

const PayoutButton: React.FC<PayoutButtonProps> = ({
  hasStripeAccount,
  ...buttonProps
}) => {
  return (
    <PayoutDialog hasStripeAccount={hasStripeAccount}>
      {({ open: openPayoutDialog }) => (
        <Dialog.Footer.Button
          {...buttonProps}
          bgColor="grey-lighter"
          textColor="black"
          aria-haspopup="true"
          onClick={openPayoutDialog}
        >
          <Translate id="paymentPayout" />
        </Dialog.Footer.Button>
      )}
    </PayoutDialog>
  )
}

export default PayoutButton
