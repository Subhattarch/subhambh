import "./modules/react.development.js"
import "./modules/react-dom.development.js"
import "./modules/jquery.min.js"
export default (({
  name,
  href
}) => {
  const aRef = React.useRef();
  const [iFrameScale, setScale] = React.useState(1);
  React.useEffect(() => {
    let updateScale = () => setScale($(aRef.current).width() / 1024);

    $(window).resize(updateScale);
    updateScale();
  }, []);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    id: name,
    ref: aRef
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: iFrameScale * 768
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    src: href,
    width: "1024px",
    height: "768px",
    frameBorder: "0",
    style: {
      transform: `scale(${iFrameScale})`
    }
  })), /*#__PURE__*/React.createElement("h3", null, name.replace(/-/g, " ")));
});