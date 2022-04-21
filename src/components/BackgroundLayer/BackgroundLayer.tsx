import styles from './BackgroundLayer.module.css';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';

export const BackgroundLayer = () => {
    const colorScheme = useAppSelector(
        (state: RootState) => state.persistedReducer.config.colorScheme
    );

    return (
        <div
            className={styles.background}
            style={{ background: `var(--${colorScheme}-500)` }}
        ></div>
    );
};

export default BackgroundLayer;
