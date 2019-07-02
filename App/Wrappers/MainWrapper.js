import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
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
      history
    } = this.props;
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <Container component="main" className={classes.main} maxWidth="lg">
              <AppBar
                position="absolute"
                className={classNames(
                  classes.appBar,
                  this.state.open && classes.appBarShift
                )}
              >
                <Toolbar>
                  <Typography
                    variant="title"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Psych Med
                  </Typography>
                  <div className={classes.search}>
                    <Autocomplete
                      placeholder="Search…"
                      onSelect={suggestion => {
                        history.push(`/view/${suggestion._id}`);
                      }}
                      loadSuggestions={text => {
                        let query = {
                          [modelKey]: { $regex: event.target.value }
                        };
                        return searchModel(query);
                      }}
                    />
                  </div>
                </Toolbar>
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
