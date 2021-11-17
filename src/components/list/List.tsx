import { FunctionComponent, useState } from "react";
import "./List.sass";
import { deleteList, getCollection } from "../../localbaseFunctions";
import ListItem from "../Listitem/ListItem";
import NewTodoItem from "../newItem/NewTodoItem";
import NewDetailedItem from "../newItem/NewDetailedItem";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntireList } from "../../store/actions";
import { ListType } from "../../../lib/types";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

type Props = {
  list: ListType;
};

const List: FunctionComponent<Props> = ({ list }) => {
  const { currentCollectionName } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [showNewItemField, setShowNewItemField] = useState(false);
  const [showNewDetailedItem, setShowNewDetailedItem] = useState(false);

  return (
    <div className="list">
      <div className="list__header">
        <Heading>{list.name}</Heading>
        <IconButton
          onClick={() =>
            dispatch(deleteEntireList(currentCollectionName, list))
          }
        >
          <DeleteIcon />
        </IconButton>
      </div>

      {!showNewItemField && (
        <div className="list__newItem">
          <Button onClick={() => setShowNewItemField(true)}>
            Schnell-Eintrag
          </Button>
          <Button onClick={() => setShowNewDetailedItem(true)}>
            Detail-Eintrag
          </Button>
        </div>
      )}

      <div className="list__listItems">
        {showNewItemField && (
          <NewTodoItem
            list={list}
            handleClose={() => setShowNewItemField(false)}
          />
        )}

        {list.todos.map((listItem) => (
          <>
            <ListItem
              type="task"
              key={listItem.id.task}
              list={list}
              listItem={listItem}
            />
            {listItem.subtasks.map((subtask) => (
              <ListItem
                type="subtask"
                key={subtask.id["subtask"]}
                list={list}
                listItem={subtask}
              />
            ))}
          </>
        ))}
      </div>

      <NewDetailedItem
        open={showNewDetailedItem}
        handleClose={() => setShowNewDetailedItem(false)}
        list={list}
      />
    </div>
  );
};

export default List;
