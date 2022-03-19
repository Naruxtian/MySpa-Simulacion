/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(main);

var contador = 1;
var contador2 = 0;

function main() {
    $('#btndespegable').click(function () {
        if (contador == 1) {
            $('#navMenu').animate({
                right: '22%'
            });
            contador = 0;
        } else {
            contador = 1;
            $('#navMenu').animate({
                right: '-100%'
            });
        }
    });

    $('.btnmodulo').click(function () {
        if (contador2 == 1) {
            $('#navMenu').animate({
                right: '10%'
            });
            contador2 = 1;
        } else {
            contador2 = 0;
            contador = 1;
            $('#navMenu').animate({
                right: '-100%'
            });
        }
    });
}
;