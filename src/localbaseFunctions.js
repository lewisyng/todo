import db from "./localbase";

/*============================================================
Functions regarding single Subtasks
============================================================*/

export const createNewSubtask = async (collectionName, list, item, data) => {
  for (let i = 0; i < list.todos.length; i++) {
    if (list.todos[i].id.task === item.id.task) {
      const subtasks = list.todos[i].subtasks;
      list.todos[i].subtasks.push({
        id: {
          list: list.id,
          task: item.id.task,
          subtask: subtasks.length
            ? subtasks[subtasks.length - 1].id.subtask + 1
            : 0,
        },
        name: data.name,
        done: false,
        priority: data.priority,
        description: data.description,
      });
      break;
    }
  }

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: list.todos });
};

export const updateSubtaskData = async (
  collectionName,
  list,
  listItem,
  data
) => {
  let todos = await db
    .collection(collectionName)
    .doc({ id: list.id })
    .get()
    .then((data) => {
      return data.todos;
    });

  todos
    .find((item) => item.id.task === listItem.id.task)
    ["subtasks"].find(
      (item) => item.id.subtask === listItem.id.subtask
    ).description = data.description;
  todos
    .find((item) => item.id.task === listItem.id.task)
    ["subtasks"].find((item) => item.id.subtask === listItem.id.subtask).name =
    data.name;
  todos
    .find((item) => item.id.task === listItem.id.task)
    ["subtasks"].find(
      (item) => item.id.subtask === listItem.id.subtask
    ).priority = data.priority;

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

export const deleteSubtaskItem = async (collectionName, list, listItem) => {
  let todos = await db
    .collection(collectionName)
    .doc({ id: list.id })
    .get()
    .then((data) => {
      return data.todos;
    });

  // find index of subtask that is to be deleted
  const index = todos
    .find((item) => item.id.task === listItem.id.task)
    ["subtasks"].indexOf((item) => item.id.subtask === listItem.id.subtask);

  // delete item at that index
  todos
    .find((item) => item.id.task === listItem.id.task)
    ["subtasks"].splice(index, 1);

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

/*============================================================
Functions regarding single Todo Items
============================================================*/

export const createNewItem = async (collection, list, data) => {
  const todos = list.todos;

  todos.push({
    id: {
      list: list.id,
      task: todos.length ? todos[todos.length - 1].id.task + 1 : 0,
    },
    name: data.name,
    done: false,
    priority: data.priority,
    description: data.description,
    subtasks: [],
  });

  await db.collection(collection).doc({ id: list.id }).update({ todos: todos });
};

export const getItems = async (collection) => {
  return await db.collection(collection).get();
};

export const updateTaskData = async (collectionName, list, listItem, data) => {
  let todos = await db
    .collection(collectionName)
    .doc({ id: list.id })
    .get()
    .then((data) => {
      return data.todos;
    });

  todos.find((item) => item.id.task === listItem.id.task).description =
    data.description;
  todos.find((item) => item.id.task === listItem.id.task).name = data.name;
  todos.find((item) => item.id.task === listItem.id.task).priority =
    data.priority;

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

export const updateDone = async (collection, list, todo, done) => {
  let todos = await db
    .collection(collection)
    .doc({ id: list.id })
    .get()
    .then((data) => {
      return data.todos;
    });

  // Find todo whose ID matches the needed ID and update its done value
  (() => (todos.find((item) => item.id.task === todo.id.task).done = done))();

  await db.collection(collection).doc({ id: list.id }).update({ todos: todos });
};

export const updateSubtaskDone = async (collection, list, todo, done) => {
  let todos = await db
    .collection(collection)
    .doc({ id: list.id })
    .get()
    .then((data) => {
      return data.todos;
    });

  // Find subtask whose ID matches the needed ID and update its done value
  (() => {
    todos
      .find((item) => item.id.task === todo.id.task)
      ["subtasks"].find((item) => item.id.subtask === todo.id.subtask).done =
      done;
  })();

  await db.collection(collection).doc({ id: list.id }).update({ todos: todos });
};

export const getItemData = async (collection, id) => {
  return await db.collection(collection).doc({ id: id }).get();
};

export const deleteItem = async (collection, list, todo) => {
  let todos = await db
    .collection(collection)
    .doc({ id: list.id })
    .get()
    .then((data) => {
      return data.todos;
    });

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id.task === todo.id.task) {
      todos.splice(i, 1);
    }
  }

  await db.collection(collection).doc({ id: list.id }).update({ todos: todos });
};

/*============================================================
Functions regarding single lists (TodoLists)
============================================================*/

export const addNewList = async (collection, nameOfNewList) => {
  let lists = await getCollection(collection);
  let id = lists.length ? lists[lists.length - 1].id + 1 : 0;

  await db.collection(collection).doc(String(id)).set({
    id: id,
    name: nameOfNewList,
    todos: [],
  });
};

export const deleteList = async (collection, listId) => {
  await db.collection(collection).doc(String(listId)).delete();
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
    return [];
  }
  return collections;
};

export const getCollection = async (collectionName) => {
  return await db.collection(collectionName).get();
};

export const deleteCollection = async (collection) => {
  await db.collection("collections").doc({ name: collection }).delete();
  await db.collection(collection).delete();
};

export default updateDone;
