import styles from './CreateColumn.module.sass';
import AddIcon from '@mui/icons-material/Add';
import Button from '../ui/Button/Button';
import { useState } from 'react';
import { createColumn } from 'src/helpers/createColumn';
import cn from 'classnames';
import { useAppSelector } from 'src/hooks/redux';

export const CreateColumn = () => {
    const [inputFieldVisible, setInputFieldVisible] = useState(false);
    const [value, setValue] = useState<string>('');

    const [colorScheme, currentBoardId] = useAppSelector((state) => [
        state.persistedReducer.config.colorScheme,
        state.board.currentBoardId,
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
            data-color-scheme={colorScheme}
        >
            <div className={styles.newColumn__form}>
                <form onSubmit={createNewList}>
                    {inputFieldVisible ? (
                        <>
                            <input
                                className={styles.newColumn__formInput}
                                type="text"
                                value={value}
                                autoFocus
                                onChange={(e) => setValue(e.target.value)}
                                onBlur={() => setInputFieldVisible(false)}
                            />

                            <button
                                className={styles.newColumn__formSubmit}
                                type="submit"
                            >
                                Liste hinzufügen
                            </button>
                        </>
                    ) : (
                        <Button onClick={() => setInputFieldVisible(true)}>
                            <AddIcon />

                            <span className={styles.button__text}>
                                Create a new Column
                            </span>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateColumn;
