import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MainWrapper from "../../Wrappers/MainWrapper"

const SimpleTable = ({match,location,history})=> {

  return (
      <MainWrapper match={match} location={location} history={history}>
                 <h1>Dosing Reference Reports</h1> 			
				
                <h2>Geared towards outpatient settting and child psychiatry</h2>
    <Paper>
				
               Study Dosage:			
                p	preschool			
                c	childhood (6-12)			
                a	adolescent (13-18)			
                A	Adult (>18)			
                O	open-label trials			
                DAUG OR AUG	augmentation for depression			
                OAUG	augmentation for OCD			
                BPD	bipolar depression			
                BPM	bipolar mania			
                No specified age	Assume Adult			
                                
                                
                Refs:				
                E	Expert recommendation 			
                U	Uptodate			
                R	Research study used such example			
                F	FDA			
                S	Stahls			
                M	Manual of Clinical Psychopharm			
                H	Handbook of Psychiatry Drug Therapy			
                T	Thase Tx Guidelines, J Clin Psychiatry 			
                P	Physicians Desk Reference (PDR)			
                A	AACAP Psychopharm Institute			
                                
                TRD	treatment resistant depression/augmentaion			
                IP	inpatient			
                ID	initial dose			
                TDD	total daily dose			
                                
                References				
                CYP Interactions	https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4335312/			
                Adult Guidelines				
                https://www.nature.com/articles/0802783				
                http://fac.ksu.edu.sa/sites/default/files/Prescribing_Guidelines11.pdf				
                https://drug-interactions.medicine.iu.edu/main-table.aspx	
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>p</TableCell>
            <TableCell align="right">c</TableCell>
            <TableCell align="right">a</TableCell>
            <TableCell align="right">A</TableCell>
            <TableCell align="right">O</TableCell>
            <TableCell align="right">DAUG OR AUG</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
              preschool
              </TableCell>
              <TableCell align="right">
              adolescent
              </TableCell>
              <TableCell align="right">
              Adult
              </TableCell>
              <TableCell align="right">
              open-label trials
              </TableCell>
              <TableCell align="right">test</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>

      </MainWrapper>
  );
}
export default SimpleTable