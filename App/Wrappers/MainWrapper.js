import React, { Children } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { styles } from "./MainWrapper.styles";
import { compose } from "recompose";
import BottomNavigation from "./BottomNavigation";

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
    const { classes, children, hasPadding } = this.props;
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift
              )}
            >
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Psych Med
              </Typography>
            </AppBar>
            <main className={hasPadding ? classes.hasPadding : classes.content}>
              <div className={classes.appBarSpacer} />
              {children}
            </main>
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
