import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { MultiSelect } from "react-multi-select-component";

const Outerdropdown = () => {

    const stringsDU = {
        "allItemsAreSelected": "All DUs are Selected",
        "clearSearch": "Clear Search",
        "clearSelected": "Clear Selected",
        "noOptions": "No DU available",
        "search": "Search DU",
        "selectAll": "Select all DUs",
        "selectAllFiltered": "Select All (Filtered)",
        "selectSomeItems": "Select DUs",
        "create": "Create",
    };

    const stringsProfitCenter = {
        "allItemsAreSelected": "All Profit Centers are Selected",
        "clearSearch": "Clear Search",
        "clearSelected": "Clear Selected",
        "noOptions": "No Profit Center available",
        "search": "Search Profit Center",
        "selectAll": "Select all Profit Centers",
        "selectAllFiltered": "Select All (Filtered)",
        "selectSomeItems": "Select Profit Centers",
        "create": "Create",
    };

    const stringsClient = {
        "allItemsAreSelected": "All Clients are Selected",
        "clearSearch": "Clear Search",
        "clearSelected": "Clear Selected",
        "noOptions": "No Client available",
        "search": "Search Client",
        "selectAll": "Select all Clients",
        "selectAllFiltered": "Select All (Filtered)",
        "selectSomeItems": "Select Clients",
        "create": "Create",
    };


    const [options1, setOptions1] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [options3, setOptions3] = useState([]);

    const du = options1.map(function (row) {
        return { value: row.id, label: row.name }
    })

    const profitCenter = options2.map(function (row) {
        return { value: row.id, label: row.name }
    })

    const client = options3.map(function (row) {
        return { value: row.id, label: row.name }
    })


    const [selectedDu, setSelectedDu] = useState([]);
    const [selectedProfitCenter, setSelectedProfitCenter] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);

    const dUs = selectedDu.map(function (row) {
        return { name: row.label }
    })
    const profitCenters = selectedProfitCenter.map(function (row) {
        return { name: row.label }
    })
    const clients = selectedClient.map(function (row) {
        return { name: row.label }
    })

    // GET axios call dus, pcs and clients
    useEffect(() => {

        axios.get("http://localhost:8080/kpi/v5/dus")
            .then(res => setOptions1(res.data))
            .catch((e) => console.log(e))

        axios.get("http://localhost:8080/kpi/v6/profitcenters")
            .then(res => setOptions2(res.data))
            .catch((e) => console.log(e))

        axios.get("http://localhost:8080/kpi/v7/clients")
            .then(res => setOptions3(res.data))
            .catch((e) => console.log(e))
    }, [])

    if (Object.keys(dUs).length > 0 && Object.keys(profitCenters).length > 0 && Object.keys(clients).length > 0) {
        axios.put('http://localhost:8080/kpi/assign/${}', {
           dUs,
           profitCenters,
           clients
        }).then(res =>
            alert("Done")
        )
            .catch((e) => console.log(e))
    }



    return (
        <div>
        <Header/>
            <h2>Select DU</h2>
            <pre>{JSON.stringify(dUs)}</pre>
            <MultiSelect
                options={du}
                value={selectedDu}
                onChange={setSelectedDu}
                labelledBy="Select"

                shouldToggleOnHover={true}
                overrideStrings={stringsDU}

            />
            <h2>Select ProfitCenter</h2>
            <pre>{JSON.stringify(profitCenters)}</pre>
            <MultiSelect
                options={profitCenter}
                value={selectedProfitCenter}
                onChange={setSelectedProfitCenter}
                labelledBy="Select"

                shouldToggleOnHover={true}
                overrideStrings={stringsProfitCenter}
            />

            <h2>Select Client</h2>
            <pre>{JSON.stringify(clients)}</pre>
            <MultiSelect
                options={client}
                value={selectedClient}
                onChange={setSelectedClient}
                labelledBy="Select"

                shouldToggleOnHover={true}
                overrideStrings={stringsClient}
            />

        </div>
    );
};
export default Outerdropdown;