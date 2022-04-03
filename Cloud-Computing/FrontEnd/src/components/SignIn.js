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
import { base_api_url, headers } from '../static/utilities';
import bcrypt from 'bcryptjs'
import axios from 'axios';

const theme = createTheme();

/* This components is taken from "https://github.com/mui/material-ui/tree/master/docs/data/material/getting-started/templates/sign-in"
we have removed marketing checkbox and copyright symbols and added event hadler to perform appropriate action on different events.
*/
const SignIn = () => {
    const navigate = useNavigate();
    const saltRounds = 10;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let User = {
            Operation: "verify",
            BannerId: data.get('bannerID'),
            Password: data.get('password')
        }
        axios.post(base_api_url, {headers:headers, User})
        .then((response) => {
            if(response.data["body"]){
                navigate("/dashboard", {state: {BannerId: User.BannerId}});
            }
            else{
                alert("Credentials are wrong!!!")
            }
        })
        .catch((error) => {
            console.log(error);
        });        
    };

    return (
        <ThemeProvider theme={theme}>
            <h1>My Academics</h1>   
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="bannerID" label="Banner ID" 
                                           name="bannerID" autoFocus autoComplete='off' />
                        <TextField margin="normal" required fullWidth id="password"
                                label="Password" name="password" type="password" autoComplete='off'/>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
                        <Grid container>
                            <Grid item xs />
                            <Grid item>
                                <Link href={"/signup"} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignIn