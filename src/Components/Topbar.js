import React from "react";
import DatePicker from "react-datepicker";
import "./CSS/Topbar.css";
import logo from "../pics/269_r-ssy-logo_white.png"

const TopBar = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="navbarRE">
            <nav className="navbar navbar-style">
            
                <div className="container-fluid">
                <div className="logoContainer">
                        <img src={logo} className="logo-style" alt="logo" />
                    </div>
                    <div className="titleContainer">
                        <h2>SSY Dry FFA Freight Summary </h2>
                    </div>
                    <div className="datePickerContainer">
                        <h2 style={{marginRight:"10px"}}>Summary Date:    </h2>
                        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="dd/MM/yyyy" />
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default TopBar
