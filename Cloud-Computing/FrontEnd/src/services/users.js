import axios from 'axios'
import bcrypt from 'bcryptjs'
const base_api_url = "https://fqacmd4z31.execute-api.us-east-1.amazonaws.com/test/rds-myacademics";

const headers = {
    "Content-Type" : "application/json",
    "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods" : "OPTIONS,POST",
    "Access-Control-Allow-Credentials" : true,
    "Access-Control-Allow-Origin" : "*",
    "X-Requested-With" : "*"
}

const authenticateUser = (User) => {
    User.Operation = "verify"
    console.log(User)
    axios.get(base_api_url, {headers:headers, User})
    .then((response, hash) => {
        // bcrypt.compare(userAuthData.password, hash, function(err, result) {
        //     if (result) {
        //       console.log("It matches!")
        //       return true
        //     }
        //     else {
        //       console.log("Invalid password!");
        //       return false
        //     }
        // });
    })
    .catch((error) => {
        console.log(error);
    });
}



export { authenticateUser }