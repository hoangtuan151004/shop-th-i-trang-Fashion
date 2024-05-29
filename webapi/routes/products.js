var express = require("express");
var router = express.Router();
const productController = require("../mongo/product.controller");
const multer = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var checkFile = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|webp|gif|jpeg|jpg)$/)) {
    return cb(new Error("Vui lòng nhập file hình ảnh"));
  }
  return cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: checkFile });

/* GET home page. */
router.get("/detail/:spId", async (req, res) => {
  try {
    const spId = req.params.spId;
    const sp = await productController.getProductById(spId);
    res.render("detail", { sp });
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    return res.status(500).json({ mess: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const pros = await productController.getpros();
    const hotProducts = await productController.getHotProduct();
    const saleProducts = await productController.getSaleProduct();
    const newProducts = await productController.getNewProduct();
    const tieuthuyet = await productController.getByCategory(
      "65fb01f45855e62fea735f8e"
    );
    const vanhoc = await productController.getByCategory(
      "65fb017b5855e62fea735f8c"
    );

    return res.render("home", {
      pros,
      hotProducts,
      saleProducts,
      newProducts,
      tieuthuyet,
      vanhoc,
    });
  } catch (error) {
    console.error("Lỗi khi xử lý request:", error);
    res.status(500).json({ message: error });
  }
});

// router.get('/sale', async (req, res) => {
//     try {
//         const saleProducts = await getSaleProduct(); // Gọi hàm xử lý để lấy danh sách sản phẩm giảm giá
//         res.status(200).json(saleProducts);
//     } catch (error) {
//         console.error('Lỗi lấy danh sách sản phẩm giảm giá:', error);
//         res.status(500).json({ message: error });
//     }
// });

// // Route để lấy danh sách sản phẩm mới
// router.get('/newdate', async (req, res) => {
//     try {
//         const newProducts = await getNewProduct();
//         res.status(200).json(newProducts);
//     } catch (error) {
//         console.error('Lỗi lấy danh sách sản phẩm mới:', error.message);
//         res.status(500).json({ message: error });
//     }
// });



// Thêm sản phẩm mới
router.post("/new", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Vui lòng chọn một tệp hợp lệ");
    }
    
    const body = req.body;
    body.image = req.file.originalname;
    const result = await productController.insert(body);
    return res.status(201).json({ NewProduct: result });
  } catch (error) {
    console.error("Không thêm sản phẩm được:", error.message);
    res.status(500).json({ message: error });
  }
});


// Lấy tất cả sản phẩm
// http://localhost:3000/products/all
router.get("/all", async (req, res) => {
  try {
    const products = await productController.getAll();
    return res.status(200).json({ Products: products });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});

// Lấy sản phẩm theo ID
// http://localhost:3000/products/all/65fb051329a298088f04912c
router.get("/all/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productController.getProductById(productId);
    return res.status(200).json( product );
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error.message);
    res.status(500).json({ message: error });
  }
});

// Cập nhật sản phẩm theo id
// http://localhost:3000/products/update/65fb051329a298088f04912c

router.put("/update/:id",upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (req.file) {
      body.image = req.file.originalname
      
  }else{
      delete body.image
  }
    const updatedProduct = await productController.updateById(id, body);
    return res.status(200).json( updatedProduct );
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm theo id:", error.message);
    res.status(500).json({ message: error });
  }
});

// Xóa sản phẩm theo id
// http://localhost:3000/products/delete/65fb051329a298088f04912c

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productController.remove(id);
    return res.status(200).json({ DeletedProduct: deletedProduct });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo id:", error.message);
    res.status(500).json({ message: error });
  }
});


//lấy danh sách sản phẩm theo mã danh mục
//http://localhost:3000/products/category/65fb017b5855e62fea735f8c
router.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await productController.getByCategory(categoryId);
    return res.status(200).json({ Products: products });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo mã danh mục:", error.message);
    res.status(500).json({ message: error });
  }
});


//sản phẩm nổi bật
//http://localhost:3000/products/hot
router.get("/hot", async (req, res) => {
  try {
    const hotProducts = await productController.getHotProduct();
    return res.status(200).json({ HotProducts: hotProducts });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm nổi bật:", error.message);
    res.status(500).json({ message: error });
  }
});


// tìm sản phẩm 
//http://localhost:3000/products/search/name/
router.get("/search/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const product = await productController.getByKey(key, value);
    return res.status(200).json({ Product: product });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo key:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng
//http://localhost:3000/products/giatangdan
router.get("/giatangdan", async (req, res) => {
  try {
    const product = await productController.getGiaTangDan();
    res.status(200).json({ Product:product });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});


//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
//http://localhost:3000/products/lienquan/
router.get("/lienquan/:productId", async (req, res) => {
  try {
      const productId = req.params.productId;
      const sanPhamLienQuan = await productController.getProLienQuan(productId);
      res.status(200).json({ sanPhamLienQuan });
  } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm liên quan:", error.message);
      res.status(500).json({ message: error });
  }
});

module.exports = router;
