import { useParams } from 'react-router-dom';
import MedicalExamination from './medicalExamination';


export default function PatientPage() {
    const { userId } = useParams();

    return (
        <>
        <div>
            <h1>Benvenuto, utente {userId}</h1>
            <h3>Cronologia Visite Mediche</h3>
            <MedicalExamination medicalExamination={patient.medicalExamination} />
        </div>
        </>
    );
}