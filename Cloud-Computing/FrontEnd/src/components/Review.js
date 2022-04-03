import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useLocation, useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import { Button, Chip, Divider, Grid, Typography } from '@mui/material'
import ReviewModal from './ReviewModal'
import ReviewComp from './ReviewComp'
import axios from 'axios'
import { base_api_url, headers } from '../static/utilities'

const Review = () => {
    const location = useLocation()
    const {course} = location.state
    // state to store all the reviews for the selected course
    const [reviews, setReviews] = useState([]);
    // state to show and hide ReviewModal
    const [isShow, setIsShow] = useState(false);
    
    // function to add review
    const addReview = (review) => {
        review.CRN = course.crn_no;
        let User = {
            Operation: "addreview",
            review: review.description,
            stars:review.stars,
            CRN: course.crn_no
        }
        axios.post(base_api_url, {headers:headers, User})
        .then((response) => {
            if(response.data["body"]){
                alert("Review is added successfully.")
            }
        })
        .catch((error) => {
            console.log(error);
        });
        // update the reviews state to render new reviews on UI
        let updatedReviews = [...reviews, review]
        setReviews(updatedReviews);
    }

    // useEffect hook to get all the review for selected course for the first time on componenet load from the database
    useEffect(()=>{
        // fetch all the reviews from the database for selected course
        let User = {
            Operation: "getreview",
            CRN: course.crn_no
        }
        axios.post(base_api_url, {headers:headers, User})
        .then((response) => {
           if(response.data){
                let reviewList = []
                if(response.data["stars"].length > 1 && response.data["reviews"].length > 1){
                    let reviewDescription = response.data["reviews"].split(",")
                    let reviewStars =  response.data["stars"].split(",")
                    reviewDescription.forEach((element, index) => {
                        reviewList.push({
                            description: element,
                            stars: reviewStars[index]
                        })
                    })
                    setReviews(reviewList)
                }else{
                    if(response.data["stars"] !== '0' && response.data["reviews"] !== ''){
                        reviewList.push({
                            description: response.data["reviews"],
                            stars: response.data["stars"]
                        })
                        setReviews(reviewList)
                    }
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <>
            <NavBar />
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }} >
                <Typography variant="h3" gutterBottom component="div">
                    {course.course_name} Reviews
                </Typography>
            </Box>
            <Box component="span" display="flex" m={1} justifyContent="space-around" alignItems="center">
                <div> </div>
                <Button onClick={() => setIsShow(true)} variant="contained" color="primary" style={{ height: 40 }} >
                    Add Review
                </Button>
            </Box>
            <Divider>
                <Chip label="Reviews" />
            </Divider>
            <Grid container mt="5px" direction="column" alignItems="center" justify="center">
            { /* If reviews exists for this course then use map function 
                to map all the review to corresponding Review component, 
                otherwise display proper message*/
                reviews.length > 0 ? reviews.map((review) => {
                return <ReviewComp review={review} />
                })
                : 
                <Typography variant="h6" component="h2">
                No reviews available for this course.
                </Typography>
            }
            </Grid>
            {// ReviewModal component
            isShow ? <ReviewModal isShow={isShow}  setIsShow={setIsShow} addReview={addReview} /> : <></>
            }
        </>
    )
}

export default Review