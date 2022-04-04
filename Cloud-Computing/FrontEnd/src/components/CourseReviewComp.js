import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const CourseReviewComp = ({course}) => {
    const navigate = useNavigate()

    const clickHandler = (course) => {
        navigate(`/course-reviews/${course.course_name}`, {state: {course: course}})    
    }

    return (
        <Card onClick={() => clickHandler(course)} sx={{ maxWidth: 345, cursor: "pointer"}}>
            <CardMedia
                component="img"
                height="140"
                image={course.img}
                alt="course image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {course.course_name.length > 26 ? course.course_name.substring(0, 22) + "..." : course.course_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {course.description.length > 88 ? course.description.substring(0, 88) + "..." : course.description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CourseReviewComp;