const fs = require('fs');

function writeFileFinished(err){
    if(err) console.log(err);
}

class FileStuff {
    constructor(filename){
        this.filename = filename;
        this.data = this.update();
    }

    update(){
        this.data = JSON.parse(fs.readFileSync(`${__dirname}/../datafiles/${this.filename}`));
        return this.data;
    }

    change(newData){
        this.data = newData;
        fs.writeFile(`${__dirname}/../datafiles/${this.filename}`, JSON.stringify(this.data, null, 2), writeFileFinished);
    }
}

module.exports = {
    FileStuff: FileStuff
};