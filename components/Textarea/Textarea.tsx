import { TextareaProps } from "./Textarea.props"
import { ForwardedRef, forwardRef } from "react"
import styles from './Textarea.module.scss'
import cn from 'classnames'


export const Textarea = forwardRef(({ className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
        <textarea ref={ ref } className={cn(className, styles.textArea)} { ...props } />
    )
})