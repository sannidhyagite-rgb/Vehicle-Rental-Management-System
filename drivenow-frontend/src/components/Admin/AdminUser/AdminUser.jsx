import React from 'react'
import './AdminUser.css'
import { FaUsers, FaUserTie, FaClock, FaUserCheck, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";



function AdminUser(){
    return(
        <div className="adminUser">
            <div className="header">
                <h1>User Management</h1>
                <p className="sub">Manage customers, vendors and administrators</p>
            </div>
            <div className="stats-section">
                    
                    <div className="stat-card">
                      <div>
                        <p className="label">Total Customers</p>
                        <h2>3</h2>
                      </div>
                      <FaUsers className="icon blue" />
                    </div>
            
                    <div className="stat-card">
                      <div>
                        <p className="label">Total Vendors</p>
                        <h2>2</h2>
                      </div>
                      <FaUserTie className="icon green" />
                    </div>
            
                    <div className="stat-card">
                      <div>
                        <p className="label">Pending Approval</p>
                        <h2>1</h2>
                      </div>
                      <FaClock className="icon yellow" />
                    </div>
            
                    <div className="stat-card">
                      <div>
                        <p className="label">Active Users</p>
                        <h2>4</h2>
                      </div>
                      <FaUserCheck className="icon purple" />
                    </div>
                  </div>

                  <table className="user-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Activity</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                        <td><strong>John Doe</strong><br /><div className='contact'><div className='contact-row'><MdEmail className='contact-icon'/><span>john@example.com</span></div><div className='contact-row'><MdPhone className='contact-icon'/><span>+1 (555) 987-6543</span></div></div></td>
                        <td><FaUsers/> Customer</td>
                        <td><span className="pill active">Active</span></td>
                        <td>12 bookings<br />$2,840</td>
                        <td>2023-05-15</td>
                        <td className="actions"><div className="action-icons">
                            <button className="icon-btn view-btn">
                            <FaEye />
                            </button>
                            <button className="icon-btn edit-btn">
                            <FaEdit />
                            </button>
                            <button className="icon-btn delete-btn">
                            <FaTrash />
                            </button>
                        </div></td>
                        </tr>

                        <tr>
                        <td><strong>AutoFleet LLC</strong><br /><div className='contact'><div className='contact-row'><MdEmail className='contact-icon' /><span>contact@autofleet.com</span></div><div className='contatc-row'><MdPhone className='contact-icon'/><span>+1 (555) 456-7890</span></div></div></td>
                        <td><FaUserTie/> Vendor</td>
                        <td><span className="pill pending">Pending</span></td>
                        <td>15 vehicles<br />$45,000</td>
                        <td>2024-01-10</td>
                        <td className="actions"><div className="action-icons">
                            <button className="icon-btn view-btn">
                                <FaEye />
                            </button>
                            <button className="icon-btn edit-btn">
                                <FaEdit />
                            </button>
                            <button className="icon-btn delete-btn">
                                <FaTrash />
                            </button>
                        </div></td>
                        </tr>

                        <tr>
                        <td><strong>Sarah Miller</strong><br /><div className='contact'><div className='contact-row'><MdEmail className='contact-icon'/><span>sarah@email.com</span></div><div className='contact-row'><MdPhone className='contact-icon'/><span>+1 (555) 234-5678</span></div></div></td>
                        <td><FaUsers/> Customer</td>
                        <td><span className="pill blocked">Suspended</span></td>
                        <td>3 bookings<br />$780</td>
                        <td>2023-11-05</td>
                        <td className="actions"><div className="action-icons">
                            <button className="icon-btn view-btn">
                                <FaEye />
                            </button>
                            <button className="icon-btn edit-btn">
                                <FaEdit />
                            </button>
                            <button className="icon-btn delete-btn">
                                <FaTrash />
                            </button>
                        </div></td>
                        </tr>
                        <tr>
                        <td><strong>EcoRentals</strong><br /><div className='contact'><div className='contact-row'><MdEmail className='contact-icon'/><span>john@example.com</span></div><div className='contact-row'><MdPhone className='contact-icon'/><span>+1 (555) 123-4567</span></div></div></td>
                        <td><FaUsers/> Customer</td>
                        <td><span className="pill active">Active</span></td>
                        <td>12 bookings<br />$2,840</td>
                        <td>2023-05-15</td>
                        <td className="actions"><div className="action-icons">
                            <button className="icon-btn view-btn">
                            <FaEye />
                            </button>
                            <button className="icon-btn edit-btn">
                            <FaEdit />
                            </button>
                            <button className="icon-btn delete-btn">
                            <FaTrash />
                            </button>
                        </div></td>
                        </tr>

                        <tr>
                        <td><strong>Mike Johnson</strong><br /><div className='contact'><div className='contact-row'><MdEmail className='contact-icon'/><span>mike@email.com</span></div><div className='contact-row'><MdPhone className='contact-icon'/><span>+1 (555) 345-6789</span></div></div></td>
                        <td><FaUserTie/> Vendor</td>
                        <td><span className="pill pending">Pending</span></td>
                        <td>15 vehicles<br />$45,000</td>
                        <td>2024-01-10</td>
                        <td className="actions"><div className="action-icons">
                            <button className="icon-btn view-btn">
                                <FaEye />
                            </button>
                            <button className="icon-btn edit-btn">
                                <FaEdit />
                            </button>
                            <button className="icon-btn delete-btn">
                                <FaTrash />
                            </button>
                        </div></td>
                        </tr>

                        <tr>
                        <td><strong>Admin User</strong><br />
                        <div className='contact'><div className='contact-row'><MdEmail className="contact-icon" /><span>admin@email.com</span></div><div className='contact-row'><MdPhone className="contact-icon" /><span>+1 (555) 111-2222</span></div></div></td>
                        <td><FaUsers/> Customer</td>
                        <td><span className="pill blocked">Suspended</span></td>
                        <td>3 bookings<br />$780</td>
                        <td>2023-11-05</td>
                        <td className="actions"><div className="action-icons">
                            <button className="icon-btn view-btn">
                                <FaEye />
                            </button>
                            <button className="icon-btn edit-btn">
                                <FaEdit />
                            </button>
                            <button className="icon-btn delete-btn">
                                <FaTrash />
                            </button>
                        </div></td>
                        </tr>
                    </tbody>
                   </table>
        </div>
        
    )
}

export default AdminUser;