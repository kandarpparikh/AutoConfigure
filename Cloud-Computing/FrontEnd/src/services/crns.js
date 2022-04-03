import axios from 'axios'

const base_api_url = "http://localhost:8080/";

const getCRNs = () => {
    // axios.get(base_api_url + "getCRNs")
    // .then((response) => {
        return [{crn_no:"30619", course_name: "Privacy & IT"},
        {crn_no:"30630", course_name: "Serverless Data Processing"},
        {crn_no:"30633", course_name: "Adv. Topics in Web Development"},
        {crn_no:"30635", course_name: "Introduction to Blockchains"}]
    // })
    // .catch((error) => {
    //     console.log(error);
    // });

}

const deleteCRN = (crn) => {
    console.log(crn)
    axios.post(base_api_url + "deleteCRN", crn)
    .then((response) => {
        console.log("successgfully deleted")
    })
    .catch((error) => {
        console.log(error);
    });

}

export { getCRNs, deleteCRN}