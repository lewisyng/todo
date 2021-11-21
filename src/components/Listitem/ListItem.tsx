import { FunctionComponent, useRef, useState } from "react";
import "./ListItem.sass";
import NewSubtaskItem from "../newItem/NewSubtaskItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteListItem, toggleTaskDone } from "../../store/actions";
import { ListType, SubtaskType, TodoType } from "lib/types";
import Heading from "../ui/Heading";
import Content from "../ui/Content";
import ItemSettings from "../itemSettings/ItemSettings";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Menu, MenuItem } from "@mui/material";

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
        className={`listItem ${listItem.done && "done"} ${
          listItem.priority
        } ${type}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className="listItem__content"
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
          <Heading>{listItem.name}</Heading>
          <Content>{listItem.description}</Content>
        </div>
        {/* TODO refactor all stylings to modules */}
        <div className={`listItem__actions ${hover && "hover"}`}>
          <div className={"listItem__actions__button"} onClick={handleMenuOpen}>
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
