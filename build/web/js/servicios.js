var services = [
    {
        "id":1, "date":"2021-05-15", "time":"19:00", "reservation":2, 
        "employee":"10", "treatment":"Aromaterapia", "products":"Aromatizante de rosas"},
    {
        "id":2, "date":"2021-05-18", "time":"15:10", "reservation":3,
        "employee":"8", "treatment":"Masaje de conchas", "products":"Aceite de coco"}
];

function loadServiceModule()
{
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/servicios.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopServices(); 
                }
                );
}

//Mostrar el modulo de catalogo de sucursales
function openListService()
{
 $('#serviceDetail').hide();   
 $('#serviceList').show();
 $('#serviceSearch').hide();
 $('#serviceListSearch').hide();
}

//Mostrar el modulo de agregar sucursales
function openDetailService()
{
 $('#serviceDetail').show();   
 $('#serviceList').hide();
 $('#serviceSearch').hide();
 $('#serviceListSearch').hide();
}

//Mostrar el modulo de busqueda de sucursales
function openSearchService()
{
 $('#serviceDetail').hide();   
 $('#serviceList').hide();
 $('#serviceSearch').show();
}

function saveService()
{
    var idService = parseInt($("#txtIdService").val());
    var dateService = $("#txtDateService").val();
    var timeService = $("#txtTimeService").val();
    var reservService = parseInt($("#txtReservService").val());
    var empleoyeService = $("#txtEmployeService").val();
    var tratService = $("#txtTratService").val();
    var productService = $("#txtProductService").val();
    
    
    if(idService !=="" && dateService !=="" && timeService !=="" && reservService !=="" && empleoyeService !==""){
    var posService = findServicePositionById(idService);
    
    var service = {
                    "id"            :idService,
                    "date"          :dateService,
                    "time"          :timeService,
                    "reservation"   :reservService,
                    "employee"      :empleoyeService,
                    "treatment"     :tratService,
                    "products"      :productService
                    
                  };
                  
    //Si pos es menor a 0, entonces no existe, agregar el producto
    if(posService < 0)
    {
        services.push(service);
    }
    //Si la pos no es menor a 0, ya existe dentro del arreglo, entonces se modifica
    else
    {
        services[posService]=service;
    }
    
    loopServices();
    Swal.fire("Inserción correcta","Servicio almacenada","success");
    clearFieldsServices();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function clearFieldsServices()
{
    $("#txtIdService").val("");
    $("#txtDateService").val("");
    $("#txtTimeService").val("");
    $("#txtReservService").val("");
    $("#txtEmployeService").val("");
    $("#txtTratService").val("");
    $("#txtProductService").val("");
}

function loopServices()
{
    dataTableService= "";
    for(var i in services)
    {
        dataTableService+="<tr>";
        dataTableService+="<td>"+services[i].id+"</td>";
        dataTableService+="<td>"+services[i].date+"</td>";
        dataTableService+="<td>"+services[i].time+"</td>";
        dataTableService+="<td>"+services[i].reservation+"</td>";
        dataTableService+="<td>"+services[i].employee+"</td>";
        dataTableService+="<td>"+services[i].treatment+"</td>";
        dataTableService+="<td>"+services[i].products+"</td>";
        dataTableService+="<td> <button class='btn btn-outline-danger' onclick='deleteService("+services[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableService+="<td> <button class='btn btn-outline-warning' onclick='updateService("+services[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableService+="</tr>";
    }
    $('#tbService').html(dataTableService);
}

function deleteService(id)
{
    var i = findServicePositionById(id);
    
    if (i > -1)
    {
        services.splice(i,1);
    }
    loopServices();
 $('#serviceListSearch').hide();
    Swal.fire("Elminición correcta", "Servicio eliminado","error");
}

function updateService(id)
{   
    var i = findServicePositionById(id);
    openDetailService();
    $("#txtIdService").val(services[i].id);
    $("#txtDateService").val(services[i].date);
    $("#txtTimeService").val(services[i].time);
    $("#txtReservService").val(services[i].reservation);
    $("#txtEmployeService").val(services[i].employee);
    $("#txtTratService").val(services[i].treatment);
    $("#txtProductService").val(services[i].products);
}

function findServicePositionById(id)
{
    var pos = -1;
    for (var i = 0; i < services.length; i++)
    {
        if (services[i].id === id)
        {
            pos = i;
            i = services.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findServicePositionByReservation(reservation)
{
    var pos = -1;
    for (var i = 0; i < services.length; i++)
    {
        if (services[i].reservation === reservation)
        {
            pos = i;
            i = services.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}

function searchService()
{   
    var serviceId = parseInt($("#txtIdServiceSearch").val());
    var serviceReservation = parseInt($("#txtReservServiceSearch").val());
    
    var serviceIdExist = findServicePositionById(serviceId);
    var serviceReservationExist = findServicePositionByReservation(serviceReservation);
    

    if(serviceIdExist >= 0)
    {
         $('#serviceListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableService= "";
            for(var i in services)
            if (services[i].id === serviceId){
            
            {
                dataTableService+="<tr>";
                dataTableService+="<td>"+services[i].id+"</td>";
                dataTableService+="<td>"+services[i].date+"</td>";
                dataTableService+="<td>"+services[i].time+"</td>";
                dataTableService+="<td>"+services[i].reservation+"</td>";
                dataTableService+="<td>"+services[i].employee+"</td>";
                dataTableService+="<td>"+services[i].treatment+"</td>";
                dataTableService+="<td>"+services[i].products+"</td>";
                dataTableService+="<td> <button class='btn btn-outline-danger' onclick='deleteService("+services[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableService+="<td> <button class='btn btn-outline-warning' onclick='updateService("+services[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableService+="</tr>";
            }
            $('#tbServiceSearch').html(dataTableService);
            } 

    }

    else if (serviceReservationExist >= 0)
    {
          $('#serviceListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableService= "";
            for(var i in services)
            if (services[i].reservation === serviceReservation){
            
            {
                dataTableService+="<tr>";
                dataTableService+="<td>"+services[i].id+"</td>";
                dataTableService+="<td>"+services[i].date+"</td>";
                dataTableService+="<td>"+services[i].time+"</td>";
                dataTableService+="<td>"+services[i].reservation+"</td>";
                dataTableService+="<td>"+services[i].employee+"</td>";
                dataTableService+="<td>"+services[i].treatment+"</td>";
                dataTableService+="<td>"+services[i].products+"</td>";
                dataTableService+="<td> <button class='btn btn-outline-danger' onclick='deleteService("+services[i].id+");'><i class='fas fa-times-circle'></i></button></td>";
                dataTableService+="<td> <button class='btn btn-outline-warning' onclick='updateService("+services[i].id+");'><i class='fas fa-exchange-alt'></i></button></td>";
                dataTableService+="</tr>";
            }
            $('#tbServiceSearch').html(dataTableService);
            } 
    }
    
    else
    {       
         $('#serviceListSearch').hide();
         Swal.fire("El servicio no existe", "Intenta de nuevo","warning");  
    }
    
}