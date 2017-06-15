// var obj = {
//     name: 'Salim'
// };
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name": "Salim","age": 25}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
    title: 'Some title',
    body: 'Some body'
}
var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('note.json', originalNoteString);

var noteString = fs.readFileSync('note.json');
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title); 