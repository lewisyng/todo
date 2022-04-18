import Dexie, { Table } from 'dexie';
import relationships from 'dexie-relationships';
import { Board } from './models/Board';
import { CheckListType } from './models/Checklist';
import { ChecklistItemType } from './models/ChecklistItem';
import { ColumnType } from './models/Column';
import { Item } from './models/Item';
import { TagType } from './models/Tag';

export class todoDB extends Dexie {
    boards!: Table<Board, number>;
    columns!: Table<ColumnType, number>;
    items!: Table<Item, number>;
    tags!: Table<TagType, number>;
    checklists!: Table<CheckListType, number>;
    checklistItems!: Table<ChecklistItemType, number>;

    constructor() {
        super('db', { addons: [relationships] });
        this.version(1).stores({
            boards: '++id, title',
            columns: '++id, title, boardId -> boards.id',
            items: '++id, title, description, columnId -> columns.id, tags, startDate, endDate',
            tags: '++id, title, color',
            checklists: '++id, title, description, items, itemId -> items.id',
            checklistItems:
                '++id, title, description, done, checklistId -> checklists.id',
        });
    }
}

export const database = new todoDB();
