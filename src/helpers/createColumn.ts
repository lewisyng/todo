import { database } from 'src/database';

export const createColumn = async (boardId: number, value: string) => {
  await database.columns.add({
    title: value,
    boardId,
  });
};
