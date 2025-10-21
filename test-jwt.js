const jwt = require('jsonwebtoken');

const payload = { userId: 1, email: "test@test.com" };
const secret = "test_secret";
const options = { expiresIn: "7d" };

try {
  const token = jwt.sign(payload, secret, options);
  console.log("Token generado correctamente:", token.substring(0, 20) + "...");
} catch (error) {
  console.error("Error:", error.message);
}
