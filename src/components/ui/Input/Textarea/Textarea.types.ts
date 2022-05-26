export type TextareaProps = {
    rows?: number;
    className?: string;
    name: string;
    value?: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}