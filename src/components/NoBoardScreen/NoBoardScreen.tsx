import Text from '../ui/Text/Text';
import styles from './NoBoardScreen.module.css';

export const NoBoardScreen = () => {
    return (
        <div className={styles.noBoardScreen}>
            <div className={styles.noBoardScreen__content}>
                <Text type="h1">No boards available</Text>
                <Text>Create a new board now</Text>
            </div>
        </div>
    );
};

export default NoBoardScreen;
