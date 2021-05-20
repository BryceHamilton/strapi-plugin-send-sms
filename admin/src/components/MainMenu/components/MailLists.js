import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const MailListsMenu = ({ mailList, updateMailList, mailLists }) => {
  const classes = useStyles();
  return (
    <div className="form-group">
      <FormControl className={classes.formControl}>
        <InputLabel id="mail-list-select-label">Mail Lists</InputLabel>
        <Select
          labelId="mail-list-select-label"
          id="mail-list-select"
          onChange={updateMailList}
          value={mailList}
        >
          {mailLists.map((mailList) => (
            <MenuItem key={mailList.name} value={mailList}>
              {mailList.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export const MailList = ({ users }) => {
  return users.map((user) => (
    <div>
      {user.username}: {user.phoneNumber}
    </div>
  ));
};
