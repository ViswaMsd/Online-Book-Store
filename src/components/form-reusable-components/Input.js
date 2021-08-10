import { TextField } from "@material-ui/core";
import React from "react";

function Input(props) {
  const { error, ...other } = props;
  return <TextField {...other} {...(error ? { error: true, helperText: error } : {})} />;
}

export default Input;
