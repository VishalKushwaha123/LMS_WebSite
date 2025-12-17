// /** @format */

// import React from "react";
// import { Route, Routes, useMatch } from "react-router-dom";
// import Home from "./pages/student/Home";
// import CoursesList from "./pages/student/CoursesList";
// import CourseDetails from "./pages/student/CourseDetails";
// import MyEnrollMent from "./pages/student/MyEnrollMent";
// import Player from "./pages/student/Player";
// import Loading from "./components/student/Loading";
// import Educator from "./pages/educator/Educator";
// import Dashboard from "./pages/educator/Dashboard";
// import AddCourses from "./pages/educator/AddCourse";
// import MyCourses from "./pages/educator/MyCourses";
// import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
// import Navbar from "./components/student/Navbar";
// import "quill/dist/quill.snow.css";
// import { ToastContainer } from "react-toastify";
// import About from "./components/About";
// import ContactForm from "./components/ContactForm";

// const App = () => {
//   const isEducatorRoute = useMatch("/educator/*");

//   return (
//     <div className="min-h-screen bg-white text-default">
//       <ToastContainer />
//       {!isEducatorRoute && <Navbar />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/course-list" element={<CoursesList />} />
//         <Route path="/course-list/:input" element={<CoursesList />} />
//         <Route path="/course/:id" element={<CourseDetails />} />
//         <Route path="/my-enrollments" element={<MyEnrollMent />} />
//         <Route path="/player/:courseId" element={<Player />} />
//         <Route path="/loading/:path" element={<Loading />} />

//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<ContactForm />} />

//         <Route path="/educator" element={<Educator />}>
//           <Route path="/educator" element={<Dashboard />} />
//           <Route path="add-course" element={<AddCourses />} />
//           <Route path="my-courses" element={<MyCourses />} />
//           <Route path="student-enrolled" element={<StudentsEnrolled />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;


/** @format */

import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";

// Student pages
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollMent from "./pages/student/MyEnrollMent";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";

// Educator pages
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse"; // corrected name
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";

// Components
import Navbar from "./components/student/Navbar";
import About from "./components/About";
import ContactForm from "./components/ContactForm";

// Styles
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="min-h-screen bg-white text-default">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollMent />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />

        {/* Educator Routes */}
        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />           {/* default dashboard */}
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
