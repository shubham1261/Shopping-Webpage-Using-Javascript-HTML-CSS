let fname = document.querySelectorAll("input")[0];
let lname = document.querySelectorAll("input")[1];
let number = document.querySelectorAll("input")[2];
let createPassword = document.querySelectorAll("input")[4];
let confirmPassword = document.querySelectorAll("input")[5];
let form = document.querySelector("form");
let efname = document.querySelectorAll("span")[0];
let elname = document.querySelectorAll("span")[1];
let enumber = document.querySelectorAll("span")[2];
let epass = document.querySelectorAll("span")[3];
let ecpass = document.querySelectorAll("span")[4];
let storage = [];
let dataFromStorage = JSON.parse(localStorage.getItem("data"));

if(dataFromStorage){
    storage = dataFromStorage;
    console.log(storage);
}

form.addEventListener("submit",(e)=>{
    //fname validation
    let regx = /^[a-zA-Z]{1,15}$/
    let flag = true;

    if(fname.value == ""){
        efname.innerHTML = "Enter FirstName";
        e.preventDefault();
        flag = false;
    }
    else if(regx.test(fname.value)){
        efname.innerHTML = "";
    }
    else{
        efname.innerHTML = "Invalid FirstName";
        e.preventDefault();
        flag = false;
    }

    //lname Validation
    if(lname.value == ""){
        elname.innerHTML = "Enter LastName";
        e.preventDefault();
        flag = false;
    }
    else if(regx.test(lname.value)){
        elname.innerHTML = "";
    }
    else{
        elname.innerHTML = "Invalid LastName";
        e.preventDefault();
        flag = false;
    }

    //number
    let regx1 = /^[6-9][0-9]{9}$/
    if(number.value == ""){
        enumber.innerHTML = "*Mobile number required";
        e.preventDefault();
        flag = false;
    }
    else if(regx1.test(number.value)){
        enumber.innerHTML = "";
    }
    // else if(mobile){
    //     enumber.innerHTML = "Mobile Number already exist";
    //     e.preventDefault();
    //     flag = false;
    // }
    else{
        enumber.innerHTML = "Invalid Number";
        e.preventDefault();
        flag = false;
    }

    //createPassword
    let regx2 = /^[a-zA-Z0-9!@]{6,15}$/
    if(createPassword.value == ""){
        epass.innerHTML = "Enter Password";
        e.preventDefault();
        flag = false;
    }
    else if(regx2.test(createPassword.value)){
        epass.innerHTML = "";
    }
    else{
        epass.innerHTML = "Invalid Password";
        e.preventDefault();
        flag = false;
    }

    //confirmPassword
    if(confirmPassword.value == ""){
        ecpass.innerHTML = "Confirm Password is Required";
        e.preventDefault();
        flag = false;
    }
    else if(confirmPassword.value == createPassword.value){
        ecpass.innerHTML = "";
    }
    else{
        ecpass.innerHTML = "Password is not matching.";
        e.preventDefault();
        flag = false;
    }

    //repeated users
    let mobile = storage.find((e)=>{
        if(e.userNumber == number.value){
            return e;
        }
    })
    if(mobile){
        enumber.innerHTML = "Mobile Number already exist";
        e.preventDefault();
        flag = false;
    }

    //Storing Data in local storage
    if(flag){
        let data = {
            userFirstName : fname.value,
            userLastName: lname.value,
            userNumber : number.value,
            userPassword : createPassword.value,
            userCart: null,
        };
        storage.push(data);
        localStorage.setItem("data",JSON.stringify(storage));
    }
});
