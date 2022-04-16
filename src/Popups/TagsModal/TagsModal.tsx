import styles from './TagsModal.module.sass';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import { Button, Checkbox } from '@mui/material';
import { TagType } from 'src/models/Tag';
import CustomModal from 'src/components/CustomModal/CustomModal';
import CustomModalActions from 'src/components/CustomModal/CustomModalParts/CustomModalActions/CustomModalActions';
import CustomModalBody from 'src/components/CustomModal/CustomModalParts/CustomModalBody/CustomModalBody';

export const TagsModal = ({
    columnItemId,
    open,
    handleClose,
}: {
    columnItemId: number;
    open: boolean;
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

    const deselectAll = () => {
        database.items
            .where('id')
            .equals(columnItem!.id as number)
            .modify({
                tags: [],
            });
    };

    return (
        <CustomModal title="Tags" open={open} onClose={handleClose}>
            <CustomModalBody className={styles.tags}>
                {tags?.map((tag) => {
                    return (
                        <div key={tag.id} className={styles.tag} onClick={() => toggleTag(tag.id!)}>
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
            </CustomModalBody>

            <CustomModalActions>
                <Button variant="outlined" onClick={deselectAll}>
                    Deselect all
                </Button>
            </CustomModalActions>
        </CustomModal>
    );
};

export default TagsModal;
