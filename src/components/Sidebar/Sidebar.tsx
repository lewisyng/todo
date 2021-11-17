import cs from "classnames";
import styles from "./Sidebar.module.sass"

export type SidebarProps = {
    children?: React.ReactNode;
    className?: string;
}

export const Sidebar = (props:SidebarProps) => {
    const { className } = props;
    return (
        <div className={cs(className, styles.sidebar)}>

        </div>
    )
}

export default Sidebar