import {
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Brightness4OutlinedIcon from "@material-ui/icons/Brightness4Outlined";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkModeActions } from "../redux-store/store";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  active: {
    backgroundColor: "lightGreen",
    "&:hover": {
      backgroundColor: "lightGreen",
    },
  },
});

function Sidebar(props) {
  const styles = useStyles();
  const location = useLocation();

  const dispatch = useDispatch();
  const history = useHistory();
  const bookCount = useSelector((s) => s.allBooks.count);
  console.log(location);
  // const { darkMode, darkModeHandler } = props;
  const darkModeHandler = () => {
    dispatch(darkModeActions.darkModeHandler());
  };
  return (
    <div>
      <List subheader={<ListSubheader>Library</ListSubheader>}>
        <ListItem
          className={location.pathname === "/mybooks" ? styles.active : ""}
          button
          onClick={() => {
            history.push("/mybooks");
          }}
        >
          <ListItemIcon>
            <PlayCircleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="My Books" />
          <ListItemSecondaryAction>{bookCount}</ListItemSecondaryAction>
        </ListItem>
        <ListItem
          button
          className={location.pathname === "/addnewbook" ? styles.active : ""}
          onClick={() => {
            history.push("/addnewbook");
          }}
        >
          <ListItemIcon>
            <AddBoxOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Book" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Brightness4OutlinedIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Dark Mode" />
          <ListItemSecondaryAction>
            <Switch
              checked={props.darkMode}
              onChange={darkModeHandler}
              name="DarkMode"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
