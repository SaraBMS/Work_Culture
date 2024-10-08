import { Link } from 'react-router-dom';
import './missing.css';

const Missing = () => {
    return (
        <main className='missing'>
            <h2>Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </main>
    );
};

export default Missing;