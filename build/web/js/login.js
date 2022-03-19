/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validate(){
    var user = $("#txtUser").val();
    var password = $("#txtPassword").val();
    
    if (user === "Admin" && password === "Contraseña"){
        window.location="main.html";
    }
    else{
        Swal.fire("Usuario o contraseña incorrecto", "Vuelva a intentar","error");
        $("#txtUser").val("");
        $("#txtPassword").val("");
    }
    
}
