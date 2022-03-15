import styles from './ManageTagsModal.module.sass';
import CustomModal from '../CustomModal';
import { useLiveQuery } from 'dexie-react-hooks';
import { database } from 'src/database';
import { FormEvent, useState } from 'react';
import { Button } from '@mui/material';

export const ManageTagsModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#000');

  const tags = useLiveQuery(() => database.tags.toArray());

  const addTag = (e: FormEvent) => {
    e.preventDefault();

    database.tags.add({
      title,
      color,
    });

    setTitle('');
    setColor('#000');
  };

  return (
    <CustomModal open={open} onClose={handleClose}>
      <div className={styles.manageTagsModal__content}>
        <div className={styles.manageTagsModalContent__tags}>
          {tags?.map((tag, idx) => (
            <div key={idx}>{tag.title}</div>
          ))}
        </div>

        <form onSubmit={addTag}>
          <fieldset>
            <label htmlFor="title">Titel</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>
          
          <fieldset>
            <label htmlFor="color">Farbe auswählen</label>
            <input
              type="color"
              name="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </fieldset>

          <Button type="submit" variant="contained">
            Tag anlegen
          </Button>
        </form>
      </div>
    </CustomModal>
  );
};

export default ManageTagsModal;
