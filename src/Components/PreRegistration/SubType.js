import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import classes from "./subType.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Logo from "../../assets/images/logo.png";

export default function SubType(props) {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [subscriberCategoryID, setSubscriberCategoryID] = useState(null);

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <div>
      <Box style={{ padding: "2%", margin: "auto", maxWidth: 1020 }}>
        <Paper
          elevation={0}
          style={{ margin: 10, overflow: "auto" }}
        >
          <img src = {Logo} style = {{maxWidth:'100%'}}/>
          <Grid className={classes.style}>
            <Grid
              className={classes.alignment}
              style={{ padding: "2% 3% 2% 3%", width: "100%" }}
            >
              <Paper elevation={12}>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <p style = {{margin:0, fontWeight:'bold', fontSize:20}}>Free</p>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CurrencyRupeeIcon
                        style={{ fontSize: 42, fontWeight: "bolder" }}
                      />
                      <p style={{ fontSize: 42, fontWeight: "bolder" }}>0</p>
                    </div>

                    <Typography style={{ padding: "5% 0" }}>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 1"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 2"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 3"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                    </Typography>

                    <Grid style={{ padding: "4% 2% 1% 2%" }}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          props.getData({
                            pageNo: 3,
                            subscriberCategoryID: "F-01",
                          })
                        }
                      >
                        Try Now
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid
              className={classes.alignment}
              style={{ padding: "2% 3% 2% 3%", width: "100%" }}
            >
              <Paper elevation={12}>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <p style = {{margin:0, fontWeight:'bold', fontSize:20}}>Basic</p>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CurrencyRupeeIcon
                        style={{ fontSize: 42, fontWeight: "bolder" }}
                      />
                      <p style={{ fontSize: 42, fontWeight: "bolder" }}>
                        1000
                      </p>
                    </div>
                    <Typography style={{ padding: "5% 0" }}>
                      <Grid style={{ padding: 0 }}>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 1"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 2"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 3"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                    </Typography>
                    <Grid style={{ padding: "4% 2% 1% 2%" }}>
                      <Button variant="contained">Try Now</Button>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid
              className={classes.alignment}
              style={{ padding: "2% 3% 2% 3%", width: "100%" }}
            >
              <Paper elevation={12}>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <p style = {{margin:0, fontWeight:'bold', fontSize:20}}>Premium</p>
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CurrencyRupeeIcon
                        style={{ fontSize: 42, fontWeight: "bolder" }}
                      />
                      <p style={{ fontSize: 42, fontWeight: "bolder" }}>
                        5000
                      </p>
                    </div>
                    <Typography style={{ padding: "5% 0" }}>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 1"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 2"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                      <Grid>
                        <Demo>
                          <List dense={dense}>
                            <ListItem style={{ padding: "0px 3%" }}>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon
                                  style={{ color: "green" }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary="Feature 3"
                                secondary={secondary ? "Secondary text" : null}
                              />
                            </ListItem>
                          </List>
                        </Demo>
                      </Grid>
                    </Typography>
                    <Grid style={{ padding: "4% 2% 1% 2%" }}>
                      <Button variant="contained">Try Now</Button>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            style={{
              padding: "2%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Button variant="text" onClick={() => props.getData({subscriberCategoryID:null,pageNo:1})}>
                Back
              </Button>
            </div>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
