import { useEffect, useState } from "react";
import axios from "axios";
import "./DataEntryProjectDetail.css";
const TestDataEntryProjectDetails = ({ onCreate, data }) => {
    const [DI, setDI] = useState();
    const [projects, setProjects] = useState([
        {
            projectId: "",
            projectName: "",
            projectType: "",
            projectProfitCenter: "",
            projectBU: "",
        },
    ]);
    const [projectData, setProjectData] = useState({
        projectDI: "",
        projectMethodology: "",
        projectFrequency: "",
        projectProfitCenter: "",
        projectBU: "",
        projectType: "",
        projectManager: "",
    });
    const handleSelect2 = (id) => {
        retreiveProjectDetails(parseInt(id));
    };
    useEffect(() => {
        if (data !== null) {
            let user = JSON.parse(sessionStorage.getItem("data"));
            axios
                .get(`http://localhost:8080/kpi/v3/kpis/projects/${user.data.userName}`)
                .then((res) => {
                    setProjects(res.data);
                    for (var option of document.getElementById("project").options) {
                        console.log("value of option is ", option.value);
                        console.log("value of project is ", data.projectID);
                        if (option.value == data.projectID) {
                            console.log("matched");
                            option.selected = true;
                            return;
                        }
                    }
                    handleSelect2(data.projectID);
                })
                .catch((e) => console.log(e));
        } else {
            let user = JSON.parse(sessionStorage.getItem("data"));
            axios
                .get(`http://localhost:8080/kpi/v3/kpis/projects/${user.data.userName}`)
                .then((res) => {
                    console.log("data entry data ", res.data)
                    setProjects(res.data);
                })
                .catch((e) => console.log(e));
        }
    }, []);

    const [projectId, setProjectId] = useState();

    const retreiveProjectDetails = (ID) => {
        axios
            .get(`http://localhost:8080/kpi/v3/projects/${ID}`)
            .then((res) => {
                console.log("res", res);
                setProjectData(res.data);
                setProjectId(res.data.projectID);
                onCreate(ID);
            })
            .catch((e) => console.log(e));
    };
    const handleSelect = (e) => {
        e.preventDefault();
        let ID = e.target.value;
        retreiveProjectDetails(parseInt(ID));
    };

    return (
        <>
            {/* <div className="ProjectNameSelectorDataEntry"> */}
            <table className="DisplayDetailFullTable">
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="SelectDuDisplay"><label>
                        <b>DU :</b>
                    </label>
                    </td>
                    <td><input
                        type="text"
                        name="name"
                        readOnly
                        value={projectData.projectDU}

                    /></td>
                    <td><label>
                        <b>Profit Center:</b>
                    </label>
                    </td>
                    <td><input
                        type="text"
                        name="name"
                        readOnly
                        value={projectData.projectProfitCenter}
                    /></td>
                </tr>


                <tr>
                    <td style={{ width: "20%" }}><select
                        id="project"
                        className="dropdownss"
                        onChange={(e) => handleSelect(e)}
                        style={{
                            width: "80%",
                            height: "35px",
                            backgroundColor: "#f3f3f3",
                        }}
                    >
                        <option disabled selected>

                            <b>--Select Project--</b>
                        </option>
                        {projects &&
                            projects.map((data, index) => (
                                <option
                                    className="dropdownsOptions"
                                    key={index}
                                    value={data.projectID}
                                >
                                    <b>{data.projectName}</b>
                                </option>
                            ))}
                    </select></td>
                    <td>  <label>
                        <b>  Manager:</b>
                    </label>
                    </td>
                    <td style={{ width: "17%" }}><input
                        type="text"
                        name="name"
                        readOnly
                        value={projectData.projectManager}
                    /></td>
                    <td><label>
                        <b>Type:</b>
                    </label>
                    </td>
                    <td> <input
                        type="text"
                        name="name"
                        readOnly
                        value={projectData.projectType}
                    /></td>
                    <td><label>
                        <b>DI :</b>
                    </label>
                    </td>
                    <td><input
                        type="text"
                        name="name"
                        readOnly
                        value={projectData.projectDI}
                    /></td>
                </tr>


                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><label>
                        <b>Methodology:</b>
                    </label>
                    </td>
                    <td> <input
                        type="text"
                        name="name"
                        readOnly
                        value={projectData.projectMethodology}
                    /></td>
                    <td><label>
                        <b>Frequency:</b>
                    </label>
                    </td>
                    <td><input
                        type="text"
                        name="name"
                        readOnly
                        value={projectData.projectFrequency}
                    /></td>
                </tr>
            </table>






















            {/*                
                <select
                    id="project"
                    className="dropdownss"
                    onChange={(e) => handleSelect(e)}
                    style={{
                        width: "100%",
                        height: "35px",
                        marginRight: "3%",
                        backgroundColor: "#f3f3f3",
                        marginTop: "20px",
                    }}
                >
                    <option disabled selected>
                        {" "}
                        <b>--Select Project--</b>
                    </option>
                    {projects &&
                        projects.map((data, index) => (
                            <option
                                className="dropdownsOptions"
                                key={index}
                                value={data.projectID}
                            >
                                <b>{data.projectName}</b>
                            </option>
                        ))}
                </select> */}
            {/* </div> */}

            {/* <div className="readOnlyInputs" >
                <div className="ManagerNameDisplay" >
                    <div>  <label>
                        <b>  Manager:</b>
                    </label></div>
                    <div style={{ marginLeft: "5%" }}>
                        <input
                            type="text"
                            name="name"
                            readOnly
                            value={projectData.projectManager}
                        /> </div>
                </div>

                <div className="displayInfoDiv">
                    <div className="readOnlyInputsDiv" style={{ width: "45%" }}>
                        <label>
                            <b>DU :</b>
                        </label>
                        <input
                            type="text"
                            name="name"
                            readOnly
                            value={projectData.projectDU}
                        />
                    </div>

                    <div className="readOnlyInputsDiv">
                        <label>
                            <b>Profit Center:</b>
                        </label>
                        <input
                            type="text"
                            name="name"
                            readOnly
                            value={projectData.projectProfitCenter}
                        />
                    </div>

                    <div className="readOnlyInputsDiv" style={{ width: "45%" }}>
                        <label>
                            <b>Type</b>
                        </label>
                        <input
                            type="text"
                            name="name"
                            readOnly
                            value={projectData.projectType}
                        />
                    </div>

                    <div className="readOnlyInputsDiv">
                        <label>
                            <b>DI :</b>
                        </label>
                        <input
                            type="text"
                            name="name"
                            readOnly
                            value={projectData.projectDI}
                        />
                    </div>

                    <div className="readOnlyInputsDiv" style={{ width: "45%" }}>
                        <label>
                            <b>Methodology:</b>
                        </label>
                        <input
                            type="text"
                            name="name"
                            readOnly
                            value={projectData.projectMethodology}
                        />
                    </div>

                    <div className="readOnlyInputsDiv">
                        <label>
                            <b>Frequency:</b>
                        </label>
                        <input
                            type="text"
                            name="name"
                            readOnly
                            value={projectData.projectFrequency}
                        />
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default TestDataEntryProjectDetails;
