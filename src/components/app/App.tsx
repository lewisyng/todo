import styles from './App.module.sass';
import { FunctionComponent } from 'react';
import Header from '../Header/Header';
import Board from 'src/board/Board';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import NoBoardScreen from '../NoBoardScreen/NoBoardScreen';

const App: FunctionComponent = () => {
    const boards = useLiveQuery(() => database.boards?.toArray());

    return (
        <div className={styles.app}>
            <Header />

            {boards && boards.length ? (
                <Board board={boards[0]} />
            ) : (
                <NoBoardScreen />
            )}
        </div>
    );
};

export default App;
