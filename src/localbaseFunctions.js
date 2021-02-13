import db from "./localbase";

/*============================================================
Functions regarding the Todo Items in a "SingleList" Component
============================================================*/

export const createNewItem = async (collection, list, value) => {
  let todos = await db
    .collection(collection)
    .doc({ name: list.name })
    .get()
    .then((data) => {
      return data.todos;
    });

  todos.push({
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: value,
    done: false,
    priority: "",
    description: "",
    subtasks: [],
  });

  await db
    .collection(collection)
    .doc({ name: list.name })
    .update({ todos: todos });
};

export const getItems = async (collection) => {
  return await db.collection(collection).get();
};

export const updateDone = async (collection, listId, todoId, done) => {
  let todos = await db
    .collection(collection)
    .doc({ id: listId })
    .get()
    .then((data) => {
      return data.todos;
    });

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos[i].done = done;
    }
  }

  await db.collection(collection).doc({ id: listId }).update({ todos: todos });
};

export const getItemData = async (collection, id) => {
  return await db.collection(collection).doc({ id: id }).get();
};

export const updateItem = async (collection, data) => {
  await db.collection(collection).doc({ id: data.id }).update({
    id: data.id,
    name: data.name,
    description: data.description,
    priority: data.priority,
  });
};

export const deleteItem = async (collection, listId, todoId) => {
  let todos = await db
    .collection(collection)
    .doc({ id: listId })
    .get()
    .then((data) => {
      return data.todos;
    });

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos.splice(i, 1);
    }
  }

  await db.collection(collection).doc({ id: listId }).update({ todos: todos });
};

/*============================================================
Functions regarding single lists (TodoLists)
============================================================*/

export const addNewList = async (collection, nameOfNewList) => {
  let lists = await getLists(collection);
  let id = lists.length ? lists[lists.length - 1].id + 1 : 0;

  await db.collection(collection).doc(String(id)).set({
    id: id,
    name: nameOfNewList,
    todos: [],
  });
};

export const getLists = async (collection) => {
  return await db.collection(collection).get();
};

/*============================================================
Functions regarding the collections (Array of TodoLists)
============================================================*/

export const addNewCollection = async (latestID, value) => {
  await db.collection("collections").doc(String(latestID)).set({
    id: latestID,
    name: value,
    lists: [],
  });
};

export const getCollections = async () => {
  const collections = await db.collection("collections").get();

  if (collections === null) {
    await db.collection("collectionList");
    return [];
  }
  return collections;
};

export const overwriteCollectionList = async (collections) => {
  await db
    .collection("collectionList")
    .doc("collectionList")
    .set({ data: collections });
};

export const deleteCollection = async (collection) => {
  await db.collection("collections").doc({ name: collection }).delete();
  await db.collection(collection).delete();
};

export default updateDone;
