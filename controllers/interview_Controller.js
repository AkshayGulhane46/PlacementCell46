const Interview = require('../models/interview');
const path = require('path');
const Student = require('../models/student');
const ans = 1;

module.exports.interview = async function(req, res){
    let students = await Student.find({})
    let interviews = await Interview.find({})

    return res.render('interview',{
        students:students,
        interviews:interviews
    });
}
  
module.exports.create = function(req,res){
    const newInterview = new Interview({
        company_name: req.body.company_name,
        date:req.body.date,
    })

    newInterview.save().then(()=>{
        res.redirect('back');
    }).catch((err) =>{
        console.log(err);
    })
}


module.exports.addStudent = async function(req,res){
    console.log("inside Add Student Controller")
    console.log("Student id is==" ,  req.body.studentList);
    console.log("company id is==" , req.query.compname);

    let interview = await Interview.findById(req.query.compname);
    let student = await Student.findById(req.body.studentList);
    console.log(interview._id);

    console.log(interview.students.length);
    console.log(interview.students.indexOf(student._id));

    if(interview.students.includes(student._id)){
        console.log("Student Alrady Exists in interview");
    
        return res.redirect('back');
    }else{
        interview.students.push(student);
        interview.save();
    }

    let studentUpdate = await Student.findById(req.body.studentList);
    let company_name = interview.company_name;
    console.log("student is added to company", company_name);
    studentUpdate.companies.push(company_name);
    studentUpdate.interviews.push(req.query.compname);

    studentUpdate.save();

    res.redirect('back');
}


