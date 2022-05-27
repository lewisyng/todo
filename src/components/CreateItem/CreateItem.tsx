import { useState } from 'react';
import styles from './CreateItem.module.css';
import { database } from 'src/database';
import Button from '../ui/Button/Button';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from 'src/hooks/redux';

export const CreateItem = ({
    columnId,
    boardId,
}: {
    columnId: number;
    boardId: number;
}) => {
    const [value, setValue] = useState('');
    const [addCardInputVisible, setAddCardInputVisible] =
        useState<boolean>(false);

    const colorScheme = useAppSelector(
        (state) => state.persistedReducer.config.colorScheme
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (value) {
            await database.items.add({
                title: value,
                description: '',
                columnId,
                tags: [],
                startDate: null,
                endDate: null,
            });
        }

        setValue('');
    };

    return (
        <div className={styles.createItem} data-color-scheme={colorScheme}>
            {addCardInputVisible ? (
                <form onSubmit={handleSubmit}>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={() => setAddCardInputVisible(false)}
                        type="text"
                        autoFocus
                    />
                </form>
            ) : (
                <Button onClick={() => setAddCardInputVisible(true)}>
                    <AddIcon />

                    <span className={styles.button__text}>
                        Create a new Card
                    </span>
                </Button>
            )}
        </div>
    );
};

export default CreateItem;
