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

export const UsersMenu = ({ user, updateUser, users }) => {
  const classes = useStyles();
  return (
    <div className="form-group">
      <FormControl className={classes.formControl}>
        <InputLabel id="user-select-label">Users</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          onChange={updateUser}
          value={user.username}
        >
          {users.map((user) => (
            <MenuItem key={user.username} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
