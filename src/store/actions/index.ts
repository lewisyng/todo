import {
  CollectionType,
  ListType,
  SubtaskIdType,
  SubtaskType,
  TaskIdType,
  TodoType,
} from "lib/types";
import updateDone, {
  addNewList,
  createNewDetailedItem,
  createNewItem,
  createNewSubtask,
  deleteCollection,
  deleteItem,
  deleteList,
  deleteSubtaskItem,
  getCollection,
  getCollections,
  updateData,
  updateSubtaskDone,
} from "src/localbaseFunctions";
import { DispatchType } from "../store";

export const setCollections = (collections: CollectionType[]) => {
  return {
    type: "SET_COLLECTIONS",
    payload: {
      collections: collections,
    },
  };
};

export const setUp = () => {
  return async (dispatch: DispatchType) => {
    const collections = await getCollections();
    const currentCollectionName = await getCollections().then((data) => {
      return data[0]?.name;
    });
    const currentCollection = await getCollection(currentCollectionName);
    dispatch({
      type: "SETUP",
      payload: {
        collections: collections,
        currentCollectionName: currentCollectionName,
        currentCollection: currentCollection,
      },
    });
  };
};

export const changeCollection = (collectionName: string) => {
  return async (dispatch: DispatchType) => {
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "CHANGECOLLECTION",
      payload: {
        currentCollectionName: collectionName,
        currentCollection: currentCollection,
      },
    });
  };
};

export const deleteEntireCollection = (collectionName: string) => {
  return async (dispatch: DispatchType) => {
    await deleteCollection(collectionName);
    const collections = await getCollections();
    dispatch({
      type: "DELETELIST",
      payload: {
        collections: collections,
      },
    });
  };
};

export const deleteListItem = (
  collectionName: string,
  list: ListType,
  listItem: TodoType
) => {
  return async (dispatch: DispatchType) => {
    await deleteItem(collectionName, list, listItem);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const deleteEntireList = (collectionName: string, list: ListType) => {
  return async (dispatch: DispatchType) => {
    await deleteList(collectionName, list.id);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const deleteSubtask = (
  collectionName: string,
  list: ListType,
  listItem: SubtaskType
) => {
  return async (dispatch: DispatchType) => {
    await deleteSubtaskItem(collectionName, list, listItem);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const toggleTaskDone = (
  collectionName: string,
  list: ListType,
  listItem: TodoType
) => {
  return async (dispatch: DispatchType) => {
    await updateDone(collectionName, list, listItem, !listItem.done);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const toggleSubtaskDone = (
  collectionName: string,
  list: ListType,
  listItem: SubtaskType
) => {
  return async (dispatch: DispatchType) => {
    await updateSubtaskDone(collectionName, list, listItem, !listItem.done);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const createList = (collectionName: string, name?: string) => {
  return async (dispatch: DispatchType) => {
    if (name) {
      await addNewList(collectionName, name);
    }
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const updateItem = (
  collectionName: string,
  list: ListType,
  item: TodoType | SubtaskType,
  itemSettingsData: {
    id: TaskIdType | SubtaskIdType;
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
    subtasks?: SubtaskType[];
  },
  type: string
) => {
  return async (dispatch: DispatchType) => {
    await updateData(collectionName, list, item, itemSettingsData, type);
    const currentCollection = await getCollection(collectionName);
    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const createNewTodoItem = (
  collectionName: string,
  list: ListType,
  data: {
    name: string;
    description: string;
  }
) => {
  return async (dispatch: DispatchType) => {
    await createNewItem(collectionName, list, data);
    const currentCollection = await getCollection(collectionName);

    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const createNewSubtaskItem = (
  collectionName: string,
  list: ListType,
  item: SubtaskType,
  data: {
    name: string;
    description: string;
  }
) => {
  return async (dispatch: DispatchType) => {
    await createNewSubtask(collectionName, list, item, data);
    const currentCollection = await getCollection(collectionName);

    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};

export const createNewDetailedTodo = (
  collectionName: string,
  list: ListType,
  data: {
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
  }
) => {
  return async (dispatch: DispatchType) => {
    await createNewDetailedItem(collectionName, list, data);
    const currentCollection = await getCollection(collectionName);

    dispatch({
      type: "PERSIST_CHANGE",
      payload: {
        currentCollection: currentCollection,
      },
    });
  };
};
