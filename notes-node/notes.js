const fs = require('fs');

var fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes))
};

var addNotes = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };
    let duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAll = () => {
    return fetchNotes();
}

var removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

var readNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
}

let logNote = (note) => {
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNotes,
    getAll,
    removeNote,
    readNote,
    logNote
}