import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";


const DUAccess = () => {

    const details = [
        {
            "duId": 1,
            "dUName": "DU Aeroline (IN024)"
        },
        {
            "duId": 2,
            "dUName": "DU France V&R"
        },
        {
            "duId": 3,
            "dUName": "DU Germany"
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
        setIsCheck(list.map((li) => li.dUName));
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

    const catalog = list.map(({ duId, dUName }) => {
        return (
            <><table style={{width:"100%"}}>
                <tr>
                    <td style={{width:"50%"}}>
                {dUName}

                    </td>
                    <td style={{width:"50%"}}>
                <Checkbox
                    key={duId}
                    type="checkbox"
                    name={dUName}
                    id={duId}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(dUName)}
                />

                    </td>
                </tr>
            </table>
            </>
        );
    });

    return (
        <div>
        <table style={{width:"100%"}}>
        <tr>
            <th style={{width:"50%"}}>
            DU 
            </th>
            
            <th style={{width:"50%"}}>
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

export default DUAccess;