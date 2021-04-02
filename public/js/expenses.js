"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.items = [];
    }
    ArrayList.prototype.add = function (item) {
        this.items.push(item);
    };
    ArrayList.prototype.get = function (idx) {
        var item = this.items.filter(function (_, i) { return i === idx; });
        if (item.length)
            return item[0];
        return null;
    };
    ArrayList.prototype.createFrom = function (value) {
        this.items = __spreadArray([], value);
    };
    ArrayList.prototype.getAll = function () {
        return this.items;
    };
    return ArrayList;
}());
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0;
        this.finalCurrency = currency;
        this.expenses = new ArrayList();
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    };
    Expenses.prototype.get = function (idx) {
        return this.expenses.get(idx);
    };
    Expenses.prototype.getItems = function () {
        return this.expenses.getAll();
    };
    Expenses.prototype.convertCurrency = function (item, currency) {
        switch (item.cost.currency) {
            case 'USD':
                if (currency === 'ARS')
                    return item.cost.amount * 91.67;
                return item.cost.amount;
            default:
                if (currency === 'USD')
                    return item.cost.amount / 91.67;
                return item.cost.amount;
        }
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        var total = this.expenses
            .getAll()
            .reduce(function (acc, el) {
            return acc + _this.convertCurrency(el, _this.finalCurrency);
        }, 0);
        return this.finalCurrency + " $" + total.toFixed(2).toString();
    };
    Expenses.prototype.remove = function (id) {
        var items = this.getItems().filter(function (el) {
            return el.id !== id;
        });
        this.expenses.createFrom(items);
        return true;
    };
    return Expenses;
}());
