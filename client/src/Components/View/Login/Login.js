import React, { Component } from 'react'
import './Login.css'
import { json } from 'body-parser';


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name1: "",
      pass: "",
    };
  }

  handleName = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
      const post = {
      name: this.state.name1,
      pass: this.state.pass
    }
    fetch('http://localhost:3001/login', {
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
        <div className="One">
          <form className="Container" onSubmit={this.onSubmit}>

            <div className="Text">
              <label for="name" >아이디 </label>
              <input type="text" id="name" name="name1" value={this.state.name1} onChange={this.handleName} className="Input" />
            </div>

            <div className="Text">
              <label for="pass" >비밀번호 </label>
              <input type="password" id="pass" name="pass" value={this.state.pass} onChange={this.handleName} className="Input" />
            </div>

            <div>
              <button className="Btn" type="submit">로그인</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
