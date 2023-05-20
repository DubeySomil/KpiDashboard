import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserTable.css";
import { useNavigate } from "react-router-dom";
import Manage from "./Manage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserTable() {

    const notify = (message) => toast(message);
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState('');
    const [check, setCheck] = useState(false);

    const [selectedDUs, setSelectedDus] = useState([])
    const [selectedProfitCenters, setSelectedProfitCenters] = useState([])
    const [selectedClients, setSelectedClients] = useState([])
    const [selectedRole, setselectedRole] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/kpi/v1/users")
            .then(res => setUsers(res.data))
            .catch((e) => console.log(e))
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        const dUs = selectedDUs.map(string => {
            return { name: string }
        });
        const profitCenters = selectedProfitCenters.map(string => {
            return { name: string }
        });
        const clients = selectedClients.map(string => {
            return { name: string }
        });

        const role = selectedRole.label;
        const checkbox = check;
        let count = 0;
        if (dUs.length) {
            count++;
        }
        if (profitCenters.length) {
            count++;
        }
        if (clients.length) {
            count++;
        }

        if (count >= 1 && count < 3) {
            notify("Please select all DU, Profit Center and Client")
            return;
        }

        console.log("s11", dUs);
        console.log("s22", profitCenters);
        console.log("s33", clients);
        console.log("s44", role);
        console.log("s55", checkbox);

        axios.put(`http://localhost:8080/kpi/v1/assign/${userName}`, {
            dUs,
            profitCenters,
            clients,
            role,
            checkbox
        }).then(res =>
            notify("User details have been updated successfully")
        )
            .catch((e) => console.log(e))
    }

    const HandleClick = (data) => {
        console.log(data)
        setUserName(data.userName)
    }

    const handler = (s1, s2, s3, s4, s5, s6) => {
        console.log("s1", s1);
        console.log("s2", s2);
        console.log("s3", s3);
        console.log("s4", s4);
        console.log("s5", s5);
        setSelectedDus(s1);
        setSelectedProfitCenters(s2);
        setSelectedClients(s3);
        setselectedRole(s4)
        setCheck(s5);
        setUserName(s6)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <table className="Teamdetail_FullTable1" style={{width:"100%"}}>
                    <tr style={{position:"sticky",top:"0"}}>
                        {/* <thead className="teamdetail_thead"> */}
                            <th style={{ color: "white", width: "7%" , padding:"1%"}}>
                                Username
                            </th>
                            <th style={{ color: "white",width: "16.5%"  }}>
                                Email
                            </th>
                            <th style={{ color: "white",width: "9.5%"   }}>
                                User Status
                            </th>
                            <th style={{ color: "white",width: "13.5%"  }}>
                                Role
                            </th>
                            <th style={{ color: "white",width: "14.5%" }}>
                                DU
                            </th>
                            <th style={{ color: "white",width: "14.5%" }}>
                                Profit Center
                            </th>
                            <th style={{ color: "white",width: "14.5%" }}>
                                Client
                            </th>
                            <th style={{ color: "white" , width: "10%" }}>
                            
                            </th>
                        {/* </thead> */}
                    </tr>
                </table>
                <table style={{width:"100%"}}>
                    <tbody className="teamdetail_tbody">
                        {users &&
                            users.map((record, index) => (
                                <Manage handler={handler} record={record} />
                            ))}
                    </tbody>
                </table>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default UserTable;
