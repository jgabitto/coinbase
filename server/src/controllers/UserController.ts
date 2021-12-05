import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";

import { auth } from "../middleware/auth";
import { User } from "../models/user";

const router = Router();

// POST User login
router.post("/signIn", async (req: Request, res: Response) => {
  try {
    // Find user using email and password
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // Generate auth token
    const token = await user.generateAuthToken();
    // Put JWT in cookie
    res.cookie("auth_token", token, { secure: true, sameSite: "none" });
    res.set({ Authorization: token });
    return res.status(200).send({ message: "Success" });
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({ message: e.message });
  }
});

// POST Create users
router.post("/signup", async (req, res) => {
  try {
    // Create user from req.body
    const user = new User(req.body);
    // Generate token for user
    const token = await user.generateAuthToken();
    // Save user
    await user.save();
    // Put JWT in cookie
    res.cookie("auth_token", token);
    res.set({ Authorization: token });
    return res.sendStatus(200);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({ message: e.message });
  }
});

// POST Logout user
router.get("/logout", auth, async (req, res) => {
  try {
    // Clear token from cookie
    res.clearCookie("auth_token");

    return res.sendStatus(200);
  } catch (e: any) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

// PATCH Update a user by id
router.patch("/updateUser", auth, async (req: any, res) => {
  const user = req.user;
  // Get updates from form
  const updates = Object.keys(req.body);
  const updatesMade: any = [];
  let isMatchOld;
  let isMatchNew;

  try {
    if (req.body["oldPassword"] && req.body["oldPassword"] !== "") {
      isMatchOld = await bcrypt.compare(req.body["oldPassword"], user.password);
      isMatchNew = await bcrypt.compare(req.body["password"], user.password);

      if (!isMatchOld) {
        return res
          .status(400)
          .send({ message: "Password is incorrect", type: "unsuccessfulOld" });
      }

      if (isMatchNew) {
        return res.status(400).send({
          message: "Please enter a new password",
          type: "unsuccessfulNew",
        });
      }
    }

    // Update each property of user that needs to be updated
    updates.forEach((update) => {
      // Check if user property is not the same as the submitted update and non empty
      if (
        user[update] !== req.body[update] &&
        req.body[update] !== "" &&
        update !== "oldPassword"
      ) {
        user[update] = req.body[update];
        updatesMade.push(update);
      }
    });

    if (
      user.isModified("password") ||
      user.isModified("userName") ||
      user.isModified("email")
    ) {
      await user.save();
      return res.status(200).send({
        updates: user[updatesMade],
        message: "User was updated successfully!",
        type: "successful",
      });
    }

    if (req.body["email"] !== "")
      return res.status(400).send({
        message: "Please enter a new email or delete email.",
        type: "unsuccessfulEmail",
      });

    if (req.body["userName"] !== "")
      return res.status(400).send({
        message: "Please enter a new username or delete username.",
        type: "unsuccessfulUserName",
      });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(400).send({
        message: "Email is already used by another user!",
        type: "unsuccessfulDuplicateEmail",
      });
    }
    return res.status(400).send({ message: e.message });
  }
});

// DELETE Delete a user by id
router.delete("/remove-user/:id", auth, (req: any, res, next) => {
  try {
    // Create user from req.body
    User.findByIdAndDelete(req.user.id);

    return res.sendStatus(200);
  } catch (e: any) {
    console.log(e.message);
    return res.status(400).send({ message: e.message });
  }
});

export { router };
