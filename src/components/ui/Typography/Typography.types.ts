type TypographyComponents =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span';

type TypographySizes =
    | 'text-xs'
    | 'text-sm'
    | 'text-md'
    | 'text-lg'
    | 'text-xl'
    | 'display-xs'
    | 'display-sm'
    | 'display-md'
    | 'display-lg'
    | 'display-xl'
    | 'display-2xl';

type TypographyWeights = 'normal' | 'medium' | 'semiBold' | 'bold';

export type TypographyProps = {
    as?: TypographyComponents;
    size?: TypographySizes;
    weight?: TypographyWeights;
    className?: string;
    children: React.ReactNode;
    uppercase?: boolean;
    style?: React.CSSProperties;
};
