import React, { useEffect, useState, Dispatch, SetStateAction } from "react";

import { getData } from "../../helpers/fetch";
import { GridRecord, Sorting, SortHeader } from "../../models";

import "./DataGrid.css";

export const DataGrid = () => {
  const [data, setData] = useState([] as GridRecord[]);
  const [isLoading, setIsLoading] = useState(false);
  const [sorting, setSorting] = useState({ header: SortHeader.Name, isDescending: false });

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
      {isLoading ? <p>Loading data...</p> : renderTable(data, sorting, setSorting)}
    </div>
  );
};

function renderTable(data: GridRecord[], sorting: Sorting, setSorting: Dispatch<SetStateAction<Sorting>>) {
  const nameAsc = new Sorting(SortHeader.Name, false);
  const nameDesc = new Sorting(SortHeader.Name, true);
  const ageAsc = new Sorting(SortHeader.Age, false);
  const ageDesc = new Sorting(SortHeader.Age, true);
  const nickAsc = new Sorting(SortHeader.Nick, false);
  const nickDesc = new Sorting(SortHeader.Nick, true);

  data.sort((a, b) => sortData(a, b, sorting));

  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>
            Name (job title)
            <span>
              <i className="fas fa-sort-up" onClick={() => setSorting(nameAsc)}></i>
              <i className="fas fa-sort-down" onClick={() => setSorting(nameDesc)}></i>
            </span>
          </th>
          <th>
            Age
            <span>
              <i className="fas fa-sort-up" onClick={() => setSorting(ageAsc)}></i>
              <i className="fas fa-sort-down" onClick={() => setSorting(ageDesc)}></i>
            </span>
          </th>
          <th>
            Nickname
            <span>
              <i className="fas fa-sort-up" onClick={() => setSorting(nickAsc)}></i>
              <i className="fas fa-sort-down" onClick={() => setSorting(nickDesc)}></i>
            </span>
          </th>
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

function sortData(a: GridRecord, b: GridRecord, sorting: Sorting) {
  const { header, isDescending } = sorting;
  const trueVal = isDescending ? -1 : 1;
  const falseVal = isDescending ? 1 : -1;

  switch (header) {
    case SortHeader.Name:
      return a.firstName > b.firstName ? trueVal : falseVal;
    case SortHeader.Age:
      return a.age > b.age ? trueVal : falseVal;
    case SortHeader.Nick:
      return a.nickName > b.nickName ? trueVal : falseVal;
    default:
      return 0;
  }
}
