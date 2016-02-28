var fs = require("fs");
var http = require("http");
require("./curry.js");
require("./objMapAsync.js");
var unidecode = require('unidecode');

var firstnames = require("./firstnames.json");
var years = require("./years.json");


var buildUrl = function(year, firstname){
  return "http://www.magicmaman.com/direct/prenom/datacartedefrance?prenom="+unidecode(firstname)+"&anneeDeb="+year+"&anneeFin="+year+"&format=json";
};

var get = function(year, firstname, cb){

  var url = buildUrl(year, firstname);

  http.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var response = JSON.parse(body);
          cb(null, response)
      });
  }).on('error', function(e){
      cb(e);
  });
};

var onJSON = function(year, firstname, cb, err, json){

  if(err){
    return cb(err);
  }

  var res = {
    year : year,
    firstname : firstname,
    perDeps : {}
  }, deps = json["parDepartements"];

  for(var dep in deps) if(deps.hasOwnProperty(dep)){
    res.perDeps[dep] || (res.perDeps[dep] = {});
    res.perDeps[dep] = deps[dep].total;
  }

  cb(null, res);
};

var globalFile = "firstname, year, departement, number\n";

firstnames.mapAsync(function(firstname, index, cbFirstname){
  years.mapAsync(function(year, index2, cbYear){

    get(year, firstname, onJSON.curry(year, firstname, cbYear));

  },{},function(errs, res){

    if(errs){
      cbFirstname(errs);
    }

    //console.log(res);

    var fileJSON = {};

    for (var i = 0; i < res.length; i++){
      //console.log(res[i].year.toString());
      fileJSON[res[i].year.toString()] = res[i].perDeps;
      for(var dep in res[i].perDeps) if(res[i].perDeps.hasOwnProperty(dep)){
        globalFile+=res[i].firstname+","+res[i].year+","+dep+","+res[i].perDeps[dep]+"\n";
      }
    }

    cbFirstname();
  });
}, {}, function(errs, res){
  if(errs){
    console.log("errors : ", errs);
  }
  fs.writeFileSync("db.csv", globalFile, "utf8");


  console.log("finished");

});