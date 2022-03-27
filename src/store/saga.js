// import { useDispatch } from "react-redux";
import {
  all,
  call,
  // fork,
  put,
  // take,
  takeEvery,
  // takeLatest,
} from "redux-saga/effects";
import { getCollection, getCollections } from "src/localbaseFunctions";
import {
  setCollections,
  setCurrentCollection,
  setCurrentCollectionName,
} from "./collection/collection.actions";

const getCol = async () => {
  const cols = await getCollections().then((data) => data);
  return cols;
};

function* setUp(action) {
  const collections = yield call(getCol);
  console.log("collections", collections);
  yield put(setCollections(collections));
  const currentCollectionName = yield call(getCollections);
  console.log("currentCollectionName", currentCollectionName);
  yield put(setCurrentCollectionName(currentCollectionName[0].name));
  const currentCollection = yield call(() =>
    getCollection(currentCollectionName[0].name)
  );
  console.log("getCollection", currentCollectionName[0].name);
  yield put(setCurrentCollection(currentCollection));

  //   yield put({
  //     type: "SET_COLLECTIONS",
  //     payload: {
  //       collections: collections,
  //     },
  //   });
}

export function* setUpAll() {
  yield takeEvery("SETUP", setUp);
}

export default function* rootSaga() {
  yield all([setUpAll()]);
}
