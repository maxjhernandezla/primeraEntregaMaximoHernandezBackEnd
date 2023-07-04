const logged = (req, res) => {
  try {
    const user = req.user;
    res.sendSuccess(user);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export { logged };
