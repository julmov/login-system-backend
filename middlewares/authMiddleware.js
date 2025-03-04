import JWT from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("Unauthorized");

  try {
    const decoded = await JWT.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );

    // If the token is valid, attach the decoded user information to the request object
    
    if (decoded) {
      req.user = decoded;
      return next(); // Call the next middleware or route handler
    }
  } catch (err) {
    console.log(err);
  }

  return res.status(403).send("Invalid token");
};

export default authMiddleware;
