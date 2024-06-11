let oneUser = JSON.parse(localStorage.getItem("oneUser"));
let data = JSON.parse(localStorage.getItem("data"));
let userCart = oneUser.userCart;
let msg = document.querySelector("#message");
let container = document.querySelector("#cont");

if(oneUser){
    msg.innerHTML = `Hi, ${oneUser.userFirstName}`;

    if(userCart){
        //? Displaying Product:
        function displayProduct(){
            container.innerHTML = "";
            userCart.map((e)=>{
                container.innerHTML += `
                    <div class="design" id="${e.productId}">
                        <div>
                            <img src="${e.productImageURLs[0]}" alt="">
                        </div>

                        <div>
                            <h3>Name : ${e.name}</h3>
                            <h2>Price : Rs.${e.price}</h2>
                        </div>

                        <div>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                `;
            });
        }
        displayProduct();

        //? Removing Product:
        function removingProduct(){
            let allDeleteBtn = container.querySelectorAll("i");

            allDeleteBtn.forEach((btn)=>{
            btn.addEventListener("click",()=>{
                    userCart = userCart.filter((e)=>{
                        if(e.productId != btn.parentElement.parentElement.id){
                            return e;
                        }
                    });
                    displayProduct();

                    oneUser.userCart = userCart;
                    localStorage.setItem("oneUser",JSON.stringify(oneUser));

                    data = data.filter((e)=>{
                        if(e.userNumber != oneUser.userNumber){
                            return e;
                        }
                    });
                    data.push(oneUser);
                    localStorage.setItem("data",JSON.stringify(data));
                    console.log(userCart);
                });
            });
        }
        removingProduct();
    }
}
