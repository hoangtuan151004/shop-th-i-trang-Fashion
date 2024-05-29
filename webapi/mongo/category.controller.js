//thực hiện thao tác CRUD với collection categories
const productModel = require("./product.model");
const categoryModel = require("./category.model");

module.exports = {getCategoryById, addCategory, deleteCategory,updateCategory, getAllCategories};



//lay danh muc
async function getAllCategories() {
  try {
    const categories = await categoryModel.find();
    return categories;
  } catch (error) {
    console.log("Lỗi lấy danh sách danh mục", error);
    throw error;
  }
}

// Lấy danh mục theo ID
async function getCategoryById(id) {
  try {
    const category = await categoryModel.findById(id);
    return category;
  } catch (error) {
    console.log("Lỗi lấy danh mục theo ID", error);
    throw error;
  }
}

//thêm danh mục
async function addCategory(body) {
  try {
    //lấy thông tin danh mục từ body
    const { name, description } = body;
    //tạo danh mục mới trong collection categories
    const categoryNew = new categoryModel({ name, description });
    //lưu db
    const result = await categoryNew.save();
    return result;
  } catch (error) {
    console.log("Lỗi thêm danh mục", error);
    throw error;
  }
}

// xóa danh mục
async function deleteCategory(id) {
  try {
    //kiểm tra xem danh mục có sản phẩm hay không
    const products = await productModel.find({ "category.categoryId": id });
    if (products.length > 0) {
      return { mess: "Không thể xóa danh mục này" };
    } else {
      const cateDel = await categoryModel.findByIdAndDelete(id);
      return cateDel;
    }
  } catch (error) {
    console.log("Lỗi xóa danh mục", error);
    throw error;
  }
}

//cập nhật danh mục
async function updateCategory(id, body) {
  try {
    //lấy ra thông tin danh mục cần cập nhật theo id
    const cateOld = await categoryModel.findById(id);
    if (!cateOld)
      throw new Error("Không tìm thấy thông tin danh mục cần cập nhật");
    //lấy thông tin được nhập từ body
    const { name, description } = body;
    //cập nhật thông tin
    const result = await categoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log("Lỗi cập nhật danh mục", error);
    throw error;
  }
}
