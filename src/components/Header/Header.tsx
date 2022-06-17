import { FunctionComponent } from 'react';
import styles from './Header.module.sass';
import ColorSchemeSelect from '../ColorSchemeSelect/ColorSchemeSelect';
import CreateNewBoard from '../CreateNewBoard/CreateNewBoard';
import SelectBoard from '../SelectBoard/SelectBoard';
import { ModalUIProvider } from 'src/hooks/useModal';

const Header: FunctionComponent = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__actions}>
                <ModalUIProvider>
                    <SelectBoard />
                </ModalUIProvider>

                <ModalUIProvider>
                    <CreateNewBoard />
                </ModalUIProvider>

                <ModalUIProvider>
                    <ColorSchemeSelect />
                </ModalUIProvider>
            </div>
        </div>
    );
};

export default Header;
