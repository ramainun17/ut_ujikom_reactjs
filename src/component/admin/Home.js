// AdminHome.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import SideNav from "./layouts/SideNav";
import Home from "./Dashboard";
import ListProduk from "./produk/ListProduk";
import AddProduk from "./produk/AddProduk";
import EditProduk from "./produk/EditProduk";
import ListLayanan from "./layanan/ListLayanan";
import AddLayanan from "./layanan/AddLayanan";
import EditLayanan from "./layanan/EditLayanan";
import ListKendaraan from "./kendaraan/ListKendaraan";
import AddKendaraan from "./kendaraan/AddKendaraan";
import EditKendaraan from "./kendaraan/EditKendaraan";
import ListPegawai from "./akun/ListPegawai";
import AddPegawai from "./akun/AddPegawai";
import EditPegawai from "./akun/EditPegawai";

const AdminHome = ({ user, onLogout }) => {
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
            <Route path="/produk" element={<ListProduk />} />
            <Route path="/produk/add" element={<AddProduk />} />
            <Route path="/produk/edit/:id_produk" element={<EditProduk />} />
            <Route path="/layanan" element={<ListLayanan />} />
            <Route path="/layanan/add" element={<AddLayanan />} />
            <Route path="/layanan/edit/:id_layanan" element={<EditLayanan />} />
            <Route path="/kendaraan" element={<ListKendaraan />} />
            <Route path="/kendaraan/add" element={<AddKendaraan />} />
            <Route
              path="/kendaraan/edit/:id_kendaraan"
              element={<EditKendaraan />}
            />
            <Route path="/pegawai" element={<ListPegawai />} />
            <Route path="/pegawai/add" element={<AddPegawai />} />
            <Route path="/pegawai/edit/:id" element={<EditPegawai />} />
          </>
        </Routes>
      </div>
    </Router>
  );
};

export default AdminHome;
