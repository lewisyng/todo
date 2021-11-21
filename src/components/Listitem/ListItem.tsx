import { FunctionComponent, useRef, useState } from "react";
import styles from "./ListItem.module.sass";
import NewSubtaskItem from "../newItem/NewSubtaskItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteListItem, toggleTaskDone } from "../../store/actions";
import { ListType, SubtaskType, TodoType } from "lib/types";
import Heading from "../ui/Heading";
import Content from "../ui/Content";
import ItemSettings from "../itemSettings/ItemSettings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import cs from "classnames";

type Props = {
  type: "task" | "subtask";
  listItem: TodoType | SubtaskType;
  list: ListType;
};

const ListItem: FunctionComponent<Props> = ({ type, listItem, list }) => {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const [hover, setHover] = useState(false);
  const [newSubtaskField, setNewSubtaskField] = useState(false);
  const [itemSettingsOpened, setItemSettingsOpened] = useState(false);

  const [taskMenuAnchor, setTaskMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const taskMenuOpen = Boolean(taskMenuAnchor);

  const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setTaskMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setTaskMenuAnchor(null);
  };

  return (
    <>
      <div
        className={cs(
          styles.listItem,
          listItem.done && styles.listItem__done,
          type === "subtask" && styles.listItem__subtask
        )}
        data-priority={listItem.priority}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={styles.listItem__content}
          onClick={() => {
            dispatch(
              toggleTaskDone(
                state.currentCollectionName,
                list,
                listItem as TodoType
              )
            );
          }}
        >
          <Heading className={styles.listItem__heading}>
            {listItem.name}
          </Heading>
          <Content>{listItem.description}</Content>
        </div>
        {/* TODO refactor all stylings to modules */}
        <div className={cs(styles.listItem__actions, hover && styles.hover)}>
          <div className={styles.listItem__actions__button} onClick={handleMenuOpen}>
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
            {type === "task" && (
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
        </div>
      </div>
      {newSubtaskField && (
        <NewSubtaskItem
          list={list}
          item={listItem as SubtaskType}
          handleClose={() => setNewSubtaskField(false)}
        />
      )}
      <ItemSettings
        handleClose={() => setItemSettingsOpened(false)}
        open={itemSettingsOpened}
        item={listItem}
        list={list}
        type={type}
      />
    </>
  );
};

export default ListItem;
