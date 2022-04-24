import React, { ReactEventHandler, useEffect } from "react";
import { Grid, Paper, Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import classes from "./UploadDoc.module.css";
import axios from "../../../axios_tteg";
import Checkbox from "@mui/material/Checkbox";

const fileTypes = ["PDF","JPG","JPEG"];

export default function App(props) {
  console.log(props)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [docDetail, setDocDetail] = useState({
    file1: {
      docTypeID: "DT-00001",
      value: null,
      isUploaded: false,
      path: null,
    },
    file2: {
      docTypeID: "DT-00002",
      value: null,
      isUploaded: false,
      path: null,
    },
    file3: {
      docTypeID: "DT-00003",
      value: null,
      isUploaded: false,
      path: null,
    },
    file4: {
      docTypeID: "DT-00004",
      value: null,
      isUploaded: false,
      path: null,
    },
    file5: {
      docTypeID: "DT-00005",
      value: null,
      isUploaded: false,
      path: null,
    },
    file6: {
      docTypeID: "DT-00006",
      value: null,
      isUploaded: false,
      path: null,
    },
    file7: {
      docTypeID: "DT-00007",
      value: null,
      isUploaded: false,
      path: null,
    },
    file8: {
      docTypeID: "DT-00008",
      value: null,
      isUploaded: false,
      path: null
    },
    file9: {
      docTypeID: "DT-00009",
      value: null,
      isUploaded: false,
      path: null,
    },
    file10: {
      docTypeID: "DT-00010",
      value: null,
      isUploaded: false,
      path: null,
    },
    file11: {
      docTypeID: "DT-00011",
      value: null,
      isUploaded: false,
      path: null,
    },
    file12: {
      docTypeID: "DT-00012",
      value: null,
      isUploaded: false,
      path: null,
    },
  });

  
  const updateDatabase = () => {
      setLoading(true)
      let docTypes=[]
      for(var key in docDetail) {
          if(docDetail.hasOwnProperty(key)) {
            var item= docDetail[key]
            // console.log(item)
            docTypes.push({
              docTypeID: item.docTypeID,
              isUploaded: item.isUploaded,
              path: item.path
            });
          }
      }

      console.log(docTypes)
      axios
        .post("/uploadDocTypeSubmit", {
          docTypes: docTypes,
          resourceID: props.resourceID,
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          if (response.status === 200) {
            props.getData({
              status: 1,
              moveToScreen: 6,
            });     
          } else {
            setError(response.data.error);
          }
        })
        .catch((e) => {
          setLoading(false);
          setError(e.response.data.error);
        });
  }


  const uploadDocument = (file, key) => {

    // console.log(pdf.result);
    console.log(file);
    console.log(key);
    var formData = new FormData();

    formData.append("uploadedFile", file);
    formData.append("resourceID", props.resourceID);
    formData.append("docTypeID", docDetail[key].docTypeID);

    console.log(formData);

    setLoading(true)
    axios
      .post("/uploadFile", formData, {
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.status === 200) {
          console.log(response)
          let tempDocDetail = { ...docDetail };
          console.log(tempDocDetail[key].isUploaded);
          tempDocDetail[key].value = null;
          tempDocDetail[key].isUploaded = true;
          tempDocDetail[key].path= response.data.path
          setDocDetail(tempDocDetail);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.error);
      });
  };

  
  const handleChange1 = (file1) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file1.value = file1;
    tempDocDetail.file1.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange2 = (file2) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file2.value = file2;
    tempDocDetail.file2.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange3 = (file3) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file3.value = file3;
    tempDocDetail.file3.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange4 = (file4) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file4.value = file4;
    tempDocDetail.file4.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange5 = (file5) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file5.value = file5;
    tempDocDetail.file5.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange6 = (file6) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file6.value = file6;
    tempDocDetail.file6.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange7 = (file7) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file7.value = file7;
    tempDocDetail.file7.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange8 = (file8) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file8.value = file8;
    tempDocDetail.file8.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange9 = (file9) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file9.value = file9;
    tempDocDetail.file9.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange10 = (file10) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file10.value = file10;
    tempDocDetail.file10.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange11 = (file11) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file11.value = file11;
    tempDocDetail.file11.isUploaded = false;
    setDocDetail(tempDocDetail);
  };

  const handleChange12 = (file12) => {
    let tempDocDetail = { ...docDetail };
    tempDocDetail.file12.value = file12;
    tempDocDetail.file12.isUploaded = false;
    setDocDetail(tempDocDetail);
  };


  return (
    <div>
      <Box>
        <Paper
          elevation={24}
          className={classes.PaperStyle}
        >
          <Grid>
            <p className={classes.TitleStyle} >
              Upload Documents
              <hr className={classes.TitleLineStyle} />
            </p>
          </Grid>

          {/* <input type="file" name="file" onChange={(e) => onChangeHandler(e)} /> */}

          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>Address Proof - Govt. Doc</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange1}
                      name="file1"
                      types={fileTypes}
                      className={classes.UploadBoxStyle}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file1.isUploaded} 
                  className={classes.CheckBox}
                  />
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file1.value
                      ? `File name: ${docDetail.file1.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file1.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file1.value, "file1");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>Identity Proof of Establishment</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange2}
                      name="file2"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file2.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file2.value
                      ? `File name: ${(docDetail.file2.value.name)}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file2.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file2.value, "file2");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>Shop Act Gumasta</h3>
              </Grid>
              <Grid>
                <Grid  className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange3}
                      name="file3"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file3.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file3.value
                      ? `File name: ${docDetail.file3.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file3.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file3.value, "file3");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>GST Certificate</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange4}
                      name="file4"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file4.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file4.value
                      ? `File name: ${docDetail.file4.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file4.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file4.value, "file4");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>PAN Card</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange5}
                      name="file5"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file5.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file5.value
                      ? `File name: ${docDetail.file5.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file5.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file5.value, "file5");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>Aadhar Card</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange6}
                      name="file6"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file6.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file6.value
                      ? `File name: ${docDetail.file6.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file6.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file6.value, "file6");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>ESIC</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange7}
                      name="file7"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file7.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file7.value
                      ? `File name: ${docDetail.file7.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file7.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file7.value, "file7");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>PF</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange8}
                      name="file8"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file8.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file8.value
                      ? `File name: ${docDetail.file8.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file8.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file8.value, "file8");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>Labour License</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange9}
                      name="file9"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file9.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file9.value
                      ? `File name: ${docDetail.file9.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file9.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file9.value, "file9");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>MSME Udyog Aadhar</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange10}
                      name="file10"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file10.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file10.value
                      ? `File name: ${docDetail.file10.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file10.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file10.value, "file10");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.style}>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>A Class Certificate for Electrical Work</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange11}
                      name="file11"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file11.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file11.value
                      ? `File name: ${docDetail.file11.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file11.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file11.value, "file11");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.alignItems}>
              <Grid className={classes.HeadingStyle}>
                <h3>Work Experience Certificate</h3>
              </Grid>
              <Grid>
                <Grid className={classes.UploadStyle}>
                  <Grid className={classes.UploaderStyle}>
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange12}
                      name="file12"
                      types={fileTypes}
                    />
                  </Grid>
                  <Checkbox checked={docDetail.file12.isUploaded} className={classes.CheckBox}/>
                </Grid>
                <Grid className={classes.ItemStyle}>
                  <p className={classes.FileUploadText}>
                    {docDetail.file12.value
                      ? `File name: ${docDetail.file12.value.name}`
                      : "No files uploaded"}
                  </p>
                  <Grid className={classes.UploadBtnPlacement}>
                    <Button
                      className={classes.UploadBtn}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={docDetail.file12.value ? false : true}
                      onClick={() => {
                        uploadDocument(docDetail.file12.value, "file12");
                      }}
                    >
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.SubmitBtnPlacement} >
            {/* <SvgButton>Continue</SvgButton> */}
            <Button
              className={classes.SubmitBtn}
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
