let body = document.querySelector("body");
let container = document.getElementById("container");
let books = document.querySelectorAll(".book-item");
let totalBooks = document.getElementById("total-books");
let instockTitles = document.getElementById("instock-titles");
let outofstockTitles = document.getElementById("outofstock-titles");
let bookCount = 0;
let instockCount = 0;

let form = document.querySelector("form");

let newTitleButton = document.querySelector(".new-title");
let cancelButton = document.getElementById("cancel");

form.addEventListener("submit", event => {
    event.preventDefault();
    let artworkURL = document.getElementById("cover-art").value
    let artworkPath = "";
    if (document.getElementById("cover-art-file").value)
        artworkPath = window.URL.createObjectURL(document.getElementById("cover-art-file").files[0]);
    let artwork = artworkURL || artworkPath;
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let stock = document.getElementById("stock").value;
    if (stock === "instock") stock = true;
    else stock = false;
    addBook(artwork, title, author, price, stock);
    resetForm();
    form.style.display = "none";
})



newTitleButton.addEventListener("click", () => {
    form.style.display = "grid";
});
cancelButton.addEventListener("click", () => {
    form.style.display = "none";
    resetForm();
});


let randomBooks = Math.floor(Math.random() * 50) + 1;

function updateBackgroundColors(){
    let bookNodes = container.children;
    for (let i = 1; i < bookNodes.length; i++){
        if (i % 2 === 0)
            bookNodes[i].style.backgroundColor = "white";   
        else 
            bookNodes[i].style.backgroundColor = "rgba(60, 60, 67, 0.03)";
    }
}


function updateSummary(){
    if (bookCount > 1){
        totalBooks.innerText = `${bookCount} Total Titles`;
        instockTitles.innerText = `${instockCount} in stock`;
        outofstockTitles.innerText = `${bookCount - instockCount} out of stock`;
    }

    else if (bookCount === 0){
        totalBooks.innerText = `No Titles`;
        instockTitles.innerText = ``;
        outofstockTitles.innerText = ``;
    }
    
    else {
        totalBooks.innerText = `${bookCount} Title`;
        instockTitles.innerText = `${instockCount} in stock`;
        outofstockTitles.innerText = `${bookCount - instockCount} out of stock`;
    }

    
}





function addBook(artwork, title, author, price, stock) {
    let newBook = document.createElement("div");
    newBook.className = "book-item";

    let artworkElem = document.createElement("img");
    artworkElem.className = "cover-art";
    artworkElem.setAttribute("src", artwork);
    newBook.append(artworkElem);

    let titleElem = document.createElement("div");
    titleElem.className = "book-title";
    titleElem.innerText = title;
    newBook.append(titleElem);

    let authorElem = document.createElement("div");
    authorElem.className = "book-author";
    authorElem.innerText = author;
    newBook.append(authorElem);

    let priceElem = document.createElement("div");
    priceElem.className = "book-price";
    priceElem.innerText = "$" + price;
    newBook.append(priceElem);

    let optionElem = document.createElement("div");
    optionElem.className = "book-option";
    let editButton = document.createElement("i");
    let deleteButton = document.createElement("i");
    editButton.className = "book-edit fa-regular fa-pen-to-square";
    deleteButton.className = "book-delete fa-solid fa-trash-can";
    optionElem.append(editButton, deleteButton);
    editButton.style.color = "rgba(0, 0, 0, 0)";
    deleteButton.style.color = "rgba(0, 0, 0, 0)";
    editButton.addEventListener("click", editBookItem);
    deleteButton.addEventListener("click", () => {
        deleteButton.parentElement.parentElement.remove()
        bookCount--;
        if(stock) instockCount--;
        updateSummary();
        updateBackgroundColors();
    });
    newBook.append(optionElem);

    newBook.addEventListener("pointerenter", () => {
        editButton.style.color = "";
        deleteButton.style.color = "";
        editButton.style.cursor = "pointer";
        deleteButton.style.cursor = "pointer";
    });
    newBook.addEventListener("pointerleave", () => {
        editButton.style.color = "rgba(0, 0, 0, 0)";
        deleteButton.style.color = "rgba(0, 0, 0, 0)";
        editButton.style.cursor = "";
        deleteButton.style.cursor = "";
    });

    let stockElem = document.createElement("div");
    stockElem.className = "book-stock";
    if (stock) {
        stockElem.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        instockCount++;
    }
    else stockElem.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
    newBook.append(stockElem);

    container.append(newBook);
    bookCount++;

    if (bookCount % 2) {
        newBook.style.backgroundColor = "rgba(60, 60, 67, 0.03)";
    }

    updateSummary();

}
function resetForm(){
    let inputs = document.querySelectorAll(`input[type="text"]`);
    for (const input of inputs) {
        input.value = "";
    }
    let URL = document.getElementById("cover-art");
    URL.value = "";
    let fileInput = document.getElementById("cover-art-file");
    fileInput.value = "";
    let currentPrice = document.getElementById("price");
    currentPrice.value = "";
}

function editBookItem(){
    form.style.display = "grid";
    let titleField = document.getElementById("title");
    titleField.value = this.parentElement.parentElement.children[1].innerText;

    let authorField = document.getElementById("author");
    authorField.value = this.parentElement.parentElement.children[2].innerText;

    let priceField = document.getElementById("price");
    priceField.value = this.parentElement.parentElement.children[3].innerText.substring(1);

    let artworkURLField = document.getElementById("cover-art");
    artworkURLField.value = this.parentElement.parentElement.children[0].src;

    
    bookCount--;
    if(this.parentElement.parentElement.children[5].firstChild.className.includes("check")) instockCount--;
    updateSummary();
    updateBackgroundColors();

    this.parentElement.parentElement.remove();

}

let sampleBook1 = [
    "images/easter.png",
    "It's Not Easy Being a Bunny",
    "Marilyn Sadler",
    "5.98",
    true
]

let sampleBook2 = [
    "images/atomic.png",
    "Atomic Habits",
    "James Clear",
    "13.79",
    false
]

addBook(...sampleBook1);
addBook(...sampleBook2);