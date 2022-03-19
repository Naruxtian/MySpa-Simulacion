/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var clients =[
    {
        "id":1,"name":"Armando","lastName":"Perez","mLastName":"Muñoz",
        "gender":"Masculino","RFC":"PEMA8505021H0","street":"La Reserva","number":210,"colony":"La Joya",
        "postalCode":38568,"phoneNumber":4773538760,"email":"arpemu12@gmail.com","username":"armando12","password":"perezarm12"},
    
    {
        "id":2,"name":"Mariana","lastName":"Moreno","mLastName":"Torres",
        "gender":"Femenino","RFC":"MOTM7806132S3","street":"Palma","number":305,"colony":"Echeveste",
        "postalCode":67854,"phoneNumber":4774567802,"email":"mari19@gmail.com","username":"mariana34","password":"torresma34"}
];

 
 
function loadClientModule()
{     
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/clientes.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopClients(); 
                }
                );
}

//Mostrar el modulo de catalogo de clientes
function openListClient()
{
 $('#divClientDetail').hide();   
 $('#clientList').show();
 $('#clientSearch').hide();
 $('#clientListSearch').hide();
}

//Mostrar el modulo de agregar cliente
function openDetailClient()
{
    $('#divClientDetail').show();
    $('#clientList').hide();
    $('#clientSearch').hide();
    $('#clientListSearch').hide();
}

//Mostrar el modulo de busqueda de cliente
function openSearchClient()
{
    $('#divClientDetail').hide();
    $('#clientList').hide();
    $('#clientSearch').show();
}


function saveClient()
{
    var idClient = parseInt ($("#txtIdC").val());
    var nameClient = $("#txtNom").val();
    var lastNameClient = $("#txtApP").val();
    var lastNameMClient = $("#txtApM").val();
    var genderClient = $("#genero1").val();
    var rfcClient = $("#txtRFC").val();
    var streetClient = $("#txtCalle").val();
    var numberClient = $("#Num").val();
    var colonyClient = $("#txtCol").val();
    var postalCodeClient = $("#CodP").val();
    var phoneClient = $("#NumT").val();
    var emailClient = $("#CorrElec").val();
    var userNameClient = $("#txtNomU").val();
    var passwordClient = $("#Contraseña").val();
   
    
    if( idClient !=="" && nameClient !=="" && lastNameClient !=="" && lastNameMClient !=="" && genderClient !=="" && rfcClient !=="" && streetClient !=="" && numberClient !=="" && colonyClient !=="" && postalCodeClient !=="" && phoneClient !=="" && emailClient !=="" && userNameClient !=="" && passwordClient !==""){
    var posClient = findClientPositionByID(idClient);
    
    var client = {
                    "id"                 : idClient,
                    "name"               : nameClient,
                    "lastName"           : lastNameClient,
                    "mLastName"          : lastNameMClient,
                    "gender"             : genderClient,
                    "RFC"                : rfcClient,
                    "street"             : streetClient,
                    "number"             : numberClient,
                    "colony"             : colonyClient,
                    "postalCode"         : postalCodeClient,
                    "phoneNumber"        : phoneClient,
                    "email"              : emailClient,
                    "username"           : userNameClient,
                    "password"           : passwordClient
                  };
                  
    
    if(posClient < 0)
    {
        clients.push(client);
    }
    
    else
    {
        clients[posClient]=client;
    }
    
    loopClients();
   
    Swal.fire("Inserción correcta","Cliente almacenado","success");
    cleanFieldsClients();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsClients()
{
    $("#txtIdC").val("");
    $("#txtNom").val("");
    $("#txtApP").val("");
    $("#txtApM").val("");
    $("#genero").val("");
    $("#txtRFC").val("");
    $("#txtCalle").val("");
    $("#Num").val("");
    $("#txtCol").val("");
    $("#CodP").val("");
    $("#NumT").val("");
    $("#CorrElec").val("");
    $("#txtNomU").val("");
    $("#Contraseña").val("");
}


function loopClients()
{
    dataTableClient= "";
    for(var i in clients)
    {  
        dataTableClient+="<tr>";
        dataTableClient+="<td>"+clients[i].id+"</td>";
        dataTableClient+="<td>"+clients[i].name+"</td>";
        dataTableClient+="<td>"+clients[i].lastName+"</td>";
        dataTableClient+="<td>"+clients[i].mLastName+"</td>";
        dataTableClient+="<td>"+clients[i].gender+"</td>";
        dataTableClient+="<td>"+clients[i].RFC+"</td>";
        dataTableClient+="<td>"+clients[i].street+"</td>";
        dataTableClient+="<td>"+clients[i].number+"</td>";
        dataTableClient+="<td>"+clients[i].colony+"</td>";
        dataTableClient+="<td>"+clients[i].postalCode+"</td>";
        dataTableClient+="<td>"+clients[i].phoneNumber+"</td>";
        dataTableClient+="<td>"+clients[i].email+"</td>";
        dataTableClient+="<td>"+clients[i].username+"</td>";
        dataTableClient+="<td>"+clients[i].password+"</td>";
        dataTableClient+="<td> <button class='btn btn-outline-danger' onclick='deleteClient("+clients[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableClient+="<td> <button class='btn btn-outline-warning' onclick='updateClient("+clients[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableClient+="</tr>";
    }
    $('#tbClients').html(dataTableClient);
}

function deleteClient(id)
{
    var i = findClientPositionByID(id);
    
    if (i > -1)
    {
        clients.splice(i,1);
    }
    loopClients();
     $('#clientListSearch').hide();
    Swal.fire("Eliminación correcta", "Cliente eliminado","error")
}

function updateClient(id)
{
    var i = findClientPositionByID(id);
    openDetailClient();
    $("#txtIdC").val(clients[i].id);
    $("#txtNom").val(clients[i].name);
    $("#txtApP").val(clients[i].lastName);
    $("#txtApM").val(clients[i].mLastName);
    $("#genero").val(clients[i].gender);
    $("#txtRFC").val(clients[i].RFC);
    $("#txtCalle").val(clients[i].street);
    $("#Num").val(clients[i].number);
    $("#txtCol").val(clients[i].colony);
    $("#CodP").val(clients[i].postalCode);
    $("#NumT").val(clients[i].phoneNumber);
    $("#CorrElec").val(clients[i].email);
    $("#txtNomU").val(clients[i].username);
    $("#Contraseña").val(clients[i].password);
}

function findClientPositionByID(id)
{
    var pos = -1;
    for (var i = 0; i < clients.length; i++)
    {
        if (clients[i].id === id)
        {
            pos = i;
            i = clients.length + 1; 
        }
    }
    return pos;
}
function findClientPositionByUserName(username)
{
    var pos = -1;
    for (var i = 0; i < clients.length; i++)
    {
        if (clients[i].username === username)
        {
            pos = i;
            i = clients.length + 1; 
        }
    }
    return pos;
}


function searchClient()
{   
    var cliId = parseInt($("#txtIDSearch").val());
    var cliUserName = $("#txtUserSearch").val();
    
    
    var clientIDExist = findClientPositionByID(cliId);
    var clientUserNameExist = findClientPositionByUserName(cliUserName);
   
    

    if(clientIDExist >= 0)
    {
         $('#clientListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableClient= "";
            for(var i in clients)
            if (clients[i].id === cliId){
            
            {
                dataTableClient+="<tr>";
                dataTableClient+="<td>"+clients[i].id+"</td>";
                dataTableClient+="<td>"+clients[i].name+"</td>";
                dataTableClient+="<td>"+clients[i].lastName+"</td>";
                dataTableClient+="<td>"+clients[i].mLastName+"</td>";
                dataTableClient+="<td>"+clients[i].gender+"</td>";
                dataTableClient+="<td>"+clients[i].RFC+"</td>";
                dataTableClient+="<td>"+clients[i].street+"</td>";
                dataTableClient+="<td>"+clients[i].number+"</td>";
                dataTableClient+="<td>"+clients[i].colony+"</td>";
                dataTableClient+="<td>"+clients[i].postalCode+"</td>";
                dataTableClient+="<td>"+clients[i].phoneNumber+"</td>";
                dataTableClient+="<td>"+clients[i].email+"</td>";
                dataTableClient+="<td>"+clients[i].username+"</td>";
                dataTableClient+="<td>"+clients[i].password+"</td>";
                dataTableClient+="<td> <button class='btn btn-outline-danger' onclick='deleteClient("+clients[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableClient+="<td> <button class='btn btn-outline-warning' onclick='updateClient("+clients[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableClient+="</tr>";
            }
            $('#tbClientSearch').html(dataTableClient);
            } 

    }

    else if( clientUserNameExist >= 0)
    {
          $('#clientListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableClient= "";
            for(var i in clients)
            if (clients[i].username === cliUserName){
            
            {
                dataTableClient+="<tr>";
                dataTableClient+="<td>"+clients[i].name+"</td>";
                dataTableClient+="<td>"+clients[i].lastName+"</td>";
                dataTableClient+="<td>"+clients[i].mLastName+"</td>";
                dataTableClient+="<td>"+clients[i].gender+"</td>";
                dataTableClient+="<td>"+clients[i].RFC+"</td>";
                dataTableClient+="<td>"+clients[i].street+"</td>";
                dataTableClient+="<td>"+clients[i].number+"</td>";
                dataTableClient+="<td>"+clients[i].colony+"</td>";
                dataTableClient+="<td>"+clients[i].postalCode+"</td>";
                dataTableClient+="<td>"+clients[i].phoneNumber+"</td>";
                dataTableClient+="<td>"+clients[i].email+"</td>";
                dataTableClient+="<td>"+clients[i].username+"</td>";
                dataTableClient+="<td>"+clients[i].password+"</td>";
                dataTableClient+="<td> <button class='btn btn-outline-danger' onclick='deleteClient("+clients[i].username+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableClient+="<td> <button class='btn btn-outline-warning' onclick='updateClient("+clients[i].username+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableClient+="</tr>";
            }
            $('#tbClientSearch').html(dataTableClient);
            }
    }
    
    else 
    {       
         $('#clientListSearch').hide();
         Swal.fire("El cliente no existe", "Intenta de nuevo","warning");  
    }
    
}

