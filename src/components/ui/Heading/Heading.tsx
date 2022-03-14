import { FunctionComponent } from 'react';
import styles from './Heading.module.sass';
import cn from 'classnames';

type Props = {
  children: React.ReactNode;
  weight?: 'normal' | 'bold' | 'extrabold';
  textAlign?: 'left' | 'center' | 'right';
  allCaps?: boolean;
  className?: string;
};

const Heading: FunctionComponent<Props> = ({ children, className }) => {
  return <div className={cn(className, styles.heading)}>{children}</div>;
};

export default Heading;
