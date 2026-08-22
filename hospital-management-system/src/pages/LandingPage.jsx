import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container className="text-center">
        <h1 className="display-3 fw-bold text-primary mb-4" style={{ letterSpacing: '-1px' }}>
          CareInFlow
        </h1>
        <p className="lead text-secondary mb-5" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          A smart and reliable healthcare management system for patients, doctors, and hospitals.
        </p>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button size="lg" variant="primary" className="px-5 py-3 shadow border-0" style={{ borderRadius: '50px', fontWeight: '600', transition: 'all 0.3s ease' }}>
            Go to Login
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default LandingPage;
