import styles from './CreateColumn.module.sass';
import AddIcon from '@mui/icons-material/Add';
import Button from '../ui/Button/Button';
import { useState } from 'react';
import { createColumn } from 'src/helpers/createColumn';

export const CreateColumn = ({ boardId }: { boardId: number }) => {
  const [inputFieldVisible, setInputFieldVisible] = useState(false);
  const [value, setValue] = useState<string>('');

  const createNewList: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent
  ) => {
    if (value.length) {
      e.preventDefault();

      await createColumn(boardId, value);

      setValue('');
    }
  };

  return (
    <div className={styles.newColumn}>
      {inputFieldVisible ? (
        <form
          onSubmit={createNewList}
          onBlur={() => setInputFieldVisible(false)}
        >
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
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
