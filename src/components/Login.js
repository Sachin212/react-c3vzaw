import React, { useEffect } from "react";
import "../styles/HomePage.css";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

const Login = props => {
  const handleLogin = async event => {
    event.preventDefault();
    let userObject = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value
    };
    props.onAuth(userObject);
  };

  useEffect(() => {
    if (!props.isLoggedIn) {
      console.log("OK");
    }
  }, []);

  return (
    <div>
      <form
        className="login"
        // method="POST"
        onSubmit={event => handleLogin(event)}
        action="home"
      >
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedin,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: userObject => dispatch(actions.authLogin(userObject))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
