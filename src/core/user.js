import Firebase from 'firebase';
import {updateUserData} from '../actions/UserDataActions';
import { store } from '../containers/App.jsx';

// TODO: find a better place for this to live
var ref = new Firebase("https://league-score.firebaseio.com");

export default {
  initialiseState() {
    // I want to link up the firebase user info to redux

    // 2 options here: get uid from firebase or local storage

    // option 1: firebase
    // var authData = ref.getAuth();
    // var uid = authData.uid;

    // option 2: localstorage
    var uid = localStorage.uid;

    // get the ref to the user account
    var userRef = ref.child('users').child(uid);

    userRef.on("value", function(snapshot) {
      console.log(snapshot.val());
      var userData = {
         uid: uid,
         ...snapshot.val()
      }
      console.log(userData);
      store.dispatch(updateUserData(userData));
     }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    });
  }
};
