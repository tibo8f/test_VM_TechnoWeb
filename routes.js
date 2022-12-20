let express = require('express');
let router = express.Router();

let userController = require('./controllers/userController');

// Liste des routes vers les controleurs
router.get("/", (request, response) => response.redirect('/article'));         // fait une redirection de la racine "/" vers la page des users "/user"

router.get("/article", userController.articleList);
router.get("/article/show/:idarticle", userController.articleShow);
router.get('/article/remove/:idarticle', userController.articleRemove);
router.get("/article/Add", userController.articleFormAdd);
router.post("/article/new", userController.articleNew);
router.get("/article/update/:idarticle", userController.articleUpdate);
router.post("/article/update", userController.articleUpdateIntoDatabase);

module.exports = router;