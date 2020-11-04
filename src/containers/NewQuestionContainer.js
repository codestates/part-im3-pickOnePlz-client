import React from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import REACT_APP_URL from "../config";

import NewQuestion from "../components/NewQuestion";

import { Container } from "react-bootstrap";

const NewQuestionContainer = () => {
  const history = useHistory();
  const url = `${REACT_APP_URL}/questions`;

  // (김규화) 수룡 님께서 작성하신 코드임 : 별도 redux state 변경처리 없이 구현하여 코드가 짧고 간결한 듯
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
    </Container>
  );
};

export default NewQuestionContainer;
