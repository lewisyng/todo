import React, { BaseSyntheticEvent, FunctionComponent, useState } from 'react';
import styles from './NewDetailedItem.module.sass';
import { ListType } from 'lib/types';
import { useDispatch, useSelector } from 'react-redux';
import { createNewDetailedTodo } from 'src/store/actions';
import Heading from '../ui/Heading/Heading';
import Button from '../ui/Button/Button';
import { FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material';

type Props = {
  open: boolean;
  list: ListType;
  handleClose: () => void;
};

export const NewDetailedItem: FunctionComponent<Props> = ({
  open,
  list,
  handleClose,
}) => {
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const [newItemData, setNewItemData] = useState<{
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }>({
    name: '',
    description: '',
    priority: 'low',
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.newDetailedItem}>
        <Heading>Neuer Eintrag</Heading>
        <form
          className={styles.newDetailedItem__form}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              createNewDetailedTodo(
                store.currentCollectionName,
                list,
                newItemData
              )
            );
            handleClose();
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={newItemData.name}
            onChange={(event) =>
              setNewItemData({
                ...newItemData,
                name: event.target.value,
              })
            }
          />
          {/* todo create component for input fields */}

          <label htmlFor="description">Beschreibung</label>
          <textarea
            autoComplete="off"
            name="description"
            value={newItemData.description}
            onChange={(event) =>
              setNewItemData({
                ...newItemData,
                description: event.target.value,
              })
            }
          />
          <label htmlFor="Priority">Priorität</label>
          <RadioGroup
            onChange={(event: BaseSyntheticEvent) =>
              setNewItemData({
                ...newItemData,
                priority: event.target.value as 'low' | 'medium' | 'high',
              })
            }
            row
            aria-label="priority"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              sx={{ pr: 3 }}
              defaultChecked
              value="low"
              control={<Radio size="small" />}
              label="Low"
            />
            <FormControlLabel
              sx={{ pr: 3 }}
              value="medium"
              control={<Radio size="small" />}
              label="Medium"
            />
            <FormControlLabel
              value="high"
              control={<Radio size="small" />}
              label="High"
            />
          </RadioGroup>
          <div className={styles.newDetailedItem__form__actions}>
            <Button variant="secondary" onClick={handleClose}>
              Schließen
            </Button>
            <Button type="submit">Sichern</Button>
          </div>
          {/* open modal with satisfying */}
        </form>
      </div>
    </Modal>
  );
};

export default NewDetailedItem;
