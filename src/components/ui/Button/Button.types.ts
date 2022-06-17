type ButtonVariants = 'default' | 'secondary' | 'tertiary' | 'disabled' | 'warning'

export type ButtonProps = {
    className?: string;
    children: React.ReactNode;
    type?: 'submit' | 'button' | undefined;
    variant?: ButtonVariants;
    onClick?: (e?: React.FormEvent) => void;
  };