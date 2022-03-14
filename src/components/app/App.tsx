import { FunctionComponent } from 'react';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUp } from '../../store/actions';
import Board from 'src/board/Board';
// import Sidebar from '../Sidebar/Sidebar';

const App: FunctionComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUp());
  });

  return (
    <>
      <Header />
      <Board />
    </>
  );
};

export default App;
