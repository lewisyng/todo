import cs from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { changeCollection } from "src/store/actions";
import { Collection } from "src/types";
import NewCollectionAction from "../Actions/NewCollectionAction";
import Heading from "../ui/Heading";
import styles from "./Sidebar.module.sass";

export type SidebarProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Sidebar = (props: SidebarProps) => {
  const state = useSelector((state: any) => state);
  const { className } = props;
  const dispatch = useDispatch();
  return (
    <div className={cs(className, styles.sidebar)}>
      <div className={styles.sidebar__lists}>
        <div className={styles.sidebarLists__header}>
          <Heading weight={"extrabold"} className={styles.sidebarLists__title}>
            Collections
          </Heading>
          <NewCollectionAction />
          </div>
        {state.collections &&
          state.currentCollectionName &&
          state.collections.map((collection: Collection, idx: number) => (
            <div
              key={idx}
              className={cs(
                styles.sidebarList__item,
                collection.name === state.currentCollectionName &&
                  styles.sidebarListItem__selected
              )}
              onClick={() => {
                dispatch(changeCollection(collection.name));
              }}
            >
              {collection.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
