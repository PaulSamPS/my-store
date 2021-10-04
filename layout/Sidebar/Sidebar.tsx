import { SidebarProps } from "./Sidebar.props"
import styles from './Sidebar.module.scss'
import cn from 'classnames'
import { Menu } from "../Menu/Menu"
import Logo from '../logo.svg'
import { Search } from "../../components"
import {useRouter} from "next/router";


export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
    const router = useRouter()

    const goToMain = () => {
        router.push({
            pathname: '/'
        })
    }

    return (
       <div className={cn(className, styles.sidebar)} { ...props }>
           <Logo
               className={styles.logo}
               onClick={ goToMain }
           />
           <Search />
            <Menu />
       </div>
    )
}