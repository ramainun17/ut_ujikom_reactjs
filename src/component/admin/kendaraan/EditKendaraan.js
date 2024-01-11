import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditKendaraan() {
  const { id_kendaraan } = useParams();
  const navigate = useNavigate();
  const [formValue, setformValue] = React.useState({
    tipe_kendaraan: "",
    status: 1,
  });
  // useEffect hook
  const fectData = React.useCallback(async () => {
    //fetching
    const response = await axios.get(
      "https://smiling-ruby-gosling.cyclic.app/api/Kendaraan/get/" +
        id_kendaraan
    );
    //get response data
    const data = response.data.data[0];
    //assign response data to state "formValue"
    setformValue({
      tipe_kendaraan: data.tipe_kendaraan,
      status: data.status,
    });
    console.log(data);
  }, [id_kendaraan]);
  console.log(formValue);

  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, [fectData, id_kendaraan]);

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (formValue.tipe_kendaraan.trim() === "") {
      alert("All fields are required. Please fill in all the fields.");
      return;
    }

    // store the states in the form data
    const FormDataInput = new FormData();
    FormDataInput.append("tipe_kendaraan", formValue.tipe_kendaraan);
    FormDataInput.append("status", formValue.status);

    try {
      // make axios post request
      const response = await axios({
        method: "put",
        url:
          "https://smiling-ruby-gosling.cyclic.app/api/Kendaraan/update/" +
          id_kendaraan,
        data: FormDataInput,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      alert("Data berhasil diubah");
      navigate("/kendaraan");
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
                  <Link className="text-decoration-none" to="/kendaraan">
                    List Kendaraan
                  </Link>
                </li>
                <li className="breadcrumb-item active">Edit Kendaraan</li>
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
                  <h3 className="card-title">Edit Kendaraan</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <label htmlFor="tipe_kendaraan">
                              Tipe Kendaraan
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="tipe_kendaraan"
                              placeholder="Masukkan Tipe Kendaraan"
                              onChange={handleChange}
                              value={formValue.tipe_kendaraan}
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
                      <div>
                        <button type="submit" className="btn btn-warning">
                          {" "}
                          Edit
                        </button>
                        <Link
                          to={"/kendaraan"}
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

export default EditKendaraan;
