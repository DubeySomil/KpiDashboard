import { useEffect } from "react";
import { useState } from "react";
import "./UserTable.css";

const Switch = ({ handler, record }) => {

    const [userStatus, setUserStatus] = useState(record.userStatus);
    
    useEffect(() => {
        handler(userStatus)
      }, []);

      const handleChange = (event) => {
        console.log(event.target.checked);
        setUserStatus(!event.target.checked)
        handler(event.target.checked)
      };

    return (
        <div>
            <label className="switch">
                <input type="checkbox" defaultChecked={userStatus} value={userStatus} onChange={handleChange} />
                <span className="slider round"></span>
            </label>
        </div>
    );
};

export default Switch;