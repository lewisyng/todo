import styles from './Input.module.sass';

export const Input = ({
  type,
  value,
  onChange,
  onBlur,
  autoFocus,
}: {
  type: string;
  value: string;
  onChange: (e: React.FormEvent) => void;
  onBlur: () => void;
  autoFocus: boolean;
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      className={styles.input}
    />
  );
};

export default Input;
