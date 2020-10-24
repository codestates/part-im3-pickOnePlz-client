import React from "react";
import { Link } from "react-router-dom";

function Signup() {
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
          className="form-control"
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>

      {/* 비밀번호 확인 창 추가함 // 두 비밀번호가 일치하는지 확인하는 기능 필요 */}
      <div className="form-group">
        <label>Password Confirm</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Sign Up
      </button>
      <p className="forgot-password text-right">
        <Link to="/login">골라죠 회원이신가요?</Link>
      </p>
    </form>
  );
}

export default Signup;
