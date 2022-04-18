export type ChecklistItemType = {
    title: string;
    description?: string;
    done: boolean;
}

export interface CheckListType {
    id?: number;
    title: string;
    description?: string;
    items: ChecklistItemType[];
    itemId: number;
}