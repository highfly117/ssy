import React, { useState, useEffect } from 'react';
import "./CSS/RouteTable.css";

const RouteTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [activeTab, setActiveTab] = useState('CP1');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    if (sortConfig.key !== null) {
      setTableData((prevData) => [...prevData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }));
    }
  }, [sortConfig]);

  const requestSort = (key) => {
     setSortConfig((prevSortConfig) => {
      let direction = 'ascending';
      if (
        prevSortConfig[activeTab] &&
        prevSortConfig[activeTab].key === key &&
        prevSortConfig[activeTab].direction === 'ascending'
      ) {
        direction = 'descending';
      }
      return { ...prevSortConfig, [activeTab]: { key, direction } };
    });
  };

  const renderTableData = (routeCode) => {
    let filteredData = tableData.filter((data) => data.routeCode === routeCode);
  
    if (sortConfig.key !== null && activeTab === routeCode) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
  
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="8">No data found for {routeCode}</td>
        </tr>
      );
    }
  
    return filteredData.map((data, index) => {
      const { routeCode, routeDescription, periodCode, periodType, periodStartDate, periodEndDate, price, doD } = data;
      return (
        <tr key={index}>
          <td className="col-routeCode">{routeCode}</td>
          <td className="col-routeDescription">{routeDescription}</td>
          <td className="col-periodCode">{periodCode}</td>
          <td className="col-periodType">{periodType}</td>
          <td className="col-periodStartDate">{periodStartDate.split("T")[0]}</td>
          <td className="col-periodEndDate">{periodEndDate.split("T")[0]}</td>
          <td className="col-price">{price}</td>
          <td className="col-doD">{doD}</td>
        </tr>
      );
    });
  };

  const columnNames = {
    routeCode: "Route Code",
    routeDescription: "Route Description",
    periodCode: "Period Code",
    periodType: "Period Type",
    periodStartDate: "Period Start Date",
    periodEndDate: "Period End Date",
    price: "Price",
    doD: "DoD",
  };

  const renderTableHeader = () => {
    if (tableData.length === 0) {
      return <></>;
    }

    let header = Object.keys(tableData[0]);
    header.shift(); 
    return header.map((key, index) => {
      return <th
      className={`col-${key}`}
      key={index}
      onClick={() => requestSort(key)}
    >
      {columnNames[key]}
    </th>;
    });
  };

  const uniqueRouteCodes = [...new Set(tableData.map((data) => data.routeCode))];

  const handleTabClick = (routeCode) => {
    setActiveTab(routeCode);
  };

  return (
    <div className='RouteTableWrapper'>
      <h1>Route Table: {tableData.length > 0 ? tableData[0].priceDate.split("T")[0] : 'No data found on this date'}</h1>
      <div className="tabContainer">
        <ul className="tabList">
          {uniqueRouteCodes.map((routeCode, index) => (
            <li
              key={index}
              className={`tabItem ${activeTab === routeCode ? 'active' : ''}`}
              onClick={() => handleTabClick(routeCode)}
            >
              {routeCode}
            </li>
          ))}
        </ul>
      </div>
      <div className="tableContent">
        {uniqueRouteCodes.map((routeCode, index) => (
          <table
            key={index}
            className={`routeTable ${activeTab === routeCode ? 'active' : ''}`}
          >
            <thead>
              <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>{renderTableData(routeCode)}</tbody>
          </table>
        ))}
       
      </div>
    </div>
  );
};

export default RouteTable;
