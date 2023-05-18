

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStudent, saveStudent, updateStudent } from "../../services/ApiServices";
import { toast } from "react-toastify";

function NewStudent() {

    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id;

    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
    })
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
    })

    useEffect(() => {
        if (id) {
            getStudent(id).then((response) => {
                setStudent(response.data);
            })
        }
    }, [id])

    const doRegister = (event) => {
        event.preventDefault();
        student.name = student.firstName + " " + student.lastName;
        if (id) {
            updateStudent(student).then(() => {
                toast.success("Student has been updated successfully")
                navigate({ pathname: `/students` });
            })
        } else {
            saveStudent(student).then(() => {
                toast.success("Student has been saved successfully")
                navigate({ pathname: `/students` });
            })
        }
    }

    const handleInput = (event) => {
        if (event.target.id === 'dob') {
            const dob = /^(([0-9]{2})-([A-Za-z]{3})-([0-9]{4}))$/;
            setError((state) => ({
                ...state,
                [event.target.id]: !event.target.value.match(dob)
            }));
        }
        if (event.target.id === 'email') {
            const email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            setError((state) => ({
                ...state,
                [event.target.id]: !event.target.value.match(email)
            }));
        }
        if (event.target.id === 'firstName' || event.target.id === 'lastName') {
            setError((state) => ({
                ...state,
                [event.target.id]: event.target.value.length < 3
            }));
        }
        setStudent((state) => ({
            ...state,
            [event.target.id]: event.target.value
        }));
    }

    return (
        <form className="w3-container" onSubmit={doRegister}>
            <div className="w3-panel w3-round-small w3-teal">
                <h3>
                    <span>
                        {id ? 'Student Update' : 'Student Registration'}
                    </span>
                    <Link to="/students" className="w3-button w3-green custom-button">
                        <i className="w3-medium fa fa-chevron-left"></i>
                        Back
                    </Link>
                </h3>
            </div>

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-user"></i><b>First Name</b></label>
            <input className="w3-input w3-border" type="text" id="firstName" required value={student.firstName} onChange={handleInput} />
            {error.firstName ? <div className="w3-panel w3-red" >Please enter minimum 3 characters</div> : null}

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-user"></i><b>Last Name</b></label>
            <input className="w3-input w3-border" type="text" id="lastName" required value={student.lastName} onChange={handleInput} />
            {error.lastName ? <div className="w3-panel w3-red" >Please enter minimum 3 characters </div> : null}

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-calendar"></i><b>Date of Birth</b></label>
            <input className="w3-input w3-border" type="tel" placeholder="dd-MMM-yyyy" id="dob" required value={student.dob} onChange={handleInput} />
            {error.dob ? <div className="w3-panel w3-red" >Please enter valid date</div> : null}

            <label className="w3-text-blue"><i className="w3-medium custom-icon fa fa-envelope-o"></i><b>Email Address</b></label>
            <input className="w3-input w3-border" type="email" id="email" required value={student.email} onChange={handleInput} />
            {error.email ? <div className="w3-panel w3-red" >Please enter valid email address</div> : null}
            <br />
            <button className="w3-btn w3-blue" type="submit">
                <span>{id ? 'Update' : 'Save'}</span>
                <i className="w3-medium fa fa-check"></i>
            </button>
        </form>

    )
}

export default NewStudent;


