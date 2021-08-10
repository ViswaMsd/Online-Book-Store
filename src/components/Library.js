import React, { useEffect, useState } from "react";

import {
  CircularProgress,
  createTheme,
  makeStyles,
  Paper,
} from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";

import "./Library.css";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { allBooksActions } from "../redux-store/store";

import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "90vh",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const lightTheme = createTheme({
  palette: {
    type: "light",
    secondary: green,
  },
});
const darkTheme = createTheme({
  palette: {
    type: "dark",
    secondary: green,
  },
});

const Library = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  console.log("Library...");
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    setIsLoading(true);
    const url = "https://my-book-store-application.herokuapp.com/books";
    fetch(url)
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) {
          const err = res.json();
          console.log(err);
          throw new Error(err);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(allBooksActions.initialFetch(data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="grid-container">
        <Paper square>
          <div className="grid-item sidebar">
            <Sidebar darkMode={darkMode} />
          </div>
        </Paper>
        <Paper square>
          <div className="grid-item appbar">
            <Appbar />
            {isLoading && (
              <div className={classes.root}>
                <CircularProgress />
              </div>
            )}
            <main>{props.children}</main>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default Library;
