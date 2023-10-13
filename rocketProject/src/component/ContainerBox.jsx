import React from "react";
import MuiBox from "./MuiBox";
import './ContainerBox.css';
export default function ContainerBox() {
    return (
        <div className="header-container">
            <div className="container-box">
                <div><MuiBox title={"Today's Money"} money={"$53,000"} per={"+5%"} isKT={true} /></div>
                <div><MuiBox title={"Today's User"} money={"2300"} per={"+3%"} isKT={true} /></div>
                <div><MuiBox title={"New Clients"} money={"+3,462"} per={"-2%"} isKT={false} /></div>
                <div><MuiBox title={"Sales"} money={"$103,430"} per={"+5%"} isKT={true} /></div>
            </div>
        </div>

    )
}