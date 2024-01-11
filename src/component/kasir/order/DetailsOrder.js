import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function DetailsOrder() {
  const { id_order } = useParams();
  const navigate = useNavigate();
  const [formValue, setformValue] = React.useState({
    tipe_kendaraan: "",
    nomor_mesin: "",
    nomor_polisi: "",
    seri_kendaraan: "",
    name: "",
    nomor_telpon: "",
    nama_layanan: "",
    tgl_booking: "",
    alamat: "",
    status: "",
    teknisi: "",
  });
  // useEffect hook
  const fectData = React.useCallback(async () => {
    //fetching
    const response = await axios.get(
      "https://smiling-ruby-gosling.cyclic.app/api/Order/get/" + id_order
    );
    //get response data
    const data = response.data.data[0];
    //assign response data to state "formValue"
    setformValue({
      tipe_kendaraan: data.tipe_kendaraan,
      nomor_mesin: data.nomor_mesin,
      nomor_polisi: data.nomor_polisi,
      seri_kendaraan: data.seri_kendaraan,
      name: data.name,
      nomor_telpon: data.nomor_telpon,
      nama_layanan: data.nama_layanan,
      tgl_booking: new Date(data.tgl_booking).toLocaleString(),
      alamat: data.alamat,
      status: data.status,
      teknisi: data.teknisi,
    });
    console.log(data);
  }, [id_order]);
  console.log(formValue);

  //useEffect hook
  React.useEffect(() => {
    //panggil method "fetchData"
    fectData();
  }, [fectData, id_order]);

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (formValue.status.trim() === "" || formValue.teknisi.trim() === "") {
      alert("All fields are required. Please fill in all the fields.");
      return;
    }

    // store the states in the form data
    const FormDataInput = new FormData();
    FormDataInput.append("status", formValue.status);
    FormDataInput.append("teknisi", formValue.teknisi);

    try {
      // make axios post request
      const response = await axios({
        method: "put",
        url: "https://smiling-ruby-gosling.cyclic.app/api/Order/updateStatus/" + id_order,
        data: FormDataInput,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      alert("Data berhasil diubah");
      navigate("/data-order");
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
              <h2>Transaksi</h2>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item text-decoration-none">
                  <Link className="text-decoration-none" to="/data-order">
                    List Order
                  </Link>
                </li>
                <li className="breadcrumb-item active">Detail Order</li>
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
                  <h3 className="card-title">Detail Order</h3>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h5>Data Kendaraan Customer</h5>
                    <div className="row">
                      <div className="col-2">
                        <div className="form-group">
                          <label htmlFor="tipe_kendaraan">Tipe</label>
                          <input
                            type="text"
                            className="form-control"
                            name="tipe_kendaraan"
                            value={formValue.tipe_kendaraan}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="seri_kendaraan">Merek/Seri</label>
                          <input
                            type="text"
                            className="form-control"
                            name="seri_kendaraan"
                            value={formValue.seri_kendaraan}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="nomor_mesin">No. Mesin</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nomor_mesin"
                            value={formValue.nomor_mesin}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="nomor_polisi">Plat Nomor</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nomor_polisi"
                            value={formValue.nomor_polisi}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <h5>Data Pemesanan Customer</h5>
                    <div className="row">
                      <div className="col-2">
                        <div className="form-group">
                          <label htmlFor="name">Customer</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formValue.name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="form-group">
                          <label htmlFor="nomor_telpon">No. Telpon</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nomor_telpon"
                            value={formValue.nomor_telpon}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="nama_layanan">Layanan</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nama_layanan"
                            value={formValue.nama_layanan}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="form-group">
                          <label htmlFor="alamat">Alamat</label>
                          <textarea
                            type="text"
                            className="form-control"
                            name="alamat"
                            value={formValue.alamat}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="tgl_booking">Tanggal & Waktu</label>
                          <input
                            type="text"
                            className="form-control"
                            name="tgl_booking"
                            value={formValue.tgl_booking}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="teknisi">Teknisi</label>
                          <input
                            type="text"
                            className="form-control"
                            name="teknisi"
                            onChange={handleChange}
                            value={formValue.teknisi}
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group">
                          <label htmlFor="status">Status</label>
                          <select
                            className="form-control"
                            name="status"
                            onChange={handleChange}
                            value={formValue.status}
                          >
                            <option value="pending">Pending</option>
                            <option value="dikonfirmasi">Dikonfirmasi</option>
                            <option value="diterima">Diterima</option>
                            <option value="on progress">On Progress</option>
                            <option value="selesai">Selesai</option>
                            <option value="tidak diterima">
                              Tidak Diterima
                            </option>
                            <option value="dibatalkan">Dibatalkan</option>
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
                        to={"/data-order"}
                        className="btn btn-secondary ml-2"
                      >
                        Kembali
                      </Link>
                    </div>
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

export default DetailsOrder;
