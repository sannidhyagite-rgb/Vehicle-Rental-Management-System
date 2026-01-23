import React, { useEffect, useState } from "react";
import { getLicenseStatus } from "../../api/licenseApi";
import { getMyProfile, updateMyProfile } from "../../api/userApi";
import LicenseForm from "../../components/license/LicenseForm";

export default function CustomerProfile() {
  const [status, setStatus] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await getLicenseStatus();
      setStatus(res.data);
    } catch {
      setStatus({ submitted: false });
    }
  };

  const fetchProfile = async () => {
    const res = await getMyProfile();
    setProfile(res.data);
  };

  useEffect(() => {
    fetchProfile();
    fetchStatus();
  }, []);

  if (!profile) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  /* ---------------- LICENSE LOGIC ---------------- */

  const today = new Date();
  const expiryDate =
    status?.expiryDate ? new Date(status.expiryDate) : null;

  const isExpired =
    status?.status === "APPROVED" &&
    expiryDate &&
    expiryDate < today;

  let licenseMode = "FULL"; // FULL | LIMITED | NONE

  if (status?.status === "APPROVED" && !isExpired) {
    licenseMode = "NONE";
  } else if (status?.status === "APPROVED" && isExpired) {
    licenseMode = "LIMITED";
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">My Profile</h2>

      <div className="row g-4">
        {/* USER DETAILS */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">User Details</h5>

              <p><strong>Name:</strong> {profile.fullName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Mobile:</strong> {profile.mobileNumber}</p>
              <p><strong>City:</strong> {profile.city}</p>

              <button
                className="btn btn-outline-primary"
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* EDIT PROFILE FORM */}
          {editing && (
            <div className="card shadow-sm mt-3">
              <div className="card-body">
                <h5 className="card-title mb-3">Edit Profile</h5>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input
                    className="form-control"
                    value={profile.mobileNumber}
                    onChange={(e) =>
                      setProfile({ ...profile, mobileNumber: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    className="form-control"
                    value={profile.city}
                    onChange={(e) =>
                      setProfile({ ...profile, city: e.target.value })
                    }
                  />
                </div>

                <button
                  className="btn btn-primary me-2"
                  onClick={async () => {
                    await updateMyProfile({
                      fullName: profile.fullName,
                      mobileNumber: profile.mobileNumber,
                      city: profile.city,
                    });
                    setEditing(false);
                    fetchProfile();
                  }}
                >
                  Save Changes
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* LICENSE */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Driving License</h5>

              {!status && <p>Loading license status...</p>}

              {/* NOT SUBMITTED */}
              {status && !status.submitted && (
                <>
                  <span className="badge bg-warning text-dark">
                    Not Submitted
                  </span>
                  <p className="mt-2 text-muted">
                    Submit your driving license to continue.
                  </p>

                  <LicenseForm
                    mode="FULL"
                    initialData={{}}
                    onSuccess={fetchStatus}
                  />
                </>
              )}

              {/* SUBMITTED */}
              {status && status.submitted && (
                <>
                  <span
                    className={`badge ${
                      status.status === "APPROVED"
                        ? "bg-success"
                        : status.status === "REJECTED"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {status.status}
                  </span>

                  <p className="mt-2 text-muted">{status.message}</p>

                  {/* APPROVED & VALID */}
                  {licenseMode === "NONE" && (
                    <div className="alert alert-success mt-3">
                      License approved and valid. No changes allowed.
                    </div>
                  )}

                  {/* PENDING / REJECTED / EXPIRED */}
                  {licenseMode !== "NONE" && (
                    <LicenseForm
                      mode={licenseMode}
                      initialData={status}
                      onSuccess={fetchStatus}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
