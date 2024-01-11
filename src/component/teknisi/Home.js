// TeknisiHome.js
import React from "react";
import { BrowserRouter as Router, Routes, Route,  } from "react-router-dom";
import Header from "./layouts/Header";
import SideNav from "./layouts/SideNav";
import Home from "./Dashboard";
import ListOrderTeknisi from "./order/ListOrder";
import TeknisiDetailsOrder from "./order/DetailsOrder";

const TeknisiHome = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };
  return (
    <Router>
    <div className="app-header">
      <Header />
      <SideNav />
    </div>
    <div className="app-content">
      <Routes>
        <>
          <Route path="/" element={<Home onLogout={handleLogout}/>} />
          <Route path="/teknisi/data-order" element={<ListOrderTeknisi />} />
          <Route
            path="/teknisi/data-order/details/:id_order"
            element={<TeknisiDetailsOrder />}
          />
        </>
      </Routes>
    </div>
  </Router>
  );
};

export default TeknisiHome;
