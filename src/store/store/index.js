import db from "../../localbase"
import {createStore} from "redux"
import {reducer} from "../reducers"

export const getCollections = async () => {
    return await db.collection("collections").get();
}

export const getCurrentCollection = async (collection) => {    
    return await db.collection(collection).get()
}

const initialState = {
    collections: null,
    currentCollectionName: null,
    currentCollection: null
}

export const store = createStore(reducer, initialState)