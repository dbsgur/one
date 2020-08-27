import React, { Component } from 'react'
import './LandingPage.css'
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Start from '../../Utils/Start/Start.js';


export default class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            toggle: false
        };
    }

    onClick1 = (e) =>{
        this.setState ({
            count : 1,
            toggle: false

        })
    }
    onClick2 = (e) =>{
        this.setState ({
            count : 2, 
            toggle: false
        })
    }
    onClick3 = (e) =>{
        this.setState ({
            count : 3,
            toggle: false
        })
    }
    onClick4 = (e) =>{
        this.setState ({
            count : 4,
            toggle: false
        })
    }
    onClick5 = (e) =>{
        this.setState ({
            count : 5,
            toggle: false
        })
    }

    handleToggle = (e) => {
        this.setState ({ toggle : !this.state.toggle})
    }

    

    render() {
        return (
            <div classNanme="Container" >
                {/* 메시지 햄버거 */}
                <div className=" Set">
                    <Link to="Signup">
                        <MenuIcon style={{ fontSize: 50, color: 'white', marginTop: 5 }} />
                    </Link>
                    <Link to="Login">
                        <ChatBubbleOutlineIcon style={{ fontSize: 50, color: 'white', marginTop: 10 }} />
                    </Link>
                </div>

                {/* 제목 */}
                <div className="Title">
                    <text className="Title1">제목 1</text>
                    <text className="Title2">제목 2</text>
                    <text className="Title3">제목 3</text>
                </div>


                <div className="Title">
                    <button className= "Toggle" onClick ={this.handleToggle}>
                        {this.state.count} : {this.state.count} ▼
                    </button>

                    {this.state.toggle === false ?
                    <div/>
                    :
                    <div className = "ToggleTitle">
                        <button onClick={this.onClick1} className = "Toggle2">1:1</button>
                        <button onClick={this.onClick2} className = "Toggle2">2:2</button>
                        <button onClick={this.onClick3} className = "Toggle2">3:3</button>
                        <button onClick={this.onClick4} className = "Toggle2">4:4</button>
                        <button onClick={this.onClick5} className = "Toggle2">5:5</button>
                    </div>}
                </div>

                {/*Start.js*/}
                <div className="Title">
                    <Start count={this.state.count}/>
                    
                </div>
            </div>
        )
    }
}
