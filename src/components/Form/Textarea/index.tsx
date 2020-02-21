import Field, { FieldProps } from '../Field'
import styles from './styles.css'

/**
 * Pure UI component for <textarea> element
 *
 * Usage:
 *
 * ```jsx
 *   <Form.Textarea
 *     type="email"
 *     error="xxx"
 *     hint="xxx"
 *     ...other <textarea> props...
 *   />
 * ```
 *
 */
type TextareaProps = {
  name: string
} & FieldProps &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  extraButton,

  hint,
  error,

  ...textareaProps
}) => {
  return (
    <Field>
      <Field.Header label={label} htmlFor={name} extraButton={extraButton} />

      <Field.Content>
        <textarea {...textareaProps} id={name} name={name} />
      </Field.Content>

      <Field.Footer hint={hint} error={error} />

      <style jsx>{styles}</style>
    </Field>
  )
}

export default Textarea
