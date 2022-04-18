import styles from "./ChecklistItem.module.css";
import { ChecklistItemType } from "src/models/Checklist";

export const ChecklistItem = ({item}: {
    item: ChecklistItemType;
}) => {
    return (
        <div className={styles.checklistItem}>{item.title}</div>
    )
}

export default ChecklistItem;