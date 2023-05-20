import React from "react";
import "./table.css";
import { Button } from "react-bootstrap";



const Table = ({ data, column }) => {
  
  return (
    <table className="team-detail-table">
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem item={item} />
          ))}
        </tr>
      </thead>
      <tbody> 
        {data.map((item, index) => (
          <TableRow item={item} column={column} key={item} />
        ))}
      </tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr >
    {column.map((columnItem, index) => {
      if (columnItem.heading === "Assign Project") {
        return (
          <>
            <td>
              <Button onClick={(e) => alert()} >Assign to this project </Button>
            </td>
          </>
        );
      } else {
      }
    })}
  </tr>
);

export default Table;
