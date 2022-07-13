import React, { useEffect } from "react";
import Homescreen from "./screens/Homescreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(),(userAuth)=>{
      if(userAuth){
        //logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      }else{
        //logged out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
    <Router> 
      {!user ? (
      <Loginscreen />
      ) : (
        <Routes>
          <Route path="/profile" element={<Profilescreen />} />
          <Route path="/" element={<Homescreen />} />
        </Routes>
      )}
        
    </Router>
    </div>
  )
}

export default App