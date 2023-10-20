const Student = require('../model/student')

let controller = {
    getStudents: function(req, res, next){
        res.status(200).json(Student.getAll());
    },
    getStudentById: function(req, res, next){
        let id = parseInt(req.params.id);
        let student = Student.getById(id);
        if(student){
            res.status(200).json(student);
        } else{
            res.status(404).json({ message: "student not found."});
        }
    },
    createStudent: function(req, res, next){
        let { id, name, program } = req.body;

        if(id && name && program){
            let newId = parseInt(id);
            let student = Student.getById(newId);
            if(student) {
                res.status(400).json({message: "Student Id existed."});
            } else{
                let newStudent = new Student(newId, name, program);
                newStudent.create();
                res.status(201).json(newStudent);
            }
        } else {
            res.status(400).json({message: "Provide all data."});
        }
    },
    deleteStudent: function(req, res, next){
        let id = parseInt(req.params.id);

        let deletedStudent = Student.removeById(id);
        if(deletedStudent){
            res.status(200).json(deletedStudent);
        } else{
            res.status(404).json({ message: "student not found."});
        }
    },
    updateStudent: function(req, res, next){
        let id = parseInt(req.params.id);

        let updatedStudent = new Student(req.params.id, req.body.name, req.body.program).update();
        if(updatedStudent){
            res.status(200).json(updatedStudent);
        } else{
            res.status(404).json({ message: "student not found."});
        }
    },
    filterByProgram: function(req, res, next){
        res.status(200).json(Student.filterByProgram(req.query.searchKey));
    }
}

module.exports = controller;