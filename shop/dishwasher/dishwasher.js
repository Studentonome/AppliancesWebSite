var root = document.getElementById("root");
var sort1 = document.getElementById("sort1");
var sort2 = document.getElementById("sort2");
var sort3 = document.getElementById("sort3");
var sort4 = document.getElementById("sort4");
var products = Array();
fetch('../../products/products.json')
    .then(res => res.json())
    .then(data => {
        products = data;
        drawProducts(data);
    })

function drawProducts(products){
    root.innerHTML = "";
    for (product of products){
        if(product.type === "dishwasher")
        {
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            div2.classList.add("productInfo");
            div1.innerHTML = `<img src=${'../../products/'+product.image} class="productImg">`;
            if (product.outOfStock ?? false)
            {div2.innerHTML = `<h3>${product.name}</h3><p>${product.value + ".00 BYN"}</p><p class="OutOfStock">Нету в наличии</p><p class="mono">${"Код: "+product.id}</p><a href="../../delivery.html"><button>Купить</button></a>`;}
            else
            {div2.innerHTML = `<h3>${product.name}</h3><p>${product.value + ".00 BYN"}</p><p class="notOutOfStock">В наличии</p><p class="mono">${"Код: "+product.id}</p><a href="../../delivery.html"><button>Купить</button></a>`;}
            let article  = document.createElement("article");
            article.appendChild(div1);
            article.appendChild(div2);
            root.appendChild(article);
        }
    }
}

sort1.addEventListener("click", ()=>{
    products = products.toSorted((a, b) => a.name.localeCompare(b.name));
    drawProducts(products);
});
sort2.addEventListener("click", ()=>{
    products = products.toSorted((a, b) => b.name.localeCompare(a.name));
    drawProducts(products);
});
sort3.addEventListener("click", ()=>{
    products = products.toSorted((a, b)=> parseInt(a.value) > parseInt(b.value));
    drawProducts(products);
});
sort4.addEventListener("click", ()=>{
    products = products.toSorted((a, b)=> parseInt(a.value) < parseInt(b.value));
    drawProducts(products);
});