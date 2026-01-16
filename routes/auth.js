import express from "express";
import createToken from "../utils/validation.js";

const router = express.Router();

router.post("/login", (req, res, next) => {
  try {
    const role = req.body.roles;
    const accessToken = createToken(role);
    if (accessToken) {
      res.status(201).json(accessToken);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
