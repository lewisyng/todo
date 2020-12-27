import db from "./localbase";

export const updateDone = async (collection, ident) => {
  await db.collection(collection).doc({ id: ident }).update({ done: true });
};

export const update = async (collection, ident, key, newVal) => {
  await db.collection(collection).doc({ id: ident }).update({ [key]: newVal})
}

export const deleteItem = async (collection, ident) => {
  await db.collection(collection).doc({ id: ident }).delete();
};

export const deleteCollection = async (collection) => {
  await db.collection(collection).delete();
}

export default updateDone;