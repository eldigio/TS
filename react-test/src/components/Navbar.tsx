const themes = [
  { name: "light" },
  { name: "halloween" },
  { name: "forest" },
  { name: "black" },
  { name: "luxury" },
  { name: "dracula" },
  { name: "business" },
  { name: "night" },
  { name: "coffee" },
  { name: "dim" },
  { name: "sunset" },
];

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 flex justify-between">
      <a className="btn btn-ghost text-xl"></a>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="h-2 w-2 fill-current opacity-60 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label="Default"
              value="default"
            />
          </li>
          {themes.map((theme, index) => (
            <li key={index}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={theme.name.charAt(0).toUpperCase() + theme.name.slice(1, theme.name.length)}
                value={theme.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
