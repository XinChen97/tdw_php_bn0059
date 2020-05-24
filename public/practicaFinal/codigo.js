function personTable(){

    var table = document.getElementById("personTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    table.appendChild(tbody);
    var j=0;
    let target =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": target},
        dataType: 'json',
        success: function (data) {
            for(var i=0; i<data.persons.length; i++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato"+i);
                var td = document.createElement("td");
                td.setAttribute("id","nodo" + j++);
                tr.appendChild(td);
                var text = document.createTextNode(data.persons[i].person.name);
                var a = document.createElement("a");
                td.appendChild(a);
                a.appendChild(text);
                a.setAttribute("href","mostrarAutor.html");
                a.setAttribute("onclick","guardarSeleccion(event)");
            }
        }
    });


}


function entityTable(){

    var table = document.getElementById("entityTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    table.appendChild(tbody);
    var j=0;
    let target =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": target},
        dataType: 'json',
        success: function (data) {
            for(var i=0; i<data.entities.length; i++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato"+i);
                var td = document.createElement("td");
                td.setAttribute("id","nodo" + j++);
                tr.appendChild(td);
                var text = document.createTextNode(data.entities[i].entity.name);
                var a = document.createElement("a");
                td.appendChild(a);
                a.appendChild(text);
                a.setAttribute("href","mostrarEntidad.html");
                a.setAttribute("onclick","guardarSeleccion(event)");
            }
        }
    });
}

function productTable(){

    var table = document.getElementById("productTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    table.appendChild(tbody);
    var j=0;
    let target =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": target},
        dataType: 'json',
        success: function (data) {
            for(var i=0; i<data.products.length; i++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato"+i);
                var td = document.createElement("td");
                td.setAttribute("id","nodo" + j++);
                tr.appendChild(td);
                var text = document.createTextNode(data.products[i].product.name);
                var a = document.createElement("a");
                td.appendChild(a);
                a.appendChild(text);
                a.setAttribute("href","mostrarProducto.html");
                a.setAttribute("onclick","guardarSeleccion(event)");
            }
        }
    });
}

function saveToken(token){
    let saveToken = token;
    var name = document.getElementById("username").value;
    window.localStorage.setItem("name",name);
    window.localStorage.setItem("token", saveToken);
}

function loggedIn(){
    var name = window.localStorage.getItem("name");
    var form = document.getElementById("form-login");
    var label = document.createElement("label");
    var text = document.createTextNode("Usuario " + name + ", bienvenido    ");
    label.appendChild(text);
    form.appendChild(label);
    var input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("id","btn-logout");
    input.setAttribute("value","Logout");
    input.setAttribute("onclick","logout()");
    form.appendChild(input);
    personTable();
    entityTable();
    productTable();
}

function logout(){
    window.localStorage.setItem("name",null);
    window.localStorage.setItem("token",null);
    window.location.replace("./index.html");
}

function guardarSeleccion(event){
    var seleccion=event.target.innerHTML;
    window.localStorage.setItem("seleccion", seleccion);
}

function mostrarEntidad(){

    let target =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": target},
        dataType: 'json',
        success: function (data) {
            var seleccion=window.localStorage.getItem("seleccion");
            var index = data.entities.map(function(x){return x.entity.name}).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode(data.entities[index].entity.name);
            h1.setAttribute("class","Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href","main.html");
            ul.appendChild(li);
   /*         if(logstatus==1){
                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar");

                a.setAttribute("href","nuevoEntidad.html");
                a.setAttribute("onclick","updateEntidad()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);
            }*/
            body.appendChild(ul);

            var img = document.createElement("img");
            img.setAttribute("class","autor");
            img.setAttribute("src",data.entities[index].entity.imageUrl);
            img.setAttribute("alt","logo");
            body.appendChild(img);


            var p = document.createElement("p");
            text = document.createTextNode("Nombre: " + data.entities[index].entity.name);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Nacimiento: " + data.entities[index].entity.birthDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Defunción: " + data.entities[index].entity.deathDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Autores relacionados: " + data.entities[index].entity.persons);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Productos relacionados: " + data.entities[index].entity.products);
            p.appendChild(text);
            body.appendChild(p);


            p = document.createElement("p");
            text = document.createTextNode("Wiki Url");
            var a = document.createElement("a");
            a.setAttribute("href",data.entities[index].entity.wikiUrl);
            a.appendChild(text);
            p.appendChild(a);
            body.appendChild(p);
        }
    });

}

function mostrarProducto(){

    let target =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": target},
        dataType: 'json',
        success: function (data) {
            var seleccion=window.localStorage.getItem("seleccion");
            var index = data.products.map(function(x){return x.entity.name}).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode(data.products[index].entity.name);
            h1.setAttribute("class","Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href","main.html");
            ul.appendChild(li);
            /*         if(logstatus==1){
                         li = document.createElement("li");
                         var a = document.createElement("a");
                         text = document.createTextNode("Editar");

                         a.setAttribute("href","nuevoEntidad.html");
                         a.setAttribute("onclick","updateEntidad()");
                         li.appendChild(a);
                         a.appendChild(text);
                         ul.appendChild(li);
                     }*/
            body.appendChild(ul);

            var img = document.createElement("img");
            img.setAttribute("class","autor");
            img.setAttribute("src",data.products[index].entity.imageUrl);
            img.setAttribute("alt","logo");
            body.appendChild(img);


            var p = document.createElement("p");
            text = document.createTextNode("Nombre: " + data.products[index].entity.name);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Nacimiento: " + data.products[index].entity.birthDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Defunción: " + data.products[index].entity.deathDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Autores relacionados: " + data.products[index].entity.persons);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Productos relacionados: " + data.products[index].entity.products);
            p.appendChild(text);
            body.appendChild(p);


            p = document.createElement("p");
            text = document.createTextNode("Wiki Url");
            var a = document.createElement("a");
            a.setAttribute("href",data.products[index].entity.wikiUrl);
            a.appendChild(text);
            p.appendChild(a);
            body.appendChild(p);
        }
    });
}

function mostrarProducto(){

    let target =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": target},
        dataType: 'json',
        success: function (data) {
            var seleccion=window.localStorage.getItem("seleccion");
            var index = data.products.map(function(x){return x.product.name}).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode(data.products[index].product.name);
            h1.setAttribute("class","Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href","main.html");
            ul.appendChild(li);
            /*         if(logstatus==1){
                         li = document.createElement("li");
                         var a = document.createElement("a");
                         text = document.createTextNode("Editar");

                         a.setAttribute("href","nuevoEntidad.html");
                         a.setAttribute("onclick","updateEntidad()");
                         li.appendChild(a);
                         a.appendChild(text);
                         ul.appendChild(li);
                     }*/
            body.appendChild(ul);

            var img = document.createElement("img");
            img.setAttribute("class","autor");
            img.setAttribute("src",data.products[index].product.imageUrl);
            img.setAttribute("alt","logo");
            body.appendChild(img);


            var p = document.createElement("p");
            text = document.createTextNode("Nombre: " + data.products[index].product.name);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Nacimiento: " + data.products[index].product.birthDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Defunción: " + data.products[index].product.deathDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Autores relacionados: " + data.products[index].product.persons);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Entidades relacionados: " + data.products[index].product.entities);
            p.appendChild(text);
            body.appendChild(p);


            p = document.createElement("p");
            text = document.createTextNode("Wiki Url");
            var a = document.createElement("a");
            a.setAttribute("href",data.products[index].product.wikiUrl);
            a.appendChild(text);
            p.appendChild(a);
            body.appendChild(p);
        }
    });
}

function mostrarAutor(){

    let target =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": target},
        dataType: 'json',
        success: function (data) {
            var seleccion=window.localStorage.getItem("seleccion");
            var index = data.persons.map(function(x){return x.person.name}).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode(data.persons[index].person.name);
            h1.setAttribute("class","Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href","main.html");
            ul.appendChild(li);
            /*         if(logstatus==1){
                         li = document.createElement("li");
                         var a = document.createElement("a");
                         text = document.createTextNode("Editar");

                         a.setAttribute("href","nuevoEntidad.html");
                         a.setAttribute("onclick","updateEntidad()");
                         li.appendChild(a);
                         a.appendChild(text);
                         ul.appendChild(li);
                     }*/
            body.appendChild(ul);

            var img = document.createElement("img");
            img.setAttribute("class","autor");
            img.setAttribute("src",data.persons[index].person.imageUrl);
            img.setAttribute("alt","logo");
            body.appendChild(img);


            var p = document.createElement("p");
            text = document.createTextNode("Nombre: " + data.persons[index].person.name);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Nacimiento: " + data.persons[index].person.birthDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de Defunción: " + data.persons[index].person.deathDate);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Entidades relacionados: " + data.persons[index].person.entities);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Productos relacionados: " + data.persons[index].person.products);
            p.appendChild(text);
            body.appendChild(p);


            p = document.createElement("p");
            text = document.createTextNode("Wiki Url");
            var a = document.createElement("a");
            a.setAttribute("href",data.persons[index].person.wikiUrl);
            a.appendChild(text);
            p.appendChild(a);
            body.appendChild(p);
        }
    });
}