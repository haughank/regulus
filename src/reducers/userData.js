import { UPDATE_USER_DATA } from '../constants/UserDataActionTypes';

const initialState = {
  uid: '',
  firstName: '',
  lastName: '',
  email: ''
};

export default function userData(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return {
        uid: action.uid,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email
      }
    default:
      return state;
  }
}
