const express = require('express')
const app = express()
const port = 3000;
const fs = require('fs');
const path = require('path');


app.use('/static', express.static(path.resolve(__dirname, './static')));

app.get('/:path/:id', (req, res) => {
    let file = path.resolve(__dirname, `./controllers/${req.params.path}/${req.params.id}.json`);
    fs.readFile(file, (err, data) => {
        if(err)
            res.status(404).send('Sorry cant find that!');
        else{
            let response = JSON.parse(data);
            res.json(response);
        }
    });
});

app.get('/:path', (req, res) => {
    let jsons = [];
    let dir = path.resolve(__dirname, `./controllers/${req.params.path}`);
    fs.readdir(dir, (err, files) => {
        console.log(files);
        for(let key in files){
            let file = files[key];
            if(/\.json$/.test(file)){
                fs.readFile(path.resolve(dir, file), (err, data) => {
                    if(!err)
                        jsons.push(JSON.parse(data));
                    if(key == files.length - 1){
                        if(jsons.length === 1)
                            res.json(jsons[0]);
                        else
                            res.json(jsons);
                    }
                });
            }
        }
    });
    for(let key of jsons){
        let json = jsons[key];

    }
});


app.listen(port, () => console.log(`Fake app listening at http://localhost:${port}`))