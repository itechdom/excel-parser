import React from "react";
import { withState, compose } from "recompose";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
const enhance = compose(withState("open", "setOpen", false));
const ModelPreview = enhance(({ model, form }) => {
  if (form && model) {
    let previewList = form.fields.map(field => {
      if (field.type === "text") {
        return (
          <TableRow>
            <TableCell size="small">
              <div>{field.placeholder}:</div>
              <span style={{ fontWeight: "bold" }}>{model[field.name]}</span>
            </TableCell>
            <TableCell size="small" align="left" />
          </TableRow>
        );
      }
    });
    return (
      <>
        <Table style={{ flex: 1 }}>
          <TableBody>{previewList}</TableBody>
        </Table>
      </>
    );
  }
  return <></>;
});

export default ModelPreview;
