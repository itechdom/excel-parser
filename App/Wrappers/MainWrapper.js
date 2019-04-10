import React, { Children } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Autocomplete from "../_shared/Autocomplete/Autocomplete";
import { styles } from "./MainWrapper.styles";
import { compose } from "recompose";

const modelNames = ["users", "events", "blogs", "products"];

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

  render() {
    const {
      classes,
      children,
      location,
      match,
      history,
      auth,
      user,
      logo,
      hasPadding,
      onLogout,
      searchModels
    } = this.props;
    const { anchorEl, menuOpen, open } = this.state;
    const isAnchor = Boolean(anchorEl);
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
              <Toolbar
                disableGutters={!this.state.open}
                className={classes.toolbar}
              >
                <img
                  style={{ margin: "0 20px" }}
                  src={logo}
                  width="50px"
                  height="auto"
                />
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
                <Typography
                  variant="title"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Psych Med
                </Typography>
                {auth && (
                  <div>
                    <Tooltip title={(user && user.name) || ""}>
                      <IconButton
                        aria-owns={isAnchor ? "menu-appbar" : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={isAnchor}
                      onClose={this.handleMenuClose}
                    >
                      <MenuItem
                        onClick={event => {
                          onLogout();
                          this.handleMenuClose(event);
                          history.push("/auth/login");
                        }}
                      >
                        Log out
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
            {/* <Drawer
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
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
            </Drawer> */}
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
