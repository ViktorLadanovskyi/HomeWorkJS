var students = [
    {name: 'Denis', mark: '3', email: 'someEmailDima@gmail.com', age: 23, isAdmin: true},
    {name: 'Daniel', mark: '3.5', email: 'someEmailDaniel@gmail.com', age: 25, isAdmin: false},
    {name: 'Dina', mark: '4.5', email: 'someEmailDina@gmail.com', age: 24, isAdmin: false},
    {name: 'Anna', mark: '5', email: 'someEmailAnna@gmail.com', age: 22, isAdmin: false},
    {name: 'Nick', mark: '3', email: 'someEmailNick@gmail.com', age: 25, isAdmin: false},
    {name: 'Nicolas', mark: '3.5', email: 'someEmailNicolas@gmail.com', age: 22, isAdmin: true}
];

/*1. отсортированный массив студентов по оценке (от большего к меньшему)
(со звездочкой: если оценки одинаковые, то в алфавитном порядке)*/
students.sort(function(a, b){
    if(a.mark < b.mark){
        return 1;
    }else if(a.mark == b.mark){
        if(a.name > b.name){
            return 1;
        }else{
            return -1;
        }
    }else {
        return -1;
    }
});

//2. массив студентов, у которых isAdmin: true
var arr = students.filter(function (element) {
    return element.isAdmin;
}).map(function (element) {
    return element;
});

console.log(arr);

//3. основываясь на этом массиве, создатть и вывести на экран массив, состоящий из только name и email
arr.map(function (element) {
    return {name: element.name, email: element.email};
});
console.log(arr);

//4. найти среднюю оценку по студентам. использовать reduce для нахождения суммы всех оценок
students.map(function (element) {
    return Number(element.mark);
}).reduce(function (total, amount, index, array) {
    total += amount;
    if( index === array.length-1) {
        return total/array.length;
    }else{
        return total;
    }
});
