import React from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import { connect } from "react-redux";
import { setUser } from "./dux/reducer";
import axios from "axios";

class App extends React.Component {
  componentDidMount() {
    axios.get("/api/burrito_data").then(res => {
      this.props.setUser(res.data);
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <div>
            <div className="logo">Logo</div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/store">Store</Link>
                </li>
                <li>
                  <Link to="/profile">profile</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      axios.post("/api/burrito_eaten").then(res => {
                        console.log("logged out");
                        this.props.setUser(null);
                        this.props.history.push("/");
                      });
                    }}
                  >
                    logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={AuthComponent} />

          {this.props.user && (
            <>
              <Route
                path="/store"
                render={() => {
                  return <div>Store Path</div>;
                }}
              />
              <Route
                path="/profile"
                render={() => {
                  return <div>Profile Path</div>;
                }}
              />
            </>
          )}
        </Switch>
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

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default invokedConnect(withRouter(App));
