import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Select from 'react-select';



const Role = ({ handler, record }) => {

    const data = { value: record.userRole.roleId, label: record.userRole.roleName }


    const [role, setRole] = useState([]);
    const [selectedRole, setSelectedRole] = useState(data);

    useEffect(() => {

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

        handler(selectedRole);

    }, []);

    const handleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
        handler(selectedOption);
    };


    return (
        <div>
            <Select id="s"
                value={selectedRole}
                onChange={handleChange}
                options={role}
            />
        </div>
    )
}


export default Role;