import classNames from 'classnames'
import _uniq from 'lodash/uniq'

import { Translate } from '~/components'

import Collapsable from '../Collapsable'
import SearchTags from './SearchTags'
import styles from './styles.css'
import Tag from './Tag'

interface AddTagsProps {
  tags: string[]
  onAddTag: (tag: string) => void
  onDeleteTag: (tag: string) => void
  disabled?: boolean
}

const AddTags = ({ tags, onAddTag, onDeleteTag, disabled }: AddTagsProps) => {
  const hasTags = tags.length > 0
  const tagsContainerClasses = classNames({
    'tags-container': true,
    'u-area-disable': disabled,
  })

  return (
    <Collapsable title={<Translate id="tag" />} defaultCollapsed={!hasTags}>
      <p className="tags-intro">
        <Translate
          zh_hant="通過添加標籤幫助讀者更好地找到你的作品。如果沒有合適的標籤，你可以創建新的。"
          zh_hans="通过添加标签帮助读者更好地找到你的作品。如果没有合适的标签，你可以创建新的。"
        />
      </p>

      <section className={tagsContainerClasses}>
        {tags.map((tag) => (
          <Tag tag={tag} deleteTag={onDeleteTag} key={tag} />
        ))}

        <SearchTags addTag={onAddTag} />
      </section>

      <style jsx>{styles}</style>
    </Collapsable>
  )
}

export default AddTags