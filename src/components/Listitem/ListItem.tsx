import { FunctionComponent, useState } from "react";
import "./ListItem.sass";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import NewSubtaskItem from "../newItem/NewSubtaskItem";
import { useDispatch, useSelector } from "react-redux";
import { deleteListItem, toggleTaskDone } from "../../store/actions";
import { ListType, SubtaskType, TodoType } from "lib/types";
import Heading from "../ui/Heading";
import Content from "../ui/Content";
import { IconButton } from "@material-ui/core";
import ItemSettings from "../itemSettings/ItemSettings";

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
              toggleTaskDone(state.currentCollectionName, list, listItem as TodoType)
            );
          }}
        >
          <Heading>{listItem.name}</Heading>
          <Content>{listItem.description}</Content>
        </div>
        <div className={`listItem__actions ${hover && "hover"}`}>
          <IconButton>
            <SettingsIcon onClick={() => setItemSettingsOpened(true)} />
          </IconButton>

          <IconButton>
            <DeleteIcon
              onClick={() => {
                dispatch(
                  deleteListItem(state.currentCollectionName, list, listItem as TodoType)
                );
              }}
            />
          </IconButton>

          {type === "task" && (
            <IconButton
              onClick={() => {
                setNewSubtaskField(true);
              }}
            >
              <AddIcon />
            </IconButton>
          )}
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
