import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

import FriendsList from "./FriendsList";
import FriendForm from "./FriendForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/friends")
      .then(response => {
        this.setState(() => ({
          friends: response.data
        }));
        console.log("FriendsList response.data", response.data);
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  handleChanges = event => {
    console.log("handleChanges event.target.name", event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addFriend = event => {
    event.preventDefault();
    console.log("addFriend event", event);

    const newFriend = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    };

    axios
      .post("http://localhost5000/friends", newFriend)
      .then(response => {
        console.log("FriendForm addFriend response", response);
        // this.setState({
        //   friends: response.data
        // });
      })
      .catch(error => {
        console.log("Moar Power");
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Michael Scott Best Friends Day</h1>
        <Route exact path="/" component={FriendsList} />
        <FriendForm addFriend={this.addFriend} />
      </div>
    );
  }
}

export default App;
