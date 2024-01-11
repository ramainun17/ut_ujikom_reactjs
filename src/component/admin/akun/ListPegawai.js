import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ListPegawai() {
  //define state
  const [datapegawai, setDataPegawai] = useState([]);

  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://smiling-ruby-gosling.cyclic.app/api/Pegawai/get"
    );
    //get response data
    const data = await response.data.data;
    //assign response data to state "datapegawai"
    setDataPegawai(data);
    console.log(data);
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        // Make axios delete request
        const response = await axios.delete(
          `https://smiling-ruby-gosling.cyclic.app/api/Pegawai/delete/${id}`
        );

        console.log(response);
        alert(`Data ${id} berhasil dihapus`);
        fectData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const getPosisi = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Kasir";
      case 3:
        return "Teknisi";
      default:
        return "Undefined";
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
      name: "Nama",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Posisi",
      selector: (row) => getPosisi(row.role),
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <Link
            to={"/pegawai/edit/" + row.id}
            className="btn btn-warning mr-2"
          >
            <i className="nav-icon fas fa-edit" />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
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
              <h1>Account</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item text-decoration-none">
                  <Link className="text-decoration-none" to="/pegawai">
                    List Pegawai
                  </Link>
                </li>
                <li className="breadcrumb-item active">List Pegawai</li>
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
                  <h3 className="card-title">List Pegawai</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <Link to="/pegawai/add" className="btn btn-primary">
                    <i className="nav-icon fas fa-plus-circle mr-2" /> Tambahkan
                    Akun Pegawai
                  </Link>
                  <DataTable columns={columns} data={datapegawai} pagination />
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
export default ListPegawai;
