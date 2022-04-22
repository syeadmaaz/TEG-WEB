import React from "react";
import Personal from "./Personal/Personal";
import BankDetails from "./BankDetails/BankDetails";
import UploadDoc from "./Upload/UploadDoc";
import SubType from "./subType/SubType";
import CompanyAssociation from "./Association/CompanyAssociation";
import FinalSubmit from "./FinalSubmit/FinalSubmit"

const Screen = (props) => {
    
  let container = null;

  const getDataFromScreens = (data)=>{
    props.getData(data);
  }

  if (props.menu === 1) {
    container = (
      <div>
        <Personal
          resourceTypeID={props.resourceTypeID}
          resourceID={props.resourceID}
          disabled={
            props.completed.length > 0 &&
            props.completed.find((element) => element === 1) === 1
              ? true
              : false
          }
          getData={(data) => getDataFromScreens(data)}
        />
      </div>
    );
  } else if (props.menu === 2) {
    container = (
      <BankDetails
        resourceTypeID={props.resourceTypeID}
        resourceID={props.resourceID}
        disabled={
          props.completed.length > 0 &&
          props.completed.find((element) => element === 2) === 2
            ? true
            : false
        }
        getData={(data) => getDataFromScreens(data)}
      />
    );
  } else if (props.menu === 3) {
    container = (
      <UploadDoc
        resourceTypeID={props.resourceTypeID}
        resourceID={props.resourceID}
        disabled={
          props.completed.length > 0 &&
          props.completed.find((element) => element === 3) === 3
            ? true
            : false
        }
        getData={(data) => getDataFromScreens(data)}
      />
    );
  }
  
  // else if (props.menu === 4) {
  //   container = (
  //     <SubType
  //       resourceTypeID={props.resourceTypeID}
  //       resourceID={props.resourceID}
  //       disabled={
  //         props.completed.length > 0 &&
  //         props.completed.find((element) => element === 4) === 4
  //           ? true
  //           : false
  //       }
  //       getData={(data) => getDataFromScreens(data)}
  //     />
  //   );
  // } 
  else if (props.menu === 5) {
    container = (
      <CompanyAssociation
        resourceTypeID={props.resourceTypeID}
        resourceID={props.resourceID}
        disabled={
          props.completed.length > 0 &&
          props.completed.find((element) => element === 5) === 5
            ? true
            : false
        }
        getData={(data) => getDataFromScreens(data)}
      />
    );
  } else if (props.menu === 6) {
    container = (
      <FinalSubmit
        resourceTypeID={props.resourceTypeID}
        resourceID={props.resourceID}
        getData={(data) => getDataFromScreens(data)}
      />
    );
  }
  return (
    <div>
      {container}
    </div>
  );
};

export default Screen;
