import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleChange(e) {
    let targetName = e.target.name;

    if (targetName === "email") {
      setEmail(e.target.value);
    }
    if (targetName === "password") {
      setPassword(e.target.value);
    }
    if (targetName === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  }

  function postSignupReq() {
    if (password === "") {
      alert("비밀번호를 입력하지 않으셨습니다. 비밀번호를 입력해 주세요.");
    } else if (password !== passwordConfirm) {
      alert(
        "입력하신 비밀번호가 서로 다릅니다. 동일한 비밀번호를 입력해 주세요."
      );
    } else {
      let passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
      if (!passwordValidation.test(password)) {
        alert(
          "비밀번호가 조건에 맞지 않습니다. 8~12글자 사이의 영문 대소문자와 숫자의 조합으로 구성하세요."
        );
      } else {
        props.handleRegister(email, password);
        // props.handleRegister(email, password).then((result) => {
        //   if (!result) {
        //     setEmail("");
        //     setPassword("");
        //     setPasswordConfirm("");
        //   } // 이렇게 주니까 회원가입을 실패했을 때 화면에는 입력값이 있지만 state에는 빈 문자열이 있게 된다.abs
        //   // 회원가입을 계속하기 위해서는 입력된 내용을 지우고 다시 입력해야 하는 불편이 있음
        //   // 따라서 별 필요없는 코드라고 판단하여, 위와 같이 수정함.
        // });
        return false;
      }
    }
  }

  return (
    <form>
      <h3>Sign Up</h3>

      {/* 성, 이름 입력창은 필요없음
        
        <div className="form-group">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="First name" />
        </div>
        <div className="form-group">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last name" />
        </div> */}

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      {/* 비밀번호 확인 창 추가함 // 두 비밀번호가 일치하는지 확인하는 기능 필요 */}
      <div className="form-group">
        <label>Password Confirm</label>
        <input
          type="password"
          name="passwordConfirm"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <button
        // type="submit" : 이렇게 주면, 버튼을 눌렀을 때 전송 기능이 실행되고 페이지가 새로고침된다 : https://dololak.tistory.com/763
        type="button" // 그래서 이렇게 줘야 한다.
        className="btn btn-primary btn-block"
        onClick={postSignupReq}
      >
        Sign Up
      </button>
      <p className="forgot-password text-right">
        <Link to="/login">골라죠 회원이신가요?</Link>
      </p>
    </form>
  );
}

Signup.propTypes = {
  mode: PropTypes.bool,
  onRegister: PropTypes.func,
  onLogin: PropTypes.func,
};

Signup.defaultProps = {
  mode: true,
  handleRegister: (id, pw) => {
    console.error("register function is not defined");
  },
};
