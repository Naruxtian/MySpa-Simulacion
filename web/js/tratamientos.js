var treatments =[
    {
        "id":1,"name":"Exfoliacion de cara",
        "description":"tratamiento para la cara para mejorar la aparencia con naturales productos"},
    {
        "id":2,"name":"Masaje",
        "description":"masaje con el que descansara y ayudara al la relajacion"}
];

function loadTreatmentModule()
{
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/tratamientos.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopTreatment();
                }
                );
}

//Mostrar el modulo de catalogo de tratamientos
function openListtreatment()
{
 $('#treatmentDetail').hide();  
 $('#treatmentList').show();
 $('#treatmentSearch').hide();
 $('#treatmentListSearch').hide();
}

//Mostrar el modulo de agregar tratamiento
function openDetailtreatment()
{
 $('#treatmentDetail').show();   
 $('#treatmentList').hide();
 $('#treatmentSearch').hide();
 $('#treatmentListSearch').hide();
}

//Mostrar el modulo de busqueda de tratamientos
function openSearchtreatment()
{
    $('#treatmentDetail').hide();
    $('#treatmentList').hide();
    $('#treatmentSearch').show();
}

function saveTreatment()
{
    var codTr = parseInt($("#txtIdT").val());
    var nameTr = $("#txtNameT").val();
    var descriptionTr = $("#txtDescriptionT").val();
    
    if(codTr !=="" && nameTr !=="" && descriptionTr !==""){
    var posTreatment = findTreatmentPositionByID(codTr);
    
    var treatment = {
                    "id"            : codTr,
                    "name"          : nameTr,
                    "description"   : descriptionTr
                  };
                  
    //Si pos es menor a 0, entonces no existe, agregar el tratamiento
    if(posTreatment < 0)
    {
        treatments.push(treatment);
    }
    //Si la pos no es menor a 0, ya existe dentro del arreglo, entonces se modifica
    else
    {
        treatments[posTreatment]=treatment;
    }
    
    loopTreatment();
    //Aqui falta enviar el objeto para que se almacene
    Swal.fire("Inserción correcta","Tratamiento almacenado","success");
    cleanFieldsTr();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsTr()
{
    $("#txtIdT").val("");
    $("#txtNameT").val("");
    $("#txtDescriptionT").val("");
}

function loopTreatment()
{
    dataTableTr= "";
    for(var i in treatments)
    {
        dataTableTr+="<tr>";
        dataTableTr+="<td>"+treatments[i].id+"</td>";
        dataTableTr+="<td>"+treatments[i].name+"</td>";
        dataTableTr+="<td>"+treatments[i].description+"</td>";
        dataTableTr+="<td> <button class='btn btn-outline-danger' onclick='deleteTreatments("+treatments[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableTr+="<td> <button class='btn btn-outline-warning' onclick='updateTreatments("+treatments[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableTr+="</tr>";
    }
    $('#tbtreatment').html(dataTableTr);
}

function deleteTreatments(id)
{
    var i = findTreatmentPositionByID(id);
    
    if (i > -1)
    {
        treatments.splice(i,1);
    }
    loopTreatment();
    $('#treatmentListSearch').hide();
    Swal.fire("Eliminación correcta", "Tratamiento eliminado","error");
}

function updateTreatments(id)
{
    var i = findTreatmentPositionByID(id);
    openDetailtreatment();
    $("#txtIdT").val(treatments[i].id);
    $("#txtNameT").val(treatments[i].name);
    $("#txtDescriptionT").val(treatments[i].description);
}

function findTreatmentPositionByID(id)
{
    var pos = -1;
    for (var i = 0; i < treatments.length; i++)
    {
        if (treatments[i].id === id)
        {
            pos = i;
            i = treatments.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findTreatmentPositionByName(name)
{
    var pos = -1;
    for (var i = 0; i < treatments.length; i++)
    {
        if (treatments[i].name === name)
        {
            pos = i;
            i = treatments.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}

function searchTreatment()
{   
    var treatmentId = parseInt($("#txtIdTrSearch").val());
    var treatmentName = $("#txtNameTrSearch").val();
    
    var treatmentIDExist = findTreatmentPositionByID(treatmentId);
    var treatmentNameExist = findTreatmentPositionByName(treatmentName);
    

    if(treatmentIDExist >= 0)
    {
         $('#treatmentListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableTr= "";
            for(var i in treatments)
            if (treatments[i].id === treatmentId){
            
            {
        dataTableTr+="<tr>";
        dataTableTr+="<td>"+treatments[i].id+"</td>";
        dataTableTr+="<td>"+treatments[i].name+"</td>";
        dataTableTr+="<td>"+treatments[i].description+"</td>";
        dataTableTr+="<td> <button class='btn btn-outline-danger' onclick='deleteTreatments("+treatments[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableTr+="<td> <button class='btn btn-outline-warning' onclick='updateTreatments("+treatments[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableTr+="</tr>";
            }
            $('#tbtreatmentSearch').html(dataTableTr);
            } 

    }

    else if (treatmentNameExist >= 0)
    {
          $('#treatmentListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableTr= "";
            for(var i in treatments)
            if (treatments[i].name === treatmentName){
            
            {
        dataTableTr+="<tr>";
        dataTableTr+="<td>"+treatments[i].id+"</td>";
        dataTableTr+="<td>"+treatments[i].name+"</td>";
        dataTableTr+="<td>"+treatments[i].description+"</td>";
        dataTableTr+="<td> <button class='btn btn-outline-danger' onclick='deleteTreatments("+treatments[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableTr+="<td> <button class='btn btn-outline-warning' onclick='updateTreatments("+treatments[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableTr+="</tr>";
            }
            $('#tbtreatmentSearch').html(dataTableTr);
            }
    }
    
    else
    {       
         $('#treatmentListSearch').hide();
         Swal.fire("El tratamiento no se encontro", "Intenta de nuevo","warning");  
    }
    
}



