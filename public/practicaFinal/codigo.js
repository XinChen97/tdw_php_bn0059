//Creacion de Tablas

function personTable() {

    var table = document.getElementById("personTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "body");
    table.appendChild(tbody);
    var i = 0;
    var j = 0;
    let token = window.localStorage.getItem("token");
    let role = window.localStorage.getItem("role");
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            for (i; i < data.persons.length; i++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato" + i);
                var td = document.createElement("td");
                td.setAttribute("id", "nodo" + j++);
                tr.appendChild(td);
                var text = document.createTextNode(data.persons[i].person.name);
                var a = document.createElement("a");
                td.appendChild(a);
                a.appendChild(text);
                a.setAttribute("href", "mostrarAutor.html");
                a.setAttribute("onclick", "guardarSeleccion(event)");
            }
        }

    });
    if (role == "writer") {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.setAttribute("class", "dato");
        tr.setAttribute("id", "dato" + i);
        var td = document.createElement("td");
        td.setAttribute("id", "nodo" + j++);
        tr.appendChild(td);
        var input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("value", "Crear");
        input.setAttribute("onclick", "location.href='nuevoAutor.html'");
        td.appendChild(input);
    }

}


function entityTable() {

    var table = document.getElementById("entityTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "body");
    table.appendChild(tbody);
    var i = 0;
    var j = 0;
    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.entities.length; i++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato" + i);
                var td = document.createElement("td");
                td.setAttribute("id", "nodo" + j++);
                tr.appendChild(td);
                var text = document.createTextNode(data.entities[i].entity.name);
                var a = document.createElement("a");
                td.appendChild(a);
                a.appendChild(text);
                a.setAttribute("href", "mostrarEntidad.html");
                a.setAttribute("onclick", "guardarSeleccion(event)");
            }
        }
    });
    let role = window.localStorage.getItem("role");
    if (role == "writer") {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.setAttribute("class", "dato");
        tr.setAttribute("id", "dato" + i);
        var td = document.createElement("td");
        td.setAttribute("id", "nodo" + j++);
        tr.appendChild(td);
        var input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("value", "Crear");
        input.setAttribute("onclick", "location.href='nuevoEntidad.html'");
        td.appendChild(input);
    }
}

function productTable() {

    var table = document.getElementById("productTable");
    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "body");
    table.appendChild(tbody);
    var i = 0;
    var j = 0;
    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.products.length; i++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                tr.setAttribute("class", "dato");
                tr.setAttribute("id", "dato" + i);
                var td = document.createElement("td");
                td.setAttribute("id", "nodo" + j++);
                tr.appendChild(td);
                var text = document.createTextNode(data.products[i].product.name);
                var a = document.createElement("a");
                td.appendChild(a);
                a.appendChild(text);
                a.setAttribute("href", "mostrarProducto.html");
                a.setAttribute("onclick", "guardarSeleccion(event)");
            }
        }
    });
    let role = window.localStorage.getItem("role");
    if (role == "writer") {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.setAttribute("class", "dato");
        tr.setAttribute("id", "dato" + i);
        var td = document.createElement("td");
        td.setAttribute("id", "nodo" + j++);
        tr.appendChild(td);
        var input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("value", "Crear");
        input.setAttribute("onclick", "location.href='nuevoProducto.html'");
        td.appendChild(input);
    }
}

//Guardar Token

function saveToken(token) {
    var name = document.getElementById("username").value;
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("token", token);

    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            var index = data.users.map(function (x) {
                return x.user.username
            }).indexOf((name));
            var role = data.users[index].user.role;
            var active = data.users[index].user.active;
            if (active == 0) {
                alert("Cuenta no activada")
            } else {
                window.localStorage.setItem("role", role);
                window.location.replace("./main.html");

            }
        }
    });
}

//Estar loggeado

function loggedIn() {
    var name = window.localStorage.getItem("name");
    var form = document.getElementById("form-login");
    var label = document.createElement("label");
    var text = document.createTextNode("Usuario " + name + ", bienvenido    ");
    label.appendChild(text);
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Perfil");
    input.setAttribute("onclick", "location.href='perfil.html'");
    label.appendChild(input);


    form.appendChild(label);
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("id", "btn-logout");
    input.setAttribute("value", "Logout");
    input.setAttribute("onclick", "logout()");
    form.appendChild(input);
    personTable();
    entityTable();
    productTable();
    window.localStorage.setItem("seleccion", "-1");

}

//Logout

function logout() {
    window.localStorage.setItem("name", null);
    window.localStorage.setItem("token", null);
    window.localStorage.setItem("role", null);
    window.location.replace("./index.html");
}

//Guardar item seleccionado

function guardarSeleccion(event) {
    var seleccion = event.target.innerHTML;
    window.localStorage.setItem("seleccion", seleccion);
}


//Mostrar item

function showEntity() {

    let role = window.localStorage.getItem("role");
    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            var seleccion = window.localStorage.getItem("seleccion");
            var index = data.entities.map(function (x) {
                return x.entity.name
            }).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode(data.entities[index].entity.name);
            h1.setAttribute("class", "Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href", "main.html");
            ul.appendChild(li);
            if (role == "writer") {
                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar");

                a.setAttribute("href", "nuevoEntidad.html");
                a.setAttribute("onclick", "updateEntity()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar Relaciones");

                a.setAttribute("href", "editEntityRelation.html");
                a.setAttribute("onclick", "editEntityRelation()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                a = document.createElement("a");
                text = document.createTextNode("Borrar");

                a.setAttribute("href", "main.html");
                a.setAttribute("onclick", "deleteEntity()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);
            }
            body.appendChild(ul);

            var img = document.createElement("img");
            img.setAttribute("class", "autor");
            img.setAttribute("src", data.entities[index].entity.imageUrl);
            img.setAttribute("alt", "logo");
            img.setAttribute("onerror", onerror = "this.src='altImage.png'");
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
            a.setAttribute("href", data.entities[index].entity.wikiUrl);
            a.appendChild(text);
            p.appendChild(a);
            body.appendChild(p);
        }
    });

}


function showProduct() {

    let role = window.localStorage.getItem("role");
    let token = window.localStorage.getItem("token");

    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            var seleccion = window.localStorage.getItem("seleccion");
            var index = data.products.map(function (x) {
                return x.product.name
            }).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode(data.products[index].product.name);
            h1.setAttribute("class", "Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href", "main.html");
            ul.appendChild(li);
            if (role == "writer") {
                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar");

                a.setAttribute("href", "nuevoProducto.html");
                a.setAttribute("onclick", "updateProduct()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar Relaciones");

                a.setAttribute("href", "editPrRelation.html");
                a.setAttribute("onclick", "editProductRelation.html()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                a = document.createElement("a");
                text = document.createTextNode("Borrar");

                a.setAttribute("href", "main.html");
                a.setAttribute("onclick", "deleteProduct()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);
            }
            body.appendChild(ul);

            var img = document.createElement("img");
            img.setAttribute("class", "autor");
            img.setAttribute("src", data.products[index].product.imageUrl);
            img.setAttribute("alt", "logo");
            img.setAttribute("onerror", onerror = "this.src='altImage.png'");

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
            a.setAttribute("href", data.products[index].product.wikiUrl);
            a.appendChild(text);
            p.appendChild(a);
            body.appendChild(p);
        }
    });
}

function showPerson() {
    let role = window.localStorage.getItem("role");
    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            var seleccion = window.localStorage.getItem("seleccion");
            var index = data.persons.map(function (x) {
                return x.person.name
            }).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode(data.persons[index].person.name);
            h1.setAttribute("class", "Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href", "main.html");
            ul.appendChild(li);
            if (role == "writer") {
                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar");

                a.setAttribute("href", "nuevoAutor.html");
                a.setAttribute("onclick", "updatePerson()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                var a = document.createElement("a");
                text = document.createTextNode("Editar Relaciones");

                a.setAttribute("href", "editPersonRelation.html");
                a.setAttribute("onclick", "editPersonRelation()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

                li = document.createElement("li");
                a = document.createElement("a");
                text = document.createTextNode("Borrar");

                a.setAttribute("href", "main.html");
                a.setAttribute("onclick", "deletePerson()");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);

            }
            body.appendChild(ul);

            var img = document.createElement("img");
            img.setAttribute("class", "autor");
            img.setAttribute("src", data.persons[index].person.imageUrl);
            img.setAttribute("alt", "logo");
            img.setAttribute("onerror", onerror = "this.src='altImage.png'");

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
            text = document.createTextNode("Wiki Url: ");
            var a = document.createElement("a");
            a.setAttribute("href", data.persons[index].person.wikiUrl);
            a.appendChild(text);
            p.appendChild(a);
            body.appendChild(p);

        }
    });
}

//Actualizar item

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
                var index = data.persons.map(function (x) {
                    return x.person.name
                }).indexOf((seleccion));
                editPerson(1, index);
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
                var index = data.entities.map(function (x) {
                    return x.entity.name
                }).indexOf((seleccion));
                editEntity(1, index);
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
                var index = data.products.map(function (x) {
                    return x.product.name
                }).indexOf((seleccion));
                editProduct(1, index);
            }
        });
    }
}

//Editar item

function editPerson(x, y) {
    let token = window.localStorage.getItem("token");
    if (x == 0) {
    } else {
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                document.getElementById("name").value = data.persons[y].person.name;
                document.getElementById("birthDate").value = data.persons[y].person.birthDate;
                document.getElementById("deathDate").value = data.persons[y].person.deathDate;
                document.getElementById("imageUrl").value = data.persons[y].person.imageUrl;
                document.getElementById("wikiUrl").value = data.persons[y].person.wikiUrl;
            }
        });
    }
}

function editEntity(x, y) {
    let token = window.localStorage.getItem("token");
    if (x == 0) {
    } else {
        $.ajax({
            type: "GET",
            url: '/api/v1/entities',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                document.getElementById("name").value = data.entities[y].entity.name;
                document.getElementById("birthDate").value = data.entities[y].entity.birthDate;
                document.getElementById("deathDate").value = data.entities[y].entity.deathDate;
                document.getElementById("imageUrl").value = data.entities[y].entity.imageUrl;
                document.getElementById("wikiUrl").value = data.entities[y].entity.wikiUrl;
            }
        });
    }
}

function editProduct(x, y) {
    let token = window.localStorage.getItem("token");
    if (x == 0) {
    } else {
        $.ajax({
            type: "GET",
            url: '/api/v1/products',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data) {
                document.getElementById("name").value = data.products[y].product.name;
                document.getElementById("birthDate").value = data.products[y].product.birthDate;
                document.getElementById("deathDate").value = data.products[y].product.deathDate;
                document.getElementById("imageUrl").value = data.products[y].product.imageUrl;
                document.getElementById("wikiUrl").value = data.products[y].product.wikiUrl;
            }
        });
    }
}

//Guardar item

function idFind(type) {
    let token = window.localStorage.getItem("token");
    var seleccion = window.localStorage.getItem("seleccion");
    if (type == "person") {
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {"Authorization": token},
            dataType: 'json',
            async: false,
            success: function (data) {
                var index = data.persons.map(function (x) {
                    return x.person.name
                }).indexOf((seleccion));
                var id = data.persons[index].person.id;
                idFindAux(id);
            }
        });
    } else if (type == "entity") {
        $.ajax({
            type: "GET",
            url: '/api/v1/entities',
            headers: {"Authorization": token},
            dataType: 'json',
            async: false,
            success: function (data) {
                var index = data.entities.map(function (x) {
                    return x.entity.name
                }).indexOf((seleccion));
                var id = data.entities[index].entity.id;
                idFindAux(id);
            }
        });
    } else if (type == "product") {
        $.ajax({
            type: "GET",
            url: '/api/v1/products',
            headers: {"Authorization": token},
            dataType: 'json',
            async: false,
            success: function (data) {
                var index = data.products.map(function (x) {
                    return x.product.name
                }).indexOf((seleccion));
                var id = data.products[index].product.id;
                idFindAux(id);
            }
        });
    }
}

function idFindAux(id) {
    window.localStorage.setItem("id", id);
}

function savePerson() {

    var nameA = document.getElementById("name").value;
    var birthDateA = document.getElementById("birthDate").value;
    var deathDateA = document.getElementById("deathDate").value;
    var imageUrlA = document.getElementById("imageUrl").value;
    var wikiUrlA = document.getElementById("wikiUrl").value;
    var seleccion = window.localStorage.getItem("seleccion");
    var token = window.localStorage.getItem("token");
    var autor;
    if (birthDateA == '' || deathDateA == '') {
        if (birthDateA == '' && deathDateA != '') {
            autor = {
                name: nameA,
                birthDate: birthDateA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        } else if (birthDateA != '' && deathDateA == '') {
            autor = {
                name: nameA,
                deathDate: deathDateA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        } else {
            autor = {
                name: nameA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        }
    } else {
        autor = {
            name: nameA,
            birthDate: birthDateA,
            deathDate: deathDateA,
            imageUrl: imageUrlA,
            wikiUrl: wikiUrlA,
        }
    }

    if (seleccion == -1) {
        $.ajax({
            type: "POST",
            url: '/api/v1/persons',
            headers: {"Authorization": token},
            dataType: 'json',
            data: autor,
            success: function (data, status, response) {
                alert("done");
            }
        })
    } else {
        idFind("person")
        var id = window.localStorage.getItem("id");
        console.log(id);
        $.ajax({
            type: "PUT",
            url: '/api/v1/persons/' + id,
            headers: {"Authorization": token},
            dataType: 'json',
            data: autor,
            success: function (data, status, response) {
                alert("done");
            }
        });
    }

}

function saveEntity() {

    var nameA = document.getElementById("name").value;
    var birthDateA = document.getElementById("birthDate").value;
    var deathDateA = document.getElementById("deathDate").value;
    var imageUrlA = document.getElementById("imageUrl").value;
    var wikiUrlA = document.getElementById("wikiUrl").value;

    var seleccion = window.localStorage.getItem("seleccion");
    var token = window.localStorage.getItem("token");
    var autor;
    if (birthDateA == '' || deathDateA == '') {
        if (birthDateA == '' && deathDateA != '') {
            autor = {
                name: nameA,
                birthDate: birthDateA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        } else if (birthDateA != '' && deathDateA == '') {
            autor = {
                name: nameA,
                deathDate: deathDateA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        } else {
            autor = {
                name: nameA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        }
    } else {
        autor = {
            name: nameA,
            birthDate: birthDateA,
            deathDate: deathDateA,
            imageUrl: imageUrlA,
            wikiUrl: wikiUrlA,
        }
    }
    if (seleccion == -1) {
        $.ajax({
            type: "POST",
            url: '/api/v1/entities',
            headers: {"Authorization": token},
            dataType: 'json',
            data: autor,
            success: function (data, status, response) {
                alert("done");
            }
        })
    } else {
        idFind("entity")
        var id = window.localStorage.getItem("id");
        console.log(id);
        $.ajax({
            type: "PUT",
            url: '/api/v1/entities/' + id,
            headers: {"Authorization": token},
            dataType: 'json',
            data: autor,
            success: function (data, status, response) {
                alert("done");
            }
        })

    }
}

function saveProduct() {

    var nameA = document.getElementById("name").value;
    var birthDateA = document.getElementById("birthDate").value;
    var deathDateA = document.getElementById("deathDate").value;
    var imageUrlA = document.getElementById("imageUrl").value;
    var wikiUrlA = document.getElementById("wikiUrl").value;

    var seleccion = window.localStorage.getItem("seleccion");
    var token = window.localStorage.getItem("token");
    var autor;
    if (birthDateA == '' || deathDateA == '') {
        if (birthDateA == '' && deathDateA != '') {
            autor = {
                name: nameA,
                birthDate: birthDateA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        } else if (birthDateA != '' && deathDateA == '') {
            autor = {
                name: nameA,
                deathDate: deathDateA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        } else {
            autor = {
                name: nameA,
                imageUrl: imageUrlA,
                wikiUrl: wikiUrlA,
            }
        }
    } else {
        autor = {
            name: nameA,
            birthDate: birthDateA,
            deathDate: deathDateA,
            imageUrl: imageUrlA,
            wikiUrl: wikiUrlA,
        }
    }
    if (seleccion == -1) {
        $.ajax({
            type: "POST",
            url: '/api/v1/products',
            headers: {"Authorization": token},
            dataType: 'json',
            data: autor,
            success: function (data, status, response) {
                alert("done");
            }
        })
    } else {
        idFind("product")
        var id = window.localStorage.getItem("id");
        console.log(id);
        $.ajax({
            type: "PUT",
            url: '/api/v1/products/' + id,
            headers: {"Authorization": token},
            dataType: 'json',
            data: autor,
            success: function (data, status, response) {
                alert("done");
            }
        })

    }

}

function deletePerson() {
    var result = confirm("¿Desea borrar este elemento?");
    if (result) {
        var token = window.localStorage.getItem("token");
        idFind("person")
        var id = window.localStorage.getItem("id");
        console.log(id);
        $.ajax({
            type: "delete",
            url: '/api/v1/persons/' + id,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        })

    }
}

function deleteEntity() {
    var result = confirm("¿Desea borrar este elemento?");
    if (result) {
        var token = window.localStorage.getItem("token");
        idFind("entity")
        var id = window.localStorage.getItem("id");
        console.log(id);
        $.ajax({

            type: "delete",
            url: '/api/v1/entities/' + id,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        })

    }

}


function deleteProduct() {
    var result = confirm("¿Desea borrar este elemento?");
    if (result) {
        var token = window.localStorage.getItem("token");
        idFind("product")
        var id = window.localStorage.getItem("id");
        console.log(id);
        $.ajax({
            type: "delete",
            url: '/api/v1/products/' + id,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        })

    }
}

function check() {

    $.ajax({
        type: "get",
        url: '/api/v1/users/username/' + document.getElementById("username").value,
        dataType: 'json',
        success: function (data, status, response) {
            alert("Username already exists");
        },
        error: function (data) {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("password", password);
            window.location.replace("./register2.html");
        }
    })
}

function loadRegisterData() {
    document.getElementById("username").value = window.localStorage.getItem("username");
    document.getElementById("password").value = window.localStorage.getItem("password");
}

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function registerAccount() {
    let authHeader = null;

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var birthDate = document.getElementById("birthDate").value;
    var user = {
        username: username,
        password: password,
        email: email,
        role: "reader",
        active: 0,
        firstname: firstname,
        lastname: lastname,
        birthDate: birthDate
    }

    $.ajax({
        type: "POST",
        url: '/api/v1/users',
        dataType: 'json',
        data: user,
        async: false,
        success: (function (data, status, response) {
            alert("done");
            window.location.replace("./index.html");
        }), error(e) {
            alert("Correo ya existente, prueba con otro");
            window.location.replace("./register2.html");
        }

    })

}

function showProfile() {

    let role = window.localStorage.getItem("role");
    let token = window.localStorage.getItem("token");

    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            var seleccion = window.localStorage.getItem("name");
            var index = data.users.map(function (x) {
                return x.user.username
            }).indexOf((seleccion));
            var body = document.getElementById("body");
            var h1 = document.createElement("h1");
            var text = document.createTextNode("Perfil");
            h1.setAttribute("class", "Title");
            h1.appendChild(text);
            body.appendChild(h1);

            var ul = document.createElement("ul");
            var li = document.createElement("li");
            var a = document.createElement("a");
            text = document.createTextNode("Inicio");
            li.appendChild(a);
            a.appendChild(text);
            a.setAttribute("href", "main.html");
            ul.appendChild(li);

            li = document.createElement("li");
            a = document.createElement("a");
            text = document.createTextNode("Editar Perfil");
            a.setAttribute("href", "editperfil.html");
            li.appendChild(a);
            a.appendChild(text);
            ul.appendChild(li);

            if (role == "writer") {
                li = document.createElement("li");
                a = document.createElement("a");
                text = document.createTextNode("Administrar");
                a.setAttribute("href", "admin.html");
                li.appendChild(a);
                a.appendChild(text);
                ul.appendChild(li);


            }
            body.appendChild(ul);

            var p = document.createElement("p");
            text = document.createTextNode("ID: " + data.users[index].user.id);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Username: " + data.users[index].user.username);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Nombre: " + data.users[index].user.firstname);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Apellidos: " + data.users[index].user.lastname);
            p.appendChild(text);
            body.appendChild(p);

            p = document.createElement("p");
            text = document.createTextNode("Fecha de nacimiento: " + data.users[index].user.birthdate);
            p.appendChild(text);
            body.appendChild(p);
        }
    });
}

function editProfile(y) {
    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            document.getElementById("username").value = data.users[y].user.username;
            document.getElementById("password").value
            document.getElementById("email").value = data.users[y].user.email;
            document.getElementById("firstname").value = data.users[y].user.firstname;
            document.getElementById("lastname").value = data.users[y].user.lastname;
            document.getElementById("birthDate").value = data.users[y].user.birthDate;
        }
    });

}

function updateProfile() {
    let token = window.localStorage.getItem("token");
    var seleccion = window.localStorage.getItem("name");
    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {"Authorization": token},
        dataType: 'json',
        success: function (data) {
            var index = data.users.map(function (x) {
                return x.user.username
            }).indexOf((seleccion));
            editProfile(index);
        }
    });

}

function saveProfile() {

    var usernameA = document.getElementById("username").value;
    var passwordA = document.getElementById("password").value;
    var emailA = document.getElementById("email").value;
    var firstnameA = document.getElementById("firstname").value;
    var lastnameA = document.getElementById("lastname").value;
    var birthDateA = document.getElementById("birthDate").value;
    var autor;

    let token = window.localStorage.getItem("token");

    if (birthDateA == '') {
        autor = {
            username: usernameA,
            password: passwordA,
            email: emailA,
            firstname: firstnameA,
            lastname: lastnameA,
        }
    } else {
        autor = {
            username: usernameA,
            password: passwordA,
            email: emailA,
            firstname: firstnameA,
            lastname: lastnameA,
            birthDate: birthDateA,
        }
    }

    useridFind();
    var id = window.localStorage.getItem("id");
    console.log(id);
    $.ajax({
        type: "PUT",
        url: '/api/v1/users/' + id,
        headers: {"Authorization": token},
        dataType: 'json',
        data: autor,
        success: function (data, status, response) {
            window.localStorage.setItem("name", usernameA);
            alert("done");
            window.location.replace("./perfil.html");

        },
        error: function (jqXHR) {
            if (jqXHR.status === 400) {
                alert("nombre o email ya  existente");
            }
        }
    });

}

function useridFind() {
    let token = window.localStorage.getItem("token");
    var username = window.localStorage.getItem("name");
    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            var index = data.users.map(function (x) {
                return x.user.username
            }).indexOf((username));
            console.log(index);
            var id = data.users[index].user.id;
            idFindAux(id);
        }
    });

}

function loadUsers() {

    var table = document.getElementById("userTable");
    var tbody = document.createElement("tbody");
    var label = document.createElement("label");
    var input = document.createElement("input");
    var span = document.createElement("span");

    table.appendChild(tbody);

    let token = window.localStorage.getItem("token");
    var i = 0;
    var j = 0;
    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (i; i < data.users.length; i++) {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);
                var td = document.createElement("td");
                tr.appendChild(td);
                var text = document.createTextNode(data.users[i].user.id);
                td.appendChild(text);

                td = document.createElement("td");
                tr.appendChild(td);
                text = document.createTextNode(data.users[i].user.username);
                td.appendChild(text);

                td = document.createElement("td");
                tr.appendChild(td);
                text = document.createTextNode(data.users[i].user.email);
                td.appendChild(text);

                td = document.createElement("td");
                tr.appendChild(td);
                text = document.createTextNode(data.users[i].user.firstname);
                td.appendChild(text);

                td = document.createElement("td");
                tr.appendChild(td);
                text = document.createTextNode(data.users[i].user.lastname);
                td.appendChild(text);

                td = document.createElement("td");
                tr.appendChild(td);
                text = document.createTextNode(data.users[i].user.birthDate);
                td.appendChild(text);


                td = document.createElement("td");
                tr.appendChild(td);
                input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                if (data.users[i].user.role == "writer") {
                    input.checked = true;
                }

                input.setAttribute("onclick", "updateUser(" + data.users[i].user.id + "," + 0 + ")");
                span.setAttribute("class", "slider round");
                label = document.createElement("label");
                label.appendChild(input);
                label.appendChild(span);
                td.appendChild(label);


                td = document.createElement("td");
                tr.appendChild(td);
                input = document.createElement("input");
                input.setAttribute("type", "checkbox");
                if (data.users[i].user.active == true) {
                    input.checked = true;
                }
                input.setAttribute("onclick", "updateUser(" + data.users[i].user.id + "," + 1 + ")");
                span = document.createElement("span");
                span.setAttribute("class", "slider round");
                label = document.createElement("label");
                label.appendChild(input);
                label.appendChild(span);
                td.appendChild(label);


                td = document.createElement("td");
                tr.appendChild(td);
                if (data.users[i].user.username != window.localStorage.getItem("name")) {
                    if (data.users[i].user.role == "reader") {
                        input = document.createElement("input");
                        input.setAttribute("type", "button");
                        input.setAttribute("onclick", "deleteUser(" + data.users[i].user.id + ")");
                        input.setAttribute("value", "eliminar");
                        td.appendChild(input);
                    }
                }
            }

        }


    });
}


function updateUser(id, select) {
    var role;
    var active;

    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "get",
        url: '/api/v1/users/' + id,
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data, status, response) {
            role = data.user.role;
            active = data.user.active;
        },
    });
    if (select == 0) {
        if (role == "writer") {
            role = "reader";

        } else {
            role = "writer"
        }
        var actu = {
            role: role,
        }
    } else {
        if (active == 0) {
            active = 1;
        } else {
            active = 0;
        }
        var actu = {
            active: active,
        }
    }

    $.ajax({
        type: "PUT",
        url: '/api/v1/users/' + id,
        headers: {"Authorization": token},
        dataType: 'json',
        data: actu,
        success: function (data, status, response) {
            alert("done");
        },
    });

}


function deleteUser(id) {
    var result = confirm("¿Desea borrar este elemento?");
    if (result) {
        var token = window.localStorage.getItem("token");
        console.log(id);
        $.ajax({
            type: "delete",
            url: '/api/v1/users/' + id,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        })

    }
}

function editPersonRelation() {
    var select = document.getElementById("entities");
    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.entities.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.entities[i].entity.id);
                var text = document.createTextNode(data.entities[i].entity.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("products")
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.products.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.products[i].product.id);
                var text = document.createTextNode(data.products[i].product.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("entities2");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.entities.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.entities[i].entity.id);
                var text = document.createTextNode(data.entities[i].entity.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("products2")
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.products.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.products[i].product.id);
                var text = document.createTextNode(data.products[i].product.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });

}


function savePersonRelation(opc) {
    var sel = window.localStorage.getItem("opcion");

    idFind("person")
    var id = window.localStorage.getItem("id");

    let token = window.localStorage.getItem("token");
    if (opc == 0) {

        $.ajax({
            type: "PUT",
            url: '/api/v1/persons/' + id + '/entities/add/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 1) {
        $.ajax({
            type: "PUT",
            url: '/api/v1/persons/' + id + '/products/add/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 2) {

        $.ajax({
            type: "PUT",
            url: '/api/v1/persons/' + id + '/entities/rem/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 3) {
        $.ajax({
            type: "PUT",
            url: '/api/v1/persons/' + id + '/products/rem/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    }

    window.localStorage.setItem("opcion", 1);
}

function editEntityRelation() {
    let token = window.localStorage.getItem("token");
    var select = document.getElementById("products")
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.products.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.products[i].product.id);
                var text = document.createTextNode(data.products[i].product.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("persons")
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.persons.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.persons[i].person.id);
                var text = document.createTextNode(data.persons[i].person.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("products2")
    $.ajax({
        type: "GET",
        url: '/api/v1/products',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.products.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.products[i].product.id);
                var text = document.createTextNode(data.products[i].product.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("persons2")
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.persons.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.persons[i].person.id);
                var text = document.createTextNode(data.persons[i].person.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });

}


function saveEntityRelation(opc) {
    var sel = window.localStorage.getItem("opcion");

    idFind("entity")
    var id = window.localStorage.getItem("id");

    let token = window.localStorage.getItem("token");
    if (opc == 0) {
        $.ajax({
            type: "PUT",
            url: '/api/v1/entities/' + id + '/products/add/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 1) {
        $.ajax({
            type: "PUT",
            url: '/api/v1/entities/' + id + '/persons/add/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 2) {

        $.ajax({
            type: "PUT",
            url: '/api/v1/entities/' + id + '/products/rem/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 3) {
        $.ajax({
            type: "PUT",
            url: '/api/v1/entities/' + id + '/persons/rem/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    }

    window.localStorage.setItem("opcion", 1);
}

function editProductRelation() {
    var select = document.getElementById("entities");
    let token = window.localStorage.getItem("token");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.entities.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.entities[i].entity.id);
                var text = document.createTextNode(data.entities[i].entity.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("persons")
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.persons.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.persons[i].person.id);
                var text = document.createTextNode(data.persons[i].person.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("entities2");
    $.ajax({
        type: "GET",
        url: '/api/v1/entities',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.entities.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.entities[i].entity.id);
                var text = document.createTextNode(data.entities[i].entity.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });
    var select = document.getElementById("persons2")
    $.ajax({
        type: "GET",
        url: '/api/v1/persons',
        headers: {"Authorization": token},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.persons.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", data.persons[i].person.id);
                var text = document.createTextNode(data.persons[i].person.name);
                option.appendChild(text);
                select.appendChild(option);
            }
        }
    });

}


function saveProductRelation(opc) {
    var sel = window.localStorage.getItem("opcion");

    idFind("product")
    var id = window.localStorage.getItem("id");

    let token = window.localStorage.getItem("token");
    if (opc == 0) {

        $.ajax({
            type: "PUT",
            url: '/api/v1/products/' + id + '/entities/add/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 1) {
        $.ajax({
            type: "PUT",
            url: '/api/v1/products/' + id + '/persons/add/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 2) {

        $.ajax({
            type: "PUT",
            url: '/api/v1/products/' + id + '/entities/rem/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    } else if (opc == 3) {
        $.ajax({
            type: "PUT",
            url: '/api/v1/products/' + id + '/persons/rem/' + sel,
            headers: {"Authorization": token},
            dataType: 'json',
            success: function (data, status, response) {
                alert("done");
            }
        });
    }

    window.localStorage.setItem("opcion", 1);
}


function saveOption(sel) {
    window.localStorage.setItem("opcion", sel.options[sel.selectedIndex].value);
}
