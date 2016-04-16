import Firebase from 'firebase';

const hint = 'password1';
// TODO: find a better place for this to live
var ref = new Firebase("https://league-score.firebaseio.com");
function pretendTokenRequest(token, cb) {
  setTimeout(() => {
    if (!!token) {
      cb({
        authenticated: true,
        time: Date.now(),
        token
      });
    } else {
      cb({
        authenticated: false
      });
    }
  }, 300);
}

export default {
  onChangeHandlers: [],
  userLogin(email, password, callback) {
    // firebase login
    ref.authWithPassword({
      email    : email,
      password : password
    }, (error, authData) => {
      if (error) {
        window.alert("received error on login");
        console.log("Login Failed!", error);
        callback(false, error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        // these should be from authData
        localStorage.token = Math.random().toString(36).substring(7);
        localStorage.time = Date.now();
        callback(true, false);
      }
    });
  },

  createUser(email, password, callback) {
    // Create a new user on Firebase
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        callback(error);
      } else {
        callback(false);
      }
    });
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token;
    if (cb) {
      cb(false);
    }
  },

  // If doesn't have token or login time has passed, do not validate the token against the server.
  loggedIn(cb) {
    let authenticated;
    if (!localStorage.token || localStorage.time <= Date.now() - 1000 * 60) {
      authenticated = false;
    } else {
      pretendTokenRequest(localStorage.token, (res) => {
        cb(res.authenticated);
      });
    }
    return authenticated;
  }
};
