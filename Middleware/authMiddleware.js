const { admin } = require("../Config/Firebase");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role || 'user';
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "NO: insufficient role! Please relax!" });
    }
    next();
  };
};

exports.verifySuperAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const idToken = authHeader.split('Bearer ')[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.role === 'superadmin') {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden: Requires super admin role' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
}};