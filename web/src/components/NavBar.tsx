import { Drawer } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";

class NavBar extends Component {
  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.toggleDrawer.bind(this);
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="AppBar">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.isOpen} onClose={this.toggleDrawer}>
              {this.props.children}
            </Drawer>
            <Typography variant="h6" color="inherit">
              Music Map
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
