interface SwitchProps {
  darkMode: boolean;
  toggleDarkMode(): void;
}

function Switch({ darkMode, toggleDarkMode }: SwitchProps) {
  return (
    <div className="absolute top-0 right-0 m-4">
      <label
        className="toggle-switch-js flex rounded-full w-[3rem] bg-blue-dark cursor-pointer focus:ring-2"
        htmlFor="toggle-switch"
      >
        <span className="absolute -left-[9999px] -top-[9999px] bg-white">
          toggle dark mode
        </span>
        <input
          className="absolute -left-[9999px] -top-[9999px]"
          name="toggle-switch"
          id="toggle-switch"
          type="checkbox"
          onChange={toggleDarkMode}
        />
        <span
          className={`${
            darkMode ? "translate-x-[1.2rem]" : "translate-x-0"
          } inline-block m-[0.3rem] w-[1.2rem] h-[1.2rem] rounded-full transition-transform bg-white`}
        ></span>
      </label>
    </div>
  );
}

export default Switch;
