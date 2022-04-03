import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar'
import CourseComp from './CourseComp';
import { courses } from '../static/utilities';

const BrowseCourses = () => {
    const location = useLocation()
    const {BannerId} = location.state
    
    const [courseList, setCourseList] = useState([...courses]);
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredData = courseList.filter((el) => {
        //if no input the return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.course_name.toLowerCase().includes(inputText)
        }
    })
    return (
    <>
        <NavBar BannerId= {BannerId} />
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }} >
            <Typography variant="h3" gutterBottom component="div">
               All the Courses
            </Typography>
        </Box>
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
            <TextField id="outlined-basic" onChange={inputHandler} variant="outlined" label="Search" />
        </Box>
        
        {(filteredData.length > 0) ? 
            <Grid container sx={{ flexGrow: 1, margin:2, width: '100%' }} spacing={2} columns={9}>
            {filteredData.map((course) => {
                return (
                    <Grid item md={3}>
                        <CourseComp course={course} />
                    </Grid>
                )    
            })}
            </Grid>
            :
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }} >
                <Typography variant="h6" gutterBottom component="div">
                No such course is available.
                </Typography>
            </Box>
        }
    </>
  )
}

export default BrowseCourses