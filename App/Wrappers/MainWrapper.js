import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { styles } from "./MainWrapper.styles";
import { compose } from "recompose";
import Container from "@material-ui/core/Container";
import Autocomplete from "../_shared/Autocomplete/Autocomplete";
import DoneOutline from "@material-ui/icons/DoneOutline";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Button from "@material-ui/core/Button";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: { main: "#d3d3d3" }
  },
  typography: {
    useNextVariants: true
  }
});

class MainWrapper extends React.Component {
  state = {
    open: true,
    menuOpen: false,
    anchorEl: null
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleTabChange(event, newValue) {
    setValue(newValue);
  }

  render() {
    const {
      classes,
      children,
      hasPadding,
      searchModel,
      modelKey,
      history,
      location
    } = this.props;
    const isHome = location.pathname === "/";
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <Container component="main" className={classes.main} maxWidth="lg">
              <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                  {!isHome ? (
                    <Button onClick={() => history.goBack()}>{`< `}Back</Button>
                  ) : (
                    <></>
                  )}
                  <Typography
                    noWrap
                    variant="h5"
                    className={classes.title}
                    align={"center"}
                  >
                    <DoneOutline /> Psych Med
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    href="#guide"
                    className={classes.button}
                  >
                    <HelpOutline className={classes.buttonIcon} />
                    Guide
                  </Button>
                </Toolbar>
                {!isHome ? (
                  <div className={classes.search}>
                    <Autocomplete
                      placeholder="Search…"
                      onSelect={suggestion => {
                        history.push(`/view/${suggestion._id}`);
                      }}
                      loadSuggestions={text => {
                        let query = {
                          title: { $regex: text }
                        };
                        return searchModel(query);
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </AppBar>
              <main
                className={hasPadding ? classes.hasPadding : classes.content}
              >
                <div className={classes.appBarSpacer} />
                {children}
              </main>
            </Container>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

MainWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(MainWrapper);
