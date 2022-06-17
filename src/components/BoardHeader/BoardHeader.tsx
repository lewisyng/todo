import styles from './BoardHeader.module.sass';
import { useAppSelector } from 'src/hooks/redux';
import ManageTags from '../ManageTags/ManageTags';
import { ModalUIProvider } from 'src/hooks/useModal';
import { Typography } from '../ui/Typography/Typography';

export const BoardHeader = () => {
    const [colorScheme, boardTitle] = useAppSelector((state) => [
        state.persistedReducer.config.colorScheme,
        state.board.currentBoardTitle,
    ]);

    return (
        <div
            className={styles.boardHeader}
            style={{ backgroundColor: `var(--${colorScheme}-800)` }}
        >
            <Typography weight="bold" style={{ color: 'white' }}>
                {boardTitle}
            </Typography>

            <div className={styles.boardHeader__actions}>
                <ModalUIProvider>
                    <ManageTags />
                </ModalUIProvider>
            </div>
        </div>
    );
};

export default BoardHeader;
