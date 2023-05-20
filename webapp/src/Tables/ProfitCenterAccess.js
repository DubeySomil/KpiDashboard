import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";


const ProfitCenterAccess = () => {

    const details = [
        {
            "profitCenterId": 1,
            "profitCenterName": "Aeroline Digital"
        },
        {
            "profitCenterId": 2,
            "profitCenterName": "Aeroline Management"
        },
        {
            "profitCenterId": 3,
            "profitCenterName": "Airbus"
        },
        {
            "profitCenterId": 4,
            "profitCenterName": "Airbus Helicopter"
        },
        {
            "profitCenterId": 5,
            "profitCenterName": "Airbus India"
        },
        {
            "profitCenterId": 6,
            "profitCenterName": "CIMPA"
        },
        {
            "profitCenterId": 7,
            "profitCenterName": "CIMPA_AIRBUS"
        },
        {
            "profitCenterId": 8,
            "profitCenterName": "Dassault"
        },
        {
            "profitCenterId": 9,
            "profitCenterName": "SABCA"
        },
        {
            "profitCenterId": 10,
            "profitCenterName": "Safran"
        },
        {
            "profitCenterId": 11,
            "profitCenterName": "SAP Internal"
        },
        {
            "profitCenterId": 12,
            "profitCenterName": "SAP Jeunes"
        },
        {
            "profitCenterId": 13,
            "profitCenterName": "ST Microelectronics"
        },
        {
            "profitCenterId": 14,
            "profitCenterName": "STIE Airbus"
        },
        {
            "profitCenterId": 15,
            "profitCenterName": "Thales"
        }
    ]

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(details);
    }, []);

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map((li) => li.profitCenterName));
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

    const catalog = list.map(({ profitCenterId, profitCenterName }) => {
        return (
            <><table style={{ width: "100%" }}>
                <tr>
                    <td style={{ width: "50%" }}>
                        {profitCenterName}

                    </td>
                    <td style={{ width: "50%" }}>
                        <Checkbox
                            key={profitCenterId}
                            type="checkbox"
                            name={profitCenterName}
                            id={profitCenterId}
                            handleClick={handleClick}
                            isChecked={isCheck.includes(profitCenterName)}
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
                        Profit Center
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

export default ProfitCenterAccess;