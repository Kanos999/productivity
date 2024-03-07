import './App.css';
import Main from './pages/Main';
import { initializeApp } from "firebase/app";

function App() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDizA_8--2sCX_CrkC1nfDhq7_jCN9AfjY",
    authDomain: "productivity-345ab.firebaseapp.com",
    projectId: "productivity-345ab",
    storageBucket: "productivity-345ab.appspot.com",
    messagingSenderId: "735401720025",
    appId: "1:735401720025:web:bfcdc10be036763be166c8",
    measurementId: "G-MQ68BTN13Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  console.log(app);

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
