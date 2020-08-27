import React, { Component } from 'react'
import './Signup.css';
import { json } from 'body-parser';



export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name1: "",
      pass: "",
      pass2: "",
      mail: "",
      nickname: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const post = {
      name: this.state.name1,
      pass: this.state.pass,
      pass2: this.state.pass2,
      email: this.state.mail,
      nick: this.state.nickname
    }
    fetch('http://localhost:3001/', {
      method: "post",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(res => res.json())
      .then(json => {
        console.log(json);
      })
  }



  render() {
    return (
      <div className="White">
        <div className = "One">
        <form className="Container" onSubmit={this.onSubmit}>

          <div className="Text">
            <label for="name" >아이디 </label>
            <input type="text" id="name" name="name1" value={this.state.name1} onChange={this.handleChange} className = "Input"/>
          </div>

          <div className="Text">
            <label for="pass" >비밀번호 </label>
            <input type="password" id="pass" name="pass" value={this.state.pass} onChange={this.handleChange} className = "Input" />
          </div>

          <div className="Text">
            <label for="pass2" >비밀번호 확인 </label>
            <input type="password" id="pass2" name="pass2" value={this.state.pass2} onChange={this.handleChange} className = "Input" />
          </div>

          <div className="Text">
            <label for="nickname">닉네임 </label>
            <input type="text" id="nickname" name="nickname" value={this.state.nickname} onChange={this.handleChange} className = "Input" />
          </div>

          <div className="Text">
            <label for="mail">학교 이메일 </label>
            <input type="email" id="mail" name="mail" value={this.state.mail} onChange={this.handleChange} className = "Input" />
          </div>


          <div>
            <button className="Btn" type="submit">회원가입</button>
          </div>

        </form>
        </div>
      </div>
    )
  }
}
