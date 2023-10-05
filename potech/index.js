/* 
    render đổ danh sách sản phẩm bằng js
 */
//  function hiển thị danh sách sản phẩm
let productList = [
    {
        name: "san pham 1",
        price: 60000,
        id: 65375465,
        src: "/anh/455f023f33e51022b156128bce0de329 (1).jpg",
        stock: 15,
    },
    {
        name: "san pham 2",
        price: 54000,
        id: 678578,
        src: "/anh/image-huong-dan-cach-chup-anh-giay-dep-chuan-studio-cho-shop-giay-4aa9a1e4bb5e63153de3d815d676050c (1).jpg",
        stock: 5,
    },
    {
        name: "san pham 3",
        price: 59000,
        id: 324545346,
        src: "/anh/9e4143fea71d95290b6c014c644d541d-2-1.jpg",
        stock: 8,
    },
    {
        name: "san pham 4",
        price: 82000,
        id: 676757,
        src: "/anh/9e4143fea71d95290b6c014c644d541d-2-1.jpg",
        stock: 4,
    },
    {
        name: "san pham 5",
        price: 90000,
        id: 65345334,
        src: "/anh/9e4143fea71d95290b6c014c644d541d-2-1.jpg",
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
function renderProducts() {
    let text = "";
    for (let i = 0; i < products.length; i++) {
        text +=
            `
            <div class="product-item">
                <img src="${products[i].src}" alt="">
                <p>${products[i].name}</p>
                <p> ${VND.format(products[i].price)} </p>
                <p><button onclick="addToCart(${products[i].id})">mua</button></p>
            </div>
   `
    }
    document.getElementsByClassName("product-list")[0].innerHTML = text
}
renderProducts();
// function đi mua hàng
function addToCart(productId) {
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
        // alert("đi mua hàng bình thường!")
        // mình có nhiều user thì phải lấy ra giỏ của user có id == checkLogin
        /*   let cartUser=users.filter((item)=>{
              return item.id==checkLogin;
          })
          console.log("cartUser", cartUser); */
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
                        let result = users[i].cart.filter((item) => {
                            return item.id == productId;
                        })
                        if (result.length == 0) {
                            users[i].cart.push({ ...products[j], quantity: 1 });
                            localStorage.setItem("users", JSON.stringify(users));
                            showCount();
                        } else {
                            // users[i].cart[j].quantity == ++users[i].cart[j].quantity;
                            // localStorage.setItem("users", JSON.stringify(users));
                            for (let k = 0; k < users[i].cart.length; k++) {
                                if (users[i].cart[k].id == productId) {
                                    users[i].cart[k].quantity = ++users[i].cart[k].quantity;
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
                for (let j = 0; j < users[i].cart.length; j++) {
                    count += users[i].cart[j].quantity;  
                }
                document.getElementsByClassName("count")[0].innerHTML=count;
            }
        }

    }
}
showCount();
// convert định dạng tiền tệ
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
function renderCart() {
    let checkLogin = localStorage.getItem("userId");
    let users = JSON.parse(localStorage.getItem("users"));
    if (checkLogin!=null){
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                //cart user[i].cart
                let total=0;
                let text="";
                for (let j = 0; j<users[i].cart.length;j ++) {
                    total += users[i].cart[j].price * users[i].cart[j].quantity;
                    text+=
                        `
                             <tr>
                                <td>${j+1}</td>
                                <td>
                                    <img src=".${users[i].cart[j].src}">
                                </td>
                                <td>${users[i].cart[j].id}</td>
                                <td> ${users[i].cart[j].name} </td>
                                <td>${VND.format(users[i].cart[j].price)}</td>
                                <td>
                                    <button>-</button>
                                            ${users[i].cart[j].quantity}
                                    <button>+</button>
                                </td>
                                <td>${VND.format(users[i].cart[j].price * users[i].cart[j].quantity)}</td>
                                <td > xoá </td>
                            </tr>
                        `
                }
                document.getElementById("tbody").innerHTML=
                `
                    ${text}
                    <tr>
                     <td colspan="6"> tổng giá sản phẩm</td>
                     <td colspan="2"> ${VND.format(total)}</td>
                    </tr>
                `
            }
        }

    }
}
renderCart();
