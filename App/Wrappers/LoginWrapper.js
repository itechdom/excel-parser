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
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";

const styles = theme => ({
});

class LoginWrapper extends React.Component {
  render() {
    const { classes, children, backgroundImage } = this.props;
    return (
      <React.Fragment>
        <main
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width:"100%",
            height:"1000px",
            objectFit:"cover"
          }}
        >
          {children}
        </main>
      </React.Fragment>
    );
  }
}

LoginWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginWrapper);
