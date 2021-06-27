import {
  ListType,
  SubtaskIdType,
  SubtaskType,
  TaskIdType,
  TodoType,
} from "lib/types";
import db from "./localbase";

/*============================================================
Functions regarding single Subtasks
============================================================*/

export const createNewSubtask = async (
  collectionName: string,
  list: ListType,
  item: SubtaskType,
  data: {
    name: string;
    description: string;
  }
) => {
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
        priority: "low",
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

export const deleteSubtaskItem = async (
  collectionName: string,
  list: ListType,
  subtask: SubtaskType
) => {
  let todos: any = list.todos;

  // find index of subtask that is to be deleted
  const index = todos
    .find((item: TodoType) => item.id.task === subtask.id.task)
    ["subtasks"].indexOf(
      (item: SubtaskType) => item.id.subtask === subtask.id.subtask
    );

  // delete item at that index
  todos
    .find((item: SubtaskType) => item.id.task === subtask.id.task)
    ["subtasks"].splice(index, 1);

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

/*============================================================
Functions regarding single Todo Items
============================================================*/

export const createNewItem = async (
  collectionName: string,
  list: ListType,
  data: {
    name: string;
    description: string;
  }
) => {
  const todos = list.todos;

  todos.push({
    id: {
      list: list.id,
      task: todos.length ? todos[todos.length - 1].id.task + 1 : 0,
    },
    name: data.name,
    done: false,
    priority: "low",
    description: data.description,
    subtasks: [],
  });

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

export const createNewDetailedItem = async (
  collectionName: string,
  list: ListType,
  data: {
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
  }
) => {
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

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

export const getItems = async (collectionName: string) => {
  return await db.collection(collectionName).get();
};

export const updateData = async (
  collectionName: string,
  list: ListType,
  todo: TodoType | SubtaskType,
  data: {
    id: TaskIdType | SubtaskIdType;
    name: string;
    description: string;
    priority: "low" | "medium" | "high";
    subtasks?: SubtaskType[];
  },
  type: string
) => {
  let todos: any = list.todos;

  if (type === "task") {
    todos.find((item: TodoType) => item.id.task === todo.id.task).description =
      data.description;
    todos.find((item: TodoType) => item.id.task === todo.id.task).name =
      data.name;
    todos.find((item: TodoType) => item.id.task === todo.id.task).priority =
      data.priority;

    await db
      .collection(collectionName)
      .doc({ id: list.id })
      .update({ todos: todos });
  } else {
    let todoItem = todo as SubtaskType;
    todos
      .find((item: TodoType) => item.id.task === todo.id.task)
      ["subtasks"].find(
        (item: SubtaskType) => item.id.subtask === todoItem.id.subtask
      ).description = data.description;
    todos
      .find((item: TodoType) => item.id.task === todo.id.task)
      ["subtasks"].find(
        (item: SubtaskType) => item.id.subtask === todoItem.id.subtask
      ).name = data.name;
    todos
      .find((item: TodoType) => item.id.task === todo.id.task)
      ["subtasks"].find(
        (item: SubtaskType) => item.id.subtask === todoItem.id.subtask
      ).priority = data.priority;

    await db
      .collection(collectionName)
      .doc({ id: list.id })
      .update({ todos: todos });
  }
};

export const updateDone = async (
  collectionName: string,
  list: ListType,
  todo: TodoType,
  done: boolean
) => {
  const todos: any = list.todos;

  // Find todo whose ID matches the needed ID and update its done value
  (() =>
    (todos.find((item: TodoType) => item.id.task === todo.id.task).done =
      done))();

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

export const updateSubtaskDone = async (
  collectionName: string,
  list: ListType,
  todo: SubtaskType,
  done: Boolean
) => {
  let todos: any = list.todos;

  // Find subtask whose ID matches the needed ID and update its done value
  (() => {
    todos
      .find((item: TodoType) => item.id.task === todo.id.task)
      ["subtasks"].find(
        (item: SubtaskType) => item.id.subtask === todo.id.subtask
      ).done = done;
  })();

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

export const deleteItem = async (
  collectionName: string,
  list: ListType,
  todo: TodoType
) => {
  let todos: any = list.todos;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id.task === todo.id.task) {
      todos.splice(i, 1);
    }
  }

  await db
    .collection(collectionName)
    .doc({ id: list.id })
    .update({ todos: todos });
};

/*============================================================
Functions regarding single lists (TodoLists)
============================================================*/

export const addNewList = async (
  collectionName: string,
  nameOfNewList: string
) => {
  let lists = await getCollection(collectionName);
  let id = lists.length ? lists[lists.length - 1].id + 1 : 0;

  await db.collection(collectionName).doc(String(id)).set({
    id: id,
    name: nameOfNewList,
    todos: [],
  });
};

export const deleteList = async (collectionName: string, listId: number) => {
  await db.collection(collectionName).doc(String(listId)).delete();
};

/*============================================================
Functions regarding the collections (Array of TodoLists)
============================================================*/

export const addNewCollection = async (latestID: number, value: string) => {
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

export const getCollection = async (collectionName: string) => {
  return await db.collection(collectionName).get();
};

export const deleteCollection = async (collectionName: string) => {
  await db.collection("collections").doc({ name: collectionName }).delete();
  await db.collection(collectionName).delete();
};

export default updateDone;
