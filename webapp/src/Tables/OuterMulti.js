import { useState } from "react";
import Multi from "./Multi";
import axios from "axios";
import { useEffect } from "react";


const OuterMulti = ({ details, record }) => {

    const [du, setDu] = useState([]);
    const [profitCenter, setProfitCenter] = useState([]);
    const [client, setClient] = useState([]);
    const [selectedDu, setSelectedDu] = useState([]);
    const [selectedProfitCenter, setSelectedProfitCenter] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8080/kpi/v5/dus")
            .then(res => {
                const options = res.data.map(item => ({ label: item.name, value: item.id }));
                setDu(options);
            })
            .catch((e) => console.log(e))
            console.log(selectedDu, selectedProfitCenter,selectedClient);

    }, [])

    const onHandle = (selected) => {
        console.log('s1', selected);
        const temp = selected.map(function (row) {
            return { name: row.label }
        })
        const dUs = temp.map(object => object.name);
        setSelectedDu(dUs);
        if (selected.length) {
            const queryParams = dUs.map((item) => `dUs=${encodeURIComponent(item)}`).join('&');
            axios.get(`http://localhost:8080/kpi/v6/profitcentersbyDu?${queryParams}`)
                .then(res => {
                    const options = res.data.map(item => ({ label: item.name, value: item.id }));
                    setProfitCenter(options);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            console.log("Please select at least one item")
            setProfitCenter([]);
            setSelectedProfitCenter([])
            setClient([])
            setSelectedClient([])
            return;
        }
        // console.log(selectedDu, selectedProfitCenter,selectedClient);
        // details(selectedDu, selectedProfitCenter, selectedClient)
    }

    const onHandle2 = (selected) => {
        console.log('s2', selected);
        const temp = selected.map(function (row) {
            return { name: row.label }
        })
        const profitCenters = temp.map(object => object.name);
        setSelectedProfitCenter(profitCenters)

        if (selected.length) {
            const queryParams = profitCenters.map((item) => `profitCenters=${encodeURIComponent(item)}`).join('&');
            axios.get(`http://localhost:8080/kpi/v7/clientsbyProfitCenters?${queryParams}`)
                .then(res => {
                    const options = res.data.map(item => ({ label: item.name, value: item.id }));
                    setClient(options);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            // console.log("Please select at least one item")
            setClient([]);
            setSelectedClient([])
            return;
        }
        
    }

    const onHandle3 = (selected) => {
        console.log('s3', selected);
        const temp = selected.map(function (row) {
            return { name: row.label }
        })
        const clients = temp.map(object => object.name);

        setSelectedClient(clients);
        
    }


    const stringsDU = useState( {
        "allItemsAreSelected": "All DUs are Selected",
        "clearSearch": "Clear Search",
        "clearSelected": "Clear Selected",
        "noOptions": "No DU available",
        "search": "Search DU",
        "selectAll": "Select all DUs",
        "selectAllFiltered": "Select All (Filtered)",
        "selectSomeItems": "Select DUs",
        "create": "Create",
    });

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




    return (
        <div>
            <td>
                <Multi handler={onHandle} data1={du} data2={record.dus}  stringDisplay={stringsDU} />
            </td>
            <td>
                <Multi handler={onHandle2} data1={profitCenter} data2={record.profitCenters}   stringDisplay={stringsProfitCenter}/>
            </td>
            <td>
                <Multi handler={onHandle3} data1={client} data2={record.clients}   stringDisplay={stringsClient}/>
            </td>
        </div>
    )
}

export default OuterMulti;