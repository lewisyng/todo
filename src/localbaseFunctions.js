import db from "./localbase";

/*============================================================
Functions regarding single Subtasks
============================================================*/

export const createNewSubtask = async (collection, list, item, data) => {
  let newList = list

  for(let i = 0; i < newList.todos.length; i++){
    if(newList.todos[i].id === item.id){
      newList.todos[i].subtasks.push(data)
      break
    }
  }

  await db.collection(collection).doc({ id: newList.id }).update({ todos: newList.todos });
}

/*============================================================
Functions regarding single Todo Items
============================================================*/

export const createNewItem = async (collection, list, data) => {
  let todos = list.todos;

  todos.push({
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: data.name,
    done: false,
    priority: data.priority,
    description: data.description,
    subtasks: data.subtasks,
  });

  await db.collection(collection).doc({ id: list.id }).update({ todos: todos });
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

export const updateItem = async (collection, listId, todoId, data) => {
  let todos = await db
    .collection(collection)
    .doc(String(listId))
    .get()
    .then((data) => {
      return data.todos;
    });

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos[i].name = data.name;
      todos[i].description = data.description;
      todos[i].priority = data.priority;
      todos[i].subtasks = data.subtasks;
    }
  }

  await db.collection(collection).doc(String(listId)).update({ todos: todos });
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

export const deleteList = async (collection, listId) => {
  await db.collection(collection).doc(String(listId)).delete();
}

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
    return [];
  }
  return collections;
};

export const deleteCollection = async (collection) => {
  await db.collection("collections").doc({ name: collection }).delete();
  await db.collection(collection).delete();
};

export default updateDone;
