window.addEventListener('load', obtenerCategorias, false);
const  enviar= document.getElementsByName("enviar");

enviar[0].addEventListener('click', () => {
    obtenerImagenes();
});

function obtenerImagenes(){

    let categorias = document.getElementById("categorias");
    let cat_seleccionada = categorias.options[categorias.selectedIndex].id;
    let xhr= new XMLHttpRequest();
    xhr.open('GET', "https://api.thecatapi.com/v1/images/search?category_ids="+cat_seleccionada,true);//true indica que se hace peticion asincrona
    xhr.setRequestHeader('x-api-key', 'e6674da0-82e2-4584-8daa-797f03695db4');
    xhr.responseType = 'json';//indicamos al objeto xhr que el objeto devuelto por el servidor va a ser de tipo json
    xhr.send(null);
    xhr.onreadystatechange = function(){
        // procesar la respuesta
        if (this.readyState == 4) {//this es xhr
            // todo va bien, respuesta recibida
            if (this.status == 200) {
                // Todo bien
                crearImagenes(this);
                
            } else {
                console.log("error en la peticion 500, 404, etc")
            }        
        } else {
            console.log("el estado aun no es 4 (listo)");
        }
    };
 
    }

function obtenerCategorias(){
    let xhr= new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/categorias',true);//true indica que se hace peticion asincrona
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

function crearImagenes(jsonObj){
    let imagenes=[];
    let url=[];
    url = jsonObj.response;
    for(let i=0; i<url.length;i++){
        console.log(url[i]["url"]);
        let miDiv = document.createElement('div');
        imagenes[i] = document.createElement('img');
        imagenes[i].setAttribute("src", url[i]["url"]);
        miDiv.appendChild(imagenes[i]);
        document.body.appendChild(miDiv);
    }
}

function crearSelect(jsonObj){
    let categorias = jsonObj.response;
    let select = document.getElementsByTagName("select")[0];
    let option=[];
    for(let i=0; i<categorias.length;i++){
        option[i] = document.createElement('option');
        option[i].textContent = categorias[i]["name"];
        option[i].setAttribute("id", categorias[i]["id"]);
        select.appendChild(option[i]);
    }

}