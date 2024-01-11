import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddPegawai() {
  const navigate = useNavigate();
  const [formValue, setformValue] = React.useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (
      formValue.name.trim() === "" ||
      formValue.email.trim() === "" ||
      formValue.password.trim() === "" ||
      formValue.role.trim() === ""
    ) {
      alert("All fields are required. Please fill in all the fields.");
      return;
    }

    // store the states in the form data
    const FormDataInput = new FormData();
    FormDataInput.append("name", formValue.name);
    FormDataInput.append("email", formValue.email);
    FormDataInput.append("password", formValue.password);
    FormDataInput.append("role", formValue.role);

    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://smiling-ruby-gosling.cyclic.app/api/Pegawai/create",
        data: FormDataInput,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      alert("Data berhasil disimpan");
      navigate("/pegawai");
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Error adding data:", error);
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h2>Account</h2>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item text-decoration-none">
                  <Link className="text-decoration-none" to="/pegawai">
                    List Pegawai
                  </Link>
                </li>
                <li className="breadcrumb-item active">Add Pegawai</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* ... */}

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Add Pegawai</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="name">Nama</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Masukkan Nama Lengkap"
                              onChange={handleChange}
                              value={formValue.name}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              placeholder="Masukkan Email"
                              onChange={handleChange}
                              value={formValue.email}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                              className="form-control"
                              name="role"
                              onChange={handleChange}
                              value={formValue.role}
                            >
                              <option>--Pilih Posisi--</option>
                              <option value="1">Admin</option>
                              <option value="2">Kasir</option>
                              <option value="3">Teknisi</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              placeholder="Masukkan Password"
                              onChange={handleChange}
                              value={formValue.password}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary">
                          {" "}
                          Tambah
                        </button>
                        <Link
                          to={"/pegawai"}
                          className="btn btn-secondary ml-2"
                        >
                          Kembali
                        </Link>
                      </div>
                    </div>
                    {/* /.card-body */}
                  </form>
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

export default AddPegawai;
