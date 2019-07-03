import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MainWrapper from "../../Wrappers/MainWrapper";

const Guide = ({ match, location, history, medications_searchModel }) => {
  const studyDosage = {
    p: "preschool",
    c: "childhood (6-12)",
    a: "adolescent (13-18)",
    A: "Adult (>18)",
    O: "open-label trials",
    "DAUG OR AUG": "augmentation for depression",
    OAUG: "augmentation for OCD",
    BPD: "bipolar depression",
    BPM: "bipolar mania",
    "No specified age": "Assume Adult"
  };
  const refs = {
    E: "Expert recommendation",
    U: "Uptodate",
    R: "Research study used such example",
    F: "FDA",
    S: "Stahls",
    M: "Manual of Clinical Psychopharm",
    H: "Handbook of Psychiatry Drug Therapy",
    T: "Thase Tx Guidelines, J Clin Psychiatry",
    P: "Physicians Desk Reference (PDR)",
    A: "AACAP Psychopharm Institute",
    TRD: "treatment resistant depression/augmentaion",
    IP: "inpatient",
    ID: "initial dose",
    TDD: "total daily dose"
  };

  const references = {
    "CYP Interactions": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4335312/",
    "Adult Guidelines": [
      "https://www.nature.com/articles/0802783",
      "http://fac.ksu.edu.sa/sites/default/files/Prescribing_Guidelines11.pdf",
      "https://drug-interactions.medicine.iu.edu/main-table.aspx"
    ]
  };

  const makeTable = data => {
    return (
      <Table>
        <TableBody>
          {Object.keys(data).map(column => {
            return (
              <TableRow>
                <TableCell>
                  <b>{column}</b>:{data[column]}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const StudyDosage = makeTable(studyDosage);
  const RefsComp = makeTable(refs);
  const References = makeTable(references);
  return (
    <MainWrapper
      searchModel={medications_searchModel}
      match={match}
      location={location}
      history={history}
    >
      <Paper>
        <h1>Dosing Reference Reports</h1>
        <h2>Geared towards outpatient settting and child psychiatry</h2>
        <h3>Study Dosage:</h3>
        {StudyDosage}
        <h3>Refs:</h3>
        {RefsComp}
        <h3>External References:</h3>
        {References}
      </Paper>
    </MainWrapper>
  );
};
export default Guide;
