import { ProductProps } from "./Product.props"
import styles from './Product.module.scss'
import cn from 'classnames'


export const Product = ({ product, children, className, ...props }: ProductProps): JSX.Element => {
    return (
        <div>
            { product.title }
        </div>
    )
}