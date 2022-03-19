var staffs =[
    {
        "id":1,"name":"Alejandro","lastName":"Muñoz","mLastName":"Medina",
        "gender":"Masculino","RFC":"MUMA8505021H7","street":"Cieneguita","number":205,"colony":"Las Torres",
        "postalCode":38566,"phoneNumber":47729945678,"job":"Encargado de Sala","photography":""},
    
    {
        "id":2,"name":"Sara","lastName":"Medina","mLastName":"Flores",
        "gender":"Femenino","RFC":"MEFS8505021M7","street":"Cruz de Palma","number":220,"colony":"La Soledad",
        "postalCode":35678,"phoneNumber":4773045698,"job":"Recepcionista","photography":""}
    
    
];


function loadStaffModule()
{     
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/empleados.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopStaffs(); 
                }
                );
}

//Mostrar el modulo de catalogo de empleados
function openListStaff()
{
 $('#divStaffDetail').hide();   
 $('#staffList').show();
 $('#staffSearch').hide();
 $('#staffListSearch').hide();
}

//Mostrar el modulo de agregar empleado
function openDetailStaff()
{
    $('#divStaffDetail').show();
    $('#staffList').hide();
    $('#staffSearch').hide();
    $('#staffListSearch').hide();
}

//Mostrar el modulo de busqueda de empleado
function openSearchStaff()
{
    $('#divStaffDetail').hide();
    $('#staffList').hide();
    $('#staffSearch').show();
}

function saveStaff()
{
    var idStaff = parseInt($("#txtIdS").val());
    var nameStaff =($("#txtName").val());
    var lastNameStaff = $("#txtApeP").val();
    var lastNameMStaff = $("#ApeM").val();
    var genderStaff = $("#genero1").val();
    var rfcStaff = ($("#txtrfc").val());
    var streetStaff = ($("#txtCall").val());
    var numberStaff = ($("#number").val());
    var colonyStaff = ($("#txtColo").val());
    var poCodStaff = ($("#codPo").val());
    var phoNumStaff = ($("#NumTel").val());
    var jobStaff = $("#txtPu").val();
    var photoStaff = ($("#txtFoto").val());
    
    if(idStaff !=="" && nameStaff !=="" && lastNameStaff !=="" && lastNameMStaff !=="" && genderStaff !=="" && rfcStaff !=="" && streetStaff !=="" && numberStaff !=="" && colonyStaff !=="" && poCodStaff !=="" && phoNumStaff !=="" && jobStaff !=="" && photoStaff !==""){
    var posStaff = findStaffPositionByID(idStaff);
    
    var staff = {
                    "id"            : idStaff,      
                    "name"          : nameStaff,
                    "lastName"      : lastNameStaff,
                    "mLastName"     : lastNameMStaff,
                    "gender"        : genderStaff,
                    "RFC"           : rfcStaff,
                    "street"        : streetStaff,
                    "number"        : numberStaff,
                    "colony"        : colonyStaff,
                    "postalCode"    : poCodStaff,
                    "phoneNumber"   : phoNumStaff,
                    "job"           : jobStaff,
                    "photography"   : photoStaff
                            
                  };
                  
    
    if(posStaff < 0)
    {
        staffs.push(staff);
    }
    
    else
    {
        staffs[posStaff]=staff;
    }
    
    loopStaffs();
   
    Swal.fire("Inserción correcta","Empleado almacenado","success");
    cleanFieldsStaff();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsStaff()
{
    $("#txtIdS").val("");
    $("#txtName").val("");
    $("#txtApeP").val("");
    $("#ApeM").val("");
    $("#genero1").val("");
    $("#txtrfc").val("");
    $("#txtCall").val("");
    $("#number").val("");
    $("#txtColo").val("");
    $("#codPo").val("");
    $("#NumTel").val("");
    $("#txtPu").val("");
    $("#txtFoto").val("");
}

function loopStaffs()
{
    dataTableStaff= "";
    for(var i in staffs)
    {
        dataTableStaff+="<tr>";
        dataTableStaff+="<td>"+staffs[i].id+"</td>";
        dataTableStaff+="<td>"+staffs[i].name+"</td>";
        dataTableStaff+="<td>"+staffs[i].lastName+"</td>";
        dataTableStaff+="<td>"+staffs[i].mLastName+"</td>";
        dataTableStaff+="<td>"+staffs[i].gender+"</td>";
        dataTableStaff+="<td>"+staffs[i].RFC+"</td>";
        dataTableStaff+="<td>"+staffs[i].street+"</td>";
        dataTableStaff+="<td>"+staffs[i].number+"</td>";
        dataTableStaff+="<td>"+staffs[i].colony+"</td>";
        dataTableStaff+="<td>"+staffs[i].postalCode+"</td>";
        dataTableStaff+="<td>"+staffs[i].phoneNumber+"</td>";
        dataTableStaff+="<td>"+staffs[i].job+"</td>";
        dataTableStaff+="<td>"+staffs[i].photography+"</td>";
        dataTableStaff+="<td> <button class='btn btn-outline-danger' onclick='deleteStaff("+staffs[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableStaff+="<td> <button class='btn btn-outline-warning' onclick='updateStaff("+staffs[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableStaff+="</tr>";
    }
    $('#tbStaffs').html(dataTableStaff);
}

function deleteStaff(id)
{
    var i = findStaffPositionByID(id);
    
    if (i > -1)
    {
        staffs.splice(i,1);
    }
    loopStaffs();
    $('#staffListSearch').hide();
    Swal.fire("Eliminación correcta", "Empleado eliminado","error")
}

function updateStaff(id)
{
    var i = findStaffPositionByID(id);
    openDetailStaff();
    $("#txtIdS").val(staffs[i].id);
    $("#txtName").val(staffs[i].name);
    $("#txtApeP").val(staffs[i].lastName);
    $("#ApeM").val(staffs[i].mLastName);
    $("#genero1").val(staffs[i].gender);
    $("#txtrfc").val(staffs[i].RFC);
    $("#txtCall").val(staffs[i].street);
    $("#number").val(staffs[i].number);
    $("#txtColo").val(staffs[i].colony);
    $("#codPo").val(staffs[i].postalCode);
    $("#NumTel").val(staffs[i].phoneNumber);
    $("#txtPu").val(staffs[i].job);
    $("#txtFoto").val(staffs[i].photography);
}

function findStaffPositionByID(id)
{
    var pos = -1;
    for (var i = 0; i < staffs.length; i++)
    {
        if (staffs[i].id === id)
        {
            pos = i;
            i = staffs.length + 1; 
        }
    }
    return pos;
}
function findProductPositionByRFC(RFC)
{
    var pos = -1;
    for (var i = 0; i < staffs.length; i++)
    {
        if (staffs[i].RFC === RFC)
        {
            pos = i;
            i = staffs.length + 1; 
        }
    }
    return pos;
}

function searchStaff()
{   
    var idStaff = parseInt($("#txtIdNSearch").val());
    var rfcStaff = $("#txtRfcSSearch").val();
    
    var staffIDExist = findStaffPositionByID(idStaff);
    var staffRfcExist = findProductPositionByRFC(rfcStaff);
    

    if(staffIDExist >= 0)
    {
         $('#staffListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableStaff= "";
            for(var i in staffs)
            if (staffs[i].id === idStaff){
            
            {
                dataTableStaff+="<tr>";
                dataTableStaff+="<td>"+staffs[i].id+"</td>";
                dataTableStaff+="<td>"+staffs[i].name+"</td>";
                dataTableStaff+="<td>"+staffs[i].lastName+"</td>";
                dataTableStaff+="<td>"+staffs[i].mLastName+"</td>";
                dataTableStaff+="<td>"+staffs[i].gender+"</td>";
                dataTableStaff+="<td>"+staffs[i].RFC+"</td>";
                dataTableStaff+="<td>"+staffs[i].street+"</td>";
                dataTableStaff+="<td>"+staffs[i].number+"</td>";
                dataTableStaff+="<td>"+staffs[i].colony+"</td>";
                dataTableStaff+="<td>"+staffs[i].postalCode+"</td>";
                dataTableStaff+="<td>"+staffs[i].phoneNumber+"</td>";
                dataTableStaff+="<td>"+staffs[i].job+"</td>";
                dataTableStaff+="<td>"+staffs[i].photography+"</td>";
                dataTableStaff+="<td> <button class='btn btn-outline-danger' onclick='deleteStaff("+staffs[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableStaff+="<td> <button class='btn btn-outline-warning' onclick='updateStaff("+staffs[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableStaff+="</tr>";
            }
            $('#tbStaffSearch').html(dataTableStaff);
            } 

    }

    else if (staffRfcExist >= 0)
    {
          $('#staffListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableStaff= "";
            for(var i in staffs)
            if (staffs[i].RFC === rfcStaff){
            
            {
                dataTableStaff+="<tr>";
                dataTableStaff+="<td>"+staffs[i].id+"</td>";
                dataTableStaff+="<td>"+staffs[i].name+"</td>";
                dataTableStaff+="<td>"+staffs[i].lastName+"</td>";
                dataTableStaff+="<td>"+staffs[i].mLastName+"</td>";
                dataTableStaff+="<td>"+staffs[i].gender+"</td>";
                dataTableStaff+="<td>"+staffs[i].RFC+"</td>";
                dataTableStaff+="<td>"+staffs[i].street+"</td>";
                dataTableStaff+="<td>"+staffs[i].number+"</td>";
                dataTableStaff+="<td>"+staffs[i].colony+"</td>";
                dataTableStaff+="<td>"+staffs[i].postalCode+"</td>";
                dataTableStaff+="<td>"+staffs[i].phoneNumber+"</td>";
                dataTableStaff+="<td>"+staffs[i].job+"</td>";
                dataTableStaff+="<td>"+staffs[i].photography+"</td>";
                dataTableStaff+="<td> <button class='btn btn-outline-danger' onclick='deleteStaff("+staffs[i].RFC+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableStaff+="<td> <button class='btn btn-outline-warning' onclick='updateStaff("+staffs[i].RFC+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableStaff+="</tr>";
            }
            $('#tbStaffSearch').html(dataTableStaff);
            }
    }
    
    else
    {       
         $('#staffListSearch').hide();
         Swal.fire("El empleado no existe", "Intenta de nuevo","warning");  
    }
    
}


