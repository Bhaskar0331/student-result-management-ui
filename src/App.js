import Login from './components/auth/Login';
import AuthContextProvider from './components/auth/AuthContextProvider';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import NewStudent from './components/student/NewStudent'
import Home from './components/Home';
import StudentsList from './components/student/StudentsList';
import NewCourse from './components/courses/NewCourse';
import CoursesList from './components/courses/CoursesList';
import NewResult from './components/results/NewResult';
import ResultsList from './components/results/ResultsList';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />

          <Route path="/students" element={<StudentsList />} />
          <Route path="/add-students" element={<NewStudent />} />
          <Route path="/update-student/:id" element={<NewStudent />} />

          <Route path="/courses" element={<CoursesList />} />
          <Route path="/add-courses" element={<NewCourse />} />
          <Route path="/update-course/:id" element={<NewCourse />} />

          <Route path="/results" element={<ResultsList />} />
          <Route path="/add-results" element={<NewResult />} />
          <Route path="/update-result/:id" element={<NewResult />} />

        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthContextProvider>
  )
}

export default App;

