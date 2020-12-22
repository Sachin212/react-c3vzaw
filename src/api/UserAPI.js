import * as Host_IP from "../Host";

const fetchLeaves = token => {
  return fetch(`${Host_IP}/leaves/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }).then(response => response.json());
};

const fetchLeavesById = (userID, token) => {
  return fetch(`${Host_IP}/leaves/${userID}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }).then(response => response.json());
};

const addLeaves = (userID, leave, token) => {
  return fetch(`${Host_IP}/leaves/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    method: "POST",
    body: JSON.stringify(leave)
  }).then(res => res.json());
};

const login = userObject => {
  return fetch(`${Host_IP}/token-auth/`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(userObject)
  }).then(res => res.json());
};

const getLoggedInUser = token => {
  return fetch(`${Host_IP}/core/current_user/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }).then(res => res.json());
};

export default {
  fetchLeaves,
  fetchLeavesById,
  addLeaves,
  login,
  getLoggedInUser
};
