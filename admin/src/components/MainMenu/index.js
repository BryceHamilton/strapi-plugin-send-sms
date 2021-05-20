import React from "react";
import { useFetch } from "../../hook/useFetch";
import { Form } from "./Form";

export const MainMenu = () => {
  const { data: users } = useFetch("/users");
  const { data: mailLists } = useFetch("/mail-lists");

  return <Form users={users} mailLists={mailLists} />;
};
