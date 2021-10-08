import { TopPageComponentProps } from "./TopPageComponent.props"
import { Advantages, H, HhData, Product, Sort, Tag } from "../../components"
import { TopLevelCategory } from "../../interfaces/page.interface"
import { SortEnum } from "../../components/Sort/Sort.props"
import { useEffect, useReducer } from "react"
import { sortReducer } from "./sort.reducer"
import { useScrollY } from "../../hooks/useScroll"
import styles from './TopPageComponent.module.scss'

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating })

    const y = useScrollY()

    const setSort = (sort: SortEnum) => {
        dispathSort({ type: sort})
    }

    useEffect(() => {
        dispathSort({ type: 'reset', initialState: products })
    },[products])

    return (
       <div className={ styles.wrapper }>
           <div className={ styles.title }>
               <H tag={ 'h1' }>{ page.title }</H>
               { products && <Tag key={ products.length } color={ "grey" } size={ 'm' }>{ products.length }</Tag> }
               <Sort sort={ sort } setSort={ setSort } />
           </div>
           <div>
               { sortedProducts && sortedProducts.map(p => (<Product layout key={ p._id } product={ p } />)) }
           </div>
           <div className={ styles.hhTitle }>
               <H tag={ 'h2' }>Вакансии - { page.category }</H>
               <Tag color={ "red" } size={ 'm' }>hh.ru</Tag>
           </div>
           { firstCategory == TopLevelCategory.Courses && page.hh && <HhData { ...page.hh } /> }
           { page.advantages && page.advantages.length > 0 &&
           <>
               <H tag={ 'h2' }>Преимущества</H>
               <Advantages advantages={ page.advantages } />
           </> }
           { page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }}/> }
           <H tag={ 'h2' }>Получаемые навыки</H>
           { page.tags.map(t => <Tag key={ t } color={ 'primary' }>{ t }</Tag>) }
       </div>
    )
}