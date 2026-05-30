import { useEffect, useRef, useState } from "react";
import { CreateUsers, DeleteUser, GetUsers, UpdateUsers, } from "../../services/UserService";
import Button from "../../components/Button";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [createUser, setCreateUser] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        contact: "",
    });
    const [editUserId, setEditUserId] = useState(null);
    const dialogRef = useRef(null);

    useEffect(() => {
        async function handleViewUsers() {
            try {
                const allUsers = await GetUsers({ page: 1, limit: 10 });
                setUsers(allUsers);
            } catch (err) {
                console.log(err);
            }
        }
        handleViewUsers();
    }, []);

    async function handleCreateUser(e) {
        e.preventDefault();
        try {
            if (
                !createUser.name ||
                !createUser.userName ||
                !createUser.email ||
                !createUser.password ||
                !createUser.contact
            ) {
                return confsole.log("Please fill all fields");
            }

            const createdUser = await CreateUsers(createUser);

            setUsers((prev) => [...prev, createdUser.data]);
            setCreateUser({
                name: "",
                userName: "",
                email: "",
                password: "",
                contact: "",
            });
            dialogRef.current?.close();
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setCreateUser({ ...createUser, [e.target.name]: e.target.value });
    };

    function handleEditClick(user) {
        if (editUserId === user._id) {
            return;
        }
        setCreateUser({
            name: user.name,
            userName: user.userName,
            email: user.email,
            password: "",
            contact: user.contact,
        });
        setEditUserId(user._id);
    }

    async function handleUpdateUser(e) {
        e.preventDefault();

        console.log("Create User:", createUser);
        try {
            const updatedUser = await UpdateUsers(editUserId, createUser);

            setUsers((prev) =>
                prev.map((user) => (user._id === editUserId ? updatedUser.data : user)),
            );

            setCreateUser({
                name: "",
                userName: "",
                email: "",
                password: "",
                contact: "",
            });
            setEditUserId(null);
            dialogRef.current?.close();
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteUser(userId) {
        try {
            await DeleteUser(userId);
            setUsers((prev) => prev.filter((user) => user._id !== userId));
        } catch (err) {
            console.log(err);
        }
    }

    const handleCreateDialog = () => {
        setEditUserId(null);
        setCreateUser({
            name: "",
            userName: "",
            email: "",
            password: "",
            contact: "",
        });
        dialogRef.current?.showModal();
    };

    const handleEditDialog = (user) => {
        handleEditClick(user);
        dialogRef.current?.showModal();
    };

    const handleDialogClose = () => {
        dialogRef.current?.close();
    };

    return (
        <>
            <div className="manage-users">
                <dialog ref={dialogRef} className="dialog-form">
                    <div className="close-mark">
                        <Button onClick={handleDialogClose} label="❌" />
                    </div>
                    <form onSubmit={editUserId ? handleUpdateUser : handleCreateUser}>
                        <label>Name: </label>
                        <input
                            name="name"
                            placeholder="Name"
                            value={createUser.name}
                            onChange={handleChange}
                        />{" "}
                        <br />
                        userName:{" "}
                        <input
                            name="userName"
                            placeholder="userName"
                            value={createUser.userName}
                            onChange={handleChange}
                        />{" "}
                        <br />
                        Email:{" "}
                        <input
                            name="email"
                            placeholder="Email"
                            value={createUser.email}
                            onChange={handleChange}
                        />
                        <br />
                        Password:{" "}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={createUser.password}
                            onChange={handleChange}
                        />{" "}
                        <br />
                        Contact:{" "}
                        <input
                            name="contact"
                            placeholder="Contact"
                            value={createUser.contact}
                            onChange={handleChange}
                        />{" "}
                        <br />
                        <Button type="submit" label={editUserId ? "Update" : "Create"} />
                    </form>
                </dialog>

                {users.length > 0 ? (
                    <div className="view-users">
                        <div className="dialog-open-btn">
                            <Button onClick={handleCreateDialog} label="Create +" /> <br />
                        </div>
                        <table border="1" cellPadding="12px">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>userName</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.contact}</td>
                                        <td>
                                            <div className="action-btns">
                                                <Button
                                                    onClick={() => {
                                                        handleEditClick(user);
                                                        handleEditDialog(user);
                                                    }}
                                                    label="Update"
                                                />
                                                <Button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    label="Delete"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default UserManagement;