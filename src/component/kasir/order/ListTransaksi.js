import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ListTransaksi() {
  //define state
  const [datatransaksi, setDataTransaksi] = useState([]);

  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://smiling-ruby-gosling.cyclic.app/api/Transaksi/get"
    );
    //get response data
    const data = await response.data.data;
    //assign response data to state "datatransaksi"
    setDataTransaksi(data);
    console.log(data);
  };

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return "Unpaid";
      case 1:
        return "Paid";
      default:
        return "Undefined";
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Kode",
      selector: (row) => row.kode_transaksi,
      sortable: true,
    },
    {
      name: "Total Harga",
      selector: (row) => row.total_harga,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => getStatus(row.status),
      sortable: true,
    },
  ];

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Transaksi</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item text-decoration-none">
                  <Link className="text-decoration-none" to="/data-transaksi">
                    List Transaksi
                  </Link>
                </li>
                <li className="breadcrumb-item active">List Transaksi</li>
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
                  <h3 className="card-title">List Transaksi</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <DataTable
                    columns={columns}
                    data={datatransaksi}
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
export default ListTransaksi;
