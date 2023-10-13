import React from "react";
import { Chart } from "./Chart";
import './MuiBoxFooter.css';
import FooterItem from "./FooterItem";
import LineChart from "./LineChart";
export default function MuiBoxFooter() {
    return (
        <div className="footer">
            <div className="footer-1">
                <div className="chart">
                    <Chart/>
                </div>
                <div>
                    <div className="active-user">
                        <h2 className="a-u">Active Users</h2>
                        <p className="tlt"><b>(+23%)</b> than last week</p>
                    </div>
                    <div>
                        <div><FooterItem/></div>
                    </div>
                </div>
            </div>
            <div className="footer-2">
                <div className="footer-2-sub">
                    <LineChart />
                </div>
            </div>

        </div>
    )
}