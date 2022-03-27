import { FunctionComponent } from 'react';
import Header from '../Header/Header';
import Board from 'src/board/Board';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';

const App: FunctionComponent = () => {
  const boards = useLiveQuery(() => database.boards?.toArray());

  return (
    <>
      <Header />
      
      {boards && boards.length && <Board board={boards[0]} />}
    </>
  );
};

export default App;
