import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

function ChartsSelectKpisDropdown({ kpiList, detail2 }) {
    const [selectedKpis, setSelectedKpis] = useState([]);

    const strings2 = {
        "allItemsAreSelected": "All KPIs are Selected",
        "clearSearch": "Clear Search",
        "clearSelected": "Clear Selected",
        "noOptions": "No KPI available",
        "search": "Search KPI",
        "selectAll": "Select all KPIs",
        "selectAllFiltered": "Select All (Filtered)",
        "selectSomeItems": "Select KPIs",
        "create": "Create",
    };


    const handleKpiChange = (selectedOption) => {
        setSelectedKpis(selectedOption);
        console.log("This is Selected KPI: ", selectedOption);
        detail2(selectedOption);

    };
    return (
        <div style={{ width: "20vw", margin: "2%" }}>
            {/* <pre>Selected Projects : {JSON.stringify(selectedKpis)}</pre> */}
            <MultiSelect
                options={kpiList}
                value={selectedKpis}
                onChange={handleKpiChange}
                labelledBy="Select"
                shouldToggleOnHover={true}
                overrideStrings={strings2}
            />
        </div>
    )
}

export default ChartsSelectKpisDropdown
