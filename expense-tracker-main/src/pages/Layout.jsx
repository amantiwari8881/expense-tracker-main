import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Outlet} from 'react-router';
import { ToastContainer } from "react-toastify";
function Layout() {
  return (
    <div>
      <div>
        <ToastContainer />
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
