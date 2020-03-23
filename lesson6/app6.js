let getCountries = () =>{
    $('.get-countries').attr('disabled', 'disabled');

    $.ajax({
        url: 'https://restcountries.eu/rest/v2/all',
        success: data => {
            console.log(data);
            renderTable(data);
            $('.get-countries').removeAttr('disabled');
        },
        error: errorStr => {
            console.log(errorStr);
            $('.get-countries').removeAttr('disabled');
        }
    });
};

const renderTable = countries => {
    console.table(countries);
    let countriesToRender = countries.map(country => {
        return { name, capital, population, area } = country;
    });
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

    $('#hello').html(htmlStr);

    let arr = $('td');
    for(var i = 0; i < arr.length; i++){
        console.log(arr[i]);
    }
};

$('.get-countries').on('click', getCountries);