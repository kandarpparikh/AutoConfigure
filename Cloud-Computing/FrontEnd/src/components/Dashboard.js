import * as React from 'react';
import { useState, useEffect } from 'react';
import EnterCRN from './EnterCRN';
import RegisteredCRN from './RegisteredCRN';
import { Chip, Divider } from '@mui/material';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {courses, base_api_url, headers} from '../static/utilities';

const Dashboard = () => {
    const location = useLocation()
    const {BannerId} = location.state
    const [crns, setCrns] = useState([]);
    

    useEffect(() => {
        let User = {
            Operation: "getcrn",
            BannerId: BannerId
        }
        
        axios.post(base_api_url, {headers:headers, User})
        .then((response) => {
            if(response.data["body"]){
                let userCRNs = response.data["body"].split(",")
                let filteredCourses = courses.filter((course) => {
                    if(userCRNs.includes(course.crn_no)){
                        return course
                    }
                })
                setCrns(filteredCourses)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])
    
    return (
        <>
            <NavBar BannerId= {BannerId} />
            <EnterCRN crns={crns} setCrns={setCrns} BannerId={BannerId}/> 
            <Divider>
                <Chip label="Registered CRNs" />
            </Divider>
            <RegisteredCRN crns={crns} setCrns={setCrns} />           
        </>
    );
};

export default Dashboard;
