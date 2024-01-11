import React, { useState } from "react";
import LoginForm from "./component/Login";
import AdminHome from "./component/admin/Home";
import KasirHome from "./component/kasir/Home";
import TeknisiHome from "./component/teknisi/Home";

const App = () => {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setRedirect(false);
  };

  const handleLogout = () => {
    setUser(null);
    setRedirect(true);
  };

  const renderHomePage = () => {
    switch (user.role) {
      case 1:
        return <AdminHome user={user} onLogout={handleLogout} />;
      case 2:
        return <KasirHome user={user} onLogout={handleLogout} />;
      case 3:
        return <TeknisiHome user={user} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  if (redirect) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div>{user ? renderHomePage() : <LoginForm onLogin={handleLogin} />}</div>
  );
};

export default App;
