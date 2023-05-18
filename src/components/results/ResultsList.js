import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteResult, getAllCourses, getAllResults, getAllStudents } from "../../services/ApiServices";
import { toast } from "react-toastify";

const ResultsList = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');

    const [results, setResults] = useState();
    const [courses, setCourses] = useState()
    const [students, setStudents] = useState()

    useEffect(() => {
        if(!results) {
            getAllResults().then((reponse) => {
                setResults(reponse.data)
            })
            getAllCourses().then((response) => {
                setCourses(response.data)
            });
            getAllStudents().then((response) => {
                setStudents(response.data)
            });
        }
    }, [results])

    const deleteRls = (id) => {
        deleteResult(id).then(() => {
            toast.success("Result has been deleted successfully")
            setResults(undefined)
        })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const goToDetail = (id) => {
        navigate({ pathname: `/update-result/${id}` });
    }

    const filterByStr = (search, value) => {
        if (typeof value === "string" || typeof value === "number") {
            return value.toString().includes(search)
        } else {
            return Object.values(value).some(val => filterByStr(search, val));
        }
    }

    const searchResult = (list) => {
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
                <h3>Result List
                    <Link to="/add-results">
                        <button className="w3-button w3-green custom-button">
                            <i className="w3-medium  fa fa-plus"></i> Add New Result
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
                            <th><i className="w3-medium custom-icon fa fa-edit"></i> Course</th>
                            <th><i className="w3-medium custom-icon fa fa-edit"></i> Student</th>
                            <th><i className="w3-medium custom-icon fa fa-edit"></i> Score</th>
                            <th><i className="w3-medium custom-icon fa fa-pencil"></i> Update</th>
                            <th><i className="w3-medium custom-icon fa fa-trash"></i> Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult(results || []).length === 0 &&
                            <tr>
                                <td style={{textAlign: "center"}} colSpan={6}>
                                    {results ? "No results found" : "Loading..."}
                                </td>
                            </tr>
                        }
                        {searchResult(results || []).map((result, i) => {
                            return <tr key={i} onClick={() => goToDetail(result.id)}>
                                <td>{i + 1}</td>
                                <td className="pointer" >{courses && courses.filter(res => res.id === result.courseId)[0]?.name} </td>
                                <td className="pointer" >{students && students.filter(res => res.id === result.studentId)[0]?.name}</td>
                                <td className="pointer" >{result.score}</td>
                                <td>
                                    <Link to="/add-results">
                                        <button className="w3-button w3-blue">Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={(event) => { event.stopPropagation(); deleteRls(result.id); }} className="w3-button w3-red">
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

export default ResultsList;

