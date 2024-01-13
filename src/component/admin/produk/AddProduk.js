import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddProduk() {
  const navigate = useNavigate();
  const [formValue, setformValue] = React.useState({
    kode_produk: "",
    nama_produk: "",
    harga: "",
    stok: "",
    status: "1",
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
      formValue.kode_produk.trim() === "" ||
      formValue.nama_produk.trim() === "" ||
      formValue.harga.trim() === "" ||
      formValue.stok.trim() === ""
    ) {
      alert("All fields are required. Please fill in all the fields.");
      return;
    }

    // store the states in the form data
    const FormDataInput = new FormData();
    FormDataInput.append("kode_produk", formValue.kode_produk);
    FormDataInput.append("nama_produk", formValue.nama_produk);
    FormDataInput.append("harga", formValue.harga);
    FormDataInput.append("stok", formValue.stok);
    FormDataInput.append("status", formValue.status);

    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://192.168.43.172:7122/api/Produk/create",
        data: FormDataInput,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      alert("Data berhasil disimpan");
      navigate("/produk");
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
              <h2>Master Data</h2>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item text-decoration-none">
                  <Link className="text-decoration-none" to="/produk">
                    List Produk
                  </Link>
                </li>
                <li className="breadcrumb-item active">Add Produk</li>
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
                  <h3 className="card-title">Add Produk</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="kode_produk">Kode Produk</label>
                            <input
                              type="text"
                              className="form-control"
                              name="kode_produk"
                              placeholder="Masukkan Kode Produk"
                              onChange={handleChange}
                              value={formValue.kode_produk}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="nama_produk">Nama Produk</label>
                            <input
                              type="text"
                              className="form-control"
                              name="nama_produk"
                              placeholder="Masukkan Nama Produk"
                              onChange={handleChange}
                              value={formValue.nama_produk}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor="harga">Harga</label>
                            <input
                              type="number"
                              className="form-control"
                              name="harga"
                              placeholder="Masukkan Harga"
                              onChange={handleChange}
                              value={formValue.harga}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor="stok">Stok</label>
                            <input
                              type="number"
                              className="form-control"
                              name="stok"
                              placeholder="Masukkan Stok"
                              onChange={handleChange}
                              value={formValue.stok}
                            />
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                              className="form-control"
                              name="status"
                              onChange={handleChange}
                              value={formValue.status}
                            >
                              <option value="1">Aktif</option>
                              <option value="0">Tidak Aktif</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary">
                          {" "}
                          Tambah
                        </button>
                        <Link to={"/produk"} className="btn btn-secondary ml-2">
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

export default AddProduk;
