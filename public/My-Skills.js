import { delay } from "./small-functions.js";
import "./modules/react.development.js"
import "./modules/react-dom.development.js"
import "./modules/jquery.min.js"
const DOM = document.querySelector("#DOM-Skills");

let MySkills = () => {
  const IsMotionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let intersectionObserverRef = React.useRef(new IntersectionObserver(delay(entries => {
    entries.forEach(entrie => {
      if (entrie.isIntersecting || IsMotionReduced) {
        if (!IsMotionReduced) $(entrie.target).css("--animation-ofset", "150vw");
        return setTimeout(() => {
          $(entrie.target).css("--opacity", "1");
        }, 100);
      }

      $(entrie.target).css("--animation-ofset", "-150vw");
      setTimeout(() => {
        $(entrie.target).css("--opacity", "0");
      }, 100);
    });
  }), {
    threshold: 1
  }));
  let intersectionObserver = intersectionObserverRef.current;
  const [Skills, SetSkills] = React.useState({
    BestAt: [],
    AlsoKnow: []
  });
  React.useEffect(() => {
    $.get("./Skills.json", skills => SetSkills(skills));
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    id: "I-am-best-at"
  }, /*#__PURE__*/React.createElement("h2", null, "I'm best at"), Skills.BestAt.map((skill, index) => /*#__PURE__*/React.createElement("h3", {
    key: index,
    style: {
      color: skill.color
    },
    ref: bestSkill => {
      intersectionObserver.observe(bestSkill);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: "var(--opacity)"
    }
  }, skill.name)))), /*#__PURE__*/React.createElement("section", {
    id: "I-also-know"
  }, /*#__PURE__*/React.createElement("h2", null, "I also know"), Skills.AlsoKnow.map((skill, index) => /*#__PURE__*/React.createElement("h4", {
    key: index
  }, skill))));
};

ReactDOM.render( /*#__PURE__*/React.createElement(MySkills, null), DOM);