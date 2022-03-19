import styles from './TagsPopup.module.sass';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import PopupWrapper from '../PopupWrapper/PopupWrapper';
import { Checkbox } from '@mui/material';
import { TagType } from 'src/models/Tag';

export const TagsPopup = ({
    columnItemId,
    handleClose,
}: {
    columnItemId: number;
    handleClose: () => void;
}) => {
    const tags: TagType[] | undefined = useLiveQuery(() =>
        database.tags.toArray()
    );

    const columnItem = useLiveQuery(() =>
        database.items.where('id').equals(columnItemId).first()
    );

    const toggleTag = (tagId: number) => {
        if (columnItem!.tags?.includes(tagId)) {
            database.items
                .where('id')
                .equals(columnItem!.id as number)
                .modify({
                    tags: columnItem!.tags!.filter((tag) => tag !== tagId),
                });
        } else {
            database.items
                .where('id')
                .equals(columnItem!.id as number)
                .modify({
                    tags: [...columnItem!.tags!, tagId],
                });
        }
    };

    return (
        <PopupWrapper title="Tags" handleClose={handleClose}>
            <div className={styles.tags}>
                {tags?.map((tag) => {
                    return (
                        <div key={tag.id} className={styles.tag}>
                            <div
                                className={styles.tag__color}
                                style={{ background: tag.color }}
                            ></div>

                            <div className={styles.tag__title}>{tag.title}</div>

                            {columnItem && (
                                <Checkbox
                                    onChange={() => toggleTag(tag.id!)}
                                    checked={columnItem!.tags.includes(
                                        tag.id as number
                                    )}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </PopupWrapper>
    );
};

export default TagsPopup;
