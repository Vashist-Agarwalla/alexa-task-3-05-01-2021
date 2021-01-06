const fs = require("fs");
const { exit } = require("process");
const readline = require("readline");

console.log("1. Add Address");
console.log("2. Delete Address");
console.log("3. View Address");

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question("Enter your choice: ", (Option) => {
    switch (parseInt(Option)) {
        case 1:
            addad();
            break;
        case 2:
            delad();
            break;
        case 3:
            viewad();
            break;
        default:
            console.log("Wrong Option!")
            exit(0);
    }
})

var obj = {
    name: "NULL",
    address: "NULL"
};

function addad(){
    console.log("Adding");
    let dataBuffer = fs.readFileSync("data.json");
    let data = JSON.parse(dataBuffer);
    r1.question("Enter the Address: ", (Add) => {
        r1.question("Enter the name with to which this Address will be saved: ", (Name) => {
            obj.name = Name;
            obj.address = Add;
            data.push(obj);
            console.log(data.length)
            let jsonString = JSON.stringify(data);
            fs.writeFileSync("data.json", jsonString);
            // exit(0);
        });
    });

}

function delad(){
    console.log("DELETING");
    let dataBuffer = fs.readFileSync("data.json");
    let data = JSON.parse(dataBuffer);
    let final = [];
    r1.question("Enter the name whose address would you like to delete: ", (Name) => {
        for(let i=0 ; i<data.length ; i++) {
            if(data[i].name !== Name){
                final.push(data[i]);
            }
        }
        let jsonString = JSON.stringify(final);
        fs.writeFileSync("data.json", jsonString);
        exit(0);
    })
}

function viewad(){
    console.log("View")
    let dataBuffer = fs.readFileSync("data.json");
    console.table(JSON.parse(dataBuffer.toString()))
    exit(0);
}