const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: "The body of the note",
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
let command = argv._[0];

if(command === 'add') {
    let note = notes.addNotes(argv.title, argv.body);
    if(note) {
        console.log("Note added");
        notes.logNote(note);
    } else console.log("Note already exist");
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note))
} else if(command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else if (command === 'read') {
    let note = notes.readNote(argv.title);
    if(note){
        console.log('Not found');
        notes.logNote(note);
    } else console.log('Not not found');
} else {
    console.log('Command not found');
}
