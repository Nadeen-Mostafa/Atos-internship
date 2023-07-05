const {Router}=require("express");
const controlExam=require("../controllers/exam_controller")

const router=Router();
router.get("/examdef",controlExam.GetExamDef);
router.post("/examdef",controlExam.CreateExamDef)
router.post("/examins",controlExam.CreateExamIns);
module.exports=router;