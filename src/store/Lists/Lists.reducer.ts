const INITIAL_STATE = {
  lists: [],
};

export const Lists = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [...state.lists, action.payload.list],
      };
    }
  }
};

export default Lists;
