import styles from './App.module.sass';
import { FunctionComponent, useEffect } from 'react';
import Header from '../Header/Header';
import Board from 'src/board/Board';
import { database } from 'src/database';
import NoBoardScreen from '../NoBoardScreen/NoBoardScreen';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentBoardId } from 'src/store/Board/board.actions';

const App: FunctionComponent = () => {
    const currentBoardId = useAppSelector(
        (state) => state.board.currentBoardId
    );
    const dispatch = useAppDispatch();
    const colorScheme = useAppSelector(
        (state) => state.persistedReducer.config.colorScheme
    );

    useEffect(() => {
        const fetchBoards = async () => {
            const boards = await database.boards?.toArray();

            if (boards?.length) {
                dispatch(setCurrentBoardId(boards[0].id as number));
            }
        };

        fetchBoards();
    }, []);

    return (
        <div className={styles.app}>
            <div
                className={styles.background}
                style={{ background: `var(--${colorScheme}-500)` }}
            ></div>

            <Header />

            {currentBoardId ? (
                <Board boardId={currentBoardId} />
            ) : (
                <NoBoardScreen />
            )}
        </div>
    );
};

export default App;
