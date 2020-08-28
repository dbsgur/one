import React, { Component } from "react";
import "./Signup.css";
import { json } from "body-parser";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      pass: "",
      pass2: "",
      email: "",
      nickname: "",
      checked_id: false,
      checked_nick: false, // ID 중복검사
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  check = (re, what, message) => {
    if (re.test(what)) {
      return true;
    }
    alert(message);
    return false;
  };

  checkId = () => {
    var re = /^[a-zA-Z0-9]{4,12}$/; //아이디는 4~12자의 영문 대소문자와 숫자로만 입력
    if (
      !this.check(
        re,
        this.state._id,
        "아이디는 4~12자의 영문 대소문자와 숫자로만 입력가능합니다."
      )
    ) {
      return false;
    } else {
      const checkId = {
        check_Id: this.state._id,
      };
      fetch("http://localhost:3001/CheckId", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(checkId),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert("사용가능한 아이디 입니다.");
            this.setState({
              check_id: true,
            });
          } else {
            alert("이미 사용중인 아이디 입니다.");
          }
        });
    }
  };
  //닉네임 중복검사
  checkNick = () => {
    var re = /^[a-zA-z가-힣0-9]{2,8}$/;
    if (
      !this.check(
        re,
        this.state.nickname,
        "닉네임은 2~8자의 영문 한글 숫자로만 입력가능합니다."
      )
    ) {
      return false;
    } else {
      const checkNick = {
        check_Nick: this.state.nickname,
      };
      fetch("http://localhost:3001/CheckNick", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(checkNick),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert("사용가능한 닉네임 입니다.");
            this.setState({
              checked_nick: true,
            });
          } else {
            alert("이미 사용중인 닉네임 입니다.");
          }
        });
    }
  };

  onSubmit = (e) => {
    e.preventDefault(); //이벤트 발생시 새로고침을 안하게 한다.
    if (!(this.state.pass === this.state.pass2)) {
      alert("비밀번호가 일지하지 않습니다.");
    } else {
      const user_info = {
        _id: this.state._id,
        pass: this.state.pass,
        pass2: this.state.pass2,
        email: this.state.email,
        nick: this.state.nickname,
      };
      fetch("http://localhost:3001/Signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user_info),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json) {
            alert("회원가입 성공");
          } else {
            alert("회원가입 실패");
          }
        });
    }
  };

  render() {
    return (
      <div className="White_sign">
          <form className="Container_sign" onSubmit={this.onSubmit}>
            <div className="Textbox_sign" style = {{marginTop : '15px'}}>
              <text className="Intro_sign">창원대 과팅앱</text>
            </div>
            <div className="Textbox_sign">
              <text className="Intro2_sign">창남 창녀.</text>
            </div>
            <div className="Text_sign">
              <label for="name">아이디 </label>
              <input
                type="text"
                id="name"
                name="_id"
                value={this.state._id}
                onChange={this.handleChange}
                className="Input_sign"
              />
              <input type="button" value="중복확인" onClick={this.checkId} className = "Double_sign"/>
              {/* <button onClick={this.test_check}>중복확인</button> */}
            </div>

            <div className="Text_sign">
              <label for="pass">비밀번호 </label>
              <input
                type="password"
                id="pass"
                name="pass"
                value={this.state.pass}
                onChange={this.handleChange}
                className="Input_sign"
              />
            </div>

            <div className="Text_sign">
              <label for="pass2">비밀번호 확인 </label>
              <input
                type="password"
                id="pass2"
                name="pass2"
                value={this.state.pass2}
                onChange={this.handleChange}
                className="Input_sign"
              />
            </div>

            <div className="Text_sign">
              <label for="nickname">닉네임 </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={this.state.nickname}
                onChange={this.handleChange}
                className="Input_sign"
              />
              <input type="button" value="중복확인" onClick={this.checkNick} className = "Double_sign"/>
            </div>

            <div className="Text_sign">
              <label for="email">학교 이메일 </label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="Input_sign"
              />
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                @changwon.ac.kr&nbsp;</span>
              <input type="button" value="전송"className = "Double_sign" />
            </div>

            <div>
              <button className="Btn_sign" type="submit">
                회원가입
              </button>
            </div>
          </form>
      </div>
    );
  }
}