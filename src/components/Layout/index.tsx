import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'

import { Head, OnboardingTasks, SearchBar, useRoute } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import FixedMain from './FixedMain'
import Header from './Header'
import NavBar from './NavBar'
import SideFooter from './SideFooter'
import SideNav from './SideNav'
import Spacing from './Spacing'
import styles from './styles.css'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

export const Layout: React.FC & {
  Main: typeof Main
  Header: typeof Header
  Spacing: typeof Spacing
  FixedMain: typeof FixedMain
} = ({ children }) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')

  return (
    <>
      <Head />

      <div className="l-container full">
        <main className="l-row">
          <nav role="navigation" className="l-col-three-left u-sm-down-hide">
            <SideNav />
          </nav>

          {children}
        </main>
      </div>

      {!isInDraftDetail && (
        <footer className="u-sm-up-hide">
          <NavBar />
        </footer>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

interface MainProps {
  aside?: React.ReactNode
  bgColor?: 'grey-lighter'
  inEditor?: boolean
}

const Main: React.FC<MainProps> = ({ aside, bgColor, inEditor, children }) => {
  const { isInPath, isPathStartWith } = useRoute()
  const isInSearch = isInPath('SEARCH')
  const isInArticleDetail = isInPath('ARTICLE_DETAIL')
  const isInCircle = isPathStartWith('/~', true)

  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const onboardingTasks = data?.clientPreference.onboardingTasks
  const showOnboardingTasks =
    !inEditor && !isInArticleDetail && !isInCircle && onboardingTasks?.enabled

  const articleClasses = classNames({
    'l-col-three-mid': true,
    [`bg-${bgColor}`]: !!bgColor,
    hasNavBar: !isInArticleDetail && !inEditor,
    hasOnboardingTasks: showOnboardingTasks,
  })
  const asideClasses = classNames({
    'l-col-three-right': true,
    'u-lg-down-hide': true,
    'in-editor': inEditor,
  })

  return (
    <>
      <article className={articleClasses}>
        {children}

        {showOnboardingTasks && (
          <section className="u-lg-up-hide">
            <OnboardingTasks.NavBar />
          </section>
        )}
      </article>

      <aside className={asideClasses}>
        {!isInSearch && !inEditor && (
          <section className="u-lg-down-hide">
            <SearchBar />
          </section>
        )}

        {showOnboardingTasks && (
          <section className="u-lg-down-hide">
            <OnboardingTasks.Widget />
          </section>
        )}

        {aside}

        {!inEditor && (
          <section className="u-lg-down-hide">
            <SideFooter />
          </section>
        )}
      </aside>

      <style jsx>{styles}</style>
    </>
  )
}

Layout.Main = Main
Layout.Header = Header
Layout.Spacing = Spacing
Layout.FixedMain = FixedMain
