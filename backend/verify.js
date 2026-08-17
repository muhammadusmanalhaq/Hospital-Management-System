const axios = require('axios');

async function runTests() {
  const api = axios.create({ baseURL: 'http://localhost:5000/api' });
  let token = null;

  try {
    console.log('1. Testing Login...');
    const loginRes = await api.post('/auth/login', {
      email: 'admin@hms.test',
      password: 'admin123'
    });
    console.log('Login Success');
    token = loginRes.data.token;
  } catch (err) {
    console.error('Login failed', err.response?.data || err.message);
    return;
  }

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    console.log('\n2. Testing Protected Route...');
    const protectRes = await api.get('/protected-test');
    console.log('Protected Route Success:', protectRes.data.message);
  } catch (err) {
    console.error('Protected route failed', err.response?.data || err.message);
  }

  try {
    console.log('\n3. Testing Add Patient...');
    const patientRes = await api.post('/patients', {
      name: 'John Doe Patient',
      email: `patient_${Date.now()}@example.com`,
      password: 'password123',
      phone: '1234567890',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      bloodGroup: 'O+',
      address: '123 Test St',
      emergencyContact: '0987654321'
    });
    console.log('Add Patient Success:', patientRes.data.message);
  } catch (err) {
    console.error('Add Patient failed', err.response?.data || err.message);
  }

  try {
    console.log('\n4. Testing Get Patients...');
    const getRes = await api.get('/patients');
    console.log('Get Patients Success. Total patients:', getRes.data.length);
  } catch (err) {
    console.error('Get Patients failed', err.response?.data || err.message);
  }

  console.log('\n--- End of Verification ---');
}

runTests();
