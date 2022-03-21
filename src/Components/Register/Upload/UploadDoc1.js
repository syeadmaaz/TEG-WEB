import React, { ReactEventHandler, useEffect } from "react";
import { Grid, Paper, Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import classes from "./UploadDoc.module.css";
import axios from "../../../axios_tteg";
import Checkbox from "@mui/material/Checkbox";

const fileTypes = ["PDF"];
const fileType = ["application/pdf"];
export default function App() {
  const [file1, setFile1] = useState({
    value: null,
    isUploaded: false,
    checked: false,
  });

  // const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const [file7, setFile7] = useState(null);
  const [file8, setFile8] = useState(null);
  const [file9, setFile9] = useState(null);
  const [file10, setFile10] = useState(null);
  const [file11, setFile11] = useState(null);
  const [file12, setFile12] = useState(null);

  const [isSelected, setIsSelected] = useState(false);

  const [pdf, setPdf] = useState(null);
  const [pdfError, setPdfError] = useState(null);

  const updateDatabase = (file1) => {
    // console.log(pdf.result);
    console.log(file1);
    var formData = new FormData();

    formData.append("uploadedFile", file1);
    console.log(formData);

    axios
      .post("/uploadFile", formData, {})
      .then((response) => {
        console.log(response);
        setFile1({
          value: null,
          isUploaded: true,
          checked: true,
        });
      })
      .catch((e) => console.log(e));

    // axios
    //   .post("/handlePdf", {

    //       person_id: cookies.get("userData").person_id,
    //       user_type: cookies.get("userData").user_type,
    //       pdf: pdf.result,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     setSuccessful(true);
    //     setTimeout(() => {
    //       setSuccessful(false);
    //     }, 5000);
    //   })
    //   .catch((e) => console.log(e));
  };

  const handleChange1 = (file) => {
    setFile1({
      value: file,
      isUploaded: false,
    });

    setIsSelected(true);

    let selectedFile = file;
    if (selectedFile) {
      console.log(selectedFile.type);
      console.log(fileType.includes(selectedFile.type));

      if (selectedFile && fileType.includes(selectedFile.type)) {
        console.log("FileType validated with Selected File");
        const data = new FormData();
        data.append("file", selectedFile);
        console.log(data);
        // axios.post("/upload", data)
        // .then(response =>{
        //   console.log(response);
        // })
        // .catch(e=>console.log(e));

        // let reader = new FileReader();
        // // console.log(reader)
        // reader.readAsArrayBuffer(selectedFile);
        // setPdf(reader);
        // // reader.onload = (e) => {
        // //     setpdfError(null);
        // //     setPdf(e.target.result)
        // // };
      } else {
        setPdfError("Please select only pdf file types");
        setPdf(null);
      }
    } else {
      console.log("Please Select File");
    }
  };

  const handleChange2 = (file) => {
    setFile2(file);
  };
  const handleChange3 = (file) => {
    setFile3(file);
  };
  const handleChange4 = (file) => {
    setFile4(file);
  };
  const handleChange5 = (file) => {
    setFile5(file);
  };
  const handleChange6 = (file) => {
    setFile6(file);
  };
  const handleChange7 = (file) => {
    setFile7(file);
  };
  const handleChange8 = (file) => {
    setFile8(file);
  };
  const handleChange9 = (file) => {
    setFile9(file);
  };
  const handleChange10 = (file) => {
    setFile10(file);
  };
  const handleChange11 = (file) => {
    setFile11(file);
  };
  const handleChange12 = (file) => {
    setFile12(file);
  };

  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    let selectedFile = event.target.files[0];
    const data = new FormData();
    data.append("file", event.target.files[0]);
    console.log(data);
    axios
      .post("/upload", data, {})
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Box>
        <Paper
          elevation={24}
          style={{ height: 620, margin: 10, overflow: "auto" }}
        >
          <Grid>
            <h1
              style={{
                textAlign: "center",
                padding: "20px 10px",
                justifyContent: "center",
                margin: "0px auto",
              }}
            >
              Upload Documents
              <hr style={{ width: "50%" }} />
            </h1>
          </Grid>

          {/* <input type="file" name="file" onChange={(e) => onChangeHandler(e)} /> */}

          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>Address Proof - Govt. Doc</h3>
              </Grid>
              <Grid>
                <Grid style={{ display: "flex" }}>
                  <Grid style={{ width: "80%" }}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange1}
                      name="file"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={file1.checked} />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <p style={{ textAlign: "left", width: "60%" }}>
                    {file1.value
                      ? `File name: ${file1.value.name}`
                      : "No files uploaded"}
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
                      disabled={file1.value ? false : true}
                      onClick={() => {
                        updateDatabase(file1.value);
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>Identity Proof of Establishment</h3>
              </Grid>
              <Grid>
                <FileUploader
                  multiple={false}
                  handleChange={handleChange2}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file2 ? `File name: ${file2.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>Shop Act Gumasta</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange3}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file3 ? `File name: ${file3.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>GST Certificate</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange4}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file4 ? `File name: ${file4.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>PAN Card</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange5}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file5 ? `File name: ${file5.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>Aadhar Card</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange6}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file6 ? `File name: ${file6.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>ESIC</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange7}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file7 ? `File name: ${file7.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>PF</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange8}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file8 ? `File name: ${file8.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>Labour License</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange9}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file9 ? `File name: ${file9.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>MSME Udyog Aadhar</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange10}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file10 ? `File name: ${file10.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>A Class Certificate for Electrical Work</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange11}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file11 ? `File name: ${file11.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid>
                <h3>Work Experience Certificate</h3>
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <FileUploader
                  style={{ textAlign: "center" }}
                  multiple={false}
                  handleChange={handleChange12}
                  name="file"
                  types={fileTypes}
                />
                <p>
                  {file12 ? `File name: ${file12.name}` : "No files uploaded"}
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid style={{ textAlign: "center", padding: "2% 5% 2% 0%" }}>
            {/* <SvgButton>Continue</SvgButton> */}
            <Button
              style={{ borderRadius: "18px", justifyContent: "center" }}
              type="submit"
              color="primary"
              variant="contained"
              onClick={updateDatabase}
            >
              Continue
            </Button>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
