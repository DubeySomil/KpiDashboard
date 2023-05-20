import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useEffect } from "react";
import { json } from "react-router-dom";

const Multi = ({ handler, data1, data2 ,stringDisplay }) => {
    
    
    // console.log("This is string display : ",JSON.stringify(stringDisplay));

    let data2updated = data2.map(function (row) {
        return { value: row.id, label: row.name }
    })


    useEffect(() => {
        handler(selected)
    }, [])

    const [selected, setSelected] = useState(data2updated);

    return (

        <td style={{ width: "14.5%" }}>
        <div style={{width:"14vw"}}>
            <MultiSelect
                options={data1}
                value={selected}
                onChange={(newSelected) => {
                    setSelected(newSelected);
                    handler(newSelected);
                }}
                labelledBy="Select"
                shouldToggleOnHover={true}
                overrideStrings={stringDisplay}
            />
            </div>
        </td>   

    )


}

export default Multi;