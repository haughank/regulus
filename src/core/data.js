import Firebase from 'firebase';
import {updateUserData} from '../actions/UserDataActions';
import {updateLeagueData} from '../actions/LeagueActions';
import { store } from '../containers/App.jsx';

// TODO: find a better place for this to live
var ref = new Firebase("https://league-score.firebaseio.com");

export default {
  initialiseState() {
    // I want to link up the firebase info to redux store
    linkUserInfo();
    linkLeagueInfo();
  }
};

function linkUserInfo() {

  console.log('about to get the user info');

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
    store.dispatch(updateUserData(userData));
   }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  });
}

function linkLeagueInfo() {

  var leagueRef = ref.child('leagues');

  leagueRef.on("value", function(snapshot) {
    console.log(snapshot.val());
    store.dispatch(updateLeagueData(snapshot.val()));
   }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
  // here I should dispatch to store that network error occured
  });
}
