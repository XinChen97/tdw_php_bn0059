function personTable(){

    var table = document.getElementById("personTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    table.appendChild(tbody);
    var j=0;
    let token =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
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
            let role = window.localStorage.getItem("role");
            if(role=="writer"){
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato"+i);
                var td = document.createElement("td");
                td.setAttribute("id","nodo" + j++);
                tr.appendChild(td);
                var input = document.createElement("input");
                input.setAttribute("type","button");
                input.setAttribute("value","Crear");
                input.setAttribute("onclick","location.href='nuevoAutor.html'");
                td.appendChild(input);
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
    let token =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
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
            let role = window.localStorage.getItem("role");
            if(role=="writer"){
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato"+i);
                var td = document.createElement("td");
                td.setAttribute("id","nodo" + j++);
                tr.appendChild(td);
                var input = document.createElement("input");
                input.setAttribute("type","button");
                input.setAttribute("value","Crear");
                input.setAttribute("onclick","location.href='nuevoEntidad.html'");
                td.appendChild(input);
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
    let token =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
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
            let role = window.localStorage.getItem("role");
            if(role=="writer"){
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato"+i);
                var td = document.createElement("td");
                td.setAttribute("id","nodo" + j++);
                tr.appendChild(td);
                var input = document.createElement("input");
                input.setAttribute("type","button");
                input.setAttribute("value","Crear");
                input.setAttribute("onclick","location.href='nuevoProducto.html'");
                td.appendChild(input);
            }
        }
    });
}

function saveToken(token){
    var name = document.getElementById("username").value;
    window.localStorage.setItem("name",name);
    window.localStorage.setItem("token", token);

    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            var index = data.users.map(function(x){return x.user.username}).indexOf((name));
            var role = data.users[index].user.role;
            window.localStorage.setItem("role",role);
        }
    });
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
    window.localStorage.setItem("seleccion", "-1");

}

function logout(){
    window.localStorage.setItem("name",null);
    window.localStorage.setItem("token",null);
    window.localStorage.setItem("role",null);
    window.location.replace("./index.html");
}



function guardarSeleccion(event){
    var seleccion=event.target.innerHTML;
    window.localStorage.setItem("seleccion", seleccion);
}


function showEntity(){

    let role = window.localStorage.getItem("role");
    let token =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
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
            if(role=="writer"){
                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar");

                a.setAttribute("href","nuevoEntidad.html");
                a.setAttribute("onclick","updateEntidad()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);
            }
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

    let role = window.localStorage.getItem("role");
    let token =window.localStorage.getItem("token");

    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
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
            if(role=="writer"){
                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar");

                a.setAttribute("href","nuevoProducto.html");
                a.setAttribute("onclick","updateEntidad()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);
            }
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

function showPerson(){
    let role = window.localStorage.getItem("role");
    let token =window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
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
            if(role=="writer"){
                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar");

                a.setAttribute("href","nuevoAutor.html");
                a.setAttribute("onclick","updatePerson()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                a = document.createElement("a");
                text = document.createTextNode("Borrar");

                a.setAttribute("href","main.html");
                a.setAttribute("onclick","deletePerson()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

            }
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
function updatePerson() {
    let token = window.localStorage.getItem("token");
    var seleccion = window.localStorage.getItem("seleccion");
    if (seleccion == -1) {
        editPerson(0, 0);
    } else {
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var index = data.persons.map(function(x){return x.person.name}).indexOf((seleccion));
                editPerson(1,index);
            }
        });
    }
}
function editPerson(x,y){
    let token = window.localStorage.getItem("token");
    if(x==0){

    }else{
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                document.getElementById("name").value=data.persons[y].person.name;
                document.getElementById("birthDate").value=data.persons[y].person.birthDate;
                document.getElementById("deathDate").value=data.persons[y].person.deathDate;
                document.getElementById("imageUrl").value=data.persons[y].person.imageUrl;
                document.getElementById("wikiUrl").value=data.persons[y].person.wikiUrl;
            }
        });

    }

}
function savePerson(){

    var nameA =  document.getElementById("name").value;
    var birthDateA = document.getElementById("birthDate").value;
    var deathDateA = document.getElementById("deathDate").value;
    var imageUrlA = document.getElementById("imageUrl").value;
    var wikiUrlA = document.getElementById("wikiUrl").value;

    var seleccion = window.localStorage.getItem("seleccion");
    var token = window.localStorage.getItem("token");
    var autor ={
        name:nameA,
        birthDate:birthDateA,
        deathDate:deathDateA,
        imageUrl:imageUrlA,
        wikiUrl:wikiUrlA,
    }
    if(seleccion == -1){
        $.ajax({
            type: "POST",
            url: '/api/v1/persons',
            headers: {"Authorization": token },
            dataType: 'json',
            data:autor,
            success: function (data,status,response) {
                alert("done");
            }
        })
    }else{
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var seleccion=window.localStorage.getItem("seleccion");
                var index = data.persons.map(function(x){return x.person.name}).indexOf((seleccion));
                var id = data.persons[index].person.id;
                $.ajax({
                    type: "PUT",
                    url: '/api/v1/persons/' + id,
                    headers: {"Authorization": token },
                    dataType: 'json',
                    data:autor,
                    success: function (data,status,response) {
                        alert("done");
                    }
                })

            }
        });

    }
}

function deletePerson(){
    var result = confirm("¿Desea borrar este elemento?");
    if (result) {
        var token = window.localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var seleccion=window.localStorage.getItem("seleccion");
                var index = data.persons.map(function(x){return x.person.name}).indexOf((seleccion));
                var id = data.persons[index].person.id;
                $.ajax({
                    type: "delete",
                    url: '/api/v1/persons/' + id,
                    headers: {"Authorization": token },
                    dataType: 'json',
                    success: function (data,status,response) {
                        alert("done");
                    }
                })

            }
        });
    }
}




