import styles from './TagTile.module.css';
import AddIcon from '@mui/icons-material/Add';
import { calculateTextColor } from 'src/helpers/calculateTextColor';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export const TagTile = ({
    title = '',
    color = 'white',
    type,
    handleAddTile,
    deleteTag,
    editTag,
}: {
    title?: string;
    color?: string;
    type?: 'addTile';
    handleAddTile?: () => void;
    deleteTag?: () => void;
    editTag?: () => void;
}) => {
    const [textColor, setTextColor] = useState<null | string>(null);

    useEffect(() => {
        if (type === 'addTile') return;

        const textColor = calculateTextColor(color);

        if (textColor) setTextColor(textColor);
    }, [color]);

    /**
     * Special case for the "add tag" tile
     */
    if (type === 'addTile') {
        return (
            <div
                onClick={handleAddTile}
                className={cn(styles.tagTile, styles.tagTile__add)}
            >
                <AddIcon />
            </div>
        );
    }

    return (
        <div
            className={styles.tagTile}
            style={{ backgroundColor: color, color: textColor || 'white' }}
        >
            <div className={styles.tagTile__title}>{title.toUpperCase()}</div>

            <div className={styles.tagTile__hoverOptions}>
                <IconButton onClick={editTag}>
                    <EditIcon />
                </IconButton>

                <IconButton onClick={deleteTag}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default TagTile;
