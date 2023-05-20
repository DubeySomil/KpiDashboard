import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";

const Dropdown = ({ onHandler, Catalogue, heading }) => {
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(Catalogue);
    }, [list, Catalogue]);

    const handleSelectAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck((prev) => {
            const updatedIsCheck = !isCheckAll ? list.map((li) => li.name) : [];
            onHandler(updatedIsCheck);
            return updatedIsCheck;
        });
    };

    const handleClick = (e) => {
        const { name, checked } = e.target;
        setIsCheck((prev) => {
            const updatedIsCheck = checked
                ? [...prev, name]
                : prev.filter((item) => item !== name);
            onHandler(updatedIsCheck);
            return updatedIsCheck;
        });
    };

    const catalog = list.map(({ id, name }) => {
        return (
            <><table style={{ width: "100%" }}>
                <tr>
                    <td style={{ width: "50%", textAlign: "center" }}>
                        {name}
                    </td>
                    <td style={{ width: "50%", textAlign: "center" }}>
                        <Checkbox
                            key={id}
                            type="checkbox"
                            name={name}
                            id={id}
                            handleClick={handleClick}
                            isChecked={isCheck.includes(name)}
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
                <tr >
                    <th style={{ width: "50%", textAlign: "center" }}>
                        {heading}
                    </th>

                    <th style={{ width: "50%", textAlign: "center" }}>
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
};

export default Dropdown;
