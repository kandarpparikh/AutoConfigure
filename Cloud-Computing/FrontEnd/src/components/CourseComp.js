import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CourseComp = ({course}) => {

    const getCourseInfo = () => {
        const courseURL = "http://cloudmonkspages.s3-website-us-east-1.amazonaws.com/" + course.crn_no + ".html"
        window.open(courseURL, "_blank")
    }

    return (
        <Card sx={{ maxWidth: 345}}>
        <CardMedia
            component="img"
            height="140"
            alt="course image"
            image={course.img}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {course.course_name.length > 26 ? course.course_name.substring(0, 22) + "..." : course.course_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {course.description.length > 88 ? course.description.substring(0, 88) + "..." : course.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button onClick = { () => getCourseInfo() } size="small">Get Info</Button>
        </CardActions>
        </Card>
    );
}

export default CourseComp;