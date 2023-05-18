import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourse, saveCourse, updateCourse } from "../../services/ApiServices";
import { toast } from "react-toastify";

const NewCourse = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id;

    const [course, setCourse] = useState({
        name: ''
    })
    const [error, setError] = useState({
        name: ''
    })

    useEffect(() => {
        if (id) {
            getCourse(id).then((response) => {
                setCourse(response.data);
            });
        }
    }, [id])

    const doRegister = (event) => {
        event.preventDefault();
        if (id) {
            updateCourse(course).then(() => {
                toast.success("Course has been updated successfully")
                navigate({ pathname: `/courses` });
            });
        } else {
            saveCourse(course).then(() => {
                toast.success("Course has been saved successfully")
                navigate({ pathname: `/courses` });
            });
        }
        
    }

    const handleInput = (event) => {
        if (event.target.id === 'name') {
            setError((state) => ({
                ...state,
                [event.target.id]: event.target.value.length < 3
            }));
        }
        setCourse((state) => ({
            ...state,
            [event.target.id]: event.target.value
        }));
    }

    return (
        <form className="w3-container" onSubmit={doRegister}>
            <div className="w3-panel w3-round-small w3-teal">
                <h3>
                    <span>
                        {id ? 'Course Update' : 'Course Registration'}
                    </span>
                    <Link to="/courses" className="w3-button w3-green custom-button">
                        <i className="w3-medium fa fa-chevron-left"></i>
                        Back
                    </Link>
                </h3>
            </div>

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-edit"></i><b>Name</b></label>
            <input className="w3-input w3-border" type="text" id="name" required value={course.name} onChange={handleInput} />
            {error.name ? <div className="w3-panel w3-red" >Please enter minimum 3 characters</div> : null}
            <br />
            <button className="w3-btn w3-blue" type="submit">
                <span>{id ? 'Update' : 'Save'}</span>
                <i className="w3-medium fa fa-check"></i>
            </button>
        </form>

    )
}

export default NewCourse;


