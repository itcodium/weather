const fs = require('fs');
const path = require('path');

module.exports = {
    status: {
        credencialPath: "",
        folderPath: ""
    },
    deleteFolderFiles: function () {
        fs.readdir(this.status.folderPath, (err, files) => {
            if (err) {
                throw err;
            }
            for (const file of files) {
                fs.unlink(path.join(this.status.folderPath, file), err => {
                    if (err) throw err;
                });
            }
        });
    },
    saveToFile: function (file, data) {
        var options = { encoding: 'utf-8', flag: 'w' };
        fs.writeFileSync(file, data, options);
    },

};
