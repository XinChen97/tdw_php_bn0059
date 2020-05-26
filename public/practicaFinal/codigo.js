function personTable(){

    var table = document.getElementById("personTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    table.appendChild(tbody);
    var i=0;
    var j=0;
    let token =window.localStorage.getItem("token");
    let role = window.localStorage.getItem("role");
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            for(i; i<data.persons.length; i++) {
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


function entityTable(){

    var table = document.getElementById("entityTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    table.appendChild(tbody);
    var i=0;
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
        }
    });
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

function productTable(){

    var table = document.getElementById("productTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id","body");
    table.appendChild(tbody);
    var i=0;
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
        }
    });
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
                a.setAttribute("onclick","updateEntity()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                a = document.createElement("a");
                text = document.createTextNode("Borrar");

                a.setAttribute("href","main.html");
                a.setAttribute("onclick","deleteEntity()");
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


function showProduct(){

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
                a.setAttribute("onclick","updateProduct()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                a = document.createElement("a");
                text = document.createTextNode("Borrar");

                a.setAttribute("href","main.html");
                a.setAttribute("onclick","deleteProduct()");
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

function updateEntity() {
    let token = window.localStorage.getItem("token");
    var seleccion = window.localStorage.getItem("seleccion");
    if (seleccion == -1) {
        editEntity(0, 0);
    } else {
        $.ajax({
            type: "GET",
            url: '/api/v1/entities',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var index = data.entities.map(function(x){return x.entity.name}).indexOf((seleccion));
                editEntity(1,index);
            }
        });
    }
}

function updateProduct() {
    let token = window.localStorage.getItem("token");
    var seleccion = window.localStorage.getItem("seleccion");
    if (seleccion == -1) {
        editEntity(0, 0);
    } else {
        $.ajax({
            type: "GET",
            url: '/api/v1/products',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var index = data.products.map(function(x){return x.product.name}).indexOf((seleccion));
                editProduct(1,index);
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

function editEntity(x,y){
    let token = window.localStorage.getItem("token");
    if(x==0){
    }else{
        $.ajax({
            type: "GET",
            url: '/api/v1/entities',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                document.getElementById("name").value=data.entities[y].entity.name;
                document.getElementById("birthDate").value=data.entities[y].entity.birthDate;
                document.getElementById("deathDate").value=data.entities[y].entity.deathDate;
                document.getElementById("imageUrl").value=data.entities[y].entity.imageUrl;
                document.getElementById("wikiUrl").value=data.entities[y].entity.wikiUrl;
            }
        });
    }
}

function editProduct(x,y){
    let token = window.localStorage.getItem("token");
    if(x==0){
    }else{
        $.ajax({
            type: "GET",
            url: '/api/v1/products',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                document.getElementById("name").value=data.products[y].product.name;
                document.getElementById("birthDate").value=data.products[y].product.birthDate;
                document.getElementById("deathDate").value=data.products[y].product.deathDate;
                document.getElementById("imageUrl").value=data.products[y].product.imageUrl;
                document.getElementById("wikiUrl").value=data.products[y].product.wikiUrl;
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
    var autor;
    if(birthDateA==''||deathDateA==''){
        if(birthDateA=='' && deathDateA!=''){
            autor ={
                name:nameA,
                birthDate:birthDateA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }else if(birthDateA!='' && deathDateA==''){
            autor ={
                name:nameA,
                deathDate:deathDateA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }else{
            autor ={
                name:nameA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }
    }else {
        autor = {
            name: nameA,
            birthDate: birthDateA,
            deathDate: deathDateA,
            imageUrl: imageUrlA,
            wikiUrl: wikiUrlA,
        }
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

function saveEntity(){

    var nameA =  document.getElementById("name").value;
    var birthDateA = document.getElementById("birthDate").value;
    var deathDateA = document.getElementById("deathDate").value;
    var imageUrlA = document.getElementById("imageUrl").value;
    var wikiUrlA = document.getElementById("wikiUrl").value;

    var seleccion = window.localStorage.getItem("seleccion");
    var token = window.localStorage.getItem("token");
    var autor;
    if(birthDateA==''||deathDateA==''){
        if(birthDateA=='' && deathDateA!=''){
            autor ={
                name:nameA,
                birthDate:birthDateA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }else if(birthDateA!='' && deathDateA==''){
            autor ={
                name:nameA,
                deathDate:deathDateA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }else{
            autor ={
                name:nameA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }
    }else {
        autor = {
            name: nameA,
            birthDate: birthDateA,
            deathDate: deathDateA,
            imageUrl: imageUrlA,
            wikiUrl: wikiUrlA,
        }
    }
    if(seleccion == -1){
        $.ajax({
            type: "POST",
            url: '/api/v1/entities',
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
            url: '/api/v1/entities',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var seleccion=window.localStorage.getItem("seleccion");
                var index = data.entities.map(function(x){return x.entity.name}).indexOf((seleccion));
                var id = data.entities[index].entity.id;
                $.ajax({
                    type: "PUT",
                    url: '/api/v1/entities/' + id,
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

function saveProduct(){

    var nameA =  document.getElementById("name").value;
    var birthDateA = document.getElementById("birthDate").value;
    var deathDateA = document.getElementById("deathDate").value;
    var imageUrlA = document.getElementById("imageUrl").value;
    var wikiUrlA = document.getElementById("wikiUrl").value;

    var seleccion = window.localStorage.getItem("seleccion");
    var token = window.localStorage.getItem("token");
    var autor;
    if(birthDateA==''||deathDateA==''){
        if(birthDateA=='' && deathDateA!=''){
            autor ={
                name:nameA,
                birthDate:birthDateA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }else if(birthDateA!='' && deathDateA==''){
            autor ={
                name:nameA,
                deathDate:deathDateA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }else{
            autor ={
                name:nameA,
                imageUrl:imageUrlA,
                wikiUrl:wikiUrlA,
            }
        }
    }else {
        autor = {
            name: nameA,
            birthDate: birthDateA,
            deathDate: deathDateA,
            imageUrl: imageUrlA,
            wikiUrl: wikiUrlA,
        }
    }
    if(seleccion == -1){
        $.ajax({
            type: "POST",
            url: '/api/v1/products',
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
            url: '/api/v1/products',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var seleccion=window.localStorage.getItem("seleccion");
                var index = data.products.map(function(x){return x.product.name}).indexOf((seleccion));
                var id = data.products[index].product.id;
                $.ajax({
                    type: "PUT",
                    url: '/api/v1/products/' + id,
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

function deleteEntity(){
    var result = confirm("¿Desea borrar este elemento?");
    if (result) {
        var token = window.localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: '/api/v1/entities',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var seleccion=window.localStorage.getItem("seleccion");
                var index = data.entities.map(function(x){return x.entity.name}).indexOf((seleccion));
                var id = data.entities[index].entity.id;
                $.ajax({
                    type: "delete",
                    url: '/api/v1/entities/' + id,
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


function deleteProduct(){
    var result = confirm("¿Desea borrar este elemento?");
    if (result) {
        var token = window.localStorage.getItem("token");
        $.ajax({
            type: "GET",
            url: '/api/v1/products',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                var seleccion=window.localStorage.getItem("seleccion");
                var index = data.products.map(function(x){return x.product.name}).indexOf((seleccion));
                var id = data.products[index].product.id;
                $.ajax({
                    type: "delete",
                    url: '/api/v1/products/' + id,
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

function check(){
    console.log(document.getElementById("username").value)

    $.ajax({
        type: "get",
        url: '/api/v1/users/username/' + document.getElementById("username").value,
        dataType: 'json',
        error: function (data,status,response) {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
            window.location.replace("./register2.html");
        },success: function (data,status,response) {
            alert("Username already exists");
        }
    })
}

function loadRegisterData(){
    document.getElementById("username").value=window.localStorage.getItem("username");
    document.getElementById("password").value=window.localStorage.getItem("password");
}

function showPassword(){
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function registerAccount(){
    let authHeader = null;

    var username =  document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var birthDate = document.getElementById("birthDate").value;
    var user ={
        username:username,
        password:password,
        email:email,
        role:"reader",
        active:false,
        firstname:firstname,
        lastname:lastname,
        birthDate:birthDate
    }

    $.post(
        "/access_token",
        {username:"adminUser",
        password:"*adminUser*"},
        null
    ).success(function (data, textStatus, request) {
        // Si es correcto => mostrar productos
        authHeader = request.getResponseHeader('Authorization');
        $.ajax({
        type: "POST",
        url: '/api/v1/users',
        headers: {"Authorization": authHeader },
        dataType: 'json',
        data:user,
        success: function (data,status,response) {
        }
        })
        alert("done");
        window.location.replace("./index.html");
    })
}

