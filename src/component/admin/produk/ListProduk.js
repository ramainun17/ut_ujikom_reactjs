import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ListProduk() {
  //define state
  const [dataproduk, setDataProduk] = useState([]);
  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);
  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://192.168.43.172:7122/api/Produk/get"
    );
    //get response data
    const data = await response.data.data;
    //assign response data to state "dataproduk"
    setDataProduk(data);
    console.log(data);
  };
    // Function to handle delete
  const handleDelete = async (id_produk) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        // Make axios delete request
        const response = await axios.delete(
          `https://192.168.43.172:7122/api/Produk/delete/${id_produk}`
        );

        console.log(response);
        alert(`Data ${id_produk} berhasil dihapus`);
        fectData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
  },
    {
      name: "Kode",
      selector: (row) => row.kode_produk,
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row) => row.nama_produk,
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row) => row.harga,
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row) => row.stok,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (row.status === 1 ? "Aktif" : "Tidak Aktif"),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <Link
            to={"/produk/edit/" + row.id_produk}
            className="btn btn-warning mr-2"
          >
            <i className="nav-icon fas fa-edit" />
          </Link>
          <button
            onClick={() => handleDelete(row.id_produk)}
            className="btn btn-danger"
          >
            <i className="nav-icon fas fa-trash" />
          </button>
        </>
      ),
      sortable: false,
    },
  ];
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Master Data</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item text-decoration-none">
                  <Link className="text-decoration-none" to="/produk">List Produk</Link>
                </li>
                <li className="breadcrumb-item active">List Produk</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">List Produk</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <Link to="/produk/add" className="btn btn-primary">
                    <i className="nav-icon fas fa-plus-circle mr-2" /> Tambah Data
                  </Link>
                  <DataTable
                    columns={columns}
                    data={dataproduk}
                    pagination
                  />
                </div>
                {/* /.card-body */}
              </div>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
}

export default ListProduk;
