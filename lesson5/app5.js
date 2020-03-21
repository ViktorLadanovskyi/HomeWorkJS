let getCountries = () =>{
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://restcountries.eu/rest/v2/all', false);

    xhr.send();

    if (xhr.status != 200) {
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода -- 404: Not
    } else {
        renderTable(JSON.parse(xhr.responseText)); //responseText -- текст ответа
    }
};

const renderTable = countries => {
    console.table(countries);
    let countriesToRender = countries.map(country => ({
        name: country.name,
        capital: country.capital,
        population: country.population,
        area: country.area
    }));
    console.table(countriesToRender);
    let htmlStr = `<table class="table table-bordered">
        <thead>
        <tr><td>Name</td><td>Capital</td><td>Population</td><td>Area</td></tr>
        </thead>
        <tbody>`;

    for(country of countriesToRender){
        htmlStr += `<tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.population}</td>
            <td>${country.area}</td>
        </tr>`;
    }

    htmlStr += `</tbody></table>`;

    document.getElementById('hello').innerHTML = htmlStr;

    let arr = document.getElementsByTagName('td');
    for(var i = 0; i < arr.length; i++){
        console.log(arr[i]);
    }
};

document.getElementsByClassName('get-countries')[0].onclick = getCountries;