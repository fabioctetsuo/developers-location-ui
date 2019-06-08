// Action Types
export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ADD_FAILURE: 'users/ADD_FAILURE',
  REMOVE_REQUEST: 'users/REMOVE_REQUEST',
};

// Reducers
const INITIAL_STATE = {
  error: null,
  loading: false,
  data: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.data],
        loading: false,
        error: null,
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.REMOVE_REQUEST:
      return {
        ...state,
        data: state.data.filter(user => user.id !== action.payload.user),
      };
    default:
      return state;
  }
}

// Action Creators
export const ActionCreators = {
  addUserRequest: (user, cordinates) => ({
    type: Types.ADD_REQUEST,
    payload: { user, cordinates },
  }),
  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),
  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
  removeUser: user => ({
    type: Types.REMOVE_REQUEST,
    payload: { user },
  }),
};
