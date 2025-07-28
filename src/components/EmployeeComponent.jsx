import React, { useEffect, useState } from 'react'
import { createEmployee, updateEmployee,getEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { listDepartment } from '../services/DepartmentService'



const EmployeeComponent = () => {
   const [firstName,setFirstName] =  useState('')
   const [lastName,setLastName] =  useState('')
   const [email,setEmail] =  useState('')
   const [departmentId,setDepartmentId] = useState('')
   const [departments,setDepartments] = useState([]);

    useEffect(() => {
        listDepartment().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error("Error fetching departments:", error);
        })
    },[])

    


   const [errors,setErrors] = useState({
         firstName: '',
         lastName: '',
         email: '',
         department: ''
   })

   const { id } = useParams();

   const navigator = useNavigate();

   useEffect(() => {
        if(id){
            getEmployee(id)
                .then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId);
            }).catch(error => {
                console.error("Error fetching employee:", error);
            })
        }
   }, [id])

   //
    function saveOrUpdateEmlpoyee(e){
        e.preventDefault();

        const employee = {firstName,lastName,email, departmentId};

        if(validateForm()){
            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error("Error updating employee:", error);
                })  
            }else{
                createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator('/employees');
                }).catch(error => {
                    console.error("Error creating employee:", error);
                })
            } 
        }    
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (departmentId) {
            errorsCopy.department = '';
        } else {
            errorsCopy.department = 'Select Department';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if(id){
           return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form action="">
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input type="text"
                                   placeholder='Enter First Name'
                                   name='firstName'
                                   className={`form-control ${errors.firstName ?  'is-invalid' : ''}`}
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                             >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input type="text"
                                   placeholder='Enter Last Name'
                                   name='lastName'
                                   className={`form-control ${errors.lastName ?  'is-invalid' : ''}`}
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                             >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input type="text"
                                   placeholder='Enter Email'
                                   name='email'
                                   className={`form-control ${errors.email ?  'is-invalid' : ''}`}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                             >
                            
                            </input>
                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Select Department:</label>
                            <select 
                                className={`form-control ${errors.department ?  'is-invalid' : ''}`}
                                value={departmentId}
                                onChange={(e) => setDepartmentId(e.target.value)}
                            >
                                <option value="Select Department">Select Department</option>
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>
                                        {department.departmentName}
                                    </option>
                                ))}

                            </select>
                            {errors.department && <div className='invalid-feedback'> {errors.department} </div>}
                        </div>

                        <button className='btn btn-primary' onClick={saveOrUpdateEmlpoyee}>Submit</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent