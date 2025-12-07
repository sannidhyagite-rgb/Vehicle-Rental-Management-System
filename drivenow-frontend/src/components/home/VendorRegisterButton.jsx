import React from "react";
import { Link } from "react-router-dom";
import "../../styles/vendorButton.css";

function VendorRegisterButton() {
  return (
    <Link to="/vendor/register" className="btn btn-outline vendor-btn">
      Register as Vendor
    </Link>
  );
}

export default VendorRegisterButton;
