import { FunctionComponent } from 'react';
import styles from './ColumnItem.module.sass';
import Heading from '../ui/Heading/Heading';
import { Item } from '../../models/Item';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import { useAppSelector } from 'src/hooks/redux';

type Props = {
    columnItem: Item;
    handleColumnItemSelect: (item: any) => void;
};

const ColumnItem: FunctionComponent<Props> = ({
    columnItem,
    handleColumnItemSelect,
}) => {
    const colorScheme = useAppSelector(
        (state) => state.persistedReducer.config.colorScheme
    )

    const item = useLiveQuery(() => {
        return database.items.where('id').equals(columnItem.id!).first();
    });

    const tags = useLiveQuery(() => {
        return database.tags.toArray();
    });

    return (
        <div
            className={styles.columnItem}
            onClick={() => handleColumnItemSelect(columnItem)}
            data-color-scheme={colorScheme}
            // onMouseEnter={() => setHover(true)}
            // onMouseLeave={() => setHover(false)}
        >
            <div className={styles.columnItem__content}>
                {item?.tags && item?.tags.length > 0 && (
                    <div className={styles.columnItem__tags}>
                        {item?.tags?.map((tag) => {
                            const tagRef = tags?.find((t) => t.id === tag);

                            return (
                                <div
                                    key={tag}
                                    className={styles.columnItem__tag}
                                    style={{
                                        background: tagRef?.color,
                                    }}
                                ></div>
                            );
                        })}
                    </div>
                )}
                <Heading className={styles.columnItem__heading}>
                    {columnItem.title}
                </Heading>
                {/* <Content>{listItem.description}</Content> */}
            </div>
        </div>
    );
};

export default ColumnItem;
