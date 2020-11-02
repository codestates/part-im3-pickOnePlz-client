let REACT_APP_URL;

if (process.env.NODE_ENV === "production") {
  REACT_APP_URL = "ec2-3-132-118-81.us-east-2.compute.amazonaws.com";
} else if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "test"
) {
  REACT_APP_URL = "http://localhost:5000";
}

export default REACT_APP_URL;

// import REACT_APP_URL from "../config"
// ${REACT_APP_URL}
