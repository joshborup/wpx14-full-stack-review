import React, { Component } from "react";
import { connect } from "react-redux";
import { setUser } from "../dux/reducer";
import { Redirect } from "react-router-dom";
import axios from "axios";
class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      register: true
    };
  }

  async register() {
    const { email, username, password } = this.state;
    const registerdUser = await axios.post("/api/register_burrito", {
      email,
      username,
      password
    });
    this.props.setUser(registerdUser.data);
  }

  async login() {
    const { email, password } = this.state;
    const loggedInUser = await axios.post("/api/spicy_burrito_purchase", {
      email,
      password
    });
    this.props.setUser(loggedInUser.data);
  }

  render() {
    console.log(this.props.user);
    const { email, username, password, register } = this.state;
    return (
      <div className="auth-container">
        {this.props.user ? (
          <Redirect to="/store" />
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.register) {
                this.register();
              } else {
                this.login();
              }
            }}
          >
            <input
              placeholder="email"
              value={email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
            <input
              placeholder="password"
              value={password}
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
            {register && (
              <input
                placeholder="username"
                value={username}
                onChange={e =>
                  this.setState({
                    username: e.target.value
                  })
                }
              />
            )}
            <button>{register ? "Register" : "Login"}</button>
          </form>
        )}
        <div>
          <button
            onClick={() =>
              this.setState({
                register: true
              })
            }
          >
            Register
          </button>
          <button
            onClick={() => {
              this.setState({
                register: false
              });
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return reduxState;
}
const mapDispatchToProps = {
  setUser
};

const authEnhancingFunction = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default authEnhancingFunction(AuthComponent);
