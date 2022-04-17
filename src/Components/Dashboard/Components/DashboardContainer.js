import React,{useState} from "react";
import CaseContainer from "../../Maps/CaseContainer";
import classes from "./DashboardContainer.module.css";
import Header from "./Header/Header";
import OnboardManager from "./OnboardManager/OnboardManager"

const DashboardContainer = (props)=>{
    let [screen,setScreen] = useState(0);
    const getScreensFromHeader = (screens)=>{
        setScreen(screens)
    }
    let screens = null;
    if(screen === 0){
        screens =(
            <div className={classes.Container}>
                <div className={classes.OnboardManager}>
                    <OnboardManager resourceID={props.resourceID}/>
                </div>
                <div className={classes.TaskManager}>
                    <div>
                        <div>
                            <div style={{background: '#5F9EA0',padding: 10,color: 'white',margin: '10px 0px'}}>

                                <p style={{margin :0}}>Upcoming Task</p>

                            </div>
                            
                            <div style={{height:'30vh',background:'white'}}>

                            </div>
                        </div>
                        <div>
                            <div style={{background: '#5F9EA0',padding: 10,color: 'white',margin: '10px 0px'}}>

                                <p style={{margin :0}}>Completed Task</p>

                            </div>
                            
                            <div style={{height:'30vh',background:'white'}}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
    else if(screen === 1){
        screens = (
            <div style={{height:'80vh'}}>
                <CaseContainer resourceID={props.resourceID}/>
            </div>)
    }
    let container = null;
    container = (
        <div style={{background:'#F2F2F2'}}>
            <div>
                {/*Header Part*/}
                <Header getData = {(screens)=>{getScreensFromHeader(screens)}}/>
            </div>
            {screens}
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