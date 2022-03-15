import { database } from 'src/database';

export const fetchColumns = async ({ boardId }: { boardId: number }) => {
  if (boardId) {
    return await database.columns.where('boardId').equals(boardId).toArray();
  }
};
