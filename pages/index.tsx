import { Button, HTag } from "../components"


export default function Home(): JSX.Element {
  return (
    <>
      <HTag tag='h1'>Текст</HTag>
        <Button appearance={'primary'} arrow={'right'}>Узнать подробнее</Button>
        <Button appearance={'ghost'} arrow={'down'}>Читать отзывы</Button>
    </>
  )
}
