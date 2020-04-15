const fs = require('fs');

async function localize() {
    // console.log(process.argv);
    const readXlsxFile = require('read-excel-file/node');
    let newFile = {};
    const tempfile = await readXlsxFile(process.argv[2]||'local.xlsx');
    const key = tempfile[0].splice(1, tempfile[0].length);
    for (let j = 0; j < key.length; j += 1) {
        newFile[key[j]] = {};
    }
    for (let i = 1; i < tempfile.length; i += 1) {
        for (let j = 0; j < key.length; j += 1) {
            newFile[key[j]][tempfile[i][0]] = tempfile[i][j + 1];
        }
    }
    for (let k = 0; k < key.length; k += 1) {
        fs.writeFile(`./localization/${key[k]}.json`, JSON.stringify(newFile[key[k]], null, 4), 'utf8', (data) => {
            console.log('file written', `./localization/${key[k]}.json`)
        });
    }
    
    return newFile;
}

localize();