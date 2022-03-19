var products =[
    {
        "id":1,"name":"Aceite de menta","brand":"Dermactin",
        "description":"Aceite escencial de mente","price":50},
    {
        "id":2,"name":"Aceite de manzanilla","brand":"Dermactin",
        "description":"Aceite escencial de manzanilla","price":80},
    {
        "id":3,"name":"Aloe vera","brand":"Campanin",
        "description":"Aceite de aloe vera","price":100}
];

function loadProductModule()
{
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/productos.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopProducts(); 
                }
                );
}

//Mostrar el modulo de catalogo de productos
function openListProduct()
{
 $('#divProductDetail').hide();   
 $('#productList').show();
 $('#productSearch').hide();
 $('#productListSearch').hide();
}

//Mostrar el modulo de agregar producto
function openDetailProduct()
{
    $('#divProductDetail').show();
    $('#productList').hide();
    $('#productSearch').hide();
    $('#productListSearch').hide();
}

//Mostrar el modulo de busqueda de producto
function openSearchProduct()
{
    $('#divProductDetail').hide();
    $('#productList').hide();
    $('#productSearch').show();
}

function saveProduct()
{
    var codProd = parseInt($("#txtIdP").val());
    var nameProd = $("#txtNamePro").val();
    var brandProd = $("#txtBranchePro").val();
    var descriptionProd = $("#txtDescriptionPro").val();
    var priceProd = parseFloat($("#txtPricePro").val());
    
    if(codProd !=="" && nameProd !=="" && brandProd !=="" && descriptionProd !=="" && priceProd !==""){
    var posProduct = findProductPositionByID(codProd);
    
    var product = {
                    "id"            : codProd,
                    "name"          : nameProd,
                    "brand"         : brandProd,
                    "description"   : descriptionProd,
                    "price"         : priceProd
                  };
                  
    //Si pos es menor a 0, entonces no existe, agregar el producto
    if(posProduct < 0)
    {
        products.push(product);
    }
    //Si la pos no es menor a 0, ya existe dentro del arreglo, entonces se modifica
    else
    {
        products[posProduct]=product;
    }
    
    loopProducts();
    //Aqui falta enviar el objeto para que se almacene
    Swal.fire("Inserción correcta","Producto almacenado","success");
    cleanFieldsProd();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsProd()
{
    $("#txtIdP").val("");
    $("#txtNamePro").val("");
    $("#txtBranchePro").val("");
    $("#txtDescriptionPro").val("");
    $("#txtPricePro").val("");
}

function loopProducts()
{
    dataTableProd= "";
    for(var i in products)
    {
        dataTableProd+="<tr>";
        dataTableProd+="<td>"+products[i].id+"</td>";
        dataTableProd+="<td>"+products[i].name+"</td>";
        dataTableProd+="<td>"+products[i].brand+"</td>";
        dataTableProd+="<td>"+products[i].description+"</td>";
        dataTableProd+="<td>"+products[i].price+"</td>";
        dataTableProd+="<td> <button class='btn btn-outline-danger' onclick='deleteProduct("+products[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableProd+="<td> <button class='btn btn-outline-warning' onclick='updateProduct("+products[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableProd+="</tr>";
    }
    $('#tbProducts').html(dataTableProd);
}

function deleteProduct(id)
{
    var i = findProductPositionByID(id);
    
    if (i > -1)
    {
        products.splice(i,1);
    }
    loopProducts();
    $('#productListSearch').hide();
    Swal.fire("Eliminación correcta", "Producto eliminado","error");
}

function updateProduct(id)
{
    var i = findProductPositionByID(id);
    openDetailProduct();
    $("#txtIdP").val(products[i].id);
    $("#txtNamePro").val(products[i].name);
    $("#txtBranchePro").val(products[i].brand);
    $("#txtDescriptionPro").val(products[i].description);
    $("#txtPricePro").val(products[i].price);
}

function findProductPositionByID(id)
{
    var pos = -1;
    for (var i = 0; i < products.length; i++)
    {
        if (products[i].id === id)
        {
            pos = i;
            i = products.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findProductPositionByName(name)
{
    var pos = -1;
    for (var i = 0; i < products.length; i++)
    {
        if (products[i].name === name)
        {
            pos = i;
            i = products.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}

function searchProduct()
{   
    var prodId = parseInt($("#txtIdPSearch").val());
    var prodName = $("#txtNamePSearch").val();
    
    var productIDExist = findProductPositionByID(prodId);
    var productNameExist = findProductPositionByName(prodName);
    
    
    if(productIDExist >= 0)
    {
         $('#productListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableProd= "";
            for(var i in products)
            if (products[i].id === prodId){
            
            {
                dataTableProd+="<tr>";
                dataTableProd+="<td>"+products[i].id+"</td>";
                dataTableProd+="<td>"+products[i].name+"</td>";
                dataTableProd+="<td>"+products[i].brand+"</td>";
                dataTableProd+="<td>"+products[i].description+"</td>";
                dataTableProd+="<td>"+products[i].price+"</td>";
                dataTableProd+="<td> <button class='btn btn-outline-danger' onclick='deleteProduct("+products[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableProd+="<td> <button class='btn btn-outline-warning' onclick='updateProduct("+products[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableProd+="</tr>";
            }
            $('#tbProductSearch').html(dataTableProd);
            } 

    }

    else if (productNameExist >= 0)
    {
          $('#productListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableProd= "";
            for(var i in products)
            if (products[i].name === prodName){
            
            {
                dataTableProd+="<tr>";
                dataTableProd+="<td>"+products[i].id+"</td>";
                dataTableProd+="<td>"+products[i].name+"</td>";
                dataTableProd+="<td>"+products[i].brand+"</td>";
                dataTableProd+="<td>"+products[i].description+"</td>";
                dataTableProd+="<td>"+products[i].price+"</td>";
                dataTableProd+="<td> <button class='btn btn-outline-danger' onclick='deleteProduct("+products[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableProd+="<td> <button class='btn btn-outline-warning' onclick='updateProduct("+products[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableProd+="</tr>";
            }
            $('#tbProductSearch').html(dataTableProd);
            }
    }
    
    else
    {       
         $('#productListSearch').hide();
         Swal.fire("El producto no existe", "Intenta de nuevo","warning");  
    }
    
}