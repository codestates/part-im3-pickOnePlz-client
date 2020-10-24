// '/login' url 경로로 접근하면 렌더링되는 컨테이너 컴포넌트인 LoginContainer 에, components/Login.js 컴포넌트를 렌더링하겠습니다.

import React from "react";
import { connect } from "react-redux";
import { loginRequest } from "../actions/authentication";
import { Login } from "../components";

// function LoginContainer(props) {
//   // console.log("props.status : ", props.status); // 여기서는 Waiting Success로 잘 나온다
//   function handleLogin(id, pw) {
//     // 아래의 connect 덕분에 loginRequest 메소드를 props 로 넘겨받을 수 있음 ("from "../actions/authentication";")
//     return props.loginRequest(id, pw).then(() => {
//       // console.log("props.status : ", props.status); // INIT 이 나와버린다. props.loginRequest(id, pw)의 결과를 기다리지 않고 다음으로 넘어가고 있음
//       if (props.status === "SUCCESS") {
//         // create session data
//         let loginData = {
//           isLoggedIn: true,
//           username: id,
//         };

//         // (쿠키에 저장할 때 객체를 만든 뒤, 해당 객체를 문자화(JSON.stringify 메소드) 시키고 base64 로 인코드한 뒤, 앞에 'key=' 를 붙여 저장합니다)
//         // * 쿠키에 저장된 값을 이용하여 로그인 했는지 여부를 판단합니다.
//         // * btoa 는 base64 로 인코드 하는 메소드입니다. 이에 대해 익숙치 않으신 분들은 아래의 링크를 참조해 주세요.
//         // * base64 인코드, 디코드 메소드 - btoa(), atob() : https://pro-self-studier.tistory.com/106?category=659555
//         document.cookie = "key=" + btoa(JSON.stringify(loginData));

//         props.history.push("/"); // 리디렉트
//         return true;
//       } else {
//         alert(`로그인에 문제가 있습니다. 다시 시도해 주세요.`);
//         return false;
//       }
//     });
//   }

//   return (
//     <div>
//       <Login handleLogin={handleLogin} />
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     status: state.authentication.login.status,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginRequest: (id, pw) => {
//       return dispatch(loginRequest(id, pw));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

import { Component } from "react";

class LoginContainer extends Component {
  handleLogin = (id, pw) => {
    // 아래의 connect 덕분에 loginRequest 메소드를 props 로 넘겨받을 수 있음 ("from "../actions/authentication";")
    return this.props.loginRequest(id, pw).then(() => {
      // console.log("props.status : ", props.status); // INIT 이 나와버린다. props.loginRequest(id, pw)의 결과를 기다리지 않고 다음으로 넘어가고 있음
      if (this.props.status === "SUCCESS") {
        // create session data
        let loginData = {
          isLoggedIn: true,
          username: id,
        };

        // (쿠키에 저장할 때 객체를 만든 뒤, 해당 객체를 문자화(JSON.stringify 메소드) 시키고 base64 로 인코드한 뒤, 앞에 'key=' 를 붙여 저장합니다)
        // * 쿠키에 저장된 값을 이용하여 로그인 했는지 여부를 판단합니다.
        // * btoa 는 base64 로 인코드 하는 메소드입니다. 이에 대해 익숙치 않으신 분들은 아래의 링크를 참조해 주세요.
        // * base64 인코드, 디코드 메소드 - btoa(), atob() : https://pro-self-studier.tistory.com/106?category=659555
        document.cookie = "key=" + btoa(JSON.stringify(loginData));

        this.props.history.push("/"); // 리디렉트
        return true;
      } else {
        alert(`로그인에 문제가 있습니다. 다시 시도해 주세요.`);
        return false;
      }
    });
  };

  render() {
    return (
      <div>
        <Login handleLogin={this.handleLogin} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.login.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      return dispatch(loginRequest(id, pw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
