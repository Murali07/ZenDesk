const mongodb = require("mongodb");
const dbName = "zendesk";
const dbUrl = `mongodb+srv://Murali:cfMZTb8NHKC7HB2A@cluster0.8bn9yfi.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {mongodb, dbName, dbUrl};
