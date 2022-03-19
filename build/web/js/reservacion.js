var reservations =[
    {
        "idRes":1,"idCli":1,
        "fecha":"2021-08-04","sala":"PowerActive","estatus":"Pendiente"},
    {
        "idRes":2,"idCli":2,
        "fecha":"2021-08-05","sala":"Relax","estatus":"Atendida"}
];

function loadReservationModule()
{
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/reservaciones.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopReservation(); 
                }
                );
}

//Mostrar el modulo de catalogo de reservacion
function openListreservation()
{
 $('#reservationDetail').hide();   
 $('#reservationList').show();
 $('#reservationSearch').hide();
 $('#reservationListSearch').hide();
}

//Mostrar el modulo de agregar reservacion
function openDetailreservation()
{
 $('#reservationDetail').show();   
 $('#reservationList').hide();
 $('#reservationSearch').hide();
 $('#reservationListSearch').hide();
}

//Mostrar el modulo de busqueda de reservacion
function openSearchreservation()
{
    $('#reservationDetail').hide();
    $('#reservationList').hide();
    $('#reservationSearch').show();
}

function saveReservation()
{
    var codRes = parseInt($("#txtIdR").val());
    var idCli = parseInt($("#txtIdC").val());
    var fechaRes = $("#txtDateR").val();
    var salaRes = $("#txtRoomR").val();
    var estatusRes = $("#txtreservationEstatus").val();
    
    if(codRes !=="" && idCli !=="" && fechaRes !=="" && salaRes !=="" && estatusRes !==""){
    var posReservation = findReservationPositionByID(codRes);
    
    var reservation = {
                    "idRes" : codRes,
                    "idCli" : idCli,
                    "fecha" : fechaRes,
                    "sala"  :  salaRes,
                    "estatus" : estatusRes
                  };
                  
    //Si pos es menor a 0, entonces no existe, agregar el tratamiento
    if(posReservation < 0)
    {
        reservations.push(reservation);
    }
    //Si la pos no es menor a 0, ya existe dentro del arreglo, entonces se modifica
    else
    {
        reservations[posReservation]=reservation;
    }
    
    loopReservation();
    //Aqui falta enviar el objeto para que se almacene
    Swal.fire("Inserción correcta","Reservacion almacenada","success");
    cleanFieldsRes();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsRes()
{
    $("#txtIdR").val("");
    $("#txtIdC").val("");
    $("#txtDateR").val("");
    $("#txtRoomR").val("");
    $("#txtreservationEstatus").val("Pendiente");
}

function loopReservation()
{
    dataTableRes= "";
    for(var i in reservations)
    {
        dataTableRes+="<tr>";
        dataTableRes+="<td>"+reservations[i].idRes+"</td>";
        dataTableRes+="<td>"+reservations[i].idCli+"</td>";
        dataTableRes+="<td>"+reservations[i].fecha+"</td>";
        dataTableRes+="<td>"+reservations[i].sala+"</td>";
        dataTableRes+="<td>"+reservations[i].estatus+"</td>";
       dataTableRes+="<td> <button class='btn btn-outline-danger' onclick='deleteReservation("+reservations[i].idRes+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableRes+="<td> <button class='btn btn-outline-warning' onclick='updateReservation("+reservations[i].idRes+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableRes+="</tr>";
    }
    $('#tbreservation').html(dataTableRes);
}

function deleteReservation(id)
{
    var i = findReservationPositionByID(id);
    
    if (i > -1)
    {
        reservations.splice(i,1);
    }
    loopReservation();
     $('#reservationListSearch').hide();
    Swal.fire("Eliminación correcta", "Reservacion eliminada","error");
}

function updateReservation(id)
{
    var i = findReservationPositionByID(id);
    openDetailreservation();
    $("#txtIdR").val(reservations[i].idRes);
    $("#txtIdC").val(reservations[i].idCli);
    $("#txtDateR").val(reservations[i].fecha);
    $("#txtRoomR").val(reservations[i].sala);
    $("#txtreservationEstatus").val(reservations[i].estatus);
}

function findReservationPositionByID(id)
{
    var pos = -1;
    for (var i = 0; i < reservations.length; i++)
    {
        if (reservations[i].idRes === id)
        {
            pos = i;
            i = reservations.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findReservationPositionByIDCLI(idC)
{
    var pos = -1;
    for (var i = 0; i < reservations.length; i++)
    {
        if (reservations[i].idCli === idC)
        {
            pos = i;
            i = reservations.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}

function searchReservation()
{   
    var reservationdId = parseInt($("#txtIdResSearch").val());
    var reservationdIdCli = parseInt($("#txtIdCliResSearch").val());
    
    var reservationIDExist = findReservationPositionByID(reservationdId);
    var reservationIDCliExist = findReservationPositionByIDCLI(reservationdIdCli);
    

    if(reservationIDExist >= 0)
    {
         $('#reservationListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableRes= "";
            for(var i in reservations)
            if (reservations[i].idRes === reservationdId){
            
            {
         dataTableRes+="<tr>";
        dataTableRes+="<td>"+reservations[i].idRes+"</td>";
        dataTableRes+="<td>"+reservations[i].idCli+"</td>";
        dataTableRes+="<td>"+reservations[i].fecha+"</td>";
        dataTableRes+="<td>"+reservations[i].sala+"</td>";
        dataTableRes+="<td>"+reservations[i].estatus+"</td>";
       dataTableRes+="<td> <button class='btn btn-outline-danger' onclick='deleteReservation("+reservations[i].idRes+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableRes+="<td> <button class='btn btn-outline-warning' onclick='updateReservation("+reservations[i].idRes+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableRes+="</tr>";
            }
            $('#tbreservationSearch').html(dataTableRes);
            } 

    }

    else if (reservationIDCliExist >= 0)
    {
          $('#reservationListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableRes= "";
            for(var i in reservations)
            if (reservations[i].idCli === reservationdIdCli){
            
            {
        dataTableRes+="<tr>";
        dataTableRes+="<td>"+reservations[i].idRes+"</td>";
        dataTableRes+="<td>"+reservations[i].idCli+"</td>";
        dataTableRes+="<td>"+reservations[i].fecha+"</td>";
        dataTableRes+="<td>"+reservations[i].sala+"</td>";
        dataTableRes+="<td>"+reservations[i].estatus+"</td>";
       dataTableRes+="<td> <button class='btn btn-outline-danger' onclick='deleteReservation("+reservations[i].idRes+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableRes+="<td> <button class='btn btn-outline-warning' onclick='updateReservation("+reservations[i].idRes+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableRes+="</tr>";
            }
            $('#tbreservationSearch').html(dataTableRes);
            }
    }
    
    else
    {       
         $('#reservationListSearch').hide();
         Swal.fire("La reservacion no existe", "Intenta de nuevo","warning"); 
    }
    
}



