let userInfo=document.querySelector("#userInfo");
let sideBar=document.querySelector("#sideBar");
let close=document.querySelector("#close");
let oneUser=JSON.parse(localStorage.getItem("oneUser"));
let user=document.querySelector("#user");
let userName=document.querySelector("#userName");
let details = document.querySelector("#details");
let maleContainer = document.querySelector("#maleContainer");
let femaleContainer = document.querySelector("#femaleContainer");
let kidsContainer = document.querySelector("#kidsContainer");
let electronicsContainer = document.querySelector("#electronicsContainer");
let userInput = document.querySelector("#userInput");
let searchBtn = document.querySelector("#searchBtn");
let searchContainer = document.querySelector("#searchContainer");
let mainSection = document.querySelector("main");
let cartStorage = [];
let productCount = document.querySelector("#productCount");
let data = JSON.parse(localStorage.getItem("data"));

if(oneUser){
    if(oneUser.userCart){
        cartStorage = oneUser.userCart;
        productCount.innerHTML = cartStorage.length;
    }
}

    //? Side Bar:
    userInfo.addEventListener("click",()=>{
        sideBar.style.right=0;
    });

    close.addEventListener("click",()=>{
        sideBar.style.right="-100%";
    });


    if(oneUser){
        user.innerHTML = oneUser.userFirstName;
        userName.innerHTML = oneUser.userFirstName;
        details.innerHTML = `
        <h3>Mobile Number : ${oneUser.userNumber}</h3>
        <a href="">Your Cart</a>
        <a href="./main.html" id="logout"><button>Log Out</button></a>
        `;
        let logout = document.querySelector("#logout");
        logout.addEventListener("click",()=>{
            localStorage.removeItem("oneUser");
        })
    }

//!main page
async function mainfun(){
    let dataFromServer = await fetch("https://www.shoppersstack.com/shopping/products/alpha");
    let jsonData = await dataFromServer.json();
    let allData = jsonData.data;

    //? Filter Data

    //! Male Data
    let maleData = allData.filter((e)=>{
        if(e.category == "men"){
            return e;
        }
    })

    maleData.map((e)=>{
        maleContainer.innerHTML += `
        <div id="${e.productId}">
            <img src="${e.productImageURLs[0]}" alt="">
            <h5>${e.brand}</h5>
            <h3>Price : ${e.price}</h3>
            <h3>Rating : ${e.rating}</h3>
            <button>Add to Cart</button>
        </div>
        `;
    })

    //? Female Data
    let femaleData = allData.filter((e)=>{
        if(e.category == "women"){
            return e;
        }
    })

    femaleData.map((e)=>{
        femaleContainer.innerHTML += `
        <div id="${e.productId}">
            <img src="${e.productImageURLs[0]}" alt="">
            <h5>${e.brand}</h5>
            <h3>Price : ${e.price}</h3>
            <h3>Rating : ${e.rating}</h3>
            <button>Add to Cart</button>
        </div>
        `;
    })

    //? Kids Data
    let kidsData = allData.filter((e)=>{
        if(e.category == "kids"){
            return e;
        }
    })

    kidsData.map((e)=>{
        kidsContainer.innerHTML += `
        <div id="${e.productId}">
            <img src="${e.productImageURLs[0]}" alt="">
            <h5>${e.brand}</h5>
            <h3>Price : ${e.price}</h3>
            <h3>Rating : ${e.rating}</h3>
            <button>Add to Cart</button>
        </div>
        `;
    })

    //? Electronics Data
    let electronicsData = allData.filter((e)=>{
        if(e.category == "electronics"){
            return e;
        }
    })

    electronicsData.map((e)=>{
        electronicsContainer.innerHTML += `
        <div id="${e.productId}">
            <img src="${e.productImageURLs[0]}" alt="">
            <h5>${e.name}</h5>
            <h3>Price : ${e.price}</h3>
            <h3>Rating : ${e.rating}</h3>
            <button>Add to Cart</button>
        </div>
        `;
    })
    console.log(allData);

    //? Search Results
    searchBtn.addEventListener("click",()=>{
        searchContainer.innerHTML = "";
        if(userInput.value){
            let searchProduct = allData.filter((e)=>{
                if(e.name.toLowerCase().includes(userInput.value.toLowerCase())){
                    return e;
                }
            })
            searchProduct.map((e)=>{
                searchContainer.innerHTML += `
                <div id="${e.productId}">
                    <img src="${e.productImageURLs[0]}" alt="">
                    <h5>${e.name}</h5>
                    <h3>Price : ${e.price}</h3>
                    <h3>Rating : ${e.rating}</h3>
                    <button>Add to Cart</button>
                </div>
                `;
            })
        }
        else{
            searchContainer.innerHTML = "Results Not Found";
        }
    })

    //? cart items:
    let mainBtn = document.querySelector("main");
    let allBtn = mainBtn.querySelectorAll("button");
    allBtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            if(oneUser){
                console.log(btn.parentElement);

                //? Remove Duplicate Product:
                cartStorage = cartStorage.filter((e)=>{
                    if(e.productId != btn.parentElement.id){
                        return e;
                    }
                })

                //? Filter Selected Product:
                let oneProduct = allData.find((e)=>{
                    if(e.productId == btn.parentElement.id){
                        return e;
                    }
                })
                cartStorage.push(oneProduct);
                console.log(cartStorage);

                //? Product Count:
                productCount.innerHTML = cartStorage.length;
                oneUser.userCart = cartStorage;

                //? login data updation:

                localStorage.setItem("oneUser",JSON.stringify(oneUser));

                //? signup data updation:
                data = data.filter((e)=>{
                    if(e.userNumber != oneUser.userNumber){
                        return e;
                    }
                });
                data.push(oneUser);
                localStorage.setItem("data",JSON.stringify(data));
            }
            else{
                window.open("./login.html");
                // window.location.href = "./login.html";
            }
        });
    });
}
mainfun();
