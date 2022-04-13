import React from "react";
import classes from "./DashboardContainer.module.css";
import Header from "./Header/Header";
import OnboardManager from "./OnboardManager/OnboardManager"

const DashboardContainer = (props)=>{
    let container = null;
    container = (
        <div>
            <div>
                {/*Header Part*/}
                <Header/>
            </div>
            <div className={classes.Container}>
                {/*main Window*/}
                <div className={classes.OnboardManager}>
                    <OnboardManager resourceID={props.resourceID}/>
                </div>
                <div className={classes.TaskManager}>
                    HI
                </div>
            </div>
            <div>
                {/* Footer*/}
            </div>
        </div>
    )
    return(
        <div>
            {container}
        </div>
    )
}

export default DashboardContainer