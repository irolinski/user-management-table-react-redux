interface StandardizeSwitchTypes {
  isActive: boolean;
  handleToggle: () => void;
  colorOne: string;
  colorTwo: string;
}

const StandardizeSwitch = ({
  isActive,
  handleToggle,
  colorOne,
  colorTwo,
}: StandardizeSwitchTypes) => {
  return (
    <>
      <input
        checked={isActive}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch`}
        type="checkbox"
      />
      <label
        style={{ background: isActive ? colorOne : colorTwo }}
        className="switch-label"
        htmlFor={`switch`}
      >
        <span className={`switch-button`} />
      </label>
    </>
  );
};

export default StandardizeSwitch;
