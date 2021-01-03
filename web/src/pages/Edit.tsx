import {
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputBase,
  List,
  WithStyles
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import DashBar from "../components/DashBar";
import { searchQuery } from "../graphql/queries/searchQuery";
import { ArtistList } from "../list/ArtistList";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      background:
        "linear-gradient(45deg, #37474f 30%, #78909c 70%, #b0bec5 90%)"
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflow: "auto"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    list: {
      background:
        "linear-gradient(45deg, #0d47a1 30%, #1e88e5 70%, #42a5f5 90%)"
    },
    listText: {
      color: "theme.palette.common.white"
    }
  });

let list = new ArtistList();

class NestedList extends React.Component<any, any, WithStyles<typeof styles>> {
  constructor(props: any) {
    super(props);
    this.state = {
      search: "",
      name: "",
      list: list,
      open: true,
      title: ""
    };
  }

  //Updates the contents of the search bar
  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  };

  //Prevents the page from refreshing when submitting Title
  handleRefresh = e => {
    e.preventDefault();
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  //Gives name state a value thus calling getSpotify to acquire the API data
  handleSearchRequest = e => {
    e.preventDefault();
    this.setState({ name: this.state.search });
  };

  getSpotify = ({ name }) => {
    return this.state.name == "" ? null : (
      <Query query={searchQuery} variables={{ name }}>
        {({ loading, data }) => {
          if (loading) return <div>loading</div>;
          return (
            <Card>
              {//Iterates through the returned Spotify data and renders the 5 most popular results
              data.search.artists.items.map(({ name, id, images }, index) => {
                return (
                  <List key={index}>
                    <ListItem>
                      {images.length > 0 ? (
                        <ListItemIcon>
                          <Avatar src={images[0].url} />
                        </ListItemIcon>
                      ) : (
                        <ListItemIcon>
                          <Avatar />
                        </ListItemIcon>
                      )}
                      <ListItemText inset primary={name} />
                      <Card>
                        <Button
                          onClick={() => {
                            this.addToList(name, id, images[0].url);
                          }}
                        >
                          <AddIcon />
                        </Button>
                      </Card>
                    </ListItem>
                  </List>
                );
              })}
            </Card>
          );
        }}
      </Query>
    );
  };

  addToList = (name, spotifyID, icon) => {
    const Artist = {
      key: 0,
      name: name,
      spotifyID: spotifyID,
      icon: icon
    };
    list.add(Artist);
    this.setState({ list: list }); //Refreshes actions on page to render changed list
  };

  deleteFromList = item => {
    list.remove(item.key);
    list.get().map((todo, index) => (todo.key = index));
    this.setState({ list: list }); //Refreshes actions on page to render changed list
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    if (list.state.size == 0) {
      return alert("You must add an Artist first!");
    }
    list.setTitle(this.state.title);
    this.props.callback(list); //Sends the list data to be saved in the App state
    list = new ArtistList(); //Creates a new instance of the ArtistList to reset the page for the next created list
    this.setState({ list: list });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DashBar />
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter A List Title</DialogTitle>
          <DialogContent>
            <form onSubmit={evt => this.handleRefresh(evt)}>
              <InputBase
                autoFocus
                margin="dense"
                id="name"
                fullWidth
                onChange={evt => this.handleTitleChange(evt)}
                value={this.state.title}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Create List
            </Button>
          </DialogActions>
        </Dialog>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid container spacing={40}>
            <Grid item sm={6} md={4} lg={4}>
              <form onSubmit={evt => this.handleSearchRequest(evt)}>
                <InputBase
                  onChange={evt => this.handleSearchChange(evt)}
                  value={this.state.search}
                  placeholder={"Search for for your music destination…"}
                />
              </form>
              <div>
                {//Calls the Spotify search query and renders the 5 most popular artists based on the given name
                this.getSpotify({ name: this.state.name })}
              </div>
            </Grid>
            <Divider />
            <Grid item sm={6} md={4} lg={3} />
            <Grid item sm={6} md={4} lg={4}>
              <Card className={classes.list}>
                <Link to={"./Dashboard"} style={{ textDecoration: "none" }}>
                  <Button onClick={this.handleSave}>
                    <SaveIcon /> {this.state.title}
                  </Button>
                </Link>
              </Card>
              <Card className={classes.list}>
                {//Loops through the created list and renders each individual artist's info
                list.get().map((artist, index) => (
                  <List key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar src={artist.icon} />
                      </ListItemIcon>
                      <ListItemText
                        inset
                        primary={artist.name}
                        className={classes.listText}
                      />
                      <Card>
                        <Button onClick={() => this.deleteFromList(artist)}>
                          <DeleteIcon />
                        </Button>
                      </Card>
                    </ListItem>
                  </List>
                ))}
              </Card>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(NestedList);
