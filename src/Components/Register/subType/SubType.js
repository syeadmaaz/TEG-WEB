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

export default function SubType() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  console.log("hi");
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  return (
    <div>
      <Box style={{ padding: "3% 2%", margin: "auto", maxWidth: 1020 }}>
        <Paper
          elevation={0}
          style={{ height: 620, margin: 10, overflow: "auto" }}
        >
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
                      <h1>Free</h1>
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
                      <h1 style={{ fontSize: 42, fontWeight: "bolder" }}>0</h1>
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
                      <h1>Basic</h1>
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
                      <h1 style={{ fontSize: 42, fontWeight: "bolder" }}>
                        1000
                      </h1>
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
                      <h1>Premium</h1>
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
                      <h1 style={{ fontSize: 42, fontWeight: "bolder" }}>
                        5000
                      </h1>
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
              padding: "4% 2%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Button variant="text">Skip</Button>
            </div>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
