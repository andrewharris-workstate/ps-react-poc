import React, { useEffect, useState } from "react";
import { getData } from "../../helpers/fetch";

import "./DataGrid.css";

interface GridRecord {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  age: string;
  nickName: string;
}

export const DataGrid = () => {
  const [data, setData] = useState([] as GridRecord[]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData("gridrecords")
    .then(response => response.json())
    .then(data => {
      setData(data as GridRecord[]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="poc-datagrid">
      {isLoading ? <p>Loading data...</p> : renderTable(data)}
    </div>
  );
};

function renderTable(data: GridRecord[]) {
  return (
    <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Name (job title)</th>
          <th>Age</th>
          <th>Nickname</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row =>
          <tr key={row.id}>
            <td>
              <span>{row.firstName} {row.lastName}</span>
              <span>{row.jobTitle}</span>
            </td>
            <td>{row.age}</td>
            <td>{row.nickName}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
