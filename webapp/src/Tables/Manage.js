import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Multi from './Multi'
import Select from 'react-select';

// pass record as props here
function Manage({ handler, record }) {

    // call useffect to get list of dus

    const x1 = record.dus.map(object => object.name);
    const x2 = record.profitCenters.map(object => object.name);
    const x3 = record.clients.map(object => object.name);
    const [du, setDu] = useState([])
    const [selectedDu, setSelectedDu] = useState(x1)
    const [profitCenter, setProfitCenter] = useState([])
    const [selectedProfitCenter, setSelectedProfitCenter] = useState(x2)
    const [client, setClient] = useState([])
    const [selectedClient, setSelectedClient] = useState(x3)

    const [role, setRole] = useState([]);
    const [selectedRole, setSelectedRole] = useState([]);

    const [userStatus, setUserStatus] = useState(record.userStatus);
    const [userName, setUserName] = useState(record.userName);

    useEffect(() => {

        axios.get("http://localhost:8080/kpi/v5/dus")
            .then(res => {
                const options = res.data.map(item => ({ value: item.id, label: item.name }));
                setDu(options);
            })
            .catch((e) => console.log(e))

        axios.get("http://localhost:8080/kpi/v2/roles")
            .then(res => {
                setRole(res.data.map(item => ({
                    value: item.roleId,
                    label: item.roleName
                })));
            })
            .catch(err => {
                console.error(err);
            });

        let data;
        if (record.userRole === null) {
            data = { value: '0', label: 'Select Role' }
        } else {
            data = { value: record.userRole.roleId, label: record.userRole.roleName }

        }
        setSelectedRole(data)



    }, [])
    
    const onHandle = (selected) => {
        // console.log('s1', selected);
        const temp = selected.map(function (row) {
            return { name: row.label }
        })
        const dUs = temp.map(object => object.name);
        setSelectedDu(dUs);
        // handler(dUs);
        if (selected.length) {
            const queryParams = dUs.map((item) => `dUs=${encodeURIComponent(item)}`).join('&');
            axios.get(`http://localhost:8080/kpi/v6/profitcentersbyDu?${queryParams}`)
                .then(res => {
                    const options = res.data.map(item => ({ value: item.id, label: item.name }));
                    setProfitCenter(options);
                })
                .catch(error => {
                    console.log(error);
                });
            handler(dUs, selectedProfitCenter, selectedClient, selectedRole, userStatus, userName);
        }
        else {
            console.log("Please select at least one du")
            setProfitCenter([]);
            setSelectedProfitCenter([])
            setClient([])
            setSelectedClient([])
            handler(dUs, [], [], selectedRole, userStatus, userName);
        }

    }

    const onHandle2 = (selected) => {
        // console.log('s2', selected);
        const temp = selected.map(function (row) {
            return { name: row.label }
        })
        const profitCenters = temp.map(object => object.name);
        setSelectedProfitCenter(profitCenters)

        if (selected.length) {
            const queryParams = profitCenters.map((item) => `profitCenters=${encodeURIComponent(item)}`).join('&');
            axios.get(`http://localhost:8080/kpi/v7/clientsbyProfitCenters?${queryParams}`)
                .then(res => {
                    const options = res.data.map(item => ({ value: item.id, label: item.name }));
                    setClient(options);
                })
                .catch(error => {
                    console.log(error);
                })
            handler(selectedDu, profitCenters, selectedClient, selectedRole, userStatus, userName);
        } else {
            console.log("Please select at least one pc")
            setClient([]);
            setSelectedClient([])
            handler(selectedDu, profitCenters, [], selectedRole, userStatus, userName);
        }


    }

    const onHandle3 = (selected) => {
        // console.log('s3', selected);
        const temp = selected.map(function (row) {
            return { name: row.label }
        })
        const clients = temp.map(object => object.name);
        setSelectedClient(clients);
        handler(selectedDu, selectedProfitCenter, clients, selectedRole, userStatus, userName);
    }


    const handleChange1 = (event) => {
        console.log('hehe',event.target.checked);
        setUserStatus(event.target.checked)
        handler(selectedDu, selectedProfitCenter, selectedClient, selectedRole, event.target.checked, userName)
    };

    const handleChange2 = (selectedOption) => {
        setSelectedRole(selectedOption);
        handler(selectedDu, selectedProfitCenter, selectedClient, selectedOption, userStatus, userName);
    };

    const handleClick = () => {
        handler(selectedDu, selectedProfitCenter, selectedClient, selectedRole, userStatus, userName);
    }

    return (
                <tr>
                    <td style={{ width: "7%" , padding:"1%" , fontSize:"1.2vw"}}>{record.userName}</td>
                    <td style={{ width: "16.5%" , fontSize:"1.1vw" }}>{record.userEmail}</td>
                    <td style={{ width: "9.5%"  }}>
                        <label className="switch">
                            <input type="checkbox" defaultChecked={userStatus} value={userStatus} onChange={handleChange1} />
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td style={{ width: "13.5%" }}>
                        <Select styles={{width:"100%"}}
                            value={selectedRole}
                            onChange={handleChange2}
                            options={role}
                        />
                    </td>
                    <Multi handler={onHandle} data1={du} data2={record.dus} />
                    <Multi handler={onHandle2} data1={profitCenter} data2={record.profitCenters} />
                    <Multi handler={onHandle3} data1={client} data2={record.clients} />
                    <td style={{ width: "10%" }}>
                        <button type="submit" onClick={handleClick} style={{backgroundColor:"purple",color:"white"}}>Submit</button>
                    </td>
                </tr> 
    )
}

export default Manage
