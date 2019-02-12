window.addEventListener('load', obtenerCategorias, false);
const  enviar= document.getElementsByName("enviar");

enviar[0].addEventListener('click', () => {
    obtenerPaginacion ();
    obtenerImagenes();
});

function obtenerPaginacion(){

    let categorias = document.getElementById("categorias");
    let cat_seleccionada = categorias.options[categorias.selectedIndex].id;
    let xhr= new XMLHttpRequest();
    xhr.open('GET', "https://api.thecatapi.com/v1/images/search?limit=50&category_ids="+cat_seleccionada,true);//true indica que se hace peticion asincrona
    xhr.setRequestHeader('x-api-key', 'e6674da0-82e2-4584-8daa-797f03695db4');
    xhr.responseType = 'json';//indicamos al objeto xhr que el objeto devuelto por el servidor va a ser de tipo json
    xhr.send(null);
    xhr.onreadystatechange = function(){
        // procesar la respuesta
        if (this.readyState == 4) {//this es xhr
            // todo va bien, respuesta recibida
            if (this.status == 200) {
                // Todo bien
                crearPaginacion(this);
            } else {
                console.log("error en la peticion 500, 404, etc")
            }        
        } else {
            console.log("el estado aun no es 4 (listo)");
        }
    };
 
    }

function obtenerImagenes(pagina){
   
    Number(pagina);
    pagina--;
    let categorias = document.getElementById("categorias");
    let cat_seleccionada = categorias.options[categorias.selectedIndex].id;
    let xhr= new XMLHttpRequest();
    xhr.open('GET', "https://api.thecatapi.com/v1/images/search?limit=8&page="+pagina+"&order=Desc&category_ids="+cat_seleccionada,true);//true indica que se hace peticion asincrona
    xhr.setRequestHeader('x-api-key', 'e6674da0-82e2-4584-8daa-797f03695db4');
    xhr.responseType = 'json';//indicamos al objeto xhr que el objeto devuelto por el servidor va a ser de tipo json
    xhr.send(null);
    xhr.onreadystatechange = function(){
        // procesar la respuesta
        if (this.readyState == 4) {//this es xhr
            // todo va bien, respuesta recibida
            if (this.status == 200) {
                // Todo bien
                //crearPaginacion(this);
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

function crearPaginacion (jsonObj){
    let longitud_json =jsonObj.response.length;
    let li;
    let enlace;
    let ul = document.getElementsByTagName('ul')[0];
    let li_existente = document.getElementsByTagName('li');
    let longitud_lista=li_existente.length;
    for(let i=0; i<longitud_lista;i++){
        li_existente[0].remove();
    }
    if(longitud_json%8==0){
        longitud_json--;
    }
    for(let i=1; i<=((longitud_json/8)+1); i++){
        li = document.createElement('li');
        li.setAttribute("id", "'"+i+"'");
        li.textContent=i;
        enlace = document.createElement('a');
        enlace.setAttribute("href", "#");
        enlace.appendChild(li);
        ul.appendChild(enlace);
        enlace.addEventListener('click', (e) => {
            obtenerImagenes(e.target.firstChild.textContent);
        });
    }

}

function crearImagenes(jsonObj){
    let imagenes=[];
    let url=[];
    url = jsonObj.response;
    let divAnterior = document.getElementsByTagName('div');
    if(divAnterior!=undefined){
        while(divAnterior.length!=0){
            document.body.removeChild(divAnterior[0]);
        }
        
    }
    for(let i=0; i<url.length;i++){
        let miDiv = document.createElement('div');
        imagenes[i] = document.createElement('img');
        imagenes[i].setAttribute("src", url[i]["url"]);
        miDiv.appendChild(imagenes[i]);
        let ul = document.getElementsByTagName('ul')[0];
        document.body.insertBefore(miDiv, ul); 
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