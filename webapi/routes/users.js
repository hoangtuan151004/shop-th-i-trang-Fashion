
const express = require("express");
const router = express.Router();
const userController = require("../mongo/user.controller");

// Lấy danh sách user
//http://localhost:3000/users
router.get("/", async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Lỗi lấy danh sách user", error);
    return res.status(500).json({ mess: error });
  }
});

// Lấy user qua Id
//http://localhost:3000/users/
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userController.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log("Lỗi lấy user", error);
    return res.status(500).json({ mess: error });
  }
});

// Thêm user
//http://localhost:3000/users/add/
router.post("/add", async (req, res) => {
  try {
    const body = req.body;
    const newUser = await userController.addUser(body);
    return res.status(200).json(newUser);
  } catch (error) {
    console.log("Lỗi thêm user", error);
    return res.status(500).json({ mess: error });
  }
});

// Xóa user
//http://localhost:3000/users/delete/
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userController.deleteUser(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log("Lỗi xóa user", error);
    return res.status(500).json({ mess: error });
  }
});

// Cập nhật user
//http://localhost:3000/users/update
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await userController.updateUser(id, body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Lỗi cập nhật người dùng", error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
