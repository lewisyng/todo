import styles from './TagTile.module.css';
import AddIcon from '@mui/icons-material/Add';
import { calculateTextColor } from 'src/helpers/calculateTextColor';
import cn from 'classnames';
import { useEffect, useState } from 'react';

export const TagTile = ({
    title = '',
    color = 'white',
    type,
    handleAddTile,
    handleClick,
}: {
    title?: string;
    color?: string;
    type?: 'addTile';
    handleAddTile?: () => void;
    handleClick?: () => void;
}) => {
    const [textColor, setTextColor] = useState<null | string>(null);

    useEffect(() => {
        if (type === 'addTile') return;

        setTextColor(calculateTextColor(color));
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
            onClick={handleClick}
        >
            <div className={styles.tagTile__title}>{title.toUpperCase()}</div>
        </div>
    );
};

export default TagTile;
