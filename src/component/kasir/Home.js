// KasirHome.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import SideNav from "./layouts/SideNav";
import Home from "./Dashboard";
import ListPegawai from "./akun/ListPegawai";
import ListCustomer from "./akun/ListCustomer";
import ListOrderKasir from "./order/ListOrder";
import ListTransaksi from "./order/ListTransaksi";
import DetailsOrder from "./order/DetailsOrder";

const KasirHome = ({ user, onLogout }) => {
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
            <Route path="/" element={<Home onLogout={handleLogout} />} />
            <Route path="/pegawai" element={<ListPegawai />} />
            <Route path="/customer" element={<ListCustomer />} />
            <Route path="/data-order" element={<ListOrderKasir />} />
            <Route path="/data-transaksi" element={<ListTransaksi />} />
            <Route
              path="/data-order/details/:id_order"
              element={<DetailsOrder />}
            />
          </>
        </Routes>
      </div>
    </Router>
  );
};

export default KasirHome;
