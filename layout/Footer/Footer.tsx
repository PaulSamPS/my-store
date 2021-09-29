import { FooterProps } from "./Footer.props"
import styles from './Footer.module.scss'
import cn from 'classnames'


export const Footer = ({ ...props }: FooterProps): JSX.Element => {
    return (
       <div { ...props }>
            Footer
       </div>
    )
}