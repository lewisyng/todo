import styles from './CreateColumn.module.sass';
import AddIcon from '@mui/icons-material/Add';
import Button from '../ui/Button/Button';
import { useRef, useState } from 'react';
import { database } from 'src/database';

export const CreateColumn = () => {
  const [inputFieldVisible, setInputFieldVisible] = useState(false);
  const newListInput = useRef<HTMLInputElement>(null);

  const createNewList: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent
  ) => {
    if (newListInput.current?.value) {
      e.preventDefault();

      await database.columns.add({
        title: newListInput.current.value,
        items: [],
      });

      setInputFieldVisible(false);
    }
  };

  return (
    <div className={styles.newColumn}>
      {inputFieldVisible ? (
        <form
          onSubmit={createNewList}
          onBlur={() => setInputFieldVisible(false)}
        >
          <input autoFocus ref={newListInput} type="text" />
        </form>
      ) : (
        <Button fullWidth onClick={() => setInputFieldVisible(true)}>
          <AddIcon />
          Create a new Column
        </Button>
      )}
    </div>
  );
};

export default CreateColumn;
