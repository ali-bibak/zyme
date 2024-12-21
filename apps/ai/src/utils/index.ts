// Please check docs: https://clerk.com/docs/references/express/overview
import { getAuth } from "@clerk/express";

const hasAdminPermission = (req, res, next) => {
  const auth = getAuth(req);
  if (!auth.has({ permission: "org:admin:testpermission" })) {
    return res.status(403).send("Forbidden");
  }

  return next();
};
