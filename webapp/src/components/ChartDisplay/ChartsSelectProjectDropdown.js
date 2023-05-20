import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

function ChartsSelectProjectDropdown({ detail }) {

    const strings1 = {
        "allItemsAreSelected": "All Projects are Selected",
        "clearSearch": "Clear Search",
        "clearSelected": "Clear Selected",
        "noOptions": "No Projects available",
        "search": "Search Project",
        "selectAll": "Select all Projects",
        "selectAllFiltered": "Select All (Filtered)",
        "selectSomeItems": "Select Projects",
        "create": "Create",
    };


    const [options2, setOptions2] = useState([]);
    const projectOptions = options2.map(function (row) {
        return { value: row.projectID, label: row.projectName }
    })


    const [selectedProjects, setSelectedProjects] = useState([]);

    const projects = selectedProjects.map(function (row) {
        return { name: row.label }
    })

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("data"))
        axios.get(`http://localhost:8080/kpi/v3/kpis/projects/${user.data.userName}`)
            .then(res => {
                setOptions2(res.data)
            })
            .catch((e) => console.log(e))
    }, [])



    const handleChange = (selectedProjects) => {
        setSelectedProjects(selectedProjects);
        detail(selectedProjects)
    }


    return (
        <div style={{ width: "20vw", margin: "1%" }}>
            {/* <pre>Selected Projects : {JSON.stringify(projects)}</pre> */}
            <MultiSelect
                options={projectOptions}
                value={selectedProjects}
                onChange={handleChange}
                labelledBy={"Select Projects"}
                shouldToggleOnHover={true}
                overrideStrings={strings1}

            />

        </div>
    );
};

export default ChartsSelectProjectDropdown
