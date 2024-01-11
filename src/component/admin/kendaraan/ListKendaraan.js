import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ListKendaraan() {
  //define state
  const [datakendaraan, setDataKendaraan] = useState([]);

  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://smiling-ruby-gosling.cyclic.app/api/Kendaraan/get"
    );
    //get response data
    const data = await response.data.data;
    //assign response data to state "datakendaraan"
    setDataKendaraan(data);
    console.log(data);
  };

  // Function to handle delete
  const handleDelete = async (id_kendaraan) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        // Make axios delete request
        const response = await axios.delete(
          `https://smiling-ruby-gosling.cyclic.app/api/Kendaraan/delete/${id_kendaraan}`
        );

        console.log(response);
        alert(`Data ${id_kendaraan} berhasil dihapus`);
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
      name: "Tipe",
      selector: (row) => row.tipe_kendaraan,
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
            to={"/kendaraan/edit/" + row.id_kendaraan}
            className="btn btn-warning mr-2"
          >
            <i className="nav-icon fas fa-edit" />
          </Link>
          <button
            onClick={() => handleDelete(row.id_kendaraan)}
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
                  <Link className="text-decoration-none" to="/kendaraan">
                    List kendaraan
                  </Link>
                </li>
                <li className="breadcrumb-item active">List kendaraan</li>
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
                  <h3 className="card-title">List kendaraan</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <Link to="/kendaraan/add" className="btn btn-primary">
                    <i className="nav-icon fas fa-plus-circle mr-2" /> Tambah
                    Data
                  </Link>
                  <DataTable
                    columns={columns}
                    data={datakendaraan}
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
export default ListKendaraan;
