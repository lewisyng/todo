import db from "./localbase";


// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Functions regarding the Todo Items in the "selectedTable" Component

export const updateDone = async (collection, ident) => {
  await db.collection(collection).doc({ id: ident }).update({ done: true });
};

export const update = async (collection, ident, key, newVal) => {
  await db
    .collection(collection)
    .doc({ id: ident })
    .update({ [key]: newVal });
};


// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
// Functions regarding the collections (TodoLists) on the sidebar

export const getCollections = async () => {
  const collections = await db
    .collection("collections")
    .doc("collectionList")
    .get();

  if (collections === null) {
    await db.collection("collections").add({ data: [] }, "collectionList");
    return [];
  } else {
    return collections.data;
  }
};

export const deleteItemFromCollectionsList = async (index) => {
  let collections = await getCollections();
  collections.splice(index, 1);

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

export const deleteCollection = async (index, collection) => {
  await db.collection(collection).delete();
  await deleteItemFromCollectionsList(index);
};

export default updateDone;
