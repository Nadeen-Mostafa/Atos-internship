// CREATE DATABASE examEngine;
// CREATE TABLE examDefinition(
//     exam_id SERIAL PRIMARY KEY,
//     exam_name VARCHAR(20),
//     passingScore INT, 
//     Questions CHAR[]
// )



// -- CREATE DATABASE "examDefinition"
// --     WITH
// --     OWNER = postgres
// --     ENCODING = 'UTF8'
// --     CONNECTION LIMIT = -1
// --     IS_TEMPLATE = False;

const {Pool}=require("pg");
console.log("inside database file");
const pool= new Pool({
    user:"postgres",
    host:"localhost",
    database:"examdb",
    password:"admin",
    port:5432,
});

module.exports=pool;
