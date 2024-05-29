// //thực hiện thao tác CRUD
// const productModel = require('./product.model')
// const categoryModel = require('./category.model')
// const { router } = require("../app");

// module.exports = {getpros, getProductById, getByCategory,getHotProduct, getSaleProduct, getNewProduct}
// module.exports = {getNew, insert, getAll,getByKey,updateById, remove };

// //lấy danh sách sản phẩm
// async function getpros(){
//     try {
//         const result = await productModel.find()  //đợi để lấy tất cả các cơ sở dữ liệu trong productModel
//         return result
//     } catch (error) {
//         console.log('Lỗi lấy danh sách',error);
//         throw error
        
//     }
// } 

// async function getProductById(productId) {
//     try {
//         const product = await productModel.findById(productId);
//         return product;
//     } catch (error) {
//         console.log('Lỗi lấy thông tin sản phẩm', error);
//         throw error;
//     }
// }


// async function getByCategory(category) {
//     try {
//       const productsCategory = await productModel
//         .find({
//           "category.categoryId": category,
//         })
//       return productsCategory;
//     } catch (error) {
//       console.log("Lỗi lấy sản phẩm theo danh mục", error);
//       throw error;
//     }
//   }


//   async function getHotProduct() {
//     try {
//         const result = await productModel.find({view: {$gte: 1000}}).sort({view: -1}).limit(8);
//         return result;
//     } catch (error) {
//         console.log('Lỗi lấy danh sách sản phẩm hot', error);
//         throw error;
//     }
// }


// async function getSaleProduct() {
//   try {
//       const prosale = await productModel.find().sort({price_1_2: -1}).limit(8);
//       return prosale;
//   } catch (error) {
//     console.log('Lỗi lấy danh sách sản phẩm giảm giá', error);

//       throw error;
//   }
// }


// async function getNewProduct() {
//   try {
    
//     const newProducts = await productModel.find().sort({ ngaytao: -1 }).limit(8);
//     return newProducts;
//   } catch (error) {
//     console.log('Lỗi lấy danh sách sản phẩm mới:', error.message);
//     throw error;
//   }
// }




// async function getAll() {
//   try {
//     // const result = await productModel.find().limit(6).sort({price_1: 1});  //1: sắp xếp tăng dần, -1 sắp xếp giảm dần

//     //select name, price_1, quantity
//     //  const result = await productModel.find({},{name:1,price_1:1,quantity:1});



//     //select name, price_1, quantity where price_1 >10000
//     // const result = await productModel.find({price_1:{$gt:10000}},
//     //$gt: greater than; $lt: less than
//     //$gte: greater than or equal, $lte: less than or equal
//     // {name:1,price_1:1,quantity:1});



//     //select name, price_1, quantity where price_1 >10000 and quantity >100
//     // const result = await productModel.find(
//     //   {
//     //     $and: [
//     //       {price_1:{$lt:10000}},
//     //     {quantity:{$lt:100}}
//     //     ]
//     //   },
//     // {name: 1,price_1:1,quantity:1}
//     // )

//     ////select name, price_1, quantity where price_1 <10000 and price_1 >20000
//     // const result = await productModel.find(
//     //   {
//     //     $or: [{ price_1: { $lt: 10000 } }, 
//     //           { price_1: { $gt: 20000 } }],
//     //   },
//     //   { name: 1, price_1: 1, quantity: 1 }
//     // );




//     //select name, price_1, quantity where name like %product%
//     const result= await productModel.find({
//       name:{$regex:'o',$option:'i'}
//       //không phân biệt hoa thường
//     }, 
//     { name: 1, price_1: 1, quantity: 1 }
//     )
//     return result;
//   } catch {
//     console.log("loi lay danh sach san pham", error);
//     throw error;
//   }
// }

// async function getNew (){
//   try {
//     const result = await productModel.find().sort({_id: -1}).limit(5)
//   } catch (error) {
//     console.log('Lỗi lấy sản phẩm mới')
//     throw error
//   }
// }

// async function insert(body) {
//   try {
//     const { name, mota_1, image, price_1, quantity, category } = body;
//     //tim id danh muc tra trong collection categories
//     const categoryFind = await categoryModel.findById(category);
//     if (!categoryFind) {
//       throw new Error("Khong tim thay danh muc");
//     }
//     const proNew = new productModel({
//       name,
//       mota_1,
//       image,
//       price_1,
//       quantity,
//       category: {
//         categoryId: categoryFind._id,
//         categoryName: categoryFind.name,
//       },
//     });
//     //luu database
//     const result = proNew.save();
//     return result;
//   } catch (error) {
//     console.log("Lỗi insert product: ", error);
//     throw error;
//   }
// }




// //lấy sản phẩm theo id
// async function updateById(id, body){
//   try{
//     const pro = await productModel.findById(id)
//     if(!pro){
//       throw new Error('Không tìm thấy sản phẩm')
//     }
//     const {name,price_1,image,quantity, mota_1, category} = body
//     let cateFind = null
//     if(category){
//       cateFind = await categoryModel.findById(category)
//     // const cateFind = await categoryModel.findById(category)
//     if(!cateFind){
//       throw new Error('Không tìm thấy danh mục')
//     }

//   }
//     const cateUpdate = cateFind?{
//       categoryId: cateFind._id,
//       categoryName: cateFind.name
//     }:pro.category
//     const result = await productModel.findByIdAndUpdate(
//       id, {name, price_1, image, quantity, mota_1, category:cateUpdate},
//       {new: true}
//     )
//   }catch(error){
//     console.log("Lỗi update ", error);
//     throw error;
//   }
// }



const productModel = require('./product.model');
const categoryModel = require('./category.model');

module.exports = {
    getpros,
    getProductById,
    getByCategory,
    getGiaTangDan,
    getHotProduct,
    getSaleProduct,
    getNewProduct,
    getNew,
    insert,
    getAll,getProLienQuan,
    getByKey,
    updateById,
    remove
};

async function getpros() {
    try {
        const result = await productModel.find();
        return result;
    } catch (error) {
        console.log('Lỗi lấy danh sách', error);
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const product = await productModel.findById(productId);
        return product;
    } catch (error) {
        console.log('Lỗi lấy thông tin sản phẩm', error);
        throw error;
    }
}

//lấy danh sách sản phẩm theo danh mục
async function getByCategory(category) {
    try {
        const productsCategory = await productModel.find({
            "category.categoryId": category,
        });
        return productsCategory;
    } catch (error) {
        console.log("Lỗi lấy sản phẩm theo danh mục", error);
        throw error;
    }
}


//sản phẩm nổi bật
async function getHotProduct() {
    try {
        const result = await productModel.find({ view: { $gte: 1000 } }).sort({ view: -1 }).limit(8);
        return result;
    } catch (error) {
        console.log('Lỗi lấy danh sách sản phẩm hot', error);
        throw error;
    }
}





async function getSaleProduct() {
    try {
        const prosale = await productModel.find().sort({ price_1_2: -1 }).limit(8);
        return prosale;
    } catch (error) {
        console.log('Lỗi lấy danh sách sản phẩm giảm giá', error);
        throw error;
    }
}

async function getNewProduct() {
    try {
        const newProducts = await productModel.find().sort({ ngaytao: -1 }).limit(8);
        return newProducts;
    } catch (error) {
        console.log('Lỗi lấy danh sách sản phẩm mới:', error.message);
        throw error;
    }
}

async function getAll() {
    try {
        const result = await productModel.find();
        return result;
    } catch (error) {
        console.log("Lỗi lấy danh sách sản phẩm", error);
        throw error;
    }
}

async function getNew() {
    try {
        const result = await productModel.find().sort({ _id: -1 }).limit(5);
        return result;
    } catch (error) {
        console.log('Lỗi lấy sản phẩm mới', error);
        throw error;
    }
}

async function insert(body) {
    try {
        const { name, mota_1, image, price_1, quantity, category } = body;
        const categoryFind = await categoryModel.findById(category);
        if (!categoryFind) {
            throw new Error("Không tìm thấy danh mục");
        }
        const proNew = new productModel({
            name,
            mota_1,
            image,
            price_1,
            quantity,
            category: {
                categoryId: categoryFind._id,
                categoryName: categoryFind.name,
            },
        });
        const result = await proNew.save();
        return result;
    } catch (error) {
        console.log("Lỗi insert product: ", error);
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const product = await productModel.findById(productId);
        return product;
    } catch (error) {
        console.log('Lỗi lấy thông tin sản phẩm', error);
        throw error;
    }
}

//tìm kiếm sản phẩm
async function getByKey(key, value) {
    try {
        let pro = await productModel.findOne({ [key]: value }, 'name price_1 quantity');
        pro = {
            Masp: pro._id,
            Ten: pro.name,
            Gia: pro.price_1_2,
            Soluong: pro.quantity
        };
        return pro;
    } catch (error) {
        console.log("Lỗi lấy sản phẩm: ", error);
        throw error;
    }
}


//Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng

async function getGiaTangDan() {
    try {
        const sanPhamSapXep = await productModel.find().sort({ price_1_2: 1 }).limit(4);
        return sanPhamSapXep;
    } catch (error) {
        console.log('Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng:', error);
        throw error;
    }
}

//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
async function getProLienQuan(productId) {
    try {
        // Lấy thông tin sản phẩm cụ thể
        const sanPham = await productModel.findById(productId);
        const sanPhamLienQuan = await productModel.find({
            $and: [
                { "category.categoryId": sanPham.category.categoryId  }, // lay san pham cung danh muc
                { _id: { $ne: productId } } // bo qua san pham hien tai
            ]
        })
        return sanPhamLienQuan;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm liên quan:", error.message);
        throw error;
    }
}



async function updateById(id, body) {
    try {
        const pro = await productModel.findById(id);
        if (!pro) {
            throw new Error('Không tìm thấy sản phẩm');
        }
        const { name, price_1, image, mota_1, category } = body;
        let cateFind = null;
        if (category) {
            cateFind = await categoryModel.findById(category);
            if (!cateFind) {
                throw new Error('Không tìm thấy danh mục');
            }
        }
        const cateUpdate = cateFind ? {
            categoryId: cateFind._id,
            categoryName: cateFind.name
        } : pro.category;
        const result = await productModel.findByIdAndUpdate(
            id, { name, price_1, image, mota_1, category: cateUpdate },
            { new: true }
        );
        return result;
    } catch (error) {
        console.log("Lỗi update ", error);
        throw error;
    }
}

async function remove(id) {
    try {
        const result = await productModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log('Lỗi xóa sản phẩm');
        throw error;
    }
}


