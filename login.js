let username = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];
let form = document.querySelector("form");
let euser = document.querySelectorAll("span")[0];
let epass = document.querySelectorAll("span")[1];
let esubmit = document.querySelectorAll("span")[2];
let storage = JSON.parse(localStorage.getItem("data"));
console.log(storage);

// form.addEventListener("submit",()=>{
//     if(username.value == "" && password.value == ""){
//         alert("Enter the Username");
//         alert("Enter the Password");
//     }
//     else if(username.value == ""){
//         alert("Enter the Username");
//     }
//     else if(password.value == ""){
//         alert("Enter the Password");
//     }
//     else if(username.value == "shubham" && password.value == "Shubham@123"){
//         alert("Boss Welcome to the Home Page");
//     }
//     else{
//         alert("Wrong Credentials");
//     }
// })

form.addEventListener("submit",(e)=>{
    euser.innerHTML = "";
    epass.innerHTML = "";
    esubmit.innerHTML = "";
    let oneUser = storage.find((e)=>{
        if(e.userNumber == username.value && e.userPassword == password.value){
            return e;
        }
    });
    console.log(oneUser);

    if(username.value == "" && password.value == ""){
        euser.innerHTML = "*Enter the Username";
        epass.innerHTML = "*Enter the Password";
        e.preventDefault();
    }
    else if(username.value == ""){
        euser.innerHTML = "*Enter the Username";
        e.preventDefault();
    }
    else if(password.value == ""){
        epass.innerHTML = "*Enter the Password";
        e.preventDefault();
    }
    else if(oneUser){
        alert("Boss Welcome to the Home Page");
        localStorage.setItem("oneUser",JSON.stringify(oneUser));
    }
    else{
        esubmit.innerHTML = "*Wrong Credentials";
        e.preventDefault();
    }
})
