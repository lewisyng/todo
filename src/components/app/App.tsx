import styles from './App.module.sass';
import { FunctionComponent, useEffect } from 'react';
import Header from '../Header/Header';
import Board from 'src/board/Board';
import { database } from 'src/database';
import NoBoardScreen from '../NoBoardScreen/NoBoardScreen';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setCurrentBoardId } from 'src/store/Board/board.actions';
import { useLiveQuery } from 'dexie-react-hooks';
import BackgroundLayer from '../BackgroundLayer/BackgroundLayer';
import { setCurrentBoardTitle } from '../../store/Board/board.actions';

const App: FunctionComponent = () => {
    const boards = useLiveQuery(() => database.boards.toArray());

    const currentBoardId = useAppSelector(
        (state) => state.board.currentBoardId
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchBoards = async () => {
            const boards = await database.boards?.toArray();

            if (boards?.length) {
                dispatch(
                    setCurrentBoardId(boards[boards.length - 1].id as number)
                );
                dispatch(setCurrentBoardTitle(boards[boards.length - 1].title));
            }
        };

        fetchBoards();
    }, [boards]);

    return (
        <div className={styles.app}>
            <BackgroundLayer />
            <Header />

            {currentBoardId ? <Board /> : <NoBoardScreen />}
        </div>
    );
};

export default App;
