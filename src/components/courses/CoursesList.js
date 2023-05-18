import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../services/ApiServices";
import { toast } from "react-toastify";

const CoursesList = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    const [courses, setCourses] = useState();

    useEffect(() => {
        if(!courses){
            getAllCourses().then((reponse) => {
                setCourses(reponse.data)
            })
        }
    }, [courses])

    const deleteCrs = (id) => {
        deleteCourse(id).then(() => {
            setCourses(undefined)
            toast.success("Course has been deleted successfully");
        })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const goToDetail = (id) => {
        navigate({ pathname: `/update-course/${id}` });
    }

    const filterByStr = (search, value) => {
        if (typeof value === "string" || typeof value === "number") {
            return value.toString().includes(search)
        } else {
            return Object.values(value).some(val => filterByStr(search, val));
        }
    }

    const searchCourse = (list) => {
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
                <h3>Course List
                    <Link to="/add-courses">
                        <button className="w3-button w3-green custom-button">
                            <i className="w3-medium  fa fa-plus"></i> Add New Course
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
                            <th><i className="w3-medium custom-icon"></i> Sr. No.</th>
                            <th><i className="w3-medium custom-icon"></i> Course Name</th>
                            <th><i className="w3-medium custom-icon fa fa-pencil"></i> Update</th>
                            <th><i className="w3-medium custom-icon fa fa-trash"></i> Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchCourse(courses || []).length === 0 &&
                            <tr>
                                <td style={{textAlign: "center"}} colSpan={4}>
                                    {courses ? "No courses found" : "Loading..."}
                                </td>
                            </tr>
                        }
                        {searchCourse(courses || []).map((course, i) => {
                            return <tr key={i} onClick={() => goToDetail(course.id)}>
                                <td>{i + 1}</td>
                                <td className="pointer">{course.name} </td>
                                <td>
                                    <Link to="/add-courses">
                                        <button className="w3-button w3-blue">Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={(event) => { event.stopPropagation(); deleteCrs(course.id); }} className="w3-button w3-red">
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

export default CoursesList;

