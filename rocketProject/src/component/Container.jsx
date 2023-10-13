import React from "react";

import MuiBox from "./MuiBox";
import ContainerBox from "./ContainerBox";
import MuiBoxContainer from "./MuiBoxContainer";
import MuiBoxFooter from "./MuiBoxFooter";
export default function Container(){
    return(
        <>
            <div>
                <ContainerBox/>
            </div>
            <div>
                <MuiBoxContainer/>
            </div>
            <div>
                <MuiBoxFooter/>
            </div>
        </>

    )
}