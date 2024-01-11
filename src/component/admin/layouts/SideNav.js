import React, { useState } from "react";
import { Link } from "react-router-dom";

function SideNav() {
  const [dropdownStates, setDropdownStates] = useState({
    datajual: false,
    // ... tambahkan menu lain jika diperlukan
  });

  // Fungsi untuk menangani klik pada item yang memiliki submenu
  const handleDropdownToggle = (menu) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [menu]: !prevStates[menu],
    }));
  };

  return (
    <div className="App">
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link text-decoration-none">
          <span className="mx-5">
            <i className="nav-icon fas fa-tools mr-2" />
            <strong className="brand-text font-weight-light">Zen Admin</strong>
            <i className="nav-icon fas fa-tools ml-2" />
          </span>
        </Link>

        {/* ... (Bagian lain dari sidebar) */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Item menu dengan submenu */}
            <li
              className={`nav-item ${
                dropdownStates.datajual ? "menu-open" : ""
              }`}
            >
              <Link
                to="#"
                onClick={() => handleDropdownToggle("datajual")}
                className="nav-link"
              >
                <i className="nav-icon fas fa-database" />
                <p>
                  Admin
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              {/* Submenu */}
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/produk" className="nav-link">
                    <i className="nav-icon fas fa-shopping-bag" />
                    <p>Data Produk</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/layanan" className="nav-link">
                    <i className="nav-icon fas fa-globe" />
                    <p>Data Layanan</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/kendaraan" className="nav-link">
                    <i className="nav-icon fas fa-car" />
                    <p>Data Kendaraan</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pegawai" className="nav-link">
                    <i className="nav-icon fas fa-user-lock" />
                    <p>Data Pegawai</p>
                  </Link>
                </li>
              </ul>
            </li>
            {/* Item menu tanpa submenu */}

            {/* ... (Item menu lainnya) */}
          </ul>
        </nav>
        {/* ... (Bagian lain dari sidebar) */}
      </aside>
    </div>
  );
}

export default SideNav;
