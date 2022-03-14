import Dexie, { Table } from 'dexie';
import { Column } from './models/Column';

export class todoDB extends Dexie {
  columns!: Table<Column, number>;

  constructor() {
    super('db')
    this.version(1).stores({
      columns: '++id, title, items'
    })
  }
}

export const database = new todoDB();