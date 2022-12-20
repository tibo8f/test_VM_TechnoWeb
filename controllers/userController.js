const Article = require('../models/articleModel');
let article = require('../models/articleModel');

const router = require('../routes');

let articleList = [];
// Data base connectionq
var mysql = require("mysql");

var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'articles'
});
connection.connect(function(error){if (error) console.log(error);})     // si erreur de type : ER_NOT_SUPPORTED_AUTH_MODE       // mettre ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root'; dans mysql workbench et executer


exports.articleList = function(request, response){
    connection.query("select * from article;", function(error, result){
        if (error) console(error);
        response.render("articleList.ejs", {articles: result});
    });
};

exports.articleFormAdd = function(request, response) {
    response.render('articleAdd.ejs', {idarticle:'-1', name:"", quantity: ""});
}

exports.articleUpdate = function(request, response) {
    // let iduser = request.params.iduser;
    // response.render('userAdd.ejs', {iduser: iduser, lastname: userList[iduser]["lastname"], firstname: userList[iduser]["firstname"]});
    let i = request.params.idarticle;                                                                                                        // .params parce que i est un paramètre de l'url
    let article = {"purchased":1};
    connection.query("UPDATE article SET ? WHERE idarticle = ?;", [article, i], function(error, result){
        if (error) console.log(error);
        response.redirect('/article');
    });
}

exports.articleUpdateIntoDatabase = function(request, response) {
    let i = request.body.idarticle;
    let article = {"name":request.body.name,"quantity":request.body.quantity};
    connection.query("UPDATE article SET ? WHERE idarticle = ?;", [article, i], function(error, result){
        if (error) console.log(error);
        response.redirect('/article');
    });
}

exports.articleNew = function(request, response) {
    // let iduser = request.body.iduser;
    // let lastname = request.body.lastname;
    // let firstname = request.body.firstname;

    // if (iduser >= 0) {
    //     userList[iduser]["lastname"] = lastname;
    //     userList[iduser]["firstname"] = firstname;
    // }
    // else{
    //     let user = new User(lastname, firstname);
    //     userList.push(user);
    // }
    // response.redirect('/user');
    let article = {"name":request.body.name,"quantity":request.body.quantity};
    connection.query("INSERT INTO article SET ?", article , function(error, result){
        if(error) console.log(error);
        response.redirect('/article');
    });
};

exports.articleShow = function (request, response){
    let idarticle = request.params.idarticle;
    response.send("Hello " + articleList[idarticle]["name"]);
}

exports.articleRemove = function (request, response){
    // let iduser = request.params.iduser;
    // userList.splice(iduser,1);
    // response.redirect('/user');
    let i = request.params.idarticle;                                                                                                        // .params parce que i est un paramètre de l'url
    connection.query("DELETE from article WHERE idarticle = ?;", i , function(error, result){
        if (error) console(error);
        response.redirect("/article");
    });
}