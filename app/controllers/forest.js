 module.exports.getForest = function(application, req, res) {

     var TreeOp = application.app.models.tree;

     var response = {};
     TreeOp.find({}, function(err, document) {
         if (err) {
             response = {
                 "Error": true,
                 "Message": "Error fetching data"
             }
             return res.status(400).json(response);
         }
         res.json(document);
     })
 }

 module.exports.saveLoc = function(application, req, res) {
     var TreeOp = application.app.models.tree;
     var response = {};
     TreeOp.findByIdAndUpdate(
         req.body.id, { $push: { "loc": { lat: req.body.lat, lng: req.body.lang } } }, { safe: true, upsert: true },
         function(err, model) {
             console.log(err);
         }
     );
 }

 module.exports.deleteTree = function(application, req, res) {
     var TreeOp = application.app.models.tree;
     id = req.params.id
     TreeOp.findById(id)
         .remove(function(err, docs) {
             if (err) {
                 response = {
                     "Error": true,
                     "Message": err
                 }
                 return res.status(400).json(response);
             }

             return res.status(200).json(docs);
         });
 }

 module.exports.saveTree = function(application, req, res) {
     var TreeOp = application.app.models.tree;
     var response = {};
     var Data = new TreeOp({
         nome_pop: req.body.nome_pop,
         nome_cie: req.body.nome_cie,
         familia: req.body.familia,
         categoria: req.body.categoria,
         origem: req.body.origem,
         clima: req.body.clima,
         luminosidade: req.body.luminosidade,
         altura: req.body.altura,
         info: req.body.info,
     })

     Data.save(function(err) {
         console.log(err);
         if (err) {
             response = {
                 "Error": true,
                 "Message": "Error, code: " + err.code
             }
             return res.status(400).json(response);
         }
         response = {
             "Error": false,
             "Message": "Data added with success"
         }
         return res.json(response);
     })
 }