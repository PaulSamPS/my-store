import { InputProps } from "./Input.props"
import { ForwardedRef, forwardRef } from "react"
import styles from './Input.module.scss'
import cn from 'classnames'


export const Input = forwardRef(({ className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <input ref={ ref } className={cn(className, styles.input)} { ...props } />
    )
})