"use strict";
var Table = require('cli-table');
var colors = require('colors');
class Stats {
    static display() {
        this.statsTable.push(['Connected Clients ', '100']);
        setTimeout(() => this.statsTable.push(['Connected Clients ', '200']), 2000);
        console.log(`${this.statsTable.toString()}`);
    }
}
Stats.statsTable = new Table({
    head: [colors.info('TH 2 label')],
});
exports.Stats = Stats;
