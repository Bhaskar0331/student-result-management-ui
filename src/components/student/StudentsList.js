import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteStudent, getAllStudents } from "../../services/ApiServices";
import { toast } from "react-toastify";

const StudentsList = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    const [students, setStudents] = useState();
    useEffect(() => {
        if(!students){
            getAllStudents().then((reponse) => {
                setStudents(reponse.data)
            })
        }
    }, [students])

    const deleteStd = (id) => {
        deleteStudent(id).then(() => {
            toast.success("Student has been deleted successfully");
            setStudents(undefined)
        })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const goToDetail = (id) => {
        navigate({ pathname: `/update-student/${id}` });
    }

    const filterByStr = (search, value) => {
        if (typeof value === "string" || typeof value === "number") {
            return value.toString().includes(search)
        } else {
            return Object.values(value).some(val => filterByStr(search, val));
        }
    }

    const searchStudent = (list) => {
        return list.filter(value => {
            if (search.trim().length > 0) {
                return filterByStr(search, value) ? value : null;
            } else {
                return value;
            }
        })
    }

    return (
        <div className="w3-container">
            <div className="w3-panel w3-round-small w3-teal">
                <h3>Student List
                    <Link to="/add-students">
                        <button className="w3-button w3-green custom-button">
                            <i className="w3-medium  fa fa-plus"></i> Add New Student
                        </button>
                    </Link>
                </h3>
            </div>
            <span className="search_panel">
                <i className="w3-medium fa fa-search"></i>
                Search : <input type="text" value={search} onChange={handleSearch} />
                {search ? <i className="w3-medium fa fa-close search_back" onClick={() => { setSearch('') }}></i> : null}
            </span>
            <div className="w3-panel w3-light-grey w3-padding-16 w3-card-2">
                <table className="w3-table w3-striped w3-bordered">
                    <thead>
                        <tr>
                            <th><i className="w3-medium custom-icon fa fa-list"></i> Sr. No.</th>
                            <th><i className="w3-medium custom-icon fa fa-user"></i> First Name</th>
                            <th><i className="w3-medium custom-icon fa fa-user"></i> Family Name</th>
                            <th><i className="w3-medium custom-icon fa fa-calendar"></i> Date of Birth</th>
                            <th><i className="w3-medium custom-icon fa fa-envelope-o"></i> Email Address</th>
                            <th><i className="w3-medium custom-icon fa fa-pencil"></i> Update</th>
                            <th><i className="w3-medium custom-icon fa fa-trash"></i> Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchStudent(students || []).length === 0 &&
                            <tr>
                                <td style={{textAlign: "center"}} colSpan={7}>
                                    {students ? "No students found" : "Loading..."}
                                </td>
                            </tr>
                        }
                        {searchStudent(students || []).map((student, i) => {
                            return <tr key={i} onClick={() => goToDetail(student.id)}>
                                <td>{i + 1}</td>
                                <td className="pointer" >{student.firstName}</td>
                                <td className="pointer" >{student.lastName}</td>
                                <td className="pointer" >{student.dob} </td>
                                <td className="pointer" >{student.email}</td>
                                <td>
                                    <Link to="/add">
                                        <button className="w3-button w3-blue">Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={(event) => { event.stopPropagation(); deleteStd(student.id); }} className="w3-button w3-red">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default React.memo(StudentsList);

