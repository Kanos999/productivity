import { ref, set, push, onValue } from "firebase/database";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence  } from "firebase/auth";
import { db, auth } from "../firebase.config"


//////////////////////////////////////////////////////////////////
//
//  AUTHENTICATION
//
const login = (email, password, callback) => {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    }).then((userCredential) => {
      // Logged in 
      const user = userCredential.user;
      callback(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
}

const signup = (email, password, callback) => {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return createUserWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      callback(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
};


const initialiseAccount = (userId, activities, callback) => {
  console.log(activities)
  // Initialise activites for user
  const activitiesRef = ref(db, 'activities/' + userId);

  activities.forEach(activity => {
    const newActivityRef = push(activitiesRef);
    set(newActivityRef, {
        name: activity,
        attention: 1
    });
  });

  callback();
};


//////////////////////////////////////////////////////////////////
//
//  ACTIVITIES AND SESSIONS
//
const getActivities = (callback) => {
  auth.authStateReady().then(() => {
    const activitiesRef = ref(db, 'activities/' + auth.currentUser.uid);
    onValue(activitiesRef, (snapshot) => {
      const data = snapshot.val();
      const flattenedArray = Object.entries(data).map(([id, value]) => ({
        id,
        ...value
      }));
      callback(flattenedArray);
    }, console.log);
  });
};


const getSessions = (callback) => {
  auth.authStateReady().then(() => {
    const sessionsRef = ref(db, 'sessions/' + auth.currentUser.uid);
    onValue(sessionsRef, (snapshot) => {
      if (!snapshot.val()) callback([]);
      else {
        const data = Object.values(snapshot.val());
        const flattenedArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        console.log(flattenedArray)
        callback(flattenedArray);
      }
    });
  });
};

const postSession = (userId, activity, time) => {
  console.log("Posting activity:", userId)

  // Initialise activites for user
  const sessionsRef = ref(db, 'sessions/' + userId);
  const newSessionRef = push(sessionsRef);
  set(newSessionRef, {
    time: time,
    activity: activity,
    date: (new Date()).toDateString()
  });
};

export { 
  login,
  signup,
  initialiseAccount, 
  getActivities, 
  getSessions, 
  postSession 
};
