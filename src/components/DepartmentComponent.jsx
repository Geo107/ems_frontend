import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createDepartment,updateDepartment,getDepartment } from '../services/DepartmentService'

const DepartmentComponent = () => {
   const [departmentName,setDepartmentName] =  useState('')
   const [departmentDescription,setDepartmentDescription] =  useState('')
   const [errors,setErrors] = useState({
         firstName: '',
         lastName: '',
         email: ''
   })

   const { id } = useParams();

   const navigator = useNavigate();

   useEffect(() => {
        if(id){
            getDepartment(id)
                .then((response) => {
                setDepartmentName(response.data.departmentName);
                setDepartmentDescription(response.data.departmentDescription);
            }).catch(error => {
                console.error("Error fetching department:", error);
            })
        }
   }, [id])

   //
    function saveOrUpdateDepartment(e){
        e.preventDefault();

        const department = {departmentName,departmentDescription};

        if(validateForm()){
            if(id){
                updateDepartment(id, department).then((response) => {
                    console.log(response.data);
                    navigator('/departments');
                }).catch(error => {
                    console.error("Error updating department:", error);
                })  
            }else{
                createDepartment(department).then((response) => {
                console.log(response.data);
                navigator('/departments');
                }).catch(error => {
                    console.error("Error creating department:", error);
                })
            } 
        }    
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (departmentName.trim()) {
            errorsCopy.departmentName = '';
        } else {
            errorsCopy.departmentName = 'Department Name is required';
            valid = false;
        }

        if (departmentDescription.trim()) {
            errorsCopy.departmentDescription = '';
        } else {
            errorsCopy.departmentDescription = 'Description Name is required';
            valid = false;
        }


        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if(id){
           return <h2 className='text-center'>Update Department</h2>
        }else{
            return <h2 className='text-center'>Add Department</h2>
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
                            <label className='form-label'>Department Name</label>
                            <input type="text"
                                   placeholder='Enter Department Name'
                                   name='departmentName'
                                   className={`form-control ${errors.departmentName ?  'is-invalid' : ''}`}
                                   value={departmentName}
                                   onChange={(e) => setDepartmentName(e.target.value)}
                             >
                            </input>
                            {errors.departmentName && <div className='invalid-feedback'> {errors.departmentName} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Department Description</label>
                            <input type="text"
                                   placeholder='Enter Department Description'
                                   name='departmentDescription'
                                   className={`form-control ${errors.departmentDescription ?  'is-invalid' : ''}`}
                                   value={departmentDescription}
                                   onChange={(e) => setDepartmentDescription(e.target.value)}
                             >
                            </input>
                            {errors.departmentDescription && <div className='invalid-feedback'> {errors.departmentDescription} </div>}
                        </div>

                        <button className='btn btn-primary' onClick={saveOrUpdateDepartment}>Submit</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
  )
}

export default DepartmentComponent