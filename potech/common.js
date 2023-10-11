// Tạo list sản phẩm và lưu trong storage
let productList = [
    // Mỗi 1 object này là 1 sản phẩm
    {
        id:1,
        image: "image1.png",
        name:"San pham 1",
        price:1500,
        quantity:10
    },
    {
        id:2,
        image: "image2.png",
        name:"San pham 2",
        price:1000,
        quantity:10
    },
    {
        id:3,
        image: "image3.png",
        name:"San pham 3",
        price:600,
        quantity:10
    }
    ,{
        id:4,
        image: "image4.png",
        name:"San pham 4",
        price:900,
        quantity:10
    },
    {
        id:5,
        image: "image5.png",
        name:"San pham 5",
        price:1200,
        quantity:10
    },
    {
        id:6,
        image: "image5.png",
        name:"San pham 6",
        price:2000,
        quantity:10
    }
]
localStorage.setItem("productList", JSON.stringify(productList));

let containerElement = document.getElementById("container")
for (let i = 0; i < productList.length; i++) {
    containerElement.innerHTML += `
    <div class="product-item">
        <img src="${productList[i].image}" alt="">
        <p>${productList[i].name}</p>
        <p> ${productList[i].price} </p>
        <p><button onclick="addToCart(${productList[i].id})">Buy</button></p>
    </div>
    `
}

    let users = JSON.parse(localStorage.getItem("users"))||[];
    // Lay user dang dang nhap
    let userLogin = users.filter((user)=>{
        return user.id == loginId
    })[0]
    // Lay tất cả các sản phẩm có trong localstorage
    let productList = JSON.parse(localStorage.getItem("productList"))||[];
    let product = productList.filter((product)=>{
        return product.id == productID
    })

    userLogin.carts.push(product);
    alert("Đã thm sản phẩm vào cart!")
    localStorage.setItem("users", JSON.stringify(users));
}