window.addEventListener('load', obtenerCategorias, false);

function obtenerCategorias(){
    let xhr= new XMLHttpRequest();
    xhr.open('GET', 'https://api.thecatapi.com/v1/categories',true);//true indica que se hace peticion asincrona
    xhr.responseType = 'json';//indicamos al objeto xhr que el objeto devuelto por el servidor va a ser de tipo json
    xhr.send(null);
    xhr.onreadystatechange = function(){
        // procesar la respuesta
        if (this.readyState == 4) {//this es xhr
            // todo va bien, respuesta recibida
            if (this.status == 200) {
                // Todo bien
                crearSelect(this);
                
            } else {
                console.log("error en la peticion 500, 404, etc")
            }        
        } else {
            console.log("el estado aun no es 4 (listo)");
        }
    };

}

function crearSelect(jsonObj){
    let categorias = jsonObj.response;
    let select = document.getElementsByTagName("select")[0];
    let option=[];
    for(let i=0; i<categorias.length;i++){
        option[i] = document.createElement('option');
        option[i].textContent = categorias[i]["name"];
        select.appendChild(option[i]);
    }

}