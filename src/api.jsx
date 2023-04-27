import axios from "axios";

export const authenticate = async (email, password) => {
    const response = await axios.post('http://localhost:8080/api/auth/authenticate',
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

export const registerDoctor = async (firstname, lastname, dob, cellNumber, sex, email, password, doctorCode, specialization, street, cap, city, province, country) => {
    const response = await axios.post('http://localhost:8080/api/auth/registration/doctor',
    {
        "firstname" : `${firstname}`,
        "lastname" : `${lastname}`,
        "dob" : `${dob}`,
        "cellNumber" : `${cellNumber}`,
        "sex" : `${sex}`,
        "email": `${email}`,
        "password": `${password}`,
        "doctorCode": `${doctorCode}`,
        "address": {
            "street": `${street}`,
            "cap": `${cap}`,
            "city": `${city}`,
            "province": `${province}`,
            "country": `${country}`,
            
        },
        "specialization": `${specialization}`
    });
    localStorage.setItem("token",response.data.access_token);
};
