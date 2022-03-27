import { FunctionComponent } from "react";
import "./ListMenuItem.sass";
import { useDispatch } from "react-redux";
import { changeCollection, deleteEntireCollection } from "src/store/actions";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  item: {
    name: string
  }
  closeWindow: () => void
}

const ListMenuItem: FunctionComponent<Props> = ({item, closeWindow}) => {
  const dispatch = useDispatch()

  return (
    <li className="listMenuItem">
      <div
        className="listMenuItem__name"
        onClick={() => {
          dispatch(changeCollection(item.name));
          closeWindow();
        }}
      >
        {item.name}
      </div>
      <IconButton
        className="listMenuItem__delete"
        onClick={() => dispatch(deleteEntireCollection(item.name))}
      >
        <DeleteIcon />
      </IconButton>
    </li>
  );
}

export default ListMenuItem;
