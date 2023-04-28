import { useParams } from 'react-router-dom';

export default function PatientPage() {
    const { userId } = useParams();

    return (
        <>
        <div>
            <h1>Benvenuto, utente {userId}</h1>
        </div>
        </>
    );
}