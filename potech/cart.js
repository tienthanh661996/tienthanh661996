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
                for (let j = 0; j<users[i].carts.length;j ++) {
                    total += users[i].carts[j].price * users[i].carts[j].quantity;
                    text+=
                        `
                             <tr>
                                <td>${j+1}</td>
                                <td>
                                    <img src=".${users[i].carts[j].src}">
                                </td>
                                <td>${users[i].carts[j].id}</td>
                                <td> ${users[i].carts[j].name} </td>
                                <td>${VND.format(users[i].carts[j].price)}</td>
                                <td>
                                    <button>-</button>
                                            ${users[i].carts[j].quantity}
                                    <button>+</button>
                                </td>
                                <td>${VND.format(users[i].carts[j].price * users[i].carts[j].quantity)}</td>
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
function increase(productId) {
    // console.log("1111", productId);
    let checkLogin = localStorage.getItem("userId");
    let users = JSON.parse(localStorage.getItem("users"));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < users[i].carts.length; j++) {
                    if(users[i].carts[j].id==productId){
                        users[i].carts[j].quantity == ++users[i].carts[j].quantity;
                        localStorage.setItem("users",JSON.stringify(users));
                        renderCart();
                    }
                    
                }
            }
        }
    }

}
