import { useState } from 'react';
import styles from './CreateItem.module.sass';
import { database } from 'src/database';
import Button from '../ui/Button/Button';
import AddIcon from '@mui/icons-material/Add';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (value) {
            await database.items.add({
                title: value,
                description: '',
                columnId,
                tags: [],
            });
        }

        setValue('');
    };

    return (
        <div className={styles.createItem}>
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
                <Button fullWidth onClick={() => setAddCardInputVisible(true)}>
                    <AddIcon />
                    Eine weitere Karte hinzufügen
                </Button>
            )}
        </div>
    );
};

export default CreateItem;
