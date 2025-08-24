import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allcourses } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        learn from the best
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi ratione laborum dolorem officia <br/> eligendi labore sint. Itaque sapiente asperiores ut.
      </p>

      <div className="grid grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allcourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >
        Show all Courses
      </Link>
    </div>
  );
};

export default CoursesSection;
