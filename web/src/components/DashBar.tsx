import { createStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      background:
        "linear-gradient(45deg, #0d47a1 30%, #1e88e5 70%, #42a5f5 90%)"
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    menuButtonHidden: {
      display: "none"
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflow: "auto"
    },
    chartContainer: {
      marginLeft: -22
    },
    tableContainer: {
      height: 320
    },
    h5: {
      marginBottom: theme.spacing.unit * 2
    }
  });

class DashBar extends React.Component<WithStyles<typeof styles>> {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Music Map
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            {this.state.open ? (
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            ) : null}
            {this.state.open ? null : (
              <IconButton onClick={this.handleDrawerOpen}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </div>
          <List>
            <Divider />
            <Link to={"./DashBoard"} style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText inset primary="DashBoard" />
              </ListItem>
            </Link>
            <Divider />
            <Link to={"./Edit"} style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText inset primary="Edit" />
              </ListItem>
            </Link>
            <Divider />
            <Link to={"./View"} style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <PhotoCamera />
                </ListItemIcon>
                <ListItemText inset primary="View" />
              </ListItem>
            </Link>
            <Divider />
          </List>
          <List />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(DashBar);
