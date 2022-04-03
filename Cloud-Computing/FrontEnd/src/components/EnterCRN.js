import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import {courses, base_api_url, headers} from '../static/utilities';
import axios from 'axios';

function EnterCRN({ crns, setCrns, BannerId }) {
    
    const handleCRNSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const crn_no = data.get("crn")
        let newCrn = courses.filter((course) => {
            if(course.crn_no === crn_no){
                return course
            }
        })
        if(newCrn.length > 0){
            let User = {
                Operation: "addcrn",
                BannerId: BannerId,
                CRN: crn_no
            }
            axios.post(base_api_url, {headers:headers, User})
            .then((response) => {
                if(response.data["body"]){
                    alert("CRN is registered for " + BannerId)
                }
            })
            .catch((error) => {
                console.log(error);
            });
            let updatedCrns = [...crns]
            updatedCrns = [...updatedCrns, ...newCrn];
            setCrns(updatedCrns)
        }else{
            alert("Entered CRN is not a valid!!!")
        }
    };

    return (
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
            <Typography variant="h3" gutterBottom component="div">
                Enter CRN
                <Typography variant="h6" gutterBottom component="div">
                    to get notification.
                </Typography>
            </Typography>
            <Box component="form" onSubmit={handleCRNSubmit} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" fullWidth required  id="crn" label="CRN" name="crn" />
                <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} > Submit </Button>
            </Box>
        </Box>
    )
}

export default EnterCRN