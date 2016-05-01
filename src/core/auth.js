import Firebase from 'firebase';

// TODO: find a better place for this to live
var ref = new Firebase("https://league-score.firebaseio.com");

export default {
  onChangeHandlers: [],
  userLogin(email, password, callback) {
    // firebase login
    ref.authWithPassword({
      email    : email,
      password : password
    }, (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
        callback(false, error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        // need to figure out why expiry time is now
        //console.log("expiry is is: ", Date(authData.expires));
        // need to figure out if local storage is the best place to leave this
        localStorage.token = authData.token;
        localStorage.tokenExpiryTime = authData.expires;
        localStorage.uid = authData.auth.uid;
        callback(true, false);
      }
    });
  },

  createUser(email, password, firstName, lastName, callback) {
    // Create a new user on Firebase
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        callback(error);
      } else {
        console.log(email);
        ref.child("users").child(userData.uid).set({
            email: email,
            firstName: firstName,
            lastName: lastName
        });
        callback(false);
      }
    });
  },

  logout(cb) {
    delete localStorage.token;
    delete localStorage.tokenExpiryTime;
    delete localStorage.uid;
    ref.unauth();
    if (cb) {
      cb(false);
    }
  },

  // If doesn't have token or login time has passed, do not validate the token against the server.
  loggedIn(cb) {
    if (!localStorage.token || Date(localStorage.tokenExpiryTime) <= Date.now()) {
      // user is not authenticated, return false
      cb(false);
    } else {
      // user is authenticated return true
      // perhaps this should be a new token request to Firebase (in this situtation we would pass authenticated value to callback)
      cb(true)
    }
  }
};
