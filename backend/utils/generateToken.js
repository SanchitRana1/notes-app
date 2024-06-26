const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const authToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return authToken;
};
module.exports = generateToken;
