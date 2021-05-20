import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const DatePicker = ({ date, setDate }) => {
  const classes = useStyles();

  const removeSeconds = (dateStr) => dateStr.substring(0, dateStr.length - 3);
  const dateString = removeSeconds(date.toISOString().split(".")[0]);

  const changeDate = (e) => {
    const date = new Date(e.target.value);
    date.setHours(date.getHours() - 4);
    setDate(date);
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        value={dateString}
        onChange={changeDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};
