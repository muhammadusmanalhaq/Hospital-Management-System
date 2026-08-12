import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }} className="d-flex align-items-center justify-content-center">
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '1rem' }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">CareInFlow</h2>
                <p className="text-muted">Welcome back! Please login to your account.</p>
              </div>
              {error && <Alert variant="danger" className="text-center rounded-3">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label className="fw-semibold text-secondary">Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email"
                    className="p-2"
                  />
                </Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label className="fw-semibold text-secondary">Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password"
                    className="p-2"
                  />
                </Form.Group>
                <Button 
                  className="w-100 py-2 fw-bold shadow-sm" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Logging in...
                    </>
                  ) : 'Log In'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Login;
