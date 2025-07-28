import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listDepartment,deleteDepartment } from '../services/DepartmentService'


const ListDepartmentComponent = () => {
    const [departments, setDepartments]= useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllDepartments();
    },[] )

    function getAllDepartments() {
        listDepartment()
        .then((response)=> {
            setDepartments(response.data);
        }).catch(error => {
            console.error("Error fetching departments:", error);
        })
    }

    const addDepartment = () => {
        navigator('/add-department');
    }

    function updateDepartment(id){
        navigator(`/edit-department/${id}`);
    }

    function removeDeparment(id){
        deleteDepartment(id).then((response) => {
            getAllDepartments();
        }).catch(error => {
            console.error("Error deleting department:", error);
        })
    }


  return (
    <div className='container'>
        <h2 className="text-center">List of Departments</h2>
        <button className='btn btn-primary mb-3' onClick={addDepartment}>Add Department</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(department => 
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => removeDeparment(department.id)}
                             style={{marginLeft:"10px"}}
                             >Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        

    </div>
  )
}

export default ListDepartmentComponent