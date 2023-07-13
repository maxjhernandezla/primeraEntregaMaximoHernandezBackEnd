const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");
  next();
};

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login')
    next()
  }  

export { publicAccess, privateAccess };