import React, {Component} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import "./Profile.css";
import Auth from "../Auth/Auth";

const auth = new Auth();


class Profile extends Component {
     // CONSTRUCTOR
     constructor(props) {
      super(props);
      this.state = {
        users: [],
        message: ''
      }
    }


  securedPing() {
    // const { getAccessToken } = this.props.auth;
    // const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    // axios.get(`http://localhost:3000/api/private`, { headers })
    // axios.get("http://localhost:3000/api/private")
    axios.get("/api/private")
      .then(response => this.setState({ pingSecuredMessage: response.data.message }))
      .catch(error => this.setState({ pingSecuredMessage: error.message }));
  }

  ping() {
    // axios.get("http://localhost:3000/api/public")
    axios.get("/api/public")
      .then(response => this.setState({ pingMessage: response.data.message }))
      .catch(error => this.setState({ pingMessage: error.message }));  
  }

  postUser() {
    console.log(auth.getProfile());
    let profile = auth.getProfile();
    const headers = { 'Authorization': `Bearer ${auth.getAccessToken()}`}
  
      axios({
        method: "post",
        // url: "http://localhost:3000/api/user",
        url: "/api/user",
        headers,
        data: profile
      }).then(function(res){
        console.log(`the response is: ${res}`);
      });
  }

  getUsers() {
    // const url = "http://localhost:3000/api/allusers";
    const url = "/api/allusers";

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          users: data
        })
      })
      .catch((error) => {
        this.setState({
          error: true
        })
      });
  }

  render() {
    return (
      <div>
        <h1>This is a super secret area. Jump back to <a href="/">Home</a></h1>
        <br />
        <button onClick={this.props.auth.logout}>Logout</button>

          <div className="container">

            <h3>Make a Call to the Server</h3>
            <Button  onClick={this.ping.bind(this)}>Ping</Button>              
            <h2> {this.state.pingMessage}</h2>

            <Button onClick={this.securedPing.bind(this)}>Call Private</Button>       
            
            <h2> {this.state.pingSecuredMessage}</h2>

            <Button  onClick={this.postUser.bind(this)}>Post User</Button>              
            <h2></h2>

            <Button  onClick={this.getUsers.bind(this)}>Get all users</Button>   
          
          </div>

          <div>
              <h4>All users:</h4> 
              <ul>
                {
                  this.state.users.map(function(item){
                  return (
                    <div>
                      <li key={item._id}>{item.username} | {item.email} | {item._id} |
                      <img className="thumbnail" src={item.thumbnailFile}  alt="user Headshot"></img>
                      </li> 
                    </div>
                  );
                })  
                }
              </ul>
          </div>  
      </div>
    )
  }
}


export default Profile;