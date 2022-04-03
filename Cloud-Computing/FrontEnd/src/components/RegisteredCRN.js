import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

function RegisteredCRN({ crns, setCrns }) {

    const deleteRegisteredCRN = (crn) => {
        let updatedCrns = crns.filter((element) => element.crn_no !== crn.crn_no);
        setCrns(updatedCrns)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Serial No.</TableCell>
                        <TableCell align="left">CRN No.</TableCell>
                        <TableCell align="left">Course Name</TableCell>
                        <TableCell align="left">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {crns.length === 0 ? 
                    <TableRow>
                        <TableCell align="center"> No data available... </TableCell>
                    </TableRow> 
                    : crns.map((crn, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left">{crn.crn_no}</TableCell>
                            <TableCell align="left">{crn.course_name}</TableCell>
                            <TableCell align="left">
                                <IconButton onClick={() => deleteRegisteredCRN(crn)} aria-label="delete" size="large">
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RegisteredCRN