import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const WelcomeDialog = ({ history, location }) => {
  return (
    <Dialog
      onClose={history.push("/")}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle>
        <h2>Welcome to Med Psych!</h2>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <a>press here to view the guide</a> or press continue to the main
          page.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
