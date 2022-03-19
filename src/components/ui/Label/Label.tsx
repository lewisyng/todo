import styles from './Label.module.sass'
import cn from 'classnames'

export const Label = ({htmlFor, title, className}: {
    htmlFor?: string;
    title: string;
    className?: string;
}) => {
    return (
        <label htmlFor={htmlFor} className={cn(className, styles.label)}>{title}</label>
    )
}