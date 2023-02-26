var lista = document.getElementById("lista");
var data = [];

$(document).ready(function () {
  ShowSelected();
})

function eliminar() {
  let nombre = document.getElementById("nompdf").innerHTML;
  let carp = document.getElementById("carppdf").innerHTML;
  console.log(nombre + carp);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      alert('El archivo se borro ssatisfactoriamente')
      ShowSelected();
    } else if (this.status === 404) {

      alert('Ocurrio un error al borrar el archivo')
    }
  };
  xhr.open("GET", "https://protected-anchorage-08166.herokuapp.com/files/eliminar/" + nombre + "?lugar=" + carp);
  xhr.send();
}

function ShowSelected() {
  //Para obtener el valor
  var cod = document.getElementById("carpeta").value;
  //alert(cod);
  //Para obtener el texto
  var combo = document.getElementById("carpeta");
  var selected = combo.options[combo.selectedIndex].text;
  //alert(selected);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let response = JSON.parse(this.responseText);
      //console.log(response);
      let res = document.querySelector('#res');
      res.innerHTML = '';
      for (let item of response) {
        //console.log(item.name)
        res.innerHTML += `
        <tr>
          <td><p class="text-uppercase" >${item.name}</p></td>
          <td style="width: 165px;">
            <button type="button" id="btnmodal" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-name="${item.name}" data-lugar="${selected}">
              ver
            </button>
            <button type="button" id="btneliminar" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#eliminarpdf" data-name="${item.name}" data-lugar="${selected}">
              eliminar
            </button>
          </td>
        </tr>
        `
      }
    }
  };
  xhr.open("GET", "https://protected-anchorage-08166.herokuapp.com/files/all?carpeta=" + selected);
  xhr.send();
}

$(document).on("click", "#btnmodal", function () {
  var nombrepdf = $(this).data('name');
  var lugar = $(this).data('lugar');
  let mostrar = document.querySelector('#mostrarpdf');
  let titulopdf = document.querySelector('#staticBackdropLabel');
  titulopdf.innerHTML = '';
  titulopdf.innerHTML = nombrepdf;
  mostrar.innerHTML = '';
  mostrar.innerHTML = `
    <embed src="https://protected-anchorage-08166.herokuapp.com/files/ver/${nombrepdf}?lugar=${lugar}" type="application/pdf" width="100%" height="560px">
  `
});

$(document).on("click", "#btneliminar", function () {
  var nombrepdf = $(this).data('name');
  var lugar = $(this).data('lugar');
  let mostrar = document.querySelector('#avisoeliminarpdf');
  mostrar.innerHTML = '';
  mostrar.innerHTML = `
    <p>Esta seguro que desea eliminar el archivo <b><span id="nompdf">${nombrepdf}</span><span style="color: transparent; display: none;" id="carppdf">${lugar}</span></b> </p>
  `
});

function ponercarpte() {
  let folder = document.querySelector('#namecarpeta');
  var combo = document.getElementById("carpeta");
  var selected = combo.options[combo.selectedIndex].text;
  folder.innerHTML = '';
  folder.innerHTML = selected;
}

function subirarchivos() {
  const form = document.querySelector('#formularioPDF');
  const formData = new FormData(form);
  const input = document.querySelector('input[type="file"]');
  if (input.value === '') {
    alert('Debe seleccionar un archivo PDF');
  } else {
    fetch('https://protected-anchorage-08166.herokuapp.com/files/upload', {
      method: 'POST',
      body: formData
    }).then(response => {
      alert('Los archivos fueron fueron subidos correcatemente');
      ShowSelected();
      const input = document.querySelector('input[type="file"]');
      input.value = '';
    }).catch(error => {
      alert('Ocurrio un error al subir los archivos');
    });
  }
}

