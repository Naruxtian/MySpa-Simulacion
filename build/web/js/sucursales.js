var branches =[
    {
        "num":1,"name":"Delta",
        "latitude":"21.097014","length":"-101.615791"},
    {
        "num":2,"name":"Centro max",
        "latitude":"21.100762","length":"-101.638189"},
    {
        "num":3,"name":"Plaza galerias",
        "latitude":"21.147369","length":"-101.649047"}
];


function loadBranchModule()
{
    $.ajax(
            {
                "type":"GET",
                "url":"modulos/sucursales.html",
                "async":true
            }
          ).done(
                function(data)
                {
                  $('#principalSection').html(data);
                  loopBranches(); 
                }
                );
}

//Mostrar el modulo de catalogo de sucursales
function openListBranch()
{
 $('#branchDetail').hide();   
 $('#branchList').show();
 $('#branchSearch').hide();
 $('#branchListSearch').hide();
}

//Mostrar el modulo de agregar sucursales
function openDetailBranch()
{
 $('#branchDetail').show();   
 $('#branchList').hide();
 $('#branchSearch').hide();
 $('#branchListSearch').hide();
}

//Mostrar el modulo de busqueda de sucursales
function openSearchBranch()
{
 $('#branchDetail').hide();   
 $('#branchList').hide();
 $('#branchSearch').show();
}

function saveBranch()
{
    var nBranch = parseInt($("#txtNBranch").val());
    var nameBranch = $("#txtNameBranch").val();
    var LatitBranch = $("#txtLatitBranch").val();
    var longitBranch = $("#txtLongitBranch").val();
    
    if(nBranch !=="" && nameBranch !=="" && LatitBranch !=="" && longitBranch !==""){
    var posBranch = findBranchPositionByNum(nBranch);
    
    var branch = {
                    "num"       :nBranch,
                    "name"      :nameBranch,
                    "latitude"  :LatitBranch,
                    "length"    :longitBranch
                  };
                  
    //Si pos es menor a 0, entonces no existe, agregar el producto
    if(posBranch < 0)
    {
        branches.push(branch);
    }
    //Si la pos no es menor a 0, ya existe dentro del arreglo, entonces se modifica
    else
    {
        branches[posBranch]=branch;
    }
    
    loopBranches();
    Swal.fire("Inserción correcta","Sucursal almacenada","success");
    cleanFieldsBranch();
    }
    else{
        Swal.fire("Hacen falta datos para el registro"," ","warning");
    }      
}

function cleanFieldsBranch()
{
    $("#txtNBranch").val("");
    $("#txtNameBranch").val("");
    $("#txtLatitBranch").val("");
    $("#txtLongitBranch").val("");
}

function loopBranches()
{
    dataTableBranch= "";
    for(var i in branches)
    {
        dataTableBranch+="<tr>";
        dataTableBranch+="<td>"+branches[i].num+"</td>";
        dataTableBranch+="<td>"+branches[i].name+"</td>";
        dataTableBranch+="<td>"+branches[i].latitude+"</td>";
        dataTableBranch+="<td>"+branches[i].length+"</td>";
        dataTableBranch+="<td> <button class='btn btn-outline-danger' onclick='deleteBranch("+branches[i].num+");'><i class='fas fa-times-circle'></i></button></td>";
        dataTableBranch+="<td> <button class='btn btn-outline-warning' onclick='updateBranch("+branches[i].num+");'><i class='fas fa-exchange-alt'></i></button></td>";
        dataTableBranch+="</tr>";
    }
    $('#tbBranch').html(dataTableBranch);
}

function deleteBranch(num)
{
    var i = findBranchPositionByNum(num);
    
    if (i > -1)
    {
        branches.splice(i,1);
    }
    loopBranches();
     $('#branchListSearch').hide();
    Swal.fire("Elminición correcta", "Sucursal eliminado","error")
}

function updateBranch(num)
{
    var i = findBranchPositionByNum(num);
    openDetailBranch();
    $("#txtNBranch").val(branches[i].num);
    $("#txtNameBranch").val(branches[i].name);
    $("#txtLatitBranch").val(branches[i].latitude);
    $("#txtLongitBranch").val(branches[i].length);
}

function findBranchPositionByNum(num)
{
    var pos = -1;
    for (var i = 0; i < branches.length; i++)
    {
        if (branches[i].num === num)
        {
            pos = i;
            i = branches.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}
function findBranchPositionByName(name)
{
    var pos = -1;
    for (var i = 0; i < branches.length; i++)
    {
        if (branches[i].name === name)
        {
            pos = i;
            i = branches.length + 1; //Para romper el ciclo for
        }
    }
    return pos;
}

function searchBranch()
{   
    var branchNum = parseInt($("#txtNBranchSearch").val());
    var branchName = $("#txtNameBranchSearch").val();
    
    var branchNumExist = findBranchPositionByNum(branchNum);
    var branchNameExist = findBranchPositionByName(branchName);
    

    if(branchNumExist >= 0)
    {
         $('#branchListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableBranch= "";
            for(var i in branches)
            if (branches[i].num === branchNum){
            
            {
                    dataTableBranch+="<tr>";
                    dataTableBranch+="<td>"+branches[i].num+"</td>";
                    dataTableBranch+="<td>"+branches[i].name+"</td>";
                    dataTableBranch+="<td>"+branches[i].latitude+"</td>";
                    dataTableBranch+="<td>"+branches[i].length+"</td>";
                    dataTableBranch+="<td> <button class='btn btn-outline-danger' onclick='deleteProduct("+branches[i].num+");'><i class='fas fa-times-circle'></i></button></td>";
                    dataTableBranch+="<td> <button class='btn btn-outline-warning' onclick='updateProduct("+branches[i].num+");'><i class='fas fa-exchange-alt'></i></button></td>";
                    dataTableBranch+="</tr>";
            }
            $('#tbBranchSearch').html(dataTableBranch);
            } 

    }

    else if (branchNameExist >= 0)
    {
          $('#branchListSearch').show();
            Swal.fire("Busqueda exitosa", " ","info");
            dataTableBranch= "";
            for(var i in branches)
            if (branches[i].name === branchName){
            
            {
                    dataTableBranch+="<tr>";
                    dataTableBranch+="<td>"+branches[i].num+"</td>";
                    dataTableBranch+="<td>"+branches[i].name+"</td>";
                    dataTableBranch+="<td>"+branches[i].latitude+"</td>";
                    dataTableBranch+="<td>"+branches[i].length+"</td>";
                    dataTableBranch+="<td> <button class='btn btn-outline-danger' onclick='deleteProduct("+branches[i].num+");'><i class='fas fa-times-circle'></i></button></td>";
                    dataTableBranch+="<td> <button class='btn btn-outline-warning' onclick='updateProduct("+branches[i].num+");'><i class='fas fa-exchange-alt'></i></button></td>";
                    dataTableBranch+="</tr>";
            }
            $('#tbBranchSearch').html(dataTableBranch);
            }
    }
    
    else
    {       
         $('#branchListSearch').hide();
         Swal.fire("La sucursal no existe", "Intenta de nuevo","warning");  
    }
    
}