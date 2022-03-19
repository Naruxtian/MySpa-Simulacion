var Rooms =[
    {
        "code":1,"num":1,"name":"Reposo","description":"Reposo para el cuerpo",
        "Photo":"sala1.jpg","route":"C:\Users\Alan Herrera M\Pictures\salas\sala1.jpg"},
    {
        "code":2,"num":3,"name":"PowerActive","description":"Activación muscular",
        "Photo":"sala2.jpg","route":"C:\Users\Alan Herrera M\Pictures\salas\sala2.jpg"},
    {
        "code":3,"num":2,"name":"Masaje","description":"Estiramiento de Huesos",
        "Photo":"sala3.jpg","route":"C:\Users\Alan Herrera M\Pictures\salas\sala3.jpg"}
];


function loadRoomModule()
{
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/salas.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopRooms(); 
                }
                );
}

//Mostrar el modulo de catalogo de salas
function openListRoom()
{
 $('#roomDetail').hide();   
 $('#roomList').show();
 $('#roomSearch').hide();
 $('#roomListSearch').hide();
}

//Mostrar el modulo de agregar salas
function openDetailRoom()
{
 $('#roomDetail').show();   
 $('#roomList').hide();
 $('#roomSearch').hide();
 $('#roomListSearch').hide();
}

//Mostrar el modulo de busqueda de salas
function openSearchRoom()
{
 $('#roomDetail').hide();   
 $('#roomList').hide();
 $('#roomSearch').show();
}

function saveRoom()
{
    var codRoom = parseInt($("#txtNRoom").val());
    var nBranch = parseInt($("#txtNBranch").val());
    var nameRoom = $("#txtNameRoom").val();
    var descriptionRoom = $("#txtDescriptionRoom").val();
    var photoRoom = $("#txtImgRoom").val();
    var routeRoom = $("#txtRouteRoom").val();
    
    if(codRoom !=="" && nBranch !=="" && nameRoom !=="" && descriptionRoom !=="" && photoRoom !=="" && routeRoom !==""){
    var posRoom = findRoomPositionByCode(codRoom);
    
    var room = {
                    "code"      :codRoom,
                    "num"       :nBranch,
                    "name"      :nameRoom,
                    "description"  :descriptionRoom,
                    "photo"    :photoRoom,
                    "route"    :routeRoom    
                  };
                  
    //Si pos es menor a 0, entonces no existe, agregar la sala
    if(posRoom < 0)
    {
        Rooms.push(room);
    }
    //Si la pos no es menor a 0, ya existe dentro del arreglo, entonces se modifica
    else
    {
        Rooms[posRoom]=room;
    }
    
    loopRooms();
    //Aqui falta enviar el objeto para que se almacene
    Swal.fire("Inserción correcta","Sala almacenada","success");
    cleanFieldsRoom();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsRoom()
{
    $("#txtNRoom").val("");
    $("#txtNBranch").val("");
    $("#txtNameRoom").val("");
    $("#txtDescriptionRoom").val("");
    $("#txtImgRoom").val("");
    $("#txtRouteRoom").val("");
}

function loopRooms()
{
    dataTableRoom= "";
    for(var i in Rooms)
    {
        dataTableRoom+="<tr>";
        dataTableRoom+="<td>"+Rooms[i].code+"</td>";
        dataTableRoom+="<td>"+Rooms[i].num+"</td>";
        dataTableRoom+="<td>"+Rooms[i].name+"</td>";
        dataTableRoom+="<td>"+Rooms[i].description+"</td>";
        dataTableRoom+="<td>"+Rooms[i].photo+"</td>";
        dataTableRoom+="<td>"+Rooms[i].route+"</td>";
        dataTableRoom+="<td> <button class='btn btn-outline-danger' onclick='deleteRoom("+Rooms[i].code+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableRoom+="<td> <button class='btn btn-outline-warning' onclick='updateRoom("+Rooms[i].code+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableRoom+="</tr>";
    }
    $('#tbRoom').html(dataTableRoom);
}

function deleteRoom(code)
{
    var i = findRoomPositionByCode(code);
    
    if (i > -1)
    {
        Rooms.splice(i,1);
    }
    loopRooms();
    $('#roomListSearch').hide();
    Swal.fire("Eliminación correcta", "Sala eliminada","error")
}

function updateRoom(code)
{
    var i = findRoomPositionByCode(code);
    openDetailRoom();
    $("#txtNRoom").val(Rooms[i].code);
    $("#txtNBranch").val(Rooms[i].num);
    $("#txtNameRoom").val(Rooms[i].name);
    $("#txtDescriptionRoom").val(Rooms[i].description);
    $("#txtImgRoom").val(Rooms[i].photo);
    $("#txtRouteRoom").val(Rooms[i].route);
}

function findRoomPositionByCode(code)
{
    var pos = -1;
    for (var i = 0; i < Rooms.length; i++)
    {
        if (Rooms[i].code === code)
        {
            pos = i;
            i = Rooms.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findRoomPositionByName(name)
{
    var pos = -1;
    for (var i = 0; i < Rooms.length; i++)
    {
        if (Rooms[i].name === name)
        {
            pos = i;
            i = Rooms.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}

function searchRoom()
{   
    var roomCode = parseInt($("#txtNRoomSearch").val());
    var roomName = $("#txtNameRoomSearch").val();
    
    var roomCodeExist = findRoomPositionByCode(roomCode);
    var roomNameExist = findRoomPositionByName(roomName);
    

    if(roomCodeExist >= 0)
    {
         $('#roomListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableRoom= "";
            for(var i in Rooms)
            if (Rooms[i].code === roomCode){
            
            {
                    dataTableRoom+="<tr>";
                    dataTableRoom+="<td>"+Rooms[i].code+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].num+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].name+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].description+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].photo+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].route+"</td>";
                    dataTableRoom+="<td> <button class='btn btn-outline-danger' onclick='deleteRoom("+Rooms[i].code+");'><i class='fas fa-times-circle'></i></button></td>";
                    dataTableRoom+="<td> <button class='btn btn-outline-warning' onclick='updateRoom("+Rooms[i].code+");'><i class='fas fa-exchange-alt'></i></button></td>";
                    dataTableRoom+="</tr>";
            }
            $('#tbRoomSearch').html(dataTableRoom);
            } 

    }

    else if (roomNameExist >= 0)
    {
          $('#roomListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableRoom= "";
            for(var i in Rooms)
            if (Rooms[i].name === roomName){
            
            {
                    dataTableRoom+="<tr>";
                    dataTableRoom+="<td>"+Rooms[i].code+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].num+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].name+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].description+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].photo+"</td>";
                    dataTableRoom+="<td>"+Rooms[i].route+"</td>";
                    dataTableRoom+="<td> <button class='btn btn-outline-danger' onclick='deleteRoom("+Rooms[i].code+");'><i class='fas fa-times-circle'></i></button></td>";
                    dataTableRoom+="<td> <button class='btn btn-outline-warning' onclick='updateRoom("+Rooms[i].code+");'><i class='fas fa-exchange-alt'></i></button></td>";
                    dataTableRoom+="</tr>";
            }
            $('#tbRoomSearch').html(dataTableRoom);
            }
    }
    
    else
    {       
         $('#roomListSearch').hide();
         Swal.fire("La sala no existe", "Intenta de nuevo","warning");  
    }
    
}

