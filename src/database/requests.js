import { getDatabase, ref, set, push, get, child } from "firebase/database";

const initialiseAccount = (userId, activities, callback) => {
  const db = getDatabase();

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
}

const getActivities = (userId, callback) => {
  console.log("Fetching")
  const db = getDatabase();
  //const activitiesRef = ref(db, 'activities/' + userId);
  get(child(db, `activities/${userId}`)).then((snapshot) => {
    const data = snapshot.val();
    console.log(Object.values(data));
    callback(Object.values(data));
  });
}

export { initialiseAccount, getActivities };
