import { useContext } from 'react'

import {
  Avatar,
  Button,
  ButtonProps,
  LoginButton,
  MigrationDialog,
  SignUpButton,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import IMAGE_STEP_1 from '@/public/static/images/migration-step-1.svg'
import IMAGE_STEP_2 from '@/public/static/images/migration-step-2.svg'
import IMAGE_STEP_3 from '@/public/static/images/migration-step-3.svg'

import styles from './styles.css'

const texts: {
  zh_hant: Record<string, string>
  zh_hans: Record<string, string>
  en: Record<string, string>
} = {
  zh_hant: {
    header: '三個步驟，立即搬家',
    title_1: '登入帳戶',
    content_1_1: '註冊或登入你的 Matters 帳戶，',
    content_1_2: '開啟你的個人創作空間站。',
    sub_content_1_1: '還不是 Matters 創作者？',
    sub_content_1_2: '馬上入駐 →',
    title_2: '預備檔案',
    content_2_1: '前往 Medium 設定頁下載檔案，',
    content_2_2: '打開 posts 文件夾並找到 HTML 格式的作品文件。',
    sub_content_2_1: '下載檔案',
    title_3: '匯入作品',
    content_3_1: '選中想要搬家的作品檔案並上傳，',
    content_3_2: '搬家成功的作品會匯入你的草稿箱。',
  },
  zh_hans: {
    header: '三个步骤，立即搬家',
    title_1: '登陆帐户',
    content_1_1: '注册或登入你的 Matters 帐户，',
    content_1_2: '开启你的个人创作空间站。',
    sub_content_1_1: '还不是 Matters 创作者？',
    sub_content_1_2: '马上入驻 →',
    title_2: '准备文档',
    content_2_1: '前往 Medium 设置页下载文档，',
    content_2_2: '找到 posts 文件夹並找到 HTML 格式的作品文件。',
    sub_content_2_1: '下载文档',
    title_3: '导入作品',
    content_3_1: '选中想要搬家的作品文件并上传，',
    content_3_2: '搬家成功的作品会导入你的草稿箱。',
  },
  en: {
    header: 'Three steps, migrate now',
    title_1: 'Login',
    content_1_1: 'Register or login to your Matters account, ',
    content_1_2: 'open your personal creative space.',
    sub_content_1_1: 'Not Matters creator yet?',
    sub_content_1_2: 'Move in now →',
    title_2: 'Prepare documents',
    content_2_1: `Go to Medium setting page to download documents, `,
    content_2_2: `and locate HTML files under "posts" directory.`,
    sub_content_2_1: 'Dowload documents',
    title_3: 'Import works',
    content_3_1: 'Choose and upload the works you want to migrate, ',
    content_3_2: 'and it will appear in your draft box.',
  },
}

const Step = ({
  children,
  src,
  step,
}: {
  children: React.ReactNode
  src: string
  step: number
}) => {
  const { zh_hant, zh_hans, en } = texts
  const titleId = `title_${step}`
  const contentId1 = `content_${step}_1`
  const contentId2 = `content_${step}_2`

  return (
    <section className="step">
      <img src={src} />
      <p className="title">
        <span className="number">{step}.</span>
        <Translate
          zh_hant={zh_hant[titleId]}
          zh_hans={zh_hans[titleId]}
          en={en[titleId]}
        />
      </p>
      <p className="content">
        <Translate
          zh_hant={zh_hant[contentId1]}
          zh_hans={zh_hans[contentId1]}
          en={en[contentId1]}
        />
        <br />
        <Translate
          zh_hant={zh_hant[contentId2]}
          zh_hans={zh_hans[contentId2]}
          en={en[contentId2]}
        />
      </p>
      {children}
      <style jsx>{styles}</style>
    </section>
  )
}

const Steps = () => {
  const viewer = useContext(ViewerContext)
  const { zh_hant, zh_hans, en } = texts

  const buttonProps: ButtonProps = {
    size: ['7rem', '2.5rem'],
    spacing: [0, 0],
  }

  return (
    <section id="steps" className="steps">
      <div className="l-container">
        <div className="l-row">
          <div className="l-col-full">
            <h2>
              <Translate
                zh_hant={zh_hant.header}
                zh_hans={zh_hans.header}
                en={en.header}
              />
            </h2>
          </div>
        </div>
      </div>

      <div className="l-container">
        <div className="l-row">
          <Step src={IMAGE_STEP_1} step={1}>
            {viewer.isAuthed ? (
              <section className="avatar">
                <Avatar
                  size="lg"
                  user={viewer.isInactive ? undefined : viewer}
                />
                <section className="info">
                  <span className="username">{viewer.displayName}</span>
                </section>
              </section>
            ) : (
              <>
                <LoginButton
                  bgColor="green"
                  iconSize="md"
                  size={['7rem', '2.5rem']}
                  spacing={[0, 0]}
                />
                <p className="sub-content">
                  <Translate
                    zh_hant={zh_hant.sub_content_1_1}
                    zh_hans={zh_hans.sub_content_1_1}
                    en={en.sub_content_1_1}
                  />
                </p>
                <section className="sub-content-link">
                  <SignUpButton isPlain>
                    <Translate
                      zh_hant={zh_hant.sub_content_1_2}
                      zh_hans={zh_hans.sub_content_1_2}
                      en={en.sub_content_1_2}
                    />
                  </SignUpButton>
                </section>
              </>
            )}
          </Step>

          <Step src={IMAGE_STEP_2} step={2}>
            <Button
              aria-haspopup="false"
              borderColor="green"
              htmlHref="https://medium.com/me/export"
              htmlTarget="_blank"
              rel="noopener"
              {...buttonProps}
            >
              <TextIcon color="green" size="md" weight="md">
                <Translate
                  zh_hant={zh_hant.sub_content_2_1}
                  zh_hans={zh_hans.sub_content_2_1}
                  en={en.sub_content_2_1}
                />
              </TextIcon>
            </Button>
          </Step>

          <Step src={IMAGE_STEP_3} step={3}>
            <MigrationDialog>
              {({ open }) => (
                <Button
                  aria-haspopup="true"
                  bgColor="green"
                  size={['7rem', '2.5rem']}
                  spacing={[0, 0]}
                  onClick={open}
                >
                  <TextIcon color="white" size="md" weight="md">
                    <Translate
                      zh_hant={zh_hant.title_3}
                      zh_hans={zh_hans.title_3}
                      en={en.title_3}
                    />
                  </TextIcon>
                </Button>
              )}
            </MigrationDialog>
          </Step>
        </div>
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Steps
