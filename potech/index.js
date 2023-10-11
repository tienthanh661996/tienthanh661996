/* 
    render đổ danh sách sản phẩm bằng js
 */
//  function hiển thị danh sách sản phẩm
let productList = [
    {
        name: "san pham 1",
        price: 400000,
        id: 65375465,
        src: "/anh/cach-chup-giay-dep-5.jpg",
        stock: 15,
    },
    {
        name: "Special Item",
        price: 500000,
        id: 678571218,
        src: "/anh/image-huong-dan-cach-chup-anh-giay-dep-chuan-studio-cho-shop-giay-ed59572b51ae0ff39b0e48a28d4fbf33.jpg",
        stock: 5,
    },
    {
        name: "Sale Item",
        price: 300000,
        id: 324545346,
        src: "/anh/rose-3063284_1280.jpg",
        stock: 8,
    },
    {
        name: "Popular Item",
        price: 500000,
        id: 676723257,
        src: "../potech/anh/anh/455f023f33e51022b156128bce0de329.jpg",
        stock: 4,
    },
    {
        name: "Sale Item",
        price: 300000,
        id: 65345334,
        src: "../potech/anh/anh/roses-1566792_1280.jpg",
        stock: 3,
    },
    {
        name: "Fancy Product",
        price:70000,
        id: 65345334,
        src: "/anh/image-huong-dan-cach-chup-anh-giay-dep-chuan-studio-cho-shop-giay-4aa9a1e4bb5e63153de3d815d676050c (1).jpg",
        stock: 3,
    },
    {
        name: "Special Item",
        price:700000,
        id: 65345334,
        src: "/anh/image-huong-dan-cach-chup-anh-giay-dep-chuan-studio-cho-shop-giay-4aa9a1e4bb5e63153de3d815d676050c (1).jpg",
        stock: 3,
    },
    {
        name: "Popular Item",
        price: 30000,
        id: 65345334,
        src: "./anh/anh/flowers-276014_1280.jpg",
        stock: 3,
    }

]
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
// lưu sản phẩm trên local
localStorage.setItem("productList", JSON.stringify(productList));
let products = JSON.parse(localStorage.getItem("productList"));
function renderProducts(productList) {
    if(productList==undefined){
        productList=[];
    }
    let text = "";
    for (let i = 0; i < productList.length; i++) {
        text +=
            `
            <div class="card h-100">              
                <img class="card-img-top" src="${products[i].src}" alt="..." />               
                <h5 class="fw-bolder">${productList[i].name}</h5>
                <p> ${VND.format(productList[i].price)} </p>
                <div class="text-center"><p><button onclick="addToCart(${productList[i].id})">mua</button></p></div>
                </div>
                `    
                // <p><button onclick="addToCart(${productList[i].id})">mua</button></p>
    }
    document.getElementsByClassName("card h-100")[0].innerHTML = text
}
renderProducts(products);//products
// function đi mua hàng
function addToCart(productId)  {             //productId
    // console.log("productId", productId);
    let checkLogin = localStorage.getItem("userId");
    // biến checkLogin có giá trị là id của người dùng
    // lấy toàn bộ users ra
    let users = JSON.parse(localStorage.getItem("users"));
    // lấy toàn bộ danh sách sản phẩm
    let products = JSON.parse(localStorage.getItem("productList"));
    if (checkLogin) {
        // đã đăng nhập mới cho đi mua hàng
        // đi mua hàng dựa vào userId 
        alert("đi mua hàng bình thường!")

        // mình có nhiều user thì phải lấy ra giỏ của user có id == checkLogin
           let cartUser=users.filter((item)=>{
              return item.id==checkLogin;
          })
          console.log("cartUser", cartUser);
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                // lấy ra giỏ hàng của user vừa đăng nhập
                //users[i].cart
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id == productId) {
                        //... toán tử spread
                        // trước khi push phải xem sản phẩm đó đã có trong giỏ hàng hay chưa
                        // nếu có rồi thì tăng số lượng thôi.
                        // chưa có thì push vào bình thường
                        // users[i].cart.push({ ...products[j],quantity:1 });
                        // localStorage.setItem("users",JSON.stringify(users));
                        let result = users[i].carts.filter((item) => {
                            return item.id == productId;
                        })
                        if (result.length == 0) {
                            users[i].carts.push({ ...products[j], quantity: 1 });
                            localStorage.setItem("users", JSON.stringify(users));
                            showCount();
                        } else {
                            // users[i].cart[j].quantity == ++users[i].cart[j].quantity;
                            // localStorage.setItem("users", JSON.stringify(users));
                            for (let k = 0; k < users[i].carts.length; k++) {
                                if (users[i].carts[k].id == productId) {
                                    users[i].carts[k].quantity = ++users[i].carts[k].quantity;
                                    localStorage.setItem("users", JSON.stringify(users));
                                    showCount();
                                    break;
                                }
                            }
                        }
                    }
                }
            }

        }
    } else {
        // chưa đăng nhập không thể mua hàng
        alert("bạn phải đăng nhập để đi mua hàng!")
    }
}
// function render count
function showCount() {
    let checkLogin = localStorage.getItem("userId");
    let users = JSON.parse(localStorage.getItem("users"));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                //users[i].cart
                let count=0;
                for (let j = 0; j < users[i].carts.length; j++) {
                    count += users[i].carts[j].quantity;  
                }
                document.getElementsByClassName("badge")[0].innerHTML=count;
            }
        }

    }
}
showCount();
// function tìm kiếm sản phẩm ( tìm kiếm bánh);
// đi sâu nghiên cứu kĩ thuật DEBOUNCE.
function searchCake() {
   let inputValue=document.getElementById("search").value;
    let result=products.filter((item)=>{
        return item.name.indexOf(inputValue) !=-1;
    })
    console.log(result);
    if(result.length !=0 ){
        renderProducts(result);
    }else{
        renderProducts();
    }
}

function sort(order) {
    let products = JSON.parse(localStorage.getItem("productList"));

    if (order === "tangdan") {
        products.sort((a,b) => a.price - b.price);
    }
    if (order === "giamdan") {
        products.sort((a,b) => b.price - a.price);
    }
    renderProducts(products);
}





