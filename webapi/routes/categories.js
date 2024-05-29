var express = require("express");
var router = express.Router();
const categoryController = require("../mongo/category.controller");


//http:/localhost:3000/categories

// http:/localhost:3000/categories/
router.get("/", async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log("Lỗi lấy danh sách danh mục", error);
    return res.status(500).json({ mess: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryController.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.log("Lỗi lấy danh mục theo ID", error);
    return res.status(500).json({ mess: error });
  }
});
//thêm mới danh mục
//http:/localhost:3000/categories/add
router.post("/add", async (req, res) => {
  try {
    const body = req.body
    const proNew = await categoryController.addCategory(body);
    return res.status(200).json(proNew);
  } catch (error) {
    console.log("Lỗi thêm danh mục", error);
    return res.status(500).json({ mess: error });
  }
});

//xóa danh mục
//http://localhost:3000/categories/delete/
router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cateRemove = await categoryController.deleteCategory(id);
    return res.status(200).json(cateRemove);
  } catch (error) {
    console.log("Lỗi xóa danh mục", error);
    return res.status(500).json({ mess: error });
  }
});
//cập nhật danh mục
//http://localhost:3000/categories/update/
router.post("/update/:id", async (req, res) => {
    try {
      const {id} = req.params
      const body = req.body
      const cateUpdate = await categoryController.updateCategory(id,body)
      return res.status(200).json(cateUpdate);
    } catch (error) {
      console.log("Lỗi cập nhật danh mục", error);
      return res.status(500).json({ mess: error });
    }
  });
  
module.exports = router;
