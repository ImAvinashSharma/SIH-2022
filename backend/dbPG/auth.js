const authUser = (req, res, next) => {
  const { user } = req;
  console.log(user);
  if (req.user == null) {
    res.status(403);
    return res.json({ message: "Your not login" });
  }
  next();
};

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      return res.send("Not allowed");
    }

    next();
  };
}

module.exports = {
  authUser,
  authRole
};
