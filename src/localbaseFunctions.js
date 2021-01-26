import db from "./localbase";

/*============================================================
Functions regarding the Todo Items in the "selectedTable" Component
============================================================*/

export const createNewItem = async (selectedList, value) => {
  let arr = await getItems(selectedList);

  await db.collection(selectedList).add({
    id: arr.length ? arr[arr.length - 1].id + 1 : 0,
    name: value,
    done: false,
    priority: "",
    description: "",
    subtasks: [],
  });
};

export const getItems = async (selectedList) => {
  return await db.collection(selectedList).get();
}

export const updateDone = async (collection, ident, done) => {
  await db.collection(collection).doc({ id: ident }).update({ done: done });
};

export const getItemData = async (collection, id) => {
  return await db.collection(collection).doc({ id: id }).get();
};

export const updateItem = async (collection, data) => {
  await db.collection(collection).doc({ id: data.id }).update({
    name: data.name,
    description: data.description,
    priority: data.priority,
  });
};

export const deleteItem = async (selectedList, id) => {
  await db.collection(selectedList).doc({ id: id }).delete();
}

/*============================================================
Functions regarding the collections (TodoLists) on the sidebar
============================================================*/

export const getCollections = async () => {
  const collections = await db
    .collection("collections")
    .doc("collectionList")
    .get();

  if (collections === null) {
    await db.collection("collections").add({ data: [] }, "collectionList");
    return [];
  }
  return collections.data;
};

export const deleteItemFromCollectionsList = async (collectionName) => {
  let collections = await getCollections();

  let counter = 0;
  for (let collection of collections) {
    if (collection.name === collectionName) {
      collections.splice(counter, 1);
    } else {
      counter++;
    }
  }

  await db
    .collection("collections")
    .doc("collectionList")
    .set({ data: collections });

  return collections;
};

export const overwriteCollections = async (collections) => {
  await db
    .collection("collections")
    .doc("collectionList")
    .set({ data: collections });
};

export const deleteCollection = async (collection) => {
  await deleteItemFromCollectionsList(collection);
  await db.collection(collection).delete();
};

export default updateDone;
