import gql from 'graphql-tag'
import { useContext, useState } from 'react'

import {
  Dialog,
  LanguageContext,
  Spacer,
  Translate,
  useMutation,
} from '~/components'

import { ADD_TOAST, PAYOUT_COUNTRY } from '~/common/enums'
import { parseFormSubmitErrors, sleep } from '~/common/utils'

import CountryOption from './CountryOption'

import { ConnectStripeAccount } from './__generated__/ConnectStripeAccount'

interface Props {
  nextStep: () => void
  close: () => void
}

const CONNECT_STRIPE_ACCOUNT = gql`
  mutation ConnectStripeAccount($country: StripeAccountCountry!) {
    connectStripeAccount(input: { country: $country }) {
      redirectUrl
    }
  }
`

const Request: React.FC<Props> = ({ nextStep, close }) => {
  const { lang } = useContext(LanguageContext)
  const [country, setCountry] = useState<PAYOUT_COUNTRY>(
    PAYOUT_COUNTRY.HongKong
  )
  const [connectStripeAccount, { loading }] = useMutation<ConnectStripeAccount>(
    CONNECT_STRIPE_ACCOUNT
  )

  const request = async () => {
    try {
      const { data } = await connectStripeAccount({ variables: { country } })
      const redirectUrl = data?.connectStripeAccount.redirectUrl
      await sleep(1000)
      window.open(redirectUrl, '_blank')
      nextStep()
    } catch (error) {
      const [messages, codes] = parseFormSubmitErrors(error, lang)
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: messages[codes[0]],
          },
        })
      )
    }
  }

  return (
    <>
      <Dialog.Content hasGrow>
        <CountryOption country={country} onClick={setCountry} />
        <Spacer size="xxloose" />
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          onClick={request}
          disabled={loading}
          loading={loading}
        >
          <Translate id="nextStep" />
        </Dialog.Footer.Button>

        <Dialog.Footer.Button
          bgColor="grey-lighter"
          textColor="black"
          onClick={close}
        >
          <Translate id="cancel" />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </>
  )
}

export default Request
