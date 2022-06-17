import { useState } from 'react';
import styles from './ManageTagsModal.module.sass';
import CustomModal from '../CustomModal';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import CustomModalBody from '../CustomModalParts/CustomModalBody/CustomModalBody';
import TagTile from 'src/components/TagTile/TagTile';
import CreateTagModal from '../CreateTagModal/CreateTagModal';
import EditTagModal from '../EditTagModal/EditTagModal';
import { useModal } from 'src/hooks/useModal';

export const ManageTagsModal = () => {
    const { isModalOpen, closeModal } = useModal();
    const { isModalOpen: isCreateModalOpen, closeModal: closeCreateModal } =
        useModal();
    const { isModalOpen: isEditModalOpen, closeModal: closeEditModal } =
    useModal();
    const [clickedTagTile, setClickedTagTile] = useState<number | null>(null);
    
    const tags = useLiveQuery(() => database.tags.toArray());
    const [createTagModalOpen, setCreateTagModalOpen] = useState(false);

    const addTile = () => {
        setCreateTagModalOpen(true);
    };

    const deleteTag = (id: number) => {
        database.tags.delete(id);
    };

    return (
        <>
            <CustomModal
                open={isModalOpen}
                onClose={closeModal}
                title="Manage your tags"
            >
                <CustomModalBody>
                    <div className={styles.manageTagsModal__content}>
                        <div className={styles.manageTagsModal__tagTiles}>
                            <TagTile type="addTile" handleAddTile={addTile} />

                            {tags?.map((tag: any, idx: number) => {
                                return (
                                    <TagTile
                                        key={idx}
                                        title={tag.title}
                                        color={tag.color}
                                        deleteTag={() =>
                                            deleteTag(tag.id as number)
                                        }
                                        editTag={() =>
                                            setClickedTagTile(tag.id)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                </CustomModalBody>
            </CustomModal>

            <CreateTagModal
                open={createTagModalOpen}
                handleClose={() => setCreateTagModalOpen(false)}
            />

            {clickedTagTile && (
                <EditTagModal
                    id={clickedTagTile as number}
                    open={!!clickedTagTile}
                    handleClose={() => setClickedTagTile(null)}
                />
            )}
        </>
    );
};

export default ManageTagsModal;
