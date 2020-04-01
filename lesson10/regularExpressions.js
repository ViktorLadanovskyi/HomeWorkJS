const getIdValue = () => {
    return $('#regular').val();
};

/*1. прислать функцию, которая проверяет, соответствует ли переданная строка формату времени (23:20, к примеру)*/
const checkTime = () =>{
    let simbolOfTime = /\d{2}:\d{2}/g;
    return simbolOfTime.test(getIdValue());
};

checkTime();

/*2. написать функцию, которая удаляет все лишние пробелы между словами.
  на вход - строка с предложением, на выход - строка с удаленными лишними пробелами*/

const replaceText = () =>{
    return getIdValue().replace(/\s/g, '');
};

replaceText();

/*3. функция, которая проверяет, является ли строка ссылкой
 (начинается с http://, https://, www., содержит точку в последней части)*/
const checkIsLink = () =>{
    let simbolOfLinks = /(http:\/\/|https:\/\/|www\.)\w+\./gi;
    return simbolOfLinks.test(getIdValue());
};

checkIsLink();