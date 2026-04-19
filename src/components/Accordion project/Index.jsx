import { useState } from "react";
import { ChevronDown, BookOpen, Layers, GraduationCap } from "lucide-react";
import Data from "./Data";
import uniben from './uniben.png'
import "./style.css";

export default function Seeker() {
  const [selected, setSelected] = useState(null);
  const [multipleMode, setMultipleMode] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  function handleSingleSelection(getId) {
    setSelected(getId === selected ? null : getId);
  }

  function handleMultipleSelection(getId) {
    let cpyMultiple = [...multipleSelected];
    const findIndex = cpyMultiple.indexOf(getId);
    if (findIndex === -1) cpyMultiple.push(getId);
    else cpyMultiple.splice(findIndex, 1);
    setMultipleSelected(cpyMultiple);
  }

  function isOpen(id) {
    return multipleMode
      ? multipleSelected.indexOf(id) !== -1
      : selected === id;
  }

  return (
    <div className="seeker-wrapper">

      {/* ── hero section ── */}
      <div className="seeker-hero">
        <div className="seeker-hero-text">
          <div className="seeker-hero-badge">
            <GraduationCap size={13} />
            100 Level Engineering · UNIBEN
          </div>
          <h1 className="seeker-brand">SEEKER</h1>
          <p className="seeker-subtitle">
            Your complete guide to every course in your first year.
            Know what to expect before you walk into that lecture hall.
          </p>
          <button
            className={`mode-toggle ${multipleMode ? "mode-toggle--active" : ""}`}
            onClick={() => {
              setMultipleMode(!multipleMode);
              setMultipleSelected([]);
              setSelected(null);
            }}
          >
            <Layers size={15} />
            {multipleMode ? "Disable multiple view" : "Enable multiple view"}
          </button>
        </div>

        <div className="seeker-hero-image-wrap">
          <div className="seeker-hero-image-glow" />
          <img
            src={uniben}
            alt="Engineering student"
            className="seeker-hero-image"
          />
        </div>
      </div>

      {/* ── stats bar ── */}
      <div className="seeker-stats">
        <div className="stat-item">
          <span className="stat-num">12</span>
          <span className="stat-label">courses</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">23</span>
          <span className="stat-label">total units</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">3</span>
          <span className="stat-label">faculties</span>
        </div>
      </div>

      {/* ── accordion list ── */}
      <div className="seeker-list">
        {Data && Data.length > 0 ? (
          Data.map((x) => (
            <div
              className={`accordion-item ${isOpen(x.id) ? "accordion-item--open" : ""}`}
              key={x.id}
            >
              <button
                className="accordion-trigger"
                onClick={
                  multipleMode
                    ? () => handleMultipleSelection(x.id)
                    : () => handleSingleSelection(x.id)
                }
              >
                <div className="accordion-trigger-left">
                  <BookOpen size={16} className="accordion-icon" />
                  <div className="accordion-titles">
                    <span className="accordion-code">{x.title}</span>
                    <span className="accordion-course-title">{x.courseTitle}</span>
                  </div>
                </div>
                <div className="accordion-trigger-right">
                  <span className="accordion-credit">{x.credits} unit{x.credits > 1 ? "s" : ""}</span>
                  <ChevronDown size={18} className="accordion-chevron" />
                </div>
              </button>

              {isOpen(x.id) && (
                <div className="accordion-body">
                  <div className="accordion-faculty-tag">
                    <GraduationCap size={13} />
                    {x.faculty}
                  </div>
                  <p className="accordion-content">{x.content}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="seeker-empty">No course data found.</div>
        )}
      </div>

      <footer className="seeker-footer">
        <p>SEEKER &mdash; Built for incoming 100L Engineering students &bull; frank/Tech </p>
      </footer>
    </div>
  );
}