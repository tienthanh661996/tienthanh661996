function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
   }
    var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");
    var x = document.getElementById("login");
    var y = document.getElementById("register");

    function login() {
        x.style.left = "4px";
        y.style.right = "-520px";
        a.className += " white-btn";
        b.className = "btn";
        x.style.opacity = 1;
        y.style.opacity = 0;
    }

    function register() {
        x.style.left = "-510px";
        y.style.right = "5px";
        a.className = "btn";
        b.className += " white-btn";
        x.style.opacity = 0;
        y.style.opacity = 1;
    }
/* function đăng nhập */
function loginUser() {
    let users=JSON.parse(localStorage.getItem("users"))||[];
    let email=document.getElementById("login-name").value;
    let password=document.getElementById("login-password").value;
    for (let i = 0; i < users.length; i++) {
        if(users[i].email==email && users[i].password==password){
            // set thông tin user id đã đăng nập vào localstorage
            localStorage.setItem("userId",users[i].id)
            alert("Login thành công!!")
            window.location.href="./index.html"
            return;
        }
    }

    alert("Thong tin emai và password không chính xác")
}
/* function tạo id */
function uuid() {
    return Math.floor(Math.random()*734738483784);
}
/* 
    TẠO FUNCTION ĐĂNG KÍ    
 */
let users = JSON.parse(localStorage.getItem("users"))||[];
function register1() {
    let mail=document.getElementById("email").value.trim();
    let name = document.getElementById("name").value.trim();
    let password = document.getElementById("password").value.trim();
    // let confirmPassword = document.getElementById("confirmPassword").value;
    let nameErrElement = document.getElementById("nameErr");
    let isValid = true;
    if(name == "") {
        nameErrElement.textContent = "Full name khong duoc de trong"
        isValid = false;
    }

    if(!isValid){
        return;
    }

   let user={
    email:mail,
    name:name,
    password: password,
    id:uuid(),
    carts:[],
   }
   // Kiem tra trong list user(users) co ton tai thang
   // user nao co email laf email nhap o form
   let check= users.filter((item)=>{
    return item.email==mail
   })

   if(check.length == 0){
    // tức là tài khoản chưa được đăng kí
    // trước khi push phải kiểm tra xem password có trùng confirm hay không
    //    if(confirmPassword  != password){
    //     // alert("mật khẩu không khớp!")
    //     document.getElementsByClassName("error")[0].style.display="block";
    //    }else{
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        //khi đăng kí thành công chuyển sang trang đăng nhập
        alert("Đăng kí tài khoản thành công");
        window.location.href = "./login.html"
    //    }
   }else{
        alert("tài khoản đã tồn tại!")
   }
}