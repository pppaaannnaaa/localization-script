const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');

async function localizeSheet(tempfile, foldername) {
    let newFile = {};
    const key = tempfile[0].splice(1, tempfile[0].length);
    let indexFile = [];
    key.forEach(el=>{
        const data = el.split('_');
        indexFile.push({name: data[0], code: data[1]});
    })
    
    if (!fs.existsSync(`./localization/${foldername}`)){
        fs.mkdirSync(`./localization/${foldername}`);
    }
    for (let j = 0; j < key.length; j += 1) {
        newFile[key[j]] = {};
    }
    for (let i = 1; i < tempfile.length; i += 1) {
        for (let j = 0; j < key.length; j += 1) {
            newFile[key[j]][tempfile[i][0]] = tempfile[i][j + 1];
        }
    }
    for (let k = 0; k < key.length; k += 1) {
        fs.writeFile(`./localization/${foldername}/${key[k].split("_")[0]}.json`, JSON.stringify(newFile[key[k]], null, 4), 'utf8', (data) => {
            // console.log('file written', `./localization/${key[k]}.json`)
        });
    }
    fs.writeFile(`./localization/${foldername}/index.json`, JSON.stringify(indexFile, null, 4), 'utf8', (data) => {
        // console.log('file written', `./localization/${key[k]}.json`)
    });
}

async function localize() {
    // console.log(process.argv);
    const sheets = await readXlsxFile(process.argv[2]||'local.xlsx',{ getSheets: true });
    console.log(sheets);
    sheets.forEach(el => {
        readXlsxFile(process.argv[2]||'local.xlsx',{ sheet: el.name }).then(tempfile=>{
            localizeSheet(tempfile, el.name)
        });
    });
    
    return 0;
}

localize();