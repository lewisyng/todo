import db from "./localbase";

/*============================================================
Functions regarding the Todo Items in the "selectedTable" Component
============================================================*/

export const updateDone = async (collection, ident) => {
  await db.collection(collection).doc({ id: ident }).update({ done: true });
};

export const update = async (collection, ident, key, newVal) => {
  await db
    .collection(collection)
    .doc({ id: ident })
    .update({ [key]: newVal });
};

/*============================================================
Functions regarding the collections (TodoLists) on the sidebar
============================================================*/

export const getCollections = async () => {
  const collections = await db
    .collection("collections")
    .doc("collectionList")
    .get();
    console.log("colls", collections)

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
