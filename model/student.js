let students = [{id: 616944, name: "Hieu Tran", program: "Compro"},
                {id: 616940, name: "Victor Nguyen", program: "Compro"},
                {id: 617321, name: "Sandra Smith", program: "MBA"}];

class Product {
    constructor(id, name, program){
        this.id = id;
        this.name = name;
        this.program = program;
    }
    static getAll() {
        return students;
    }
    static getById(id){
        return students.find(o => o.id === id);
    }
    create() {
        students.push(this);
    }
    static removeById(id) {
        let index = students.findIndex(o => o.id === id);
        let deletedStudent;
        if(index > -1){
            deletedStudent = students[index];
            students.splice(index, 1);
        }
        return deletedStudent;
    }
    update(refId) {
        let index = students.findIndex(o => o.id === refId);
        console.log(index);
        if(index > -1){
            students.splice(index, 1, this);
            return this;
        }
        console.log(students);
        return this;
    }
    static filterByProgram(searchKey){
        return students.filter(o => o.program.toLowerCase().includes(searchKey.toLowerCase()));
    }
}

module.exports = Product