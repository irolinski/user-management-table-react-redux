interface StandardizeSwitchTypes {
  isActive: boolean;
  handleToggle: () => void;
}

const StandardizeSwitch = ({
  isActive,
  handleToggle,
}: StandardizeSwitchTypes) => {
  return (
    <div className={`standardize-switch ${isActive && "active"}`}>
      <input
        checked={isActive}
        onChange={handleToggle}
        className="switch-checkbox"
        id="switch"
        type="checkbox"
      />
      <label className="switch-label" htmlFor="switch">
        <span className="switch-button" />
      </label>
    </div>
  );
};

export default StandardizeSwitch;
