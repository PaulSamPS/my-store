import { TopPageComponentProps } from "./TopPageComponent.props"
import {Advantages, H, HhData, P, Tag} from "../../components"
import { TopLevelCategory } from "../../interfaces/page.interface"
import styles from './TopPageComponent.module.scss'

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {

    const productLength = products && <Tag color={ "grey" } size={ 'm' }>{ products.length }</Tag>

    const Hh = firstCategory == TopLevelCategory.Courses && page.hh && <HhData { ...page.hh } />

    const advantages = page.advantages && page.advantages.length > 0 &&
        <>
            <H tag={ 'h2' }>Преимущества</H>
            <Advantages advantages={ page.advantages } />
        </>

    const seo = page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }}/>

    const tags = page.tags.map(t => <Tag color={ 'primary' }>{ t }</Tag>)


    return (
       <div className={ styles.wrapper }>
           <div className={ styles.title }>
               <H tag={ 'h1' }>{ page.title }</H>
               { productLength }
               <span>Sort</span>
           </div>
           <div>
               { products && products.map(p => (<div key={ p._id }>{ p.title }</div>)) }
           </div>
           <div className={ styles.hhTitle }>
               <H tag={ 'h2' }>Вакансии - { page.category }</H>
               <Tag color={ "red" } size={ 'm' }>hh.ru</Tag>
           </div>
           { Hh }
           { advantages }
           { seo }
           <H tag={ 'h2' }>Получаемые навыки</H>
           { tags }
       </div>
    )
}