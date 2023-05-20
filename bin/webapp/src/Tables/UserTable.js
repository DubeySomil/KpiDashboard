import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserTable.css";

function UserTable() {

    const [users, setUsers] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/kpi/v1/users")
            .then(res => setUsers(res.data))
            .catch((e) => console.log(e))
    }, [])

    const [checkbox, setCheckbox] = useState(false);
    const [role, setRole] = useState('DI');
    const [userName, setUserName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("checkbox is", checkbox);
        console.log("role is", role);
        console.log("username is", userName)

        axios.put('http://localhost:8080/kpi/v1/update/', {
            checkbox,
            role,
            userName,
        }).then(res =>
            alert("User Role and Status Successfully")
        )
            .catch((e) => console.log(e))
    }

    const HandleClick = (data) => {
        console.log(data)
        setUserName(data.userName)
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <table className="Teamdetail_FullTable">
                    <thead className="teamdetail_thead">
                        <tr>
                            {/* <th scope="col">S.no</th> */}
                            <th scope="col" name="projectid">Username</th>
                            <th scope="col" name="projectname">Email</th>
                            <th>Assign Role</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="teamdetail_tbody">
                        {users &&
                            users.map((record, index) => (
                                <tr key={index}>
                                    <td >{record.userName}</td>
                                    <td >{record.userEmail}</td>
                                    <td>
                                        <select className='dropdownss' defaultValue={record.userRole} onChange={event => setRole(event.target.value)}>
                                            <option disabled selected >Select Role</option>
                                            <option className='dropdownsOptions' value="Admin">Admin</option>
                                            <option className='dropdownsOptions' value="DI">DI</option>
                                            <option className='dropdownsOptions' value="Manager">Manager</option>
                                        </select>
                                    </td>
                                    <td>
                                        <label className="switch">
                                            <input type="checkbox" defaultChecked={record.userStatus} onChange={event => setCheckbox(event.target.checked)} />
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button type="submit" onClick={() => HandleClick(record)}>Submit</button>
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </table>
            </form>
        </>
    );
}

export default UserTable;
