const pool = require("../database")
const queries = require("../queries")
const GetExamDef = (req, res) => {
    console.log("hello its controller exam");
    pool.query(queries.getExamDefQuery, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}


const CreateExamDef = (req, res) => {

    let body = JSON.parse(req.body.body)
    console.log(req.body)
    const { exam_name, passing_score, questions, created_by } = req.body;
    console.log(body);
    console.log(exam_name);
    console.log(passing_score);

    pool.query(queries.addExamDefQuery, [exam_name, passing_score, questions, created_by], (error, results) => {
        if (error) throw error;
        res.status(201).send("created successfuly");
        console.log(req.body);
    })
}

const CreateExamIns = (req, res) => {
    
    // console.log(req.body);
    let body = JSON.stringify(req.body)
    console.log(req.body.examdefinationid);

    const {examdefinationid, startedtime, endtime, duration, completiontime, schduledtimefrom, schduledtimeto, created_by,createdat,taken_by,status,score } = req.body;
   
    pool.query(queries.addExamInsQuery, [examdefinationid, startedtime, endtime, duration, completiontime, schduledtimefrom, schduledtimeto, created_by,createdat,taken_by,status,score], (error, results) => {
        if (error) throw error;
        res.status(201).send("created successfuly");
        console.log(results);
        console.log(req.body);
    })
}
// const AssinExam = (req, res) => {

//     let body = JSON.parse(req.body.body)
//     const { startedtime, endtime, duration, completiontime, schduledtimefrom, schduledtimeto, created_by } = body;
//     console.log(req.body);

//     pool.query(queries.addExamDefQuery, [startedtime, endtime, duration, completiontime, schduledtimefrom, schduledtimeto, created_by], (error, results) => {
//         if (error) throw error;
//         res.status(201).send("created successfuly");
//         console.log(req.body);
//     })
// }


exports.GetExamDef = GetExamDef;
exports.CreateExamDef = CreateExamDef;
exports.CreateExamIns = CreateExamIns;