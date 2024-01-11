// AdminHome.js
import React from "react";
import { Link } from "react-router-dom";

const AdminHome = ({ onLogout }) => {
  return (
    <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1>AdminHome</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="#">AdminHome</Link></li>
                    <li className="breadcrumb-item active">Admin</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            <div className="row">
            <div className="col-12" id="accordion">
                <div className="card card-primary card-outline">
                <a className="d-block w-100" data-toggle="collapse" href="#collapseOne">
                    <div className="card-header">
                    <h4 className="card-title w-100">
                        Welcome Admin
                    </h4>
                    </div>
                </a>
                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                    <div className="card-body">
                        <button onClick={onLogout} className="btn btn-danger">Logout</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* /.content */}
        </div>

  );
};

export default AdminHome;
