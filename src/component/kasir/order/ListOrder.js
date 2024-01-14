import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function ListOrder() {
  //define state
  const [dataorder, setDataOrder] = useState([]);

  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, []);

  //function "fetchData"
  const fectData = async () => {
    //fetching
    const response = await axios.get(
      "https://smiling-ruby-gosling.cyclic.app/api/Order/getSpesial"
    );
    //get response data
    const data = await response.data.data;
    //assign response data to state "dataorder"
    setDataOrder(data);
    console.log(data);
  };

  const copyToClipboard = (token) => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = token;

    // Append the input element to the DOM
    document.body.appendChild(tempInput);

    // Select the text in the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Customer",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "No. HP",
      selector: (row) => row.nomor_telpon,
      sortable: true,
    },
    {
      name: "Layanan",
      selector: (row) => row.nama_layanan,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Token",
      cell: (row) => (
        <>
          <button
            className="btn btn-success"
            onClick={() => copyToClipboard(row.remember_token)}
          >
            Copy Token
          </button>
        </>
      ),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <Link
            to={"/data-order/details/" + row.id_order}
            className="btn btn-info mr-2"
          >
            Details
          </Link>
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
              <h1>Transaksi</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item text-decoration-none">
                  <Link className="text-decoration-none" to="/data-order">
                    List Order
                  </Link>
                </li>
                <li className="breadcrumb-item active">List Order</li>
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
                  <h3 className="card-title">List Order</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <DataTable columns={columns} data={dataorder} pagination />
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
export default ListOrder;
