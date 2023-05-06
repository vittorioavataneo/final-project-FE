import axios from "axios";

export const findPersonIdByUserEmail = async (email) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/user/find/${email}`)
    const userId = parseInt(response.data);
    if (isNaN(userId)) {
        throw new Error('Invalid person ID');
    }
    return userId;
}

//DOTTORE
export const findDoctorById = async (doctorId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/doctor/find/${doctorId}`)
    return response.data;
}

export const findDoctorBySpecialization = async(specializationName) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/doctor/find/specializationDoctor/${specializationName}`)
    return response.data;
}

//PAZIENTE
export const findPatientById = async (userId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/patient/find/patient/${userId}`)
    return response.data;
}

export const findAllPatientByDoctorId = async (userId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/patient/find/patientOfDoctor/${userId}`)
    return response.data;
}

export const findPatientByName = async (part, id) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/patient/find/patient/name/${part}/${id}`)
    return response.data;
}

export const findPatientByExamId = async (examinationId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/patient/find/patient/examination/${examinationId}`)
    return response.data;
}

//SPECIALIZATION
export const findSpecializationByName = async(specializationName) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/specialization/find/${specializationName}`)
    return response.data;
}


//EXAMINATION
export const createNewExamination = async(doctor, patient, reservationDate, contact, specialization, payment, examinationPackage, note, paymentNote, billing, state) =>{
    const response = await axios.post('http://localhost:8080/api/auth/medExamination',
    {
        "doctorDto": doctor,
        "patientDto": patient,
        "reservationDate": `${reservationDate}`,
        "contact": `${contact}`,
        "specializationDto": specialization,
        "payment": `${payment}`,
        "examinationPackage": `${examinationPackage}`,
        "note": `${note}`,
        "paymentNote": `${paymentNote}`,
        "billing": `${billing}`,
        "state": `${state}`,
    });
    return response.data;

}

export const updateExamination = async (examination, examinationId, doc, pat, specialization) =>{
    await axios.put(`http://localhost:8080/api/auth/medExamination/${examinationId}`,
    {
        "id": `${examinationId}`,
        "doctorDto": doc,
        "patientDto": pat,
        "reservationDate": `${examination.reservationDate}`,
        "contact": `${examination.contact}`,
        "specializationDto": specialization,
        "payment": `${examination.payment}`,
        "examinationPackage": `${examination.examinationPackage}`,
        "note": `${examination.note}`,
        "paymentNote": `${examination.paymentNote}`,
        "billing": `${examination.billing}`,
        "state": `${examination.state}`,
    });
}

export const findAllPatientMedicalExamination = async (userId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/medExamination/patient/${userId}`)
    return response.data;
}

export const findAllDoctorMedicalExamination = async (userId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/medExamination/doctor/${userId}`)
    return response.data;
}

export const findExaminationById = async (examinationId) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/medExamination/find/${examinationId}`)
    return response.data;
}

export const findExaminationByPatientName = async (name, id) =>{
    const response = await axios.get(`http://localhost:8080/api/auth/medExamination/patient/name/${name}/${id}`)
    return response.data;
}

export const changeExaminationToAnnulled = async (examinationId) =>{
    const response = await axios.post(`http://localhost:8080/api/auth/medExamination/null/${examinationId}`)
    return response.data;
}

export const changeExaminationToProgrammed = async (examinationId) =>{
    const response = await axios.post(`http://localhost:8080/api/auth/medExamination/programmed/${examinationId}`)
    return response.data;
}

//AUTHENTICATE
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

//REGISTRATION
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
