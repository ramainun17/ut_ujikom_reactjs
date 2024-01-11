import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://smiling-ruby-gosling.cyclic.app/api/v2/login",
        {
          email,
          password,
        }
      );

      if (response.data.status === 200) {
        onLogin(response.data.data[0]);
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
          <div className="card card-outline card-primary">
            <div class="card-header text-center">
              <a href="../../index2.html" class="h1"><b>Admin</b>ZEN</a>
            </div>
            <div className="card-body">
            <p class="text-center">Sign in to start your session</p>
                <div className="input-group mb-3">
                  <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                  </div>
                  {/* /.col */}
                  <div className="col-4">
                    <button className="btn btn-primary btn-block" onClick={handleLogin}>Sign In</button>
                  </div>
                  {/* /.col */}
                </div>
              {/* /.social-auth-links */}
            </div>
            {/* /.card-body */}
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>

    
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Email"
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Password"
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={handleLogin}>Login</button>
    // </div>
  );
};

export default LoginForm;
