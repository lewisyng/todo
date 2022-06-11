import { TextField } from '@mui/material';
import styles from './Input.module.sass';
import cs from 'classnames';

export const Input = ({
    type,
    label,
    value,
    onChange,
    onBlur,
    autoFocus,
    className,
}: {
    type: string;
    label?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onBlur?: () => void;
    autoFocus?: boolean;
    className?: string;
}) => {
    return type === 'text' ? (
        <TextField
            id="standard-basic"
            label={label}
            variant="standard"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoFocus={autoFocus}
            className={cs(className, styles.input)}
            fullWidth
        />
    ) : null;
};

export default Input;
