import axios from "axios";

export const createNewExamination = async(doctorName, patientName, reservationDate, contact, specializationName, payment, examinationPackage, note, paymentNote, billing, state) =>{
    const response = await axios.post('http://localhost:8080/api/auth/medExamination',
    {
        "doctorName": `${doctorName}`,
        "patientName": `${patientName}`,
        "reservationDate": `${reservationDate}`,
        "contact": `${contact}`,
        "specializationName": `${specializationName}`,
        "payment": `${payment}`,
        "examinationPackage": `${examinationPackage}`,
        "note": `${note}`,
        "paymentNote": `${paymentNote}`,
        "billing": `${billing}`,
        "state": `${state}`,
    });

}

export const findAllPatientMedicalExamination = async (userId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/medExamination/patient/${userId}`)
    return response.data;
}

export const findExaminationById = async (examinationId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/medExamination/find/${examinationId}`)
    return response.data;
}

export const findPersonIdByUserEmail = async (email) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/user/find/${email}`)
    const userId = parseInt(response.data);
    if (isNaN(userId)) {
        throw new Error('Invalid person ID');
    }
    return userId;
}

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
