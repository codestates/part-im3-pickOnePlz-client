import React from "react";
import NewQuestion from "../components/NewQuestion";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

const NewQuestionContainer = () => {
  const history = useHistory();
  const url = "http://localhost:5000/questions";

  const onSubmit = async (data) => {
    const response = await axios.post(url, data, { withCredentials: true });
    if (response.status === 200) {
      alert(response.data);
      history.push("/");
    } else {
      alert(response.data);
    }
  };

  return (
    <Container>
      <NewQuestion onSubmit={onSubmit} />
    </Container>)
};

export default NewQuestionContainer;
