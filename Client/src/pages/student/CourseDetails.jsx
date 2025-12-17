
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    currency,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  const fetcheCourseData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/" + id);
      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrollCourse = async () => {
    try {
      if (!userData) return toast.warn("Login to Enroll!");
      if (isAlreadyEnrolled) return toast.warn("Already Enrolled");

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/purchase",
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ YouTube ID extractor
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  useEffect(() => {
    fetcheCourseData();
  }, []);

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="relative flex flex-col-reverse items-start justify-between gap-10 px-8 pt-20 text-left md:flex-row md:px-36 md:placeholder-teal-300">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-cyan-100/70"></div>

        {/* left column */}
        <div className="z-10 max-w-xl text-gray-500">
          <h1 className="font-semibold text-gray-800 md:text-course-details-heading-large text-course-details-heading-small">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* review and rating  */}
          <div className="flex items-center pt-3 pb-1 space-x-2 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-3.5 h-3.5"
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-600 underline">
              {courseData.educator.name}
            </span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  className="mb-2 bg-white border border-gray-300 rounded"
                  key={index}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="down_arrow_icon"
                      />
                      <p className="text-sm font-medium md:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}{" "}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="py-2 pl-4 pr-4 text-gray-600 list-disc border-t border-gray-300 md:pl-10">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          {lecture.isPreviewFree ? (
                            <img
                              onClick={() =>
                                setPlayerData({
                                  videoId: getYouTubeId(lecture.lectureUrl),
                                })
                              }
                              className="w-4 h-4 mt-1 cursor-pointer"
                              src={assets.play_icon}
                              alt="play_icon"
                            />
                          ) : (
                            <img
                              className="w-4 h-4 mt-1 opacity-50 cursor-not-allowed"
                              src={assets.play_icon}
                              alt="play_icon"
                            />
                          )}

                          <div className="flex items-center justify-between w-full text-xs text-gray-800 md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: getYouTubeId(
                                        lecture.lectureUrl
                                      ),
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800 ">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* right column */}
        <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="courseThumbnail" />
          )}

          {/* rest of course card UI remains unchanged */}
		      <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="time_left_clock_icon"
              />

              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <p className="text-2xl font-semibold text-gray-800 md:text-4xl">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="text-gray-500 line-through md:text-lg">
                {currency} {courseData.coursePrice}{" "}
              </p>
              <p className="text-gray-500 md:text-lg">
                {currency} {courseData.discount}% off{" "}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2 text-sm text-gray-500 md:text-default md:pt-4">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="w-px h-4 bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="time_clock_icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="w-px h-4 bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson_icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <div
            // onClick={enrollCourse}
            >
              {isAlreadyEnrolled ? (
                <p className="w-full py-3 mt-4 font-medium text-center text-white bg-blue-600 rounded md:mt-6">
                  {" "}
                  Already Enrolled{" "}
                </p>
              ) : courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100 ===
                0.0 ? (
                <p className="w-full py-3 mt-4 font-medium text-center text-white bg-blue-600 rounded md:mt-6">
                  {" "}
                  Free{" "}
                </p>
              ) : (
                <button
                  onClick={enrollCourse}
                  className="w-full py-3 mt-4 font-medium text-center text-white bg-blue-600 rounded md:mt-6"
                >
                  {" "}
                  Enroll Now
                </button>
              )}
            </div>

            <div>
              {courseData.coursePrice -
                (courseData.discount * courseData.coursePrice) / 100 ===
              0.0 ? (
                <p className="w-full py-3 mt-4 font-medium text-center text-white bg-blue-600 rounded md:mt-6">
                  Click on Course structure{" "}
                </p>
              ) : isAlreadyEnrolled ? (
                <Link to="/my-enrollments">
                  <p className="w-full py-3 mt-4 font-medium text-center text-white bg-blue-600 rounded md:mt-6">
                    My Enrollments
                  </p>{" "}
                </Link>
              ) : (
                ""
              )}
            </div>

            <div className="pt-6">
              <p className="text-lg font-medium text-gray-800 md:text-xl">
                What's in the course?{" "}
              </p>
              <ul className="pt-2 ml-4 text-sm text-gray-500 list-disc md:text-default">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
                <li>Quizzes to test your knowledge.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
