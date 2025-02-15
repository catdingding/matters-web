import { DialogContent, DialogOverlay } from '@reach/dialog'
import classNames from 'classnames'
import _get from 'lodash/get'
import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring/web'
import { useDrag } from 'react-use-gesture'

import { useOutsideClick, useResponsive } from '~/components'

import { KEYCODES } from '~/common/enums'

import Handle from './Handle'
import Overlay from './Overlay'
import styles from './styles.css'
import globalStyles from './styles.global.css'

export interface DialogOverlayProps {
  isOpen: boolean | undefined
  onDismiss: () => void
  onRest?: () => void
}

export type DialogProps = {
  size?: 'sm' | 'lg'
  fixedHeight?: boolean
  slideIn?: boolean
} & DialogOverlayProps

const Container: React.FC<
  {
    style?: React.CSSProperties
    setDragGoal: (val: any) => void
  } & DialogProps
> = ({ size = 'lg', fixedHeight, onDismiss, children, style, setDragGoal }) => {
  const isSmallUp = useResponsive('sm-up')
  const node: React.RefObject<any> | null = useRef(null)

  const containerClasses = classNames({
    container: true,
    'fixed-height': !!fixedHeight,
    [size]: true,
  })

  const bind = useDrag(({ down, movement: [, my] }) => {
    if (!down && my > 30) {
      onDismiss()
    } else {
      setDragGoal({ top: down ? Math.max(my, -30) : 0 })
    }
  })

  useOutsideClick(node, onDismiss)

  return (
    <div className="l-row">
      <div
        ref={node}
        className={containerClasses}
        style={style}
        onKeyDown={(event) => {
          if (event.keyCode === KEYCODES.escape) {
            onDismiss()
          }
        }}
      >
        {children}

        {!isSmallUp && <Handle close={onDismiss} {...bind()} />}

        <style jsx>{styles}</style>
      </div>
    </div>
  )
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { isOpen, onRest, slideIn } = props
  const [mounted, setMounted] = useState(isOpen)
  const isSmallUp = useResponsive('sm-up')

  // Drag
  const [{ top }, setDragGoal] = useSpring(() => ({ top: 0 }))

  // Fade In/ Fade Out
  const [{ opacity, transform }, setFade] = useSpring<{
    opacity: number
    transform: string
  }>(() => ({
    opacity: 0,
    transform: 'translateY(100%)',
    config: { tension: 270, friction: isSmallUp ? undefined : 30 },
    onRest: (val: any) => {
      const isFadedOut = _get(val, 'value.opacity') <= 0

      if (isFadedOut) {
        setMounted(false)
        setDragGoal({ top: 0 })
      }

      if (onRest) {
        onRest()
      }
    },
  }))

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setFade({ opacity: 1, transform: 'translateY(0%)' })
    } else {
      setFade({ opacity: 0, transform: 'translateY(100%)' })
    }
  })

  const AnimatedDialogOverlay = animated(DialogOverlay)
  const AnimatedContainer = animated(Container)
  const AnimatedOverlay = animated(Overlay)

  if (!mounted) {
    return null
  }

  return (
    <>
      <AnimatedDialogOverlay className="dialog">
        <AnimatedOverlay style={{ opacity: opacity as any }} />

        <DialogContent
          className="l-container full"
          aria-labelledby="dialog-title"
        >
          <AnimatedContainer
            style={{
              transform: !isSmallUp && slideIn ? transform : undefined,
              opacity: isSmallUp || !slideIn ? (opacity as any) : undefined,
              top: !isSmallUp ? top : undefined,
            }}
            setDragGoal={setDragGoal}
            {...props}
          />
        </DialogContent>
      </AnimatedDialogOverlay>

      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default Dialog
