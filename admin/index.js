const getAll = async () => {
    const response = await fetch(`http://localhost:3000/products/all`);
    const data = await response.json();
    console.log(data);
    let kq = "";
    let stt = 1;
    data.Products.map((item) => {
      kq += `
              <tr>
                  <td>${stt}</td>
                  <td>
      <img src="http://localhost:3000/images/${item.image}" alt="ProductImage" />
  </td>
                  <td><a href="./detail.html" onclick="getId('${item._id}')">${item.name}</a></td>
                  <td>${item.category.categoryName}</td>
                  <td>${item.price_1}</td>
                  <td>${item.mota_1}</td>
                  <td>
                  <a href="./editpro.html"> <button class="edit-button" onclick="getId('${item._id}')">Chỉnh sửa</button></a> 
                      <button class="delete-button" onclick="deleteProduct('${item._id}')">Xóa</button>
                  </td>
              </tr>`;
      stt++;
    });
    document.getElementById("dulieu").innerHTML = kq;
              // Thêm sự kiện xóa sản phẩm
              const trashButtons = document.querySelectorAll('.trash');
              trashButtons.forEach(button => {
                  button.addEventListener('click', async function(e) {
                      e.preventDefault();
                      const id = e.target.getAttribute('data-id');
                      console.log(id);
                      try {
                          await deleteProduct(id);
                          const productRow = e.target.closest('tr');
                          productRow.remove();
                      } catch (error) {
                          console.log(error);
                      }
                    });
            });
  };
  
  // const getNewPro = async () => {
  //   const response = await fetch("http://localhost:3000/products/new");
  //   const data = await response.json();
  //   console.log(data);
  //   let kq = "";
  //   let stt = 1;
  //   data.Products.map((item) => {
  //     kq += `
  //               <tr>
  //                   <td>${stt}</td>
  //                   <td>
  //       <img src="http://localhost:3000/images/${item.image}" alt="Product Image" />
  //   </td>
  //                   <td>${item.name}</td>
  //                   <td>${item.category.categoryName}</td>
  //                   <td>${item.price_1}</td>
  //                   <td>${item.mota_1}</td>
  //                   <td>
  //                       <button class="edit-button">Chỉnh sửa</button>
  //                       <button class="delete-button">Xóa</button>
  //                   </td>
  //               </tr>`;
  //     stt++;
  //   });
  //   document.getElementById("dulieumoi").innerHTML = kq;
  // };
  
  
  const getId = (id) => {
    localStorage.setItem("idpro", id);
  };
  
  const getProDetail = async () => {
    const id = localStorage.getItem("idpro");
    const response = await fetch(`http://localhost:3000/products/all/${id}`);
    const data = await response.json();
    console.log(data);
    document.getElementById("name").innerText = data.name;
    document.getElementById("price_1").innerText = data.price_1;
    document.getElementById("price_2").innerText = data.price_2;
    document.getElementById("mota_1").innerText = data.mota_1;
    document.getElementById("image").src = `http://localhost:3000/images/${data.image}`;

  };
  
  const getCategory = async()=>{
    const response = await fetch('http://localhost:3000/categories')
    const data = await response.json()
    let kq =''
    data.map(i => {
      kq += `<option value="${i._id}">${i.name}</option>`;
  })
  
    document.getElementById('cate').innerHTML=kq
  }
  const insertProduct = async () => {
    const name = document.getElementById('name').value;
    const price_1 = document.getElementById('price_1').value;
    const image = document.getElementById('image').files[0];
    const mota_1 = document.getElementById('mota_1').value;
    const cate = document.getElementById('cate').value;

    let data = new FormData();
    data.append('name', name);
    data.append('price_1', price_1);
    data.append('image', image);
    data.append('mota_1', mota_1);
    data.append('category', cate);

    try {
        const response = await fetch(`http://localhost:3000/products/new`, {
            method: 'POST',
            body: data
        });
        const result = await response.json();
        window.location.href ='./admin_pro.html'
        console.log(result);
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
    }
};


const showEditPro = async () => {
  let proupdate = '';
  const getPro = async () => {
    const id = localStorage.getItem('idpro');
    const response = await fetch(`http://localhost:3000/products/all/${id}`);
    const data = await response.json();
    return data;
  }
  const getCate = async () => {
    const response = await fetch(`http://localhost:3000/categories`);
    const data = await response.json();
    return data;
  }
  const product = await getPro();
  const category = await getCate();
  // console.log(product, category);
  proupdate += `
    <label for="cate">Danh mục</label>
    <select name="category" id="category">`;
  category.map(i => {
    if (product.category && i._id == product.category.categoryId) {
      proupdate += `<option value="${i._id}" selected>${i.name}</option>`;
    } else {
      proupdate += `<option value="${i._id}">${i.name}</option>`;
    }
  });
  proupdate += `</select>
  <label for="productName">Tên sản phẩm</label><br>
  <input type="text" id="name" name="name" value="${product.name}" placeholder="Nhập tên sản phẩm" required><br>
  <label for="price_1">Giá sản phẩm</label><br>
  <input type="number" id="price_1" name="price_1" value="${product.price_1}"  placeholder="Nhập giá sản phẩm " required><br>
  <label for="productImage">Hình ảnh</label><br>
  <img src="http://localhost:3000/images/${product.image}"/>
  <input type="file" id="image" name="image" placeholder="Nhập hình ảnh">

  <label for="mota_1">Mô tả</label><br>
  <textarea name="mota_1" id="mota_1" cols="30" rows="5" style="width:100%; border:1px #CCC solid">${product.mota_1}</textarea><br>

  <input class="btn btn-cancel" type="submit" value="Cập nhật sản phẩm" onclick="updateProduct()">
  <button style="float: right;" class="close-button" type="button">Đóng</button> 
  <a href="./admin_pro.html" >Quay lại trang chủ</a>
  `;
  document.getElementById('show').innerHTML = proupdate;
}

const updateProduct = async() => {
  // event.preventDefault();
  // const mess = confirm('Ban co chac muon cap nhat khong')
  // if(mess){
  //     window.location.reload()
  // }
  const id = localStorage.getItem('idpro')
  const name = document.getElementById('name').value
  const price_1 = document.getElementById('price_1').value
  const image = document.getElementById('image').files[0]
  console.log(image);
  const mota_1 = document.getElementById('mota_1').value
  const category = document.getElementById('category').value
  let data = new FormData() // xử lý tất cả về form dữ liệu
  data.append('name', name)
  data.append('price_1', price_1)
  data.append('image', image)
  data.append('mota_1', mota_1)
  data.append('category', category)
  const response = await fetch(`http://localhost:3000/products/update/${id}`,{
      method : 'PUT',
      headers : {
          "Accept" : "multipart/form-data"
      },
      body : data,
  })
  console.log(data);
  const result = await response.json()

  console.log(result);
  // window.location.href = './product.html'
  
  }

  async function deleteProduct(id)  {
    try {
        const mess = confirm('Bạn có chắc muốn xóa không?');
        if (mess) {
            // const id = localStorage.getItem('idpro')
            const response = await fetch(`http://localhost:3000/products/delete/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            
            console.log(result);
            window.location.reload(); // Reload trang sau khi xóa thành công
        }
    } catch (error) {
        console.log(error);
    }
        
    }