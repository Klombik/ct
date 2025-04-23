import React from 'react';
import './SettingsToggle.css';

interface SettingsToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className="settings-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle-input"
      />
      <span className="toggle-slider"></span>
      <span className="toggle-label">{label}</span>
    </label>
  );
};

export default SettingsToggle;