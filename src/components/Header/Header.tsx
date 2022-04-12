import { FunctionComponent } from 'react';
import styles from './Header.module.sass';
import ColorSchemeSelect from '../ColorSchemeSelect/ColorSchemeSelect';
import CreateNewBoard from '../CreateNewBoard/CreateNewBoard';
import SelectBoard from '../SelectBoard/SelectBoard';

const Header: FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__actions}>
        <SelectBoard />
        <CreateNewBoard />
        <ColorSchemeSelect />
      </div>
    </div>
  );
};

export default Header;
