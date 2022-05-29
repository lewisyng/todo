import { TextField } from '@mui/material';
import styles from './Input.module.sass';

export const Input = ({
    type,
    label,
    value,
    onChange,
    onBlur,
    autoFocus,
}: {
    type: string;
    label?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onBlur?: () => void;
    autoFocus?: boolean;
}) => {
    return type === 'text' ? (
        <TextField
            id="standard-basic"
            label={label}
            variant="standard"
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            className={styles.input}
            fullWidth
        />
    ) : (
        null
    );
};

export default Input;
