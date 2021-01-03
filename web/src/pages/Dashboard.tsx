import { Avatar, Button, Card, Fab, Grid, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React from "react";
import { Link } from "react-router-dom";
import DashBar from "../components/DashBar";


const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      background: 'linear-gradient(45deg, #37474f 30%, #78909c 70%, #b0bec5 90%)'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflow: "auto"
    },
    button: {
      marginTop: 100,
      marginLeft: 170,
    },
    list: {
      background:
        "linear-gradient(45deg, #0d47a1 30%, #1e88e5 70%, #42a5f5 90%)"
    },
    text: {
      color: "white",
      marginLeft: 200,
      marginRight: 200,
    }
  });

class Dashboard extends React.Component<any, any, WithStyles<typeof styles>> {

  constructor(props: any) {
    super(props);
    this.state = {
      bigList: this.props.bigList,
    };
  }

  //Sends the list data to the parent App component to allow access in the View page
  handleView = (list) => {
    this.props.callbackView(list);
  };

  deleteList = (list) => {
    this.props.callbackDelete(list);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={this.props.classes.root}>
        <DashBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2" align="center">
            Your Personal Music Maps
          </Typography>
          <Divider />
          <Grid container spacing={40} >
            {//Iterates through the BigList that contains all the saved lists and renders each individual list.
              this.state.bigList.get().map((item, index) => (
                <Grid key={index} item sm={6} md={4} lg={4}>
                  {this.props.title}
                  <Card className={classes.list}>
                    <Card className={classes.list}>
                      <Typography variant="h6" component="h1" className={classes.text}>
                        {item.getTitle()}
                      </Typography>
                    </Card>
                    <Link to={"./View"} style={{ textDecoration: "none" }}>
                      <Button onClick={() => this.handleView(item)}>
                        <PhotoCamera />
                      </Button>
                    </Link>
                    <Button onClick={() => this.deleteList(index)}>
                      <DeleteIcon />
                    </Button>
                    {item.get().map((artist, index) => {
                      return (
                        <List key={index} >
                          <ListItem>
                            <ListItemIcon><Avatar src={artist.icon} /></ListItemIcon>
                            <ListItemText inset primary={artist.name} />
                          </ListItem>
                        </List>
                      );
                    })}
                  </Card>
                </Grid>
              ))}
            <Grid item sm={6} md={4} lg={4}>
              <Link to={"./Edit"} style={{ textDecoration: "none" }}>
                <Fab className={classes.button}>
                  <AddIcon />
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);