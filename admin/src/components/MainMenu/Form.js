import React from "react";
import styled from "styled-components";
import { sendSMS } from "../../api/sendSMS";
import { DatePicker } from "./components/DatePicker";
import { MailList, MailListsMenu } from "./components/MailLists";
import { UsersMenu } from "./components/UsersMenu";

export const Form = ({ users, mailLists }) => {
  const initForm = {
    user: { username: "" },
    mailList: "",
    messageBody: "",
  };
  const [form, setForm] = React.useState(initForm);
  const [isScheduleOpen, setIsScheduleOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    date.setHours(date.getHours() - 4);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (!form.user?.username && !form.mailList?.users) {
      return;
    }
    const payload = {
      message: form.messageBody,
      users: form.user?.username ? [form.user] : form.mailList?.users,
    };
    sendSMS(payload, isScheduleOpen ? date : null);
  };

  const updateUser = ({ target }) => {
    setForm((form) => ({
      ...form,
      mailList: "",
      user: users.find((user) => user.username === target.value),
    }));
  };
  const updateMailList = ({ target }) => {
    setForm((form) => ({
      ...form,
      mailList: target.value,
      user: { username: "" },
    }));
  };

  const updateMessage = ({ target }) => {
    setForm((form) => ({
      ...form,
      messageBody: target.value,
    }));
  };

  return (
    <div className="App container pt-5">
      <h2>Send SMS</h2>
      <form onSubmit={handleChange}>
        <Box>
          <UsersMenu user={form.user} users={users} updateUser={updateUser} />
          <MailListsMenu
            mailList={form.mailList}
            mailLists={mailLists}
            updateMailList={updateMailList}
          />
          {isScheduleOpen && <DatePicker date={date} setDate={setDate} />}
          <button
            className="btn btn-primary"
            style={{ height: "3rem", margin: "2rem", padding: "5px" }}
            onClick={() =>
              setIsScheduleOpen((isScheduleOpen) => !isScheduleOpen)
            }
          >
            {isScheduleOpen ? "Cancel" : "Schedule Message"}
          </button>
        </Box>
        {(form.user?.username || form.mailList) && (
          <div>
            <h3>Send to: </h3>
          </div>
        )}
        {form.user?.username && (
          <span>Phone Number: {form.user.phoneNumber}</span>
        )}
        {form.mailList && <MailList users={form.mailList.users} />}
        <Message messageBody={form.messageBody} updateMessage={updateMessage} />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: "5px" }}
        >
          {isScheduleOpen ? "Schedule" : "Send"}
        </button>
      </form>
    </div>
  );
};

const Message = ({ messageBody, updateMessage }) => {
  return (
    <div className="form-group" style={{ margin: "1rem 0" }}>
      <label htmlFor="exampleFormControlTextarea1">
        <h3>Message Body</h3>
      </label>
      <textarea
        className="form-control"
        value={messageBody}
        onChange={updateMessage}
        rows="3"
      ></textarea>
    </div>
  );
};

const Box = styled.div`
  display: flex;
`;
