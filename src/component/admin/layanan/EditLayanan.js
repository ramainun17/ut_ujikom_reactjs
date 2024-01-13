import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditLayanan() {
    const { id_layanan } = useParams();
    const navigate = useNavigate();
    const [formValue, setformValue] = React.useState({
        kode_layanan: "",
        nama_layanan: "",
        keterangan: "",
        harga: "",
        status: "1",
    });

    // useEffect hook
    const fectData = React.useCallback(async () => {
        //fetching
        const response = await axios.get(
        'https://192.168.43.172:7122/api/Layanan/getById?id_layanan='+ id_layanan
        );
        //get response data
        const data = response.data.data;
        //assign response data to state "formValue"
        setformValue({
        kode_layanan: data.kode_layanan,
        nama_layanan: data.nama_layanan,
        keterangan: data.keterangan,
        harga: data.harga,
        status: data.status,
        });
        console.log(data);
    }, [id_layanan]);

    //useEffect hook
    React.useEffect(() => {
        //panggil method "fetchData"
        fectData();
    }, [fectData, id_layanan]);

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
        formValue.kode_layanan.trim() === "" ||
        formValue.nama_layanan.trim() === "" ||
        formValue.keterangan.trim() === "" ||
        formValue.harga.toString().trim() === "" 
    ) {
        alert("All fields are required. Please fill in all the fields.");
        return;
    }

    // store the states in the form data
    const FormDataInput = new FormData();
    FormDataInput.append("kode_layanan", formValue.kode_layanan);
    FormDataInput.append("nama_layanan", formValue.nama_layanan);
    FormDataInput.append("keterangan", formValue.keterangan);
    FormDataInput.append("harga", formValue.harga);
    FormDataInput.append("status", formValue.status);
  
    try {
      // make axios post request
      const response = await axios({
        method: "put",
        url: "https://192.168.43.172:7122/api/Layanan/update?id_layanan=" + id_layanan,
        data: FormDataInput,
        headers: { "Content-Type": "application/json" },
      });
  
      console.log(response);
      alert("Data berhasil diubah");
      navigate("/layanan");
    } catch (error) {
      console.error("Error Editing data:", error);
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
                  <Link className="text-decoration-none" to="/layanan">
                    List Layanan
                  </Link>
                </li>
                <li className="breadcrumb-item active">Edit Layanan</li>
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
                  <h3 className="card-title">Edit Layanan</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="kode_layanan">Kode Layanan</label>
                            <input
                              type="text"
                              className="form-control"
                              name="kode_layanan"
                              placeholder="Masukkan Kode Layanan"
                              onChange={handleChange}
                              value={formValue.kode_layanan}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="nama_layanan">Nama Layanan</label>
                            <input
                              type="text"
                              className="form-control"
                              name="nama_layanan"
                              placeholder="Masukkan Nama Layanan"
                              onChange={handleChange}
                              value={formValue.nama_layanan}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
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
                        <div className="col-6">
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
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="keterangan">Deskripsi</label>
                            <textarea
                              className="form-control"
                              name="keterangan"
                              placeholder="Masukkan Deskripsi"
                              onChange={handleChange}
                              value={formValue.keterangan}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-warning">
                          {" "}
                          Edit
                        </button>
                        <Link to={"/layanan"} className="btn btn-secondary ml-2">
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

export default EditLayanan;
