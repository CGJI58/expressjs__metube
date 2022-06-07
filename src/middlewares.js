export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Metube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};
