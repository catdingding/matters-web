import gql from 'graphql-tag'
import { createContext, useContext, useState } from 'react'

import { Translate, useMutation, ViewerContext } from '~/components'

import { ADD_TOAST, DEFAULT_LANG } from '~/common/enums'
import { langConvert } from '~/common/utils'

import { UpdateLanguage } from './__generated__/UpdateLanguage'

const UPDATE_VIEWER_LANGUAGE = gql`
  mutation UpdateLanguage($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      settings {
        language
      }
    }
  }
`

export const LanguageContext = createContext(
  {} as {
    lang: Language
    setLang: (lang: Language) => void
  }
)

export const LanguageConsumer = LanguageContext.Consumer

export const LanguageProvider = ({
  children,
  defaultLang = DEFAULT_LANG,
}: {
  children: React.ReactNode
  defaultLang?: Language
}) => {
  const [updateLanguage] = useMutation<UpdateLanguage>(UPDATE_VIEWER_LANGUAGE)
  const viewer = useContext(ViewerContext)

  let viewerLanguage = viewer?.settings?.language

  // set language preference from browser for visitors
  if (
    (!viewer || !viewer.id) &&
    process.browser &&
    navigator &&
    navigator.language
  ) {
    viewerLanguage = langConvert.bcp472sys(navigator.language)
  }

  const [lang, setLang] = useState<Language>(viewerLanguage || defaultLang)

  return (
    <LanguageContext.Provider
      value={{
        lang: viewerLanguage || lang,
        setLang: async (targetLang) => {
          if (viewer.isAuthed) {
            try {
              await updateLanguage({
                variables: { input: { language: targetLang } },
                optimisticResponse: {
                  updateUserInfo: {
                    id: viewer.id,
                    settings: {
                      language: targetLang as any,
                      __typename: 'UserSettings',
                    },
                    __typename: 'User',
                  },
                },
              })

              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'green',
                    content: (
                      <Translate
                        zh_hant="介面語言已修改"
                        zh_hans="界面语言已修改"
                        en="Language changed"
                      />
                    ),
                  },
                })
              )
            } catch (e) {
              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'red',
                    content: <Translate id="failureChange" />,
                  },
                })
              )
            }
          }

          setLang(targetLang)

          if (process.browser) {
            document.documentElement.setAttribute(
              'lang',
              langConvert.sys2html(targetLang)
            )
          }
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
