import styles from './CreateColumn.module.css';
import AddIcon from '@mui/icons-material/Add';
import Button from '../ui/Button/Button';
import { useState } from 'react';
import { createColumn } from 'src/helpers/createColumn';
import cn from 'classnames';
import { useAppSelector } from 'src/hooks/redux';
import Input from '../ui/Input/Input';

export const CreateColumn = () => {
    const [inputFieldVisible, setInputFieldVisible] = useState(false);
    const [value, setValue] = useState<string>('');

    const [colorScheme, currentBoardId] = useAppSelector((state) => [
        state.persistedReducer.config.colorScheme,
        state.board.currentBoardId
    ]);

    const createNewList: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (value.length) {
            await createColumn(currentBoardId as number, value);

            setValue('');
        }
    };

    return (
        <div
            className={cn(
                styles.newColumn,
                inputFieldVisible && styles.newColumn__open
            )}
            data-color-scheme={colorScheme}>
            <div className={styles.newColumn__form}>
                {inputFieldVisible ? (
                    <form onSubmit={(e) => createNewList(e)}>
                        <Input
                            className={styles.newColumn__formInput}
                            type="text"
                            value={value}
                            autoFocus
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={() => setInputFieldVisible(false)}
                        />

                        <Button type="submit">
                            <AddIcon />

                            <span className={styles.button__text}>
                                Add column
                            </span>
                        </Button>
                    </form>
                ) : (
                    <Button onClick={() => setInputFieldVisible(true)}>
                        <AddIcon />

                        <span className={styles.button__text}>
                            Create a new Column
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateColumn;
