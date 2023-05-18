import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllCourses, getAllStudents, getResult, saveResult, updateResult } from "../../services/ApiServices";
import { toast } from "react-toastify";

const NewResult = () => {

    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id;

    const [courses, setCourses] = useState()
    const [students, setStudents] = useState()

    const [result, setResult] = useState({
        courseId: '',
        studyId: '',
        score: ''
    })

    useEffect(() => {
        if(!courses) {
            getAllCourses().then((response) => {
                setCourses(response.data)
            });
        }
        if(!students) {
            getAllStudents().then((response) => {
                setStudents(response.data)
            });
        }
        if (id && !result.id) {
           getResult(id).then((response) => {
                setResult(response.data);
           })
        }
    }, [id, courses, students, result])

    const doRegister = (event) => {
        event.preventDefault();
        if (id) {
            updateResult(result).then((response) => {
                toast.success("Result has been updated successfully")
                navigate({ pathname: `/results` });
           })
        } else {
            saveResult(result).then((response) => {
                toast.success("Result has been saved successfully")
                navigate({ pathname: `/results` });
           })
        }
    }

    const handleInput = (event) => {
        setResult((state) => ({
            ...state,
            [event.target.id]: event.target.value
        }));
    }

    return (
        <form className="w3-container" onSubmit={doRegister}>
            <div className="w3-panel w3-round-small w3-teal">
                <h3>
                    <span>
                        {id ? 'Result Update' : 'Result Registration'}
                    </span>
                    <Link to="/results" className="w3-button w3-green custom-button">
                        <i className="w3-medium fa fa-chevron-left"></i>
                        Back
                    </Link>
                </h3>
            </div>

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-edit"></i><b>Course</b></label>
            <select className="w3-input w3-border" id="courseId" required value={result.courseId} onChange={handleInput} >
                <option value={""}>Select</option>
                {
                    courses && courses.map((course, idx) => {
                        return (
                            <option value={course.id}>{course.name}</option>
                        )
                    })
                }
            </select>

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-edit"></i><b>Student</b></label>
            <select className="w3-input w3-border" id="studentId" required value={result.studentId} onChange={handleInput} >
                <option value={""}>Select</option>
                {
                    students && students.map((student, idx) => {
                        return (
                            <option value={student.id}>{student.name}</option>
                        )
                    })
                }
            </select>

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-edit"></i><b>Score</b></label>
            <select className="w3-input w3-border" id="score" required value={result.score} onChange={handleInput} >
                <option value={""}>Select</option>
                {
                    ["A", "B", "C", "D", "E", "F"].map((score, idx) => {
                        return (
                            <option value={score}>{score}</option>
                        )
                    })
                }
            </select>
            <br />
            <button className="w3-btn w3-blue" type="submit">
                <span>{id ? 'Update' : 'Save'}</span>
                <i className="w3-medium fa fa-check"></i>
            </button>
        </form>

    )
}

export default NewResult;


