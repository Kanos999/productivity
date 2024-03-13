import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config"

let uid;

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log("USER SIGNED IN:", uid);
  } else {
    console.log("USER SIGNED OUT");
  }
});

const getUserId = () => {
  return uid;
}

export { getUserId };