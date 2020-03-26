$(document).ready(e =>{

    let storageFunction = function(){
        let countries = [];
        return {
            getCountries: function () {
                return countries;
            },
            setCountries: function (data) {
                countries = data;
            }
        }
    };

    let storage = storageFunction();

    let isCountriesLoaded = false;

    const buildSelect = () => {
        let countries = storage.getCountries();

        let selectStr = `<select class="form-control"><option value="">Не выбрано</option>`;

        for(let country of countries){
            selectStr += `<option value="${country.alpha3Code}">${country.name}</option>`;
        }
        selectStr += `</select>`;

        $('.select-container').html(selectStr);
    };

    const setListeners = () => {
        buildSelect();

        $('select').change(e => {
            if($(e.target).val()){
                for(let item of storage.getCountries()){
                    if(item.alpha3Code === $(e.target).val()){
                        renderTable([item]);
                    }
                }
            }else{
                renderTable(storage.getCountries());
            }

        });

        $('.table-block').click(e => {
            if($(e.target).parents('tbody tr').length){
                $('.red-tr').removeClass('red-tr');
                $(e.target).parents('tbody tr').addClass('red-tr');
            }else if($(e.target).data('sort')){
                let field = $(e.target).data('sort');
                let sortedCountries = storage.getCountries().sort((a, b) => {
                    if(field === 'name'){
                        return b[field] < a[field];
                    }else if(field === 'population'){
                        return b[field] > a[field];
                    }
                });
                renderTable(sortedCountries);
            }
        });

        $('input').removeClass('hidden');

        let timeout = null;

        $('input').on('keyup', e => {
            if (!timeout) {
                timeout = setTimeout(() => {
                    let value = $(e.currentTarget).val().trim().toLowerCase();
                    let allCountries = storage.getCountries();
                    let neededCountries = allCountries.filter(el => {
                        return el.name.toLowerCase().indexOf(value) > -1;
                    });
                    renderTable(neededCountries);
                    timeout = null;
                }, 1000);
            }
        });
    };

    const getBorders = (borders) => {
        let resBorders = [];
        let countries = storage.getCountries();
        for(let i of borders){
            for(let country of countries){
                if(country.alpha3Code === i){
                    resBorders.push(country.name);
                }
            }
        }
        return resBorders.join(', ');
    };

    const renderTable = countries => {

        let htmlStr = `<table class="table table-bordered text-center">
        <thead>
        <tr><td data-sort="name">Name</td><td><b>Capital</b></td><td data-sort="population">Population</td><td><b>Area</b></td><td><b>Currency</b></td><td><b>Borders</b></td></tr>
        </thead>
        <tbody>`;

        if(!countries.length){
            htmlStr += `<tr><td colspan="4">Не найдено</td></tr>`;
        }

        for(country of countries){
            let tempCurrencies = country.currencies.map(e => e.name);
            let tempBorders = getBorders(country.borders);
            htmlStr += `<tr>
            <td>${country.name || 'Нет данных'}</td>
            <td>${country.capital || 'Нет данных'}</td>
            <td>${country.population || 'Нет данных'}</td>
            <td>${country.area || 'Нет данных'}</td>
            <td>${tempCurrencies.join(', ') || 'Нет данных'}</td>
            <td>${tempBorders || 'Нет данных'}</td>
        </tr>`;
        }

        htmlStr += `</tbody></table>`;

        $('.table-block').html(htmlStr);

        if(!isCountriesLoaded){
            setListeners();
            isCountriesLoaded = true;
        }
    };

    let getCountries = () =>{
        $('.get-countries').attr('disabled', 'disabled');

        if(localStorage.getItem('currencies')){
            let data = JSON.parse(localStorage.getItem('currencies'));
            storage.setCountries(data);
            renderTable(data);
            $('.get-countries').removeAttr('disabled');
        }else{
            $.ajax({
                url: 'https://restcountries.eu/rest/v2/all',
                success: data => {
                    data = data.map(country => {
                        return { name, capital, pupulation, area, alpha3Code, currencies, borders} = country;
                    });
                    localStorage.setItem('currencies', JSON.stringify(data));
                    storage.setCountries(data);
                    renderTable(data);
                    $('.get-countries').removeAttr('disabled');
                },
                error: errorStr => {
                    console.log(errorStr);
                    $('.get-countries').removeAttr('disabled');
                }
            });
        }
    };

    $('input').addClass('hidden');

    $('.get-countries').on('click', getCountries);
});