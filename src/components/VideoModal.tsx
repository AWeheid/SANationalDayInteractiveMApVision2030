import React from "react";
import "./VideoModal.css";

interface ScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  regionName: string;
  script: string;
  objectives?: string[];
  subProjects?: string[];
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  regionName,
  script,
  objectives = [],
  subProjects = [],
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            ×
          </button>
          <div className="header-content">
            <h2>{regionName}</h2>
          </div>
          <img
            src="/LOGO.svg"
            alt="Saudi National Day 95"
            className="modal-logo"
          />
        </div>
        <div className="modal-body">
          <div className="script-content">
            <div className="content-section">
              <h3 className="section-title">التعريف</h3>
              <p className="section-text">{script}</p>
            </div>
            
            {objectives.length > 0 && (
              <div className="content-section">
                <h3 className="section-title">الأهداف</h3>
                <ul className="objectives-list">
                  {objectives.map((objective, index) => (
                    <li key={index} className="objective-item">{objective}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {subProjects.length > 0 && (
              <div className="content-section">
                <h3 className="section-title">المشاريع الفرعية</h3>
                <ul className="subprojects-list">
                  {subProjects.map((subProject, index) => (
                    <li key={index} className="subproject-item">{subProject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* <div className="modal-footer">
          <div className="vision-badge">
            <span>رؤية المملكة 2030</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};
