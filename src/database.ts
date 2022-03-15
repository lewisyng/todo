import Dexie, { Table } from 'dexie';
import relationships from 'dexie-relationships';
import { Board } from './models/Board';
import { ColumnType } from './models/Column';
import { Item } from './models/Item';
import { TagType } from './models/Tag';

export class todoDB extends Dexie {
  boards!: Table<Board, number>;
  columns!: Table<ColumnType, number>;
  items!: Table<Item, number>;
  tags!: Table<TagType, number>;

  constructor() {
    super('db', { addons: [relationships] });
    this.version(1).stores({
      boards: '++id, title',
      columns: '++id, title, boardId -> boards.id',
      items: '++id, title, description, columnId -> columns.id',
      tags: '++id, title, color',
    });
  }
}

export const database = new todoDB();
