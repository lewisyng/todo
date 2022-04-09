import { FunctionComponent } from 'react';
import styles from './Header.module.sass';
import ColorSchemeSelect from '../ColorSchemeSelect/ColorSchemeSelect';
import CreateNewBoard from '../CreateNewBoard/CreateNewBoard';

const Header: FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__actions}>
        <CreateNewBoard />
        <ColorSchemeSelect />
      </div>
    </div>
  );
};

export default Header;
