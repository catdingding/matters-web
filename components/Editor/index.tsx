import _debounce from 'lodash/debounce'
import React from 'react'
import ReactQuill, { Quill } from 'react-quill'

import { LanguageConsumer } from '~/components/Language'

import { translate } from '~/common/utils'

import { EditorDraft } from './__generated__/EditorDraft'
import blots from './blots'
import * as config from './config'
import contentStyles from './content.editor.css'
import bubbleStyles from './quill.bubble.css'
import SideToolbar from './SideToolbar'
import styles from './styles.css'

interface Props {
  onSave: any
  draft: EditorDraft
}

interface State {
  content: string
  sideToolbar: {
    show: boolean
    top: number
  }
}

/**
 * Register Custom Blots
 */
blots.register()

class Editor extends React.Component<Props, State> {
  private quill: Quill | null = null
  private reactQuillRef = React.createRef<ReactQuill>()

  constructor(props: Props) {
    super(props)

    this.state = {
      content: this.props.draft.content || '',
      sideToolbar: {
        show: false,
        top: 0
      }
    }

    this.saveDraft = _debounce(this.saveDraft.bind(this), 3000)
  }

  public componentDidMount() {
    this.attachQuillRefs()
    this.resetLinkInputPlaceholder()
  }

  // public componentDidUpdate() {
  //   this.attachQuillRefs()
  // }

  public attachQuillRefs = () => {
    if (
      !this.reactQuillRef ||
      !this.reactQuillRef.current ||
      typeof this.reactQuillRef.current.getEditor !== 'function'
    ) {
      return
    }
    this.quill = this.reactQuillRef.current.getEditor()
  }

  /**
   * https://github.com/quilljs/quill/issues/1107#issuecomment-259938173
   */
  public resetLinkInputPlaceholder = () => {
    if (!this.quill) {
      return
    }

    try {
      // @ts-ignore
      const input = this.quill.theme.tooltip.root.querySelector(
        'input[data-link]'
      )
      input.dataset.link = '輸入連結地址' // TODO: i18n
    } catch (e) {
      //
    }
  }

  public saveDraft() {
    console.log('saveDarft', new Date())
    // TODO: skip if same content as before saved
    this.props.onSave({ content: this.state.content })
  }

  public handleChange = (content: string) => {
    this.setState({ content }, this.saveDraft)
  }

  public handleOnChangeSelection = (
    range: {
      index: number
      length: number
    },
    source: string,
    editor: any
  ) => {
    if (!range) {
      return
    }

    const bounds = editor.getBounds(range)
    const nextChar = editor.getText(range.index, 1).replace(/\s/, '')
    const isNewLine = bounds.left === 0 && !nextChar

    // hide sideToolbar
    if (!isNewLine && this.state.sideToolbar.show) {
      this.setState({
        sideToolbar: { show: false, top: bounds.top || 0 }
      })
    }

    // show sideToolbar
    if (isNewLine) {
      this.setState({ sideToolbar: { show: true, top: bounds.top } })
    }
  }

  public render() {
    const { draft, onSave } = this.props
    const isReadOnly = draft.publishState !== 'unpublished'

    return (
      <>
        <LanguageConsumer>
          {({ lang }) => (
            <div className="container">
              <ReactQuill
                readOnly={isReadOnly}
                theme="bubble"
                modules={config.modules}
                formats={config.formats}
                ref={this.reactQuillRef}
                value={this.state.content}
                placeholder={translate({
                  zh_hant: '請輸入正文…',
                  zh_hans: '请输入正文…',
                  lang
                })}
                onChange={this.handleChange}
                onChangeSelection={this.handleOnChangeSelection}
                onFocus={(...props) => console.log('onFocus', props)}
                onBlur={this.saveDraft}
              />
              <SideToolbar
                {...this.state.sideToolbar}
                quill={this.quill}
                onSave={onSave}
              />
            </div>
          )}
        </LanguageConsumer>

        <style jsx>{styles}</style>
        <style jsx global>
          {bubbleStyles}
        </style>
        <style jsx global>
          {contentStyles}
        </style>
      </>
    )
  }
}

export default Editor