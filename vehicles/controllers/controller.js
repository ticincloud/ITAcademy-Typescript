"use strict";
var cars = [];
var arrM = new Array('inputMR1', 'inputMR2', 'inputMR3', 'inputMR4');
var arrD = new Array('inputDR1', 'inputDR2', 'inputDR3', 'inputDR4');
var arrEM = new Array('errorMR1', 'errorMR2', 'errorMR3', 'errorMR4');
var arrED = new Array('errorDR1', 'errorDR2', 'errorDR3', 'errorDR4');
//afegeix inicialment un parell de cotxes a la llista
// i asigna funcion els events d'inici dels modals
function inici() {
    var c1 = new Car('1234ert', 'Renault', 'Red');
    var r1 = new Wheel(1, 'Michelin');
    c1.addWheel(r1);
    c1.addWheel(r1);
    c1.addWheel(r1);
    c1.addWheel(r1);
    cars.push(c1);
    c1 = new Car('222erf', 'Seat', 'Green');
    r1 = new Wheel(2, 'Goodyear');
    c1.addWheel(r1);
    c1.addWheel(r1);
    c1.addWheel(r1);
    c1.addWheel(r1);
    cars.push(c1);
    showCars();
    $('#carModal').on('show.bs.modal', function () {
        resetFrmCar();
    });
    $('#rodesModal').on('show.bs.modal', function () {
        resetFrmRodes();
    });
}
//posa valors incials el formulari del cotxe
function resetFrmCar() {
    document.getElementById('inputPlate').value = '';
    document.getElementById('inputBrand').value = '';
    document.getElementById('inputColor').value = '';
    document.getElementById('formCar').classList.remove('is-invalid');
    document.getElementById('inputPlate').classList.remove('is-invalid');
    document.getElementById('inputBrand').classList.remove('is-invalid');
    document.getElementById('inputColor').classList.remove('is-invalid');
}
//posa valors incials el formulari de les rodes
function resetFrmRodes() {
    var _a;
    for (var i = 0; i < 4; i++) {
        document.getElementById(arrM[i]).value = "";
        document.getElementById(arrD[i]).value = "0.4";
        (_a = document.getElementById(arrEM[i])) === null || _a === void 0 ? void 0 : _a.classList.remove('is-invalid');
    }
}
//validació del formulari del cotxe
function carValidate() {
    var acumErrores = 0;
    var inputPlate = document.getElementById("inputPlate");
    var inputBrand = document.getElementById("inputBrand");
    var inputColor = document.getElementById("inputColor");
    if ((inputPlate === null || inputPlate === void 0 ? void 0 : inputPlate.value) == "") {
        inputPlate.classList.add("is-invalid");
        document.getElementById("errorPlate").textContent = "Camp obligatori";
        acumErrores++;
    }
    else if (!validarPlate(inputPlate.value)) {
        inputPlate.classList.add("is-invalid");
        document.getElementById("errorPlate").textContent = "Matrícula incorrecte";
        acumErrores++;
    }
    if (inputBrand.value == "") {
        inputBrand.classList.add("is-invalid");
        document.getElementById("errorBrand").textContent = "Camp obligatori";
        acumErrores++;
    }
    if (inputColor.value == "") {
        inputColor.classList.add("is-invalid");
        document.getElementById("errorColor").textContent = "Camp obligatori";
        acumErrores++;
    }
    if (acumErrores > 0) {
        return false;
    }
    else {
        $('#carModal').modal('hide');
        addCar(inputPlate.value, inputBrand.value, inputColor.value);
        $('#rodesModal').modal('show');
        //showCars();
        return false;
    }
}
//validació del formulari de les rodes
function rodesValidate() {
    var acumErrores = 0;
    for (var i = 0; i < 4; i++) {
        var inputM = document.getElementById(arrM[i]);
        //var inputM = document.forms["formRodes"][arrM[i]];
        if (inputM.value == "") {
            inputM.classList.add("is-invalid");
            document.getElementById(arrEM[i]).textContent = "Camp obligatori";
            acumErrores++;
        }
    }
    for (i = 0; i < 4; i++) {
        var inputD = document.getElementById(arrD[i]);
        if (inputD.value == "") {
            inputD.classList.add("is-invalid");
            document.getElementById(arrED[i]).textContent = "Camp obligatori";
            acumErrores++;
        }
    }
    if (acumErrores > 0) {
        return false;
    }
    else {
        $('#rodesModal').modal('hide');
        for (i = 0; i < 4; i++) {
            inputM = document.getElementById(arrM[i]);
            inputD = document.getElementById(arrD[i]);
            addRoda(cars.length - 1, Number(inputD.value), inputM.value);
        }
        showCars();
        return false;
    }
}
//afegeix el nou cotxe a la llista
function addCar(plate, brand, color) {
    cars.push(new Car(plate, brand, color));
}
//afegeix una roda el cotxe
function addRoda(id, dr, mr) {
    cars[id].addWheel(new Wheel(dr, mr));
}
//mostra tots els cotxes 
function showCars() {
    var body = document.getElementById('bdcars');
    var html;
    var id = 1;
    body.innerHTML = '';
    for (var _i = 0, cars_1 = cars; _i < cars_1.length; _i++) {
        var car = cars_1[_i];
        html = '<tr><th scope="row">' + id + '</th><td>'
            + car.plate + '</td>'
            + '<td>' + car.color + '</td>'
            + '<td>' + car.brand + '</td>'
            + '<td>' + car.wheels[0].brand + '</td>'
            + '<td>' + car.wheels[0].diameter + '</td>'
            + '<td>' + car.wheels[1].brand + '</td>'
            + '<td>' + car.wheels[1].diameter + '</td>'
            + '<td>' + car.wheels[2].brand + '</td>'
            + '<td>' + car.wheels[2].diameter + '</td>'
            + '<td>' + car.wheels[3].brand + '</td>'
            + '<td>' + car.wheels[3].diameter + '</td>'
            + '</tr>';
        body === null || body === void 0 ? void 0 : body.insertAdjacentHTML('beforeend', html);
        id++;
    }
}
//validar la matrícula
function validarPlate(plate) {
    var regex = /^[0-9]{4}(?!.*(LL|CH))[ABCDEFGHIJKLMNOPRSTVWXYZ]{3}/;
    return regex.test(plate) ? true : false;
}
/*function createCar(plate:string,brand:string,color:string){
    let car=new Car(plate,color,brand);
    car.addWheel(new Wheel(2,"SEAT"));
    document.body.innerText="CAR: PLATE: " + car.plate
    + " COLOR: " +car.color + " BRAND: " + brand
    + " WHEELS: " + JSON.stringify(car.wheels);
}*/
