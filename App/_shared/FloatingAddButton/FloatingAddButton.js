import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class FloatingAddButton extends React.Component {
  render() {
    const { classes, onClick } = this.props;
    return (
      <Fab onClick={onClick} className={classes.fab} color={"primary"}>
        <AddIcon />
      </Fab>
    );
  }
}

FloatingAddButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingAddButton);
