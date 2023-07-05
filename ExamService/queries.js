const getExamDefQuery = "SELECT * FROM \"examDefinition\"";

// module.exports=getExamDefQuery;
const addExamDefQuery = "INSERT INTO \"examDefinition\" (exam_name, passing_score, questions, created_by) VALUES ($1,$2,$3,$4)";
const addExamInsQuery= "INSERT INTO \"examInstance\" (examdefinationid, startedtime, endtime, duration, completiontime, schduledtimefrom, schduledtimeto, created_by,createdat,taken_by,status,score)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)";
module.exports = {
    getExamDefQuery,
    addExamDefQuery,
    addExamInsQuery
};