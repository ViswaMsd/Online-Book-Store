import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppsIcon from "@material-ui/icons/Apps";
import ListIcon from "@material-ui/icons/List";
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined";
import SearchIcon from "@material-ui/icons/Search";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

import "./Appbar.css";
import { useSelector, useDispatch } from "react-redux";
import { darkModeActions, viewActions } from "../redux-store/store";
import { useHistory, useLocation, useParams } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    alignItems: "center",
  },
  title: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  actions: {
    dispaly: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  gridBtn: {
    backgroundColor: (props) => (props.gridView ? "grey" : "default"),
  },
  listBtn: {
    backgroundColor: (props) => (props.gridView ? "default" : "grey"),
  },
  appbar: {
    height: "11vh",
  },
  search: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  smallScreenActions: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
      width: "0px",
      height: "0px",
    },
    lable: {
      justifyContent: "flex-start",
    },
  },
}));

function Appbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const gridView = useSelector((s) => s.view.gridView);
  const dispatch = useDispatch();
  const location = useLocation();
  const styles = useStyles();

  const gridViewHandler = () => {
    dispatch(viewActions.gridViewHandler());
  };
  const listViewHandler = () => {
    dispatch(viewActions.listViewHandler());
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        elevation={1}
        position="sticky"
        color="default"
        className={styles.appbar}
      >
        <Toolbar className={styles.appbar}>
          <Grid container spacing={0} className={styles.gridContainer}>
            <Grid item xs={7} sm={4} md={6} className={styles.title}>
              <div>
                <Button
                  classes={{ label: styles.lable }}
                  className={styles.smallScreenActions}
                  variant="text"
                  color="default"
                  onClick={handleClick}
                >
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <StyledMenuItem
                    onClick={() => {
                      history.push("/mybooks");
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemIcon>
                      <PlayCircleOutlineOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="My Books" />
                  </StyledMenuItem>
                  <StyledMenuItem
                    onClick={() => {
                      history.push("/addnewbook");
                      setAnchorEl(null);
                    }}
                  >
                    <ListItemIcon>
                      <AddBoxOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Add New Book" />
                  </StyledMenuItem>
                </StyledMenu>
              </div>
              <Typography
                variant="h4"
                onClick={() => {
                  history.push("/");
                }}
              >
                Library
              </Typography>
            </Grid>

            {location.pathname === "/mybooks" && (
              <Grid item xs={3} sm={2} md={2}>
                <div className="view-action-container">
                  <div
                    className={`icon-div ${gridView ? "active" : ""}`}
                    color="default"
                    onClick={gridViewHandler}
                  >
                    <AppsIcon />
                  </div>
                  <div
                    className={`icon-div ${!gridView ? "active" : ""}`}
                    color="default"
                    onClick={listViewHandler}
                  >
                    <ListIcon />
                  </div>
                </div>
              </Grid>
            )}
            <Grid
              item
              xs={2}
              // sm={0}
              // md={0}
              className={styles.smallScreenActions}
            >
              <IconButton
                size="small"
                color="default"
                onClick={() => {
                  dispatch(darkModeActions.darkModeHandler());
                }}
              >
                <Brightness4OutlinedIcon />
              </IconButton>
            </Grid>

            {location.pathname === "/mybooks" && (
              <Grid item sm={6} md={4} className={styles.search}>
                <span className="search">
                  <input type="text" placeholder="search for books..."></input>
                  <button>
                    <SearchIcon />
                  </button>
                </span>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;
