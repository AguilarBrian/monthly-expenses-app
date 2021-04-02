"use strict";
var inputTitle = document.querySelector('#title');
var inputCost = document.querySelector('#cost');
var selectCurrency = document.querySelector('#currency');
var buttonAdd = document.querySelector('#bAdd');
var expenses = new Expenses('USD');
var render = function () {
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var amount = cost.amount, currency = cost.currency;
        html += "\n                    <div class='item'>\n                        <div><span class='currency'>" + currency + "</span> $" + amount + "</div>\n                        <div>" + title + "</div>\n                        <div><button class='buttonDel' data-id='" + id + "'>DELETE</button></div>\n                    </div>\n                ";
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.buttonDel').forEach(function (b) {
        b.addEventListener('click', function (e) {
            var id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
    function $(selector) {
        return document.querySelector(selector);
    }
    function $$(selector) {
        return document.querySelectorAll(selector);
    }
};
render();
buttonAdd.addEventListener('click', function (e) {
    if (inputTitle.value !== '' &&
        inputCost.value !== '' &&
        !isNaN(parseFloat(inputCost.value))) {
        var title = inputTitle.value;
        var cost = parseFloat(inputCost.value);
        var currency = selectCurrency.value;
        expenses.add({ title: title, cost: { amount: cost, currency: currency } });
        render();
    }
    else {
        alert('Please, fill in the details correctly');
    }
});
