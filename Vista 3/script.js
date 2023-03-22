
let marcaVeh = [
    {id:1, name:"Suzuki"},
    {id:2, name:"Subaru"}
]

let modeloVeh = [
    {id:1, name:"Swift",idMarca:1},
    {id:2, name:"Baleno",idMarca:1},
    {id:3, name:"Impreza",idMarca:2},
    {id:4, name:"Forester",idMarca:2},
]

let colorVeh = [
    {id:1, name:"Negro"},
    {id:2, name:"Blanco"},
    {id:3, name:"Rojo"},
    {id:4, name:"Verde"},
]

let resultForm = []

let dataLS = []

let form = document.getElementById('formulario');


let datatable = document.getElementById('table');
let boton = document.getElementById('botonform');
let patenteInput = document.getElementById('patente');
let marcaSelect = document.getElementById('marca');
let modeloSelect = document.getElementById('modelo');
let colorSelect = document.getElementById('color');


marcaSelect.addEventListener("change", cargarModelosVeh)

//Carga marcas segun arreglo
marcaVeh.forEach(function(marca){
    let opcion = document.createElement('option')
    opcion.value = marca.id
    opcion.text = marca.name
    marcaSelect.add(opcion)
})

//Cargar colores segun arreglo
colorVeh.forEach(function(color){
    let opcion = document.createElement('option')
    opcion.value = color.id
    opcion.text = color.name
    colorSelect.add(opcion)
})

//Carga modelos segun id de marca
function cargarModelosVeh(){
    modelo.disabled = false;
    color.disabled = false;
    modeloSelect.options.length = 1;
    modeloVeh.filter(function (modeloVeh ){
        return modeloVeh.idMarca == this;
}, marcaSelect.value)
.forEach(function(modeloVeh){
    let opcion = document.createElement('option')
    opcion.value = modeloVeh.id
    opcion.text = modeloVeh.name
    modeloSelect.add(opcion);
});
}

boton.addEventListener("click", function(e){

    let error = 0

    //agregarle a resultados un id numerico que sume +1

    let resultados = {
        nombre: nombre.value,
        rut: rut.value,
        patente: patente.value,
        marca: marca.value,
        modelo: modelo.value,
        color: color.value
    }

    if(nombre.value==''){
        error++
    }
    if(rut.value==''){
        error++
    }
    if(patente.value==''){
        error++
    }

    if(error == 0){
        resultForm.push(resultados)
        localStorage.setItem('datos', JSON.stringify(resultForm))

    }
    else{
        Toastify({
            text: "ERROR else",
            duration: 2500,
            style: {
                background: "red",
              },
            close: true
            }).showToast();
    }
})

function limpiarlocal() {
    localStorage.removeItem('datos');
    console.log(localStorage);
}

// input de patente patenteInput

let caracPatentes = []

const formatPatente = () => {
    if(patenteInput.text != ''){
        caracPatentes = patenteInput.value.split('')
        caracPatentes.splice(2,0, '-')
        caracPatentes.splice(5,0, '-')
        patenteInput.value = caracPatentes.join(('')).toUpperCase();
    }
}

function traerData() {
    dataLS = JSON.parse(localStorage.getItem('datos'));
    console.log(dataLS);
    let formatotabla = ''

    dataLS.forEach((item)=> {
        formatotabla += `<tr>
        <button id="1" onclick="eliminarReg(this.id)">Eliminar</button>
        <button onclick="editarReg()">Editar</button>

        <td>${item.nombre}</td>
        <td>${item.rut}</td>
        <td>${item.patente}</td>
        <td>${item.marca}</td>
        <td>${item.modelo}</td>
        <td>${item.color}</td>
    </tr>`
    })
    datatable.innerHTML = formatotabla
}

function eliminarReg(idreg) {
    console.log(idreg);
}

function editarReg() {
    console.log("Editar");
}


