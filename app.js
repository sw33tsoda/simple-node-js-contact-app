var readline = require('readline-sync');
var fs = require('fs');
const utf8 = require('utf8');

var contacts = [];

function menu() {
    while (true) {
        console.log('0. Danh sách danh bạ');
        console.log('1. Thêm danh bạ');
        console.log('2. Sửa danh bạ');
        console.log('3. Xóa danh bạ');
        console.log('4. Tìm kiếm danh bạ');
        console.log('5. Lưu file');
        console.log('6. Load file');
        console.log('7. Thoát');
        var selection = readline.question("Bạn chọn gì ?");
        switch (parseInt(selection)) {
            case 0: list(); break;
            case 1: add(); break;
            case 2: update(); break;
            case 3: remove(); break;
            case 4: find(); break;
            case 5: save(); break;
            case 6: load(); break;
            case 7: console.log('Tiến hành thoát...');break;
            default:console.log('Không hợp lệ !'); break;
        }
        if (selection == 7) break;
    }
}

function list() {
    if (contacts.length > 0)
        for (var contact of contacts) {
            console.log('Tên : ' + contact.name + ',' + 'SĐT : ' + contact.phone);
        }
    else console.log('Chưa có danh bạ nào !');
}

function add() {
    var name = readline.question("Nhập tên : ");
    var phone = readline.questionInt("Nhập SĐT : ");
    contacts.push({
        name:name,
        phone:phone,
    });
}

function update() {
    var name = readline.question("Nhập tên : ");
    contacts.find(function(contact){
        if (name === contact.name) {
            contact.name = readline.question("Nhập tên mới : ");
            contact.phone = readline.questionInt("Nhập SĐT mới : ");
        }
    });
}

function remove() {
    var name = readline.question("Nhập tên : ");
    contacts = contacts.filter(function(contact){
        return contact.name !== name;
    });
}

function find() {
    var name = readline.question("Nhập tên : ");
    var result = contacts.find(function(contact){
        return name === contact.name;
    });
    console.log('Tên : ' + result.name + ',' + 'SĐT : ' + result.phone);
}

function save() {
    var data = JSON.stringify(contacts);
    fs.writeFileSync('./contact_data/data.json',data);
}

function load() {
    try {
        if (fs.existsSync('./contact_data/data.json')) {
            var data = JSON.parse(fs.readFileSync('./contact_data/data.json'));
            contacts = data;
        } else {
            console.log('file không tồn tại');
        }
    } catch(err) {
        console.error(err)
    }
}

function main() {

    menu();
}

main();