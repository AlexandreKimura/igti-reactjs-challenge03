import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Expense from "./components/Expense";
import { authContext, IUser } from "./contexts/authContext";
import { getSession } from "./services/loginApi";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    (async function getUserSession() {
      try {
        setUser(await getSession());
      } catch (err) {
        setUser(null);
      }
    })();
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Routes>
            <Route path="/:dateInfo" element={<Expense />}></Route>
            <Route path="/" element={<Expense />}></Route>
          </Routes>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <Login onSignIn={(user) => setUser(user)} />;
  }
}

export default App;
