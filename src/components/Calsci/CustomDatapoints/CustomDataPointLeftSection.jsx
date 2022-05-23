import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import GenericButton from "../../common/GenericButton";
import { useCodingBoxContext } from '../CalsciContext/CodingBoxContext'
import codingBoxActions from '../CalsciContext/codingBoxActions'
import {createDatapointForCodingBox} from '../../../utils/CodingBoxUtils'
import { CB_ROOT_NODE_ID } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    border: "1px solid #6b6f75",
    borderRadius: "1rem",
    margin: " 0 0.5rem 0 0",
    height: "calc(100vh - 170px)",

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30rem",
      height: "8.5rem",
    },
  },
}));

const CustomDataPointLeftSection = (props) => {
  const classes = useStyles();
  const [inputData, setInputData] = useState("");
  const codingBoxContext = useCodingBoxContext();
  const {insertLeafNode} = codingBoxActions(codingBoxContext.state,codingBoxContext.dispatch)

  const handleSubmit = (e) => {
    e.preventDefault();
    const codingBoxData = [createDatapointForCodingBox(inputData)]
    insertLeafNode(codingBoxData,CB_ROOT_NODE_ID,-1)
    
    alert(inputData);
    setInputData("");
  };

  // useEffect(() => {
  //   console.log("codingBoxContext:",codingBoxContext)
  // }, [codingBoxContext])

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label='Add Number'
        variant='outlined'
        required
        type='number'
        value={inputData}
        inputProps={{ step: 0.1 }}
        margin='normal'
        onChange={(e) => setInputData(e.target.value)}
      />

      <GenericButton
        type='submit'
        name='Add to Coding Box'
        btnDisabled={inputData.trim() === ""}
        onBtnClick={handleSubmit}
      />
    </form>
  );
};

export default CustomDataPointLeftSection;
