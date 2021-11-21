import { FunctionComponent, useRef, useState } from "react";
import styles from "./List.module.sass";
import { deleteList, getCollection } from "../../localbaseFunctions";
import ListItem from "../Listitem/ListItem";
import NewTodoItem from "../newItem/NewTodoItem";
import NewDetailedItem from "../newItem/NewDetailedItem";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntireList } from "../../store/actions";
import { ListType } from "../../../lib/types";
import Heading from "../ui/Heading";
// import Button from "../ui/Button";
import {
  ButtonGroup,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/core/ClickAwayListener";

type Props = {
  list: ListType;
};

const List: FunctionComponent<Props> = ({ list }) => {
  const { currentCollectionName } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [showNewItemField, setShowNewItemField] = useState<boolean>(false);
  const [showNewDetailedItem, setShowNewDetailedItem] =
    useState<boolean>(false);
  const [showNewDropdown, setShowNewDropdown] = useState<boolean>(false);
  const anchorRef = useRef(null);

  return (
    <div className={styles.list}>
      <div className={styles.listHeader}>
        <Heading weight={"bold"} className={styles.listHeader__title}>{list.name.toUpperCase()}</Heading>
        <ButtonGroup variant="text" ref={anchorRef}>
          <Button
            onClick={() =>
              dispatch(deleteEntireList(currentCollectionName, list))
            }
          >
            <DeleteIcon />
          </Button>
          <Button onClick={() => setShowNewDropdown(!showNewDropdown)}>
            <AddIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={showNewDropdown}
          anchorEl={anchorRef.current}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener
                  onClickAway={() => setShowNewDropdown(false)}
                >
                  <MenuList id="split-button-menu">
                    <MenuItem onClick={() => setShowNewItemField(true)}>
                      Schnell-Eintrag
                    </MenuItem>
                    <MenuItem onClick={() => setShowNewDetailedItem(true)}>
                      Detail-Eintrag
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div className={styles.list__listItems}>
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
