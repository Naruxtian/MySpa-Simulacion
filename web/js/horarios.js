var Schedules =[
    {
        "code":1,"start":"01:30","end":"02:30"},
    {
        "code":2,"start":"03:30","end":"04:30"},
    {
        "code":3,"start":"05:30","end":"06:30"}
];


function loadScheduleModule()
{
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/horarios.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopSchedules(); 
                }
                );
}

//Mostrar el modulo de catalogo de horarios
function openListSchedule()
{
 $('#scheduleDetail').hide();   
 $('#scheduleList').show();
 $('#scheduleSearch').hide();
 $('#scheduleListSearch').hide();
}

//Mostrar el modulo de agregar horarios
function openDetailSchedule()
{
 $('#scheduleDetail').show();   
 $('#scheduleList').hide();
 $('#scheduleSearch').hide();
 $('#scheduleListSearch').hide();
}

//Mostrar el modulo de busqueda de horarios
function openSearchSchedule()
{
 $('#scheduleDetail').hide();   
 $('#scheduleList').hide();
 $('#scheduleSearch').show();
}

function saveSchedule()
{
    var codSchedule = parseInt($("#txtNSchedule").val());
    var startSchedule = $("#txtStartTime").val();
    var endSchedule = $("#txtEndTime").val();
    
    if(codSchedule !=="" && startSchedule !=="" && endSchedule !==""){
    var posSchedule = findSchedulePositionByCode(codSchedule);
    
    var schedule = {
                    "code" :codSchedule,
                    "start":startSchedule,
                    "end"  :endSchedule
                  };
                  
    //Si pos es menor a 0, entonces no existe, agregar la horario
    if(posSchedule < 0)
    {
        Schedules.push(schedule);
    }
    //Si la pos no es menor a 0, ya existe dentro del arreglo, entonces se modifica
    else
    {
        Schedules[posSchedule]=schedule;
    }
    
    loopSchedules();
    //Aqui falta enviar el objeto para que se almacene
    Swal.fire("Inserción correcta","Horario almacenado","success");
    cleanFieldsSchedule();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsSchedule()
{
    $("#txtNSchedule").val("");
    $("#txtStartTime").val("");
    $("#txtEndTime").val("");
}

function loopSchedules()
{
    dataTableSchedule= "";
    for(var i in Schedules)
    {
        dataTableSchedule+="<tr>";
        dataTableSchedule+="<td>"+Schedules[i].code+"</td>";
        dataTableSchedule+="<td>"+Schedules[i].start+"</td>";
        dataTableSchedule+="<td>"+Schedules[i].end+"</td>";
        dataTableSchedule+="<td> <button class='btn btn-outline-danger' onclick='deleteSchedule("+Schedules[i].code+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableSchedule+="<td> <button class='btn btn-outline-warning' onclick='updateSchedule("+Schedules[i].code+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableSchedule+="</tr>";
    }
    $('#tbSchedule').html(dataTableSchedule);
}

function deleteSchedule(code)
{
    var i = findSchedulePositionByCode(code);
    
    if (i > -1)
    {
        Schedules.splice(i,1);
    }
    loopSchedules();
    $('#scheduleListSearch').hide();
    Swal.fire("Eliminación correcta", "Horario eliminado","error")
}

function updateSchedule(code)
{
    var i = findSchedulePositionByCode(code);
    openDetailSchedule();
    $("#txtNSchedule").val(Schedules[i].code);
    $("#txtStartTime").val(Schedules[i].start);
    $("#txtEndTime").val(Schedules[i].end);
}

function findSchedulePositionByCode(code)
{
    var pos = -1;
    for (var i = 0; i < Schedules.length; i++)
    {
        if (Schedules[i].code === code)
        {
            pos = i;
            i = Schedules.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findSchedulePositionByTimeStart(start)
{
    var pos = -1;
    for (var i = 0; i < Schedules.length; i++)
    {
        if (Schedules[i].start === start)
        {
            pos = i;
            i = Schedules.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findSchedulePositionByTimeEnd(end)
{
    var pos = -1;
    for (var i = 0; i < Schedules.length; i++)
    {
        if (Schedules[i].end === end)
        {
            pos = i;
            i = Schedules.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}

function searchSchedule()
{   
    var scheduleCode = parseInt($("#txtNScheduleSearch").val());
    var scheduleStartTime = $("#txtStartTimeSearch").val();
    var scheduleEndTime = $("#txtEndTimeSearch").val();
    
    var scheduleCodeExist = findSchedulePositionByCode(scheduleCode);
    var scheduleStartTimeExist = findSchedulePositionByTimeStart(scheduleStartTime);
    var scheduleEndTimeExist = findSchedulePositionByTimeEnd(scheduleEndTime);

    if(scheduleCodeExist >= 0)
    {
         $('#scheduleListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableSchedule= "";
            for(var i in Schedules)
            if (Schedules[i].code === scheduleCode){
            
            {
                    dataTableSchedule+="<tr>";
                    dataTableSchedule+="<td>"+Schedules[i].code+"</td>";
                    dataTableSchedule+="<td>"+Schedules[i].start+"</td>";
                    dataTableSchedule+="<td>"+Schedules[i].end+"</td>";
                    dataTableSchedule+="<td> <button class='btn btn-outline-danger' onclick='deleteSchedule("+Schedules[i].code+");'><i class='fas fa-times-circle'></i></button></td>";
                    dataTableSchedule+="<td> <button class='btn btn-outline-warning' onclick='updateSchedule("+Schedules[i].code+");'><i class='fas fa-exchange-alt'></i></button></td>";
                    dataTableSchedule+="</tr>";
            }
            $('#tbScheduleSearch').html(dataTableSchedule);
            } 

    }

    else if (scheduleStartTimeExist >= 0)
    {
          $('#scheduleListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableSchedule= "";
            for(var i in Schedules)
            if (Schedules[i].start === scheduleStartTime){
            
            {
                    dataTableSchedule+="<tr>";
                    dataTableSchedule+="<td>"+Schedules[i].code+"</td>";
                    dataTableSchedule+="<td>"+Schedules[i].start+"</td>";
                    dataTableSchedule+="<td>"+Schedules[i].end+"</td>";
                    dataTableSchedule+="<td> <button class='btn btn-outline-danger' onclick='deleteSchedule("+Schedules[i].code+");'><i class='fas fa-times-circle'></i></button></td>";
                    dataTableSchedule+="<td> <button class='btn btn-outline-warning' onclick='updateSchedule("+Schedules[i].code+");'><i class='fas fa-exchange-alt'></i></button></td>";
                    dataTableSchedule+="</tr>";
            }
            $('#tbScheduleSearch').html(dataTableSchedule);
            }
    }
    
    else if (scheduleEndTimeExist >= 0)
    {
          $('#scheduleListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableSchedule= "";
            for(var i in Schedules)
            if (Schedules[i].end === scheduleEndTime){
            
            {
                    dataTableSchedule+="<tr>";
                    dataTableSchedule+="<td>"+Schedules[i].code+"</td>";
                    dataTableSchedule+="<td>"+Schedules[i].start+"</td>";
                    dataTableSchedule+="<td>"+Schedules[i].end+"</td>";
                    dataTableSchedule+="<td> <button class='btn btn-outline-danger' onclick='deleteSchedule("+Schedules[i].code+");'><i class='fas fa-times-circle'></i></button></td>";
                    dataTableSchedule+="<td> <button class='btn btn-outline-warning' onclick='updateSchedule("+Schedules[i].code+");'><i class='fas fa-exchange-alt'></i></button></td>";
                    dataTableSchedule+="</tr>";
            }
            $('#tbScheduleSearch').html(dataTableSchedule);
            }
    }
    
    else
    {       
         $('#scheduleListSearch').hide();
         Swal.fire("El horario no existe", "Intenta de nuevo","warning");  
    }
    
}

