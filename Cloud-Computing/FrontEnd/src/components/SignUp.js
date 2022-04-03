import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {base_api_url, headers} from '../static/utilities'
// import Cryptr from 'cryptr';

const theme = createTheme();

/* This components is taken from "https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates/sign-up"
we have removed forgot password link and added event hadler to perform appropriate action on different events.
*/
const SignUp = () => {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = {
            FirstName: data.get('firstName'),
            LastName: data.get('lastName'),
            Email: data.get('email'),
            BannerId: data.get('bannerID'),
            Password: data.get('password')
        }
        registerUser(user)
    };

    const registerUser = (User) => {
        User.Operation = "register"
        axios.post(base_api_url, {headers:headers, User})
        .then((response) => {
            if(response.data["body"]){
                navigate("/")
            }else{
                alert("User already registered!!!")
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <ThemeProvider theme={theme}>
            <h1>My Academics</h1>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField autoComplete='off' name="firstName" required
                                        fullWidth id="firstName" label="First Name" autoFocus />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth id="lastName" label="Last Name" 
                                           name="lastName" autoComplete='off' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="email" label="Email Address" 
                                           name="email"autoComplete='off' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth id="bannerID" label="Banner ID" 
                                           name="bannerID" autoComplete='off' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="password" label="Password" 
                                           type="password" id="password" autoComplete='off' />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={"/"} replace variant="body2"> Already have an account? Sign in </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignUp