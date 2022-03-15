import { FunctionComponent/*, useRef, useState*/ } from 'react';
import styles from './ColumnItem.module.sass';
// import NewSubtaskItem from '../newItem/NewSubtaskItem';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteListItem, toggleTaskDone } from '../../store/actions';
// import { ListType, SubtaskType, TodoType } from 'lib/types';
import Heading from '../ui/Heading/Heading';
// import Content from '../ui/Content';
// import ItemSettings from '../itemSettings/ItemSettings';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Menu, MenuItem } from '@mui/material';
// import cs from 'classnames';
import { Item } from '../../models/Item';

type Props = {
  columnItem: Item;
  handleColumnItemSelect: (item: any) => void;
};

const ColumnItem: FunctionComponent<Props> = ({ columnItem, handleColumnItemSelect }) => {
  // const state = useSelector((state: any) => state);
  // const dispatch = useDispatch();

  // const [hover, setHover] = useState(false);
  // const [newSubtaskField, setNewSubtaskField] = useState(false);
  // const [itemSettingsOpened, setItemSettingsOpened] = useState(false);

  // const [taskMenuAnchor, setTaskMenuAnchor] = useState<null | HTMLElement>(
    // null
  // );
  // const taskMenuOpen = Boolean(taskMenuAnchor);

  // const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    // setTaskMenuAnchor(event.currentTarget);
  // };

  // const handleMenuClose = () => {
    // setTaskMenuAnchor(null);
  // };

  return (
    <>
      <div
        className={styles.columnItem}
        onClick={() => handleColumnItemSelect(columnItem)}
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
      >
        <div className={styles.columnItem__content}>
          <Heading className={styles.columnItem__heading}>
            {columnItem.title}
          </Heading>
          {/* <Content>{listItem.description}</Content> */}
        </div>
        {/* TODO refactor all stylings to modules */}
        {/* <div className={cs(styles.listItem__actions, hover && styles.hover)}>
          <div
            className={styles.listItem__actions__button}
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </div>
          <Menu
            open={taskMenuOpen}
            anchorEl={taskMenuAnchor}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                setItemSettingsOpened(true);
                handleMenuClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(
                  deleteListItem(
                    state.currentCollectionName,
                    list,
                    listItem as TodoType
                  )
                );
                handleMenuClose();
              }}
            >
              Delete
            </MenuItem>
            {type === 'task' && (
              <MenuItem
                onClick={() => {
                  setNewSubtaskField(true);
                  handleMenuClose();
                }}
              >
                New Subtask
              </MenuItem>
            )}
          </Menu>
        </div> */}
      </div>

      {/* <ItemSettings
        handleClose={() => setItemSettingsOpened(false)}
        open={itemSettingsOpened}
        item={listItem}
        list={list}
        type={type}
      /> */}
    </>
  );
};

export default ColumnItem;
