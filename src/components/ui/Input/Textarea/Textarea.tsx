import styles from './Textarea.module.css';
import { TextareaProps } from './Textarea.types';
import cs from 'classnames';

export const Textarea = ({
    className,
    rows = 5,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder = 'Your input here...',
}: TextareaProps) => {
    return (
        <textarea
            className={cs(className, styles.textarea)}
            rows={rows}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
        />
    );
};
