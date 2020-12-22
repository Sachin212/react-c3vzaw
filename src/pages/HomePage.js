import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/actions";

const HomePage = props => {
  const handleLogout = () => {
    props.onLogout();
  };
  return (
    <div>
      {props.isLoggedIn ? (
        <>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
          <Link to="/add">Employee</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
      <Link to="/">Home</Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
