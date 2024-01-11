import React, { useState } from "react";
import { Link } from "react-router-dom";

function SideNav() {
  const [dropdownStates, setDropdownStates] = useState({
    datatransaksi: false,
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
                dropdownStates.datatransaksi ? "menu-open" : ""
              }`}
            >
              <Link
                to="#"
                onClick={() => handleDropdownToggle("datatransaksi")}
                className="nav-link"
              >
                <i className="nav-icon fas fa-house-user" />
                <p>
                  Teknisi
                  <i className="right fas fa-angle-left" />
                </p>
              </Link>
              {/* Submenu */}
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/teknisi/data-order" className="nav-link">
                    <i className="nav-icon fas fa-money-check" />
                    <p>Data Order</p>
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
