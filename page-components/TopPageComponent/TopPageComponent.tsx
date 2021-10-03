import {TopPageComponentProps} from "./TopPageComponent.props"
import {Advantages, H, HhData, Sort, Tag} from "../../components"
import {TopLevelCategory} from "../../interfaces/page.interface"
import styles from './TopPageComponent.module.scss'
import {SortEnum} from "../../components/Sort/Sort.props";
import {useReducer} from "react";
import {sortReducer} from "./sort.reducer";

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating })

    const setSort = (sort: SortEnum) => {
        dispathSort({ type: sort})
    }

    return (
       <div className={ styles.wrapper }>
           <div className={ styles.title }>
               <H tag={ 'h1' }>{ page.title }</H>
               { products && <Tag color={ "grey" } size={ 'm' }>{ products.length }</Tag> }
               <Sort sort={ sort } setSort={ setSort } />
           </div>
           <div>
               { sortedProducts && sortedProducts.map(p => (<div key={ p._id }>{ p.title }</div>)) }
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
           { page.tags.map(t => <Tag color={ 'primary' }>{ t }</Tag>) }
       </div>
    )
}