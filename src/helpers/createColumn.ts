import { database } from 'src/database';

export const createColumn = async (boardId: number, value: string) => {
    console.log("boardId, value", boardId, value);

  await database.columns.add({
    title: value,
    boardId,
  });
};
