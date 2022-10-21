const { error } = require('console');
var net = require('net');
const {argv} = require('process')

//help for execution of scanner
if(argv[2] === '-h'){
    console.log("{HOST} {PORT}: Port range from 1 to n")
    console.log("{-a}: to scan all ports")
}

if(argv[2] === undefined){
    console.log("{-h}: to show help")
}

const Host = argv[2]
const startPort = argv[3]
const endPort = argv[4]


//main function
async function scan(){
        
    let host = Host
    let start = startPort
    let stop = endPort
    
    //when Range of ports is declared
    if(typeof stop !== 'number'){
        for(let port = start; port <= stop; port++){
            try{
                await connect(host, port);
                console.log(`Port ${port} open`);
            }catch(e){
                console.error(e);

            }
        }
    }
    
    //when Range of ports is not decalred
    try{
        await connect(host, startPort);
        console.log(`Port ${startPort} open`);
    }catch(e){
        console.error(e);
    }

    console.log('Scan complete');
}

// function which actually scans the ports
async function connect(host, port){
    return new Promise((res, rej) => {
        net.connect({host : host, port: port}, () => {
           res(true);
        }).on("error", err => {
            rej(err);
        });
    });
}

scan();