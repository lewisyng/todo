import styles from './Board.module.scss';
import CreateColumn from 'src/components/CreateColumn/CreateColumn';
import BoardHeader from 'src/components/BoardHeader/BoardHeader';
import { Columns } from '../components/Columns/Columns';

const Board = () => {
    return (
        <div className={styles.board}>
            <BoardHeader />

            <div className={styles.board__columns}>
                <Columns />
                <CreateColumn />
            </div>
        </div>
    );
};

export default Board;
