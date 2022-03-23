import React, { ReactEventHandler, useEffect } from "react";
import { Grid, Paper, Button, Input, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import classes from "./UploadDoc.module.css";
import axios from "../../../axios_tteg";
import Checkbox from "@mui/material/Checkbox";

const fileType = ["PDF"];

export default function UploadDoc2() {
  const [loading, setLoading] = useState(false);
  const [dtName, setDTName] = useState(null);


  useEffect(() => {
    setLoading(true);
    axios
      .get("/getDocumentTypes")
      .then((response) => {
        console.log(response);
        console.log(response.data.documentTypes);
        setLoading(false);
        setDTName(response.data.documentTypes);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);
  

  let container = null;

  
  if (loading || !dtName) <CircularProgress />;
  
  else if (dtName) {
    container = (
      <Grid>
        {dtName.map((item, index) => (
          //   <Grid className={index%2?classes.style:classes.style1}>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>{item.docTypeName}</h3>
              </Grid>
              <Grid>
                <Grid style={{ display: "flex" }}>
                  <Grid style={{ width: "80%" }}>
                    <FileUploader
                      multiple={false}
                      //   handleChange={handleChange1}
                      name="file"
                      types={fileType}
                    />
                  </Grid>
                  {/* <Checkbox checked={file1.checked} /> */}
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <p style={{ textAlign: "left", width: "60%" }}>
                    {/* {file1.value
                      ? `File name: ${file1.value.name}`
                      : "No files uploaded"} */}
                  </p>
                  <Grid style={{ padding: "1% 20% 1% 0%", width: "40%" }}>
                    <Button
                      style={{
                        borderRadius: "18px",
                        // justifyContent: "right",
                        marginLeft: "0%",
                      }}
                      type="submit"
                      color="primary"
                      variant="contained"
                      //   disabled={file1.value ? false : true}
                      //   onClick={() => {
                      //     updateDatabase(file1.value);
                      //   }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <div>
      {container}
      {/* <Grid style={{ textAlign: "center", padding: "2% 0%"}}>
        <Button
          style={{ borderRadius: "18px", justifyContent: "center" }}
          type="submit"
          color="primary"
          variant="contained"
        //   onClick={updateDatabase}
        >
          Continue
        </Button>
      </Grid> */}
    </div>
  );
}
