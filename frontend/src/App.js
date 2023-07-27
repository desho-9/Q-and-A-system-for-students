import {React,useEffect} from "react";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Login from "./Components/auth/Login";
import Quora from './Components/Quora';
import {login,selectUser} from "./feature/userSlice";
import {getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
  const auth=getAuth();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();;
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      {user ? <Quora/> : <Login/>}
    </div>
  );
}

export default App;
