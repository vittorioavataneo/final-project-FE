import axios from "axios";

export const authenticatePatient = async (email, password) => {

    const response = await axios.post('http://localhost:8080/api/auth/authentication/patient',
    {
        "email": `${email}`,
        "password": `${password}`,
    });
    localStorage.setItem("token",response.data.access_token);
}

export const authenticateDoctor = async (email, password) => {

    const response = await axios.post('http://localhost:8080/api/auth/authentication/doctor',
    {
        "email": `${email}`,
        "password": `${password}`,
    });
    localStorage.setItem("token",response.data.access_token);
}

export const authenticateAdmin = async (email, password) => {

    const response = await axios.post('http://localhost:8080/api/auth/authentication/admin',
    {
        "email": `${email}`,
        "password": `${password}`,
    });
    localStorage.setItem("token",response.data.access_token);
}

export const registerPatient = async (firstname, lastname, dob, cellNumber, sex, email, password, taxCode) => {
    const response = await axios.post('http://localhost:8080/api/auth/registration/patient',
    {
        "firstname" : `${firstname}`,
        "lastname" : `${lastname}`,
        "dob" : `${dob}`,
        "cellNumber" : `${cellNumber}`,
        "sex" : `${sex}`,
        "email": `${email}`,
        "password": `${password}`,
        "taxCode": `${taxCode}`,
    });
    localStorage.setItem("token",response.data.access_token);
};

export const registerDoctor = async (firstname, lastname, dob, cellNumber, sex, email, password, doctorCode, specializationName, street, cap, city, province, country) => {
    const response = await axios.post('http://localhost:8080/api/auth/registration/doctor',
    {
        "firstname" : `${firstname}`,
        "lastname" : `${lastname}`,
        "dob" : `${dob}`,
        "sex" : `${sex}`,
        "email": `${email}`,
        "cellNumber" : `${cellNumber}`,
        "password": `${password}`,
        "street": `${street}`,
        "cap": `${cap}`,
        "city": `${city}`,
        "province": `${province}`,
        "country": `${country}`,
        "doctorCode": `${doctorCode}`,
        "specializationName": `${specializationName}`
    });
    localStorage.setItem("token",response.data.access_token);
};
