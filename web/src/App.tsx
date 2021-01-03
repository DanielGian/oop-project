import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { ArtistList } from "./list/ArtistList";
import { BigList } from "./list/BigList";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import View from "./pages/View";

const list = new ArtistList();
const bigList = new BigList();

class App extends Component {
  state = {
    bigList: bigList,
    list: list
  };

  //Takes the list data from the Edit page and stores it in App's state.
  editCallback = data => {
    bigList.add(data);
  };

  //Takes the specific list chosen on dashboard and sends its data to the view page.
  passListToView = data => {
    this.setState({ list: data });
  };

  deleteList = data => {
    bigList.remove(data);
    this.setState({ bigLlist: bigList });
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home">
              <Redirect to="/" />
            </Route>
            <Route path="/Login" component={Login} />
            <Route
              path="/Dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  callbackView={this.passListToView}
                  callbackDelete={this.deleteList}
                  bigList={bigList}
                />
              )}
            />
            <Route
              path="/Edit"
              render={props => <Edit {...props} callback={this.editCallback} />}
            />
            <Route
              path="/View"
              render={props => <View {...props} list={this.state.list} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
