import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkBehavior = forwardRef(({ href, ...other }, ref) => {
  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehavior.propTypes = {
  href: PropTypes.string
};

LinkBehavior.displayName = "LinkBehavior";

export default LinkBehavior;
