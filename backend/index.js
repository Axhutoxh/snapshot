const { response } = require("express");
const express = require("express");
var app = express();
const admin = require("firebase-admin");
let inspect = require("util").inspect;
let Busboy = require("busboy");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get("/posts", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let posts = [];
  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  var busboy = new Busboy({ headers: request.headers });

  let fields = {};

  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    console.log(
      "File [" +
        fieldname +
        "]: filename: " +
        filename +
        ", encoding: " +
        encoding +
        ", mimetype: " +
        mimetype
    );
    file.on("data", function(data) {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    });
    file.on("end", function() {
      console.log("File [" + fieldname + "] Finished");
    });
  });

  busboy.on("field", function(
    fieldname,
    val,
    fieldnameTruncated,
    valTruncated,
    encoding,
    mimetype
  ) {
    fields[fieldname] = val;
  });

  busboy.on("finish", function() {
    db.collection("posts")
      .doc(fields.id)
      .set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/quasagram-89fe8.appspot.com/o/KGI6bQ4.jpeg?alt=media&token=0fe6df45-e2ec-4900-a497-c21c6ee68889"
      });

    //  response.writeHead(303, { Connection: "close", Location: "/" });
    response.send("Done parsing form");
  });
  request.pipe(busboy);
});

app.listen(process.env.PORT || 3000);
