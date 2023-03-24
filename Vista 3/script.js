window.onload = (event) => {
    traerData()
    let LocalCache = []
    LocalCache = JSON.parse(localStorage.getItem('datos'));
        if(LocalCache.length > 0){
            resultForm = LocalCache
            console.log(resultForm);
        }
    
  };




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

let localDelete = []

let form = document.getElementById('formulario');

let tablageneral = document.getElementById('tablageneral');

let contBoton = document.getElementById('contenedoractualizar')
let inputrut = document.getElementById('rut')
let inputnombre = document.getElementById('nombre')
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
    if(color.value==''){
        error++
    }

    if(error == 0){
        resultForm.push(resultados)
        localStorage.setItem('datos', JSON.stringify(resultForm))
        traerData()
        limpiarCampos()

    }
    else{
        Toastify({
            text: "Rellena todos los campos",
            duration: 2500,
            style: {
                background: "orange",
              },
            close: true
            }).showToast();
    }
})


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

    document.getElementById("botonact").style.display="block";

    let formatotabla = ''

    formatotabla = `<table id="myTable" class="tabla">
    <thead>
        <th>Nombre</th>
        <th>Rut</th>
        <th>Patente</th>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Color</th>
        <th>Eliminar</th>
        <th>Editar</th>
    </thead>
    <tbody id="table">`

    dataLS.forEach((item, index)=> {
        formatotabla += `
        <tr>
        <td>${item.nombre}</td>
        <td>${item.rut}</td>
        <td>${item.patente}</td>
        <td>${item.marca}</td>
        <td>${item.modelo}</td>
        <td>${item.color}</td>
        <td>
        <button type="button" id="botonform" class="" onclick="editarReg(${index})">
        Editar
        </button>
        </td>
        <td>
        <button type="button" id="botonform" class="" onclick="eliminarReg(${index})">
        Eliminar
        </button>
        </td>
    </tr>`
    })

    formatotabla += `</tbody>
    </table>`

    tablageneral.innerHTML = formatotabla

    let table = new DataTable('#myTable', {
    
    });

}

function eliminarReg(idreg) {

    dataLS.splice(idreg,1)

    localStorage.setItem('datos', JSON.stringify(dataLS))
    console.log(localDelete);
    localDelete = JSON.parse(localStorage.getItem('datos'));
    resultForm = localDelete
    console.log(resultForm);
    traerData()

}


function editarReg(idreg) {

    document.getElementById("botonform").style.display="none";

    let seleccion = dataLS[idreg];

    patenteInput.value = seleccion.patente
    marcaSelect.value = seleccion.marca
    inputnombre.value = seleccion.nombre
    colorSelect.value = seleccion.color
    inputrut.value = seleccion.rut
    cargarModelosVeh()
    modeloSelect.value = seleccion.modelo

    let formatoboton = ''

    formatoboton = `<button type="button" id="botonAct" class="boton padding-btn" onclick="editdelete(${idreg})">
                    Actualizar
                    </button>`

    contBoton.innerHTML = formatoboton
    

}

function editdelete(idreg) {

    dataLS.splice(idreg,1)
    console.log("Splice",dataLS);

    let resultados = {
        nombre: nombre.value,
        rut: rut.value,
        patente: patente.value,
        marca: marca.value,
        modelo: modelo.value,
        color: color.value
    }

    console.log(resultados);
    
    dataLS.push(resultados)

    console.log(dataLS);

    localStorage.setItem('datos', JSON.stringify(dataLS))

    traerData()
    document.getElementById("botonform").style.display="block";
    document.getElementById("botonAct").style.display="none";
    limpiarCampos()

}


function limpiarCampos() {
    console.log("Limpiando");
    patenteInput.value = "";
    marcaSelect.value = "";
    inputnombre.value = "";
    colorSelect.value = "";
    inputrut.value = "";
    modeloSelect.value = "";
}


function log(){
    console.log("😎😋");
}



