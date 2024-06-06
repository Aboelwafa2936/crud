var productNameInput = document.getElementById('productName');
var productCategoryInput = document.getElementById('productCategory');
var productPriceInput = document.getElementById('productPrice');
var productDescreptionInput = document.getElementById('productDescreption');
var productFileInput = document.getElementById('productImage');
var productSearchInput = document.getElementById('productSearch');
var invalidAlerts = Array.from(document.querySelectorAll('.invalid'));
var productsList = [];
var localStorageKey = "list";
if(JSON.parse(localStorage.getItem(localStorageKey)) != null){
    productsList = JSON.parse(localStorage.getItem("list"));
    addProduct();
}


var addProductData = document.querySelector("#btnAdd");
addProductData.addEventListener('click', function(){
    getData();
})

function getData(){
    product ={
        name: productNameInput.value,
        category: productCategoryInput.value,
        price: productPriceInput.value,
        descreption: productDescreptionInput.value,
        file:  productFileInput.files[0].name
        };
    console.log()
    productsList.push(product);
    localStorage.setItem(localStorageKey,JSON.stringify(productsList));
    console.log(productsList) ;
    addProduct();
    removeValidationInputs();
    clearForm();
    addProductData.setAttribute('disabled', 'disabled');
}
function addProduct(){
    var productStructure = '';
    for(var i = 0; i < productsList.length;i++){
        productStructure += 
        `<div class="col-md-4 sm-3">
        <div class ="card">
        <img class="img-fluid" src="images/${productsList[i].file}" alt="product image">
        <div class="card-body  shadow p-3">
        <h3 class="mb-2">${productsList[i].name}</h3>
        <div class="d-flex justify-content-between align-items-center">
        <span class="mb-3 price">${productsList[i].price}</span>
        <span class="mb-2 category">${productsList[i].category}</span>
        </div>
        <p class="mb-2 descreption">${productsList[i].descreption}</p>
        <div class="btns">
        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
        <button class="btn btn-success" data-target="update" data-index="${i}" onclick="updateProduct(${i})">Update</button>
        </div>
        </div>
        </div>
        </div>`;
    }
    document.getElementById('product').innerHTML = productStructure;
}
function clearForm(){
    productNameInput.value = '';
    productCategoryInput.value = '';
    productPriceInput.value = '';
    productDescreptionInput.value = '';
    productFileInput.value = '';
}
function deleteProduct(initaialValue){
    productsList.splice(initaialValue,1);
    localStorage.setItem(localStorageKey, JSON.stringify(productsList));
    addProduct();
}
function updateProduct(index){
    productNameInput.value = productsList[index].name;
    productPriceInput.value = productsList[index].price;
    productCategoryInput.value = productsList[index].category;
    productDescreptionInput.value = productsList[index].descreption;
    document.getElementById('btnUpdate').dataset.index = index; 
    document.getElementById('btnUpdate').classList.remove('d-none');
    document.getElementById('btnAdd').classList.add('d-none');
}

var updateProductData = document.querySelector("#btnUpdate");
updateProductData.addEventListener('click', function(){
    updateData();
});
function updateData() {
    var index = document.getElementById('btnUpdate').dataset.index;
    console.log(index);
    productsList[index] = {
        name: productNameInput.value,
        category: productCategoryInput.value,
        price: productPriceInput.value,
        descreption: productDescreptionInput.value,
        file:  productFileInput.files[0].name
    };
    localStorage.setItem(localStorageKey, JSON.stringify(productsList));
    addProduct();
    removeValidationInputs();
    clearForm();
    document.getElementById('btnUpdate').classList.add('d-none');
    document.getElementById('btnAdd').classList.remove('d-none');
    addProductData.setAttribute('disabled', 'disabled');
}

function searchProduct(searchValue) {
    searchValue = productSearchInput.value.toLowerCase();
    var productStructure = '';
    for (var i = 0; i < productsList.length; i++) {
        var productNameLower = productsList[i].name.toLowerCase();
        if (productNameLower.includes(searchValue)) {
            var startIndex = productNameLower.indexOf(searchValue);
            var endIndex = startIndex + searchValue.length;
            var highlightedName = productsList[i].name.substring(0, startIndex) +
                `<span class="text-danger">${productsList[i].name.substring(startIndex, endIndex)}</span>` +
                productsList[i].name.substring(endIndex);
            productStructure += 
            `<div class="col-md-4 sm-3">
            <div class ="card">
            <img class="img-fluid" src="images/${productsList[i].file}" alt="">
            <div class="card-body shadow p-3">
            <h3 class="mb-2">${highlightedName}</h3>
            <div class="d-flex justify-content-between align-items-center">
            <span class="mb-3">${productsList[i].price}</span>
            <span class="mb-2">${productsList[i].category}</span>
            </div>
            <p class="mb-2">${productsList[i].descreption}</p>
            <div class="btns">
            <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
            <button class="btn btn-success" data-target="update" data-index="${i}" onclick="updateProduct(${i})">Update</button>
            </div>
            </div>
            </div>
            </div>`;
        }
    }
    document.getElementById('product').innerHTML = productStructure;
}

function validateFormInputs(element){
    var regex = {
        productName: /^[A-Za-z][A-Za-z0-9\s]{2,10}$/,
        productCategory: /(Labtop|Mobile|Pc|Play Station)/,
        productPrice: /\b(3[0-9]{3}|[4-9][0-9]{3}|[1-9][0-9]{4}|1[0-9]{5}|2[0-9]{5}|300000)\b/,
        productDescreption: /^[\w\s]{5,200}$/,
        productImage:/.(jpg|jpeg|png|gif|bmp)$/
    };
    if(regex[element.id].test(element.value)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }else{
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false;
    }

}
var inputsValidate = document.querySelectorAll('.outer input, .outer textarea');
for(var i = 0; i < inputsValidate.length; i++){
    inputsValidate[i].addEventListener('input', function(){
        validateFormInputs(this);
    });
}
var inputs = Array.from(document.querySelectorAll('.outer input , .outer textarea'))
console.log(inputs);
console.log(document.querySelector( '.outer textarea'));

// function for looping over the inputs
(function loopOverInputs(){
    for(var i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('input', checkingvalidation);
        inputs[i].addEventListener('input', displayAlerts);
    }
})()

function displayAlerts(event){
    var input = event.target;
    var index = inputs.indexOf(input);
    console.log(index);
        if (!validateFormInputs(inputs[index]) && inputs[index].value !== '') {
            invalidAlerts[index].classList.remove('d-none');
        }else{
            invalidAlerts[index].classList.add('d-none');
        }
}
// function to validate inputs values
function checkingvalidation(){
    if(validateFormInputs(productFileInput) && validateFormInputs(productNameInput) && validateFormInputs(productCategoryInput) && validateFormInputs(productDescreptionInput) && validateFormInputs(productPriceInput)){
        addProductData.removeAttribute('disabled');
    }else{
        addProductData.setAttribute('disabled', 'disabled');
    }
}
// function to remove validation 
function removeValidationInputs(){
        for(var i = 0; i < inputs.length; i++){
            inputs[i].classList.remove('is-valid');
        }
}



