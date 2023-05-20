import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";


const ClientAccess = () => {

    const details = [
        {
            "clientId": 3,
            "clientName": "Airbus Skywise"
        },
        {
            "clientId": 4,
            "clientName": "Airbus Atlantic"
        },
        {
            "clientId": 5,
            "clientName": "Airbus CS"
        },
        {
            "clientId": 6,
            "clientName": "Airbus E2E PLM"
        },
        {
            "clientId": 7,
            "clientName": "Airbus MO"
        },
        {
            "clientId": 8,
            "clientName": "Airbus Prog & SC"
        },
        {
            "clientId": 9,
            "clientName": "Airbus UK"
        },
        {
            "clientId": 12,
            "clientName": "CIMPA"
        },
        {
            "clientId": 13,
            "clientName": "CIMPA_BGLR"
        },
        {
            "clientId": 14,
            "clientName": "CIMPA_M_GERMANY"
        },
        {
            "clientId": 15,
            "clientName": "CIMPA_Noida"
        },
        {
            "clientId": 16,
            "clientName": "CIMPA_OTHERS"
        },
        {
            "clientId": 17,
            "clientName": "CIMPA_W_PARIS"
        }
    ];

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(details);
    }, []);

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map((li) => li.clientName));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const handleClick = (e) => {
        const { name, checked } = e.target;
        setIsCheck([...isCheck, name]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== name));
        }
    };

    console.log(isCheck);

    const catalog = list.map(({ clientId, clientName }) => {
        return (
            <>
                <table style={{ width: "100%" }}>
                    <tr>
                        <td style={{ width: "50%" }}>
                            {clientName}
                        </td>
                        <td style={{ width: "50%" }}>
                            <Checkbox
                                key={clientId}
                                type="checkbox"
                                name={clientName}
                                id={clientId}
                                handleClick={handleClick}
                                isChecked={isCheck.includes(clientName)}
                            />
                        </td>
                    </tr>
                </table>

            </>
        );
    });

    return (
        <div>

            <table style={{ width: "100%" }}>
                <tr>
                    <th style={{ width: "50%" }}>
                        Client
                    </th>

                    <th style={{ width: "50%" }}>
                        Select All
                        <Checkbox
                            type="checkbox"
                            name="selectAll"
                            id="selectAll"
                            handleClick={handleSelectAll}
                            isChecked={isCheckAll}
                        />


                    </th>
                </tr>
            </table>
            {catalog}
        </div>
    );
}

export default ClientAccess;