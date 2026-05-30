import { useState } from "react";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import BookManagement from "./BookManagement";
import UserManagement from "./UserManagement";

function AdminDashboard() {
    const [state, setState] = useState("users");

    return (
        <>
            <div className="admin-dashboard">
                <div>
                    <Navbar />
                    <div className="side-panel">
                        <h3>Library</h3>
                        <div className="side-panel-btns">
                            <Button onClick={() => setState("users")} label="Manage Users" />
                            <Button onClick={() => setState("books")} label="Manage Library" />
                        </div>
                    </div>
                </div> 

                <div className="display-section">
                    {state === "users" && <UserManagement />}
                    {/* <UserManagement /> */}
                    {state === "books" && <BookManagement />}
                </div>
            </div >
        </>
    );
}

export default AdminDashboard;