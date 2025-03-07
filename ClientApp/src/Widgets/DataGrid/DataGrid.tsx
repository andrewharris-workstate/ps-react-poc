import React, { useEffect, useState, Dispatch, SetStateAction } from "react";

import { LoadingIndicator } from "../../components/LoadingIndicator/LoadingIndicator";
import { getData } from "../../helpers/fetch";
import { GridRecord, Sorting, SortHeader } from "../../models";

import "./DataGrid.css";

export const DataGrid = () => {
  const [data, setData] = useState([] as GridRecord[]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState({ header: SortHeader.Name, isDescending: false });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getData("gridrecords")
      .then(response => response.json())
      .then(data => {
        setData(data as GridRecord[]);
        setIsLoading(false);
      });
    }, 1000);
  }, []);

  return (
    <div className="poc-datagrid">
      {isLoading ? <LoadingIndicator loading={true} /> : renderTable(data, sorting, setSorting)}
    </div>
  );
};

function getIconClasses(sorting: Sorting, current: Sorting): string {
  let classes = `fas fa-sort-${sorting.isDescending ? 'down' : 'up'}`;

  if (Sorting.areEqual(sorting, current)) {
    classes += ' active'
  }

  return classes;
}

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
              <i className={getIconClasses(nameAsc, sorting)} onClick={() => setSorting(nameAsc)}></i>
              <i className={getIconClasses(nameDesc, sorting)} onClick={() => setSorting(nameDesc)}></i>
            </span>
          </th>
          <th>
            Age
            <span>
              <i className={getIconClasses(ageAsc, sorting)} onClick={() => setSorting(ageAsc)}></i>
              <i className={getIconClasses(ageDesc, sorting)} onClick={() => setSorting(ageDesc)}></i>
            </span>
          </th>
          <th>
            Nickname
            <span>
              <i className={getIconClasses(nickAsc, sorting)} onClick={() => setSorting(nickAsc)}></i>
              <i className={getIconClasses(nickDesc, sorting)} onClick={() => setSorting(nickDesc)}></i>
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
