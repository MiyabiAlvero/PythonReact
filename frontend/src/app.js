import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    address: '',
    contact_number: '',
    email: ''
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toView, setToView] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    address: '',
    contact_number: '',
    email: ''
  });
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://127.0.0.1:8000/api/students/')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    axios.post('http://127.0.0.1:8000/api/students/', newStudent)
      .then(response => {
        setStudents([...students, response.data]);
        setNewStudent({
          first_name: '',
          middle_name: '',
          last_name: '',
          address: '',
          contact_number: '',
          email: ''
        });
      })
      .catch(error => console.error(error));
  };

  const handleViewClick = async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/students/${id}/`);
    setToView(response.data);
    setOpenView(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setNewStudent(student);
  };

  const handleUpdateStudent = (id) => {
    axios.put(`http://127.0.0.1:8000/api/students/${selectedStudent.id}/`, newStudent)
      .then(response => {
        fetchStudents();
        setNewStudent({
          first_name: '',
          middle_name: '',
          last_name: '',
          address: '',
          contact_number: '',
          email: ''
        });
      })
      .catch(error => console.error(error));
  };

  const handleCancelUpdateStudent = () => {
    setSelectedStudent(null);
    setNewStudent({
      first_name: '',
      middle_name: '',
      last_name: '',
      address: '',
      contact_number: '',
      email: ''
    });
  };

  const handleDeleteStudent = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/students/${id}/`)
      .then(response => {
        fetchStudents();
        setNewStudent({
          first_name: '',
          middle_name: '',
          last_name: '',
          address: '',
          contact_number: '',
          email: ''
        });
      })
      .catch(error => console.error(error));
  };

  return (
    <div className='app-container'>
      <h1 className='app-title'></h1>

      <div className='form-container'>
        <div className='form-inputs'>
          <input type='text' name='first_name' placeholder='First name' value={newStudent.first_name} onChange={handleInputChange} className='form-input' />
          <input type='text' name='middle_name' placeholder='Middle name' value={newStudent.middle_name} onChange={handleInputChange} className='form-input' />
          <input type='text' name='last_name' placeholder='Last Name' value={newStudent.last_name} onChange={handleInputChange} className='form-input' />
          <input type='text' name='contact_number' placeholder='Contact Number' value={newStudent.contact_number} onChange={handleInputChange} className='form-input' />
          <input type='email' name='email' placeholder='Email' value={newStudent.email} onChange={handleInputChange} className='form-input' />
          <textarea name='address' placeholder='Address' value={newStudent.address} onChange={handleInputChange} className='form-textarea' />

          <div className='form-buttons'>
            {selectedStudent ? (
              <>
                <button onClick={handleUpdateStudent} className='form-button update-button'>Update</button>
                <button onClick={handleCancelUpdateStudent} className='form-button cancel-button'>Cancel</button>
              </>
            ) : (
              <button onClick={handleAddStudent} className='form-button add-button'>Submit</button>
            )}
          </div>
        </div>
      </div>

      <ul className='student-list'>
        {students.map(student => (
          <li key={student.id} className='student-item'>
            <div className='student-info'>
              <strong>{student.first_name} {student.last_name}</strong>
            </div>
            <div className='student-actions'>
              <button className='action-button view-button' onClick={() => handleViewClick(student.id)}>View</button>
              <button className='action-button edit-button' onClick={() => handleEditClick(student)}>Edit</button>
              <button className='action-button delete-button' onClick={() => handleDeleteStudent(student.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {openView && (
        <div className='view-modal'>
          <div className='view-content'>
            <p><strong>{toView.first_name} {toView.last_name}</strong></p>
            <p><span className='info-label'>First name:</span> {toView.first_name}</p>
            <p><span className='info-label'>Middle name:</span> {toView.middle_name}</p>
            <p><span className='info-label'>Last name:</span> {toView.last_name}</p>
            <p><span className='info-label'>Contact Number:</span> {toView.contact_number}</p>
            <p><span className='info-label'>Email:</span> {toView.email}</p>
            <p><span className='info-label'>Address:</span> {toView.address}</p>
            <button onClick={() => setOpenView(false)} className='close-button'>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
