import {Button, H, Input, P, Rating, Tag, Textarea} from "../components"
import { useState } from "react"
import { withLayout } from "../layout/Layout"
import { GetStaticProps } from "next"
import { MenuItem } from "../interfaces/menu.interface"
import { API } from "../helpers/api"
import axios from "axios"


function Home({ menu }: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4)
    return (
        <>
            <H tag='h1'>Текст</H>
            <Button appearance={'primary'} arrow={'right'}>Узнать подробнее</Button>
            <Button appearance={'ghost'} arrow={'right'}>Читать отзывы</Button>
            <P size={'s'}>Маленький</P>
            <P>Средний</P>
            <P size={'l'}>Большой</P>
            <Tag color={"red"} size={'s'}>Red</Tag>
            <Tag color={"grey"} size={'s'}>Grey</Tag>
            <Tag color={"ghost"} size={'s'}>Ghost</Tag>
            <Tag color={"primary"} size={'s'}>Primary</Tag>
            <Tag color={"green"}>Green</Tag>
            <Rating rating={rating} isEditable setRating={setRating} />
            <Input placeholder='bvsa'/>
            <Textarea placeholder='dsfgsdg'/>
        </>
    )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find,{
        firstCategory
    })
    return {
        props: {
            menu,
            firstCategory
        }
    }
}

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[],
    firstCategory: number
}
