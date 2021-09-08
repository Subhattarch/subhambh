function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import ProjectTile from "./Project-Tile.js";
import "./modules/react.development.js"
import "./modules/react-dom.development.js"
import "./modules/jquery.min.js"
let DOM = document.querySelector("#DOM-Projects");

let MyProjects = () => {
  let projectsRef = React.useRef();
  let projects = projectsRef.current;
  const [Projects, SetProjects] = React.useState([{
    name: "placeholder",
    href: "",
    key: 0
  }]);
  const [ProjectDisplayNumber, SetProjectDisplayNumber] = React.useState(6);
  React.useEffect(() => $.get("./Projects.json", data => {
    projects = data.map((Data, index) => ({ ...Data,
      key: index
    }));
    projectsRef.current = projects;
    SetProjects(projects.slice(0, ProjectDisplayNumber));
  }), []);
  React.useEffect(() => {
    if (Array.isArray(projects)) return SetProjects(projects.slice(0, ProjectDisplayNumber));
  }, [ProjectDisplayNumber]);

  let ShowMore = () => SetProjectDisplayNumber(ProjectDisplayNumber => ProjectDisplayNumber + 6);

  let ShowLess = () => SetProjectDisplayNumber(6);

  return /*#__PURE__*/React.createElement(React.Fragment, null, Projects.map(Project => /*#__PURE__*/React.createElement(ProjectTile, Project)), projects && projects.length > 6 && /*#__PURE__*/React.createElement("input", _extends({
    type: "button"
  }, Projects.length < projects.length ? {
    onClick: ShowMore,
    value: "Show More"
  } : {
    onClick: ShowLess,
    value: "Show Less"
  })));
};

ReactDOM.render( /*#__PURE__*/React.createElement(MyProjects, null), DOM);