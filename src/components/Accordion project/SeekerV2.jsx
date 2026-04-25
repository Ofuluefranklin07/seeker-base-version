import { useState } from "react";
import Data from "./Data";
import { ChevronDown, BookOpen, GraduationCap, Award } from "lucide-react";
import "./SeekerV2.css";

export default function SeekerV2() {
  const [singleSelection, setSingleSelection] = useState(null);
  const [multipleView, setMultipleView] = useState(false);
  const [multiD, setMultiD] = useState([]);

  function handleId(id) {
    setSingleSelection(id === singleSelection ? null : id);
  }

  function handleMultipleId(getId) {
    let addMultiple = [...multiD];
    const findIndex = addMultiple.indexOf(getId);
    if (findIndex === -1) addMultiple.push(getId);
    else addMultiple.splice(findIndex, 1);
    setMultiD(addMultiple);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <GraduationCap size={32} className="header-icon" />
          <h1 style = {{ color: 'white' }}>Course Explorer</h1>
          <p>Discover your academic journey</p>
        </div>
      </header>

      <main className="main-content">
        <div className="controls-section">
          <div className="toggle-container">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={multipleView}
                onChange={() => setMultipleView(!multipleView)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Enable Multiple Selection</span>
            </label>
          </div>
        </div>

        <div className="accordion-container">
          {Data && Data.length > 0 ? (
            Data.map((course) => (
              <div className="accordion-item" key={course.id}>
                <div
                  className={`accordion-header ${singleSelection === course.id || multiD.includes(course.id) ? 'active' : ''}`}
                  onClick={
                    multipleView
                      ? () => handleMultipleId(course.id)
                      : () => handleId(course.id)
                  }
                >
                  <div className="course-info">
                    <div className="course-code">{course.title}</div>
                    <div className="course-title">{course.courseTitle}</div>
                  </div>
                  <div className="header-right">
                    <div className="course-meta">
                      <span className="credits">
                        <Award size={14} />
                        {course.credits} {course.credits === 1 ? 'unit' : 'units'}
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`chevron-icon ${singleSelection === course.id || multiD.includes(course.id) ? 'rotated' : ''}`}
                    />
                  </div>
                </div>

                <div className={`accordion-content ${singleSelection === course.id || multiD.includes(course.id) ? 'expanded' : ''}`}>
                  <div className="content-inner">
                    <div className="faculty-badge">
                      <BookOpen size={16} />
                      {course.faculty}
                    </div>
                    <div className="course-description">
                      {course.content}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">
              <BookOpen size={48} />
              <h3>No courses found</h3>
              <p>Please check back later for course information.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
