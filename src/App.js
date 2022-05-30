import React from "react";
import Homescreen from "./screens/Homescreen";
import Loginscreen from "./screens/Loginscreen";
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

function App() {
  const user = null;
  return (
    <div className="app">
    <Router> 
      {!user ? (
      <Loginscreen />
      ) : (
        <Routes>
          <Route path="/" element={<Homescreen />} />
        </Routes>
      )}
        
    </Router>
    </div>
  )
}

export default App