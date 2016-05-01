import * as types from '../constants/UserDataActionTypes';

export function updateUserData(data) {
  console.log('about to create action to update user data:' + data);
  return {
    type: types.UPDATE_USER_DATA,
    uid: data.uid,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email
  };
}