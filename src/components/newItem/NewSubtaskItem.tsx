import { ListType, SubtaskType } from "lib/types";
import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewSubtaskItem } from "src/store/actions";

interface Props {
  list: ListType;
  item: SubtaskType;
  handleClose: () => void;
}

export const NewSubtaskItem: FunctionComponent<Props> = ({
  list,
  item,
  handleClose,
}) => {
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
  });

  return (
    <div className="newSubtaskItem" onBlur={handleClose}>
      <form
        className="newStandardItemForm"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            createNewSubtaskItem(
              store.currentCollectionName,
              list,
              item,
              newItem
            )
          );
          handleClose();
        }}
      >
        <input
          autoFocus
          autoComplete="off"
          type="text"
          value={newItem.name}
          onChange={(e) => {
            setNewItem({ ...newItem, name: e.target.value });
          }}
        />
      </form>
    </div>
  );
};

export default NewSubtaskItem;
