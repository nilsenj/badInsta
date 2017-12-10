"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var colors = require("colors");
var echo = require('./../../dist');
var inquirer = require('inquirer');
var crypto = require('crypto');
var CONFIG_FILE = process.cwd() + '/laravel-echo-server.json';
var Cli = (function () {
    function Cli() {
        this.defaultOptions = echo.defaultOptions;
    }
    Cli.prototype.init = function (yargs) {
        var _this = this;
        this.setupConfig().then(function (options) {
            options = Object.assign({}, _this.defaultOptions, options);
            if (options.addClient) {
                var client = {
                    appId: _this.createAppId(),
                    key: _this.createApiKey()
                };
                options.clients.push(client);
                console.log('appId: ' + colors.magenta(client.appId));
                console.log('key: ' + colors.magenta(client.key));
            }
            _this.saveConfig(options).then(function () {
                console.log('Configuration file saved. Run ' + colors.magenta.bold('laravel-echo-server start') + ' to run server.');
                process.exit();
            }, function (error) {
                console.error(colors.error(error));
            });
        }, function (error) { return console.error(error); });
    };
    Cli.prototype.setupConfig = function () {
        return inquirer.prompt([
            {
                name: 'devMode',
                default: false,
                message: 'Do you want to run this server in development mode?',
                type: 'confirm'
            }, {
                name: 'port',
                default: '6001',
                message: 'Which port would you like to serve from?'
            }, {
                name: 'database',
                message: 'Which database would you like to use to store presence channel members?',
                type: 'list',
                choices: ['redis', 'sqlite']
            }, {
                name: 'authHost',
                default: 'http://localhost',
                message: 'Enter the host of your Laravel authentication server.',
            }, {
                name: 'protocol',
                message: 'Will you be serving on http or https?',
                type: 'list',
                choices: ['http', 'https']
            }, {
                name: 'sslCertPath',
                message: 'Enter the path to your SSL cert file.',
                when: function (options) {
                    return options.protocol == 'https';
                }
            }, {
                name: 'sslKeyPath',
                message: 'Enter the path to your SSL key file.',
                when: function (options) {
                    return options.protocol == 'https';
                }
            }, {
                name: 'addClient',
                default: false,
                message: 'Do you want to generate a client ID/Key for HTTP API?',
                type: 'confirm'
            }
        ]);
    };
    Cli.prototype.saveConfig = function (options) {
        var _this = this;
        var opts = {};
        Object.keys(options).filter(function (k) {
            return Object.keys(_this.defaultOptions).indexOf(k) >= 0;
        }).forEach(function (option) { return opts[option] = options[option]; });
        return new Promise(function (resolve, reject) {
            if (opts) {
                fs.writeFile(CONFIG_FILE, JSON.stringify(opts, null, '\t'), function (error) { return (error) ? reject(error) : resolve(); });
            }
            else {
                reject('No options provided.');
            }
        });
    };
    Cli.prototype.start = function (yargs) {
        var dir = yargs.argv.dir ? yargs.argv.dir.replace(/\/?$/, '/') : null;
        var configFile = dir ? dir + 'laravel-echo-server.json' : CONFIG_FILE;
        fs.access(configFile, fs.F_OK, function (error) {
            if (error) {
                console.error(colors.error('Error: laravel-echo-server.json file not found.'));
                return false;
            }
            var options = JSON.parse(fs.readFileSync(configFile, 'utf8'));
            options.devMode = yargs.argv.dev || options.devMode || false;
            echo.run(options);
        });
    };
    Cli.prototype.getRandomString = function (bytes) {
        return crypto.randomBytes(bytes).toString('hex');
    };
    Cli.prototype.createApiKey = function () {
        return this.getRandomString(16);
    };
    Cli.prototype.createAppId = function () {
        return this.getRandomString(8);
    };
    Cli.prototype.clientAdd = function (yargs) {
        var options = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        var appId = yargs.argv._[1] || this.createAppId();
        options.clients = options.clients || [];
        if (appId) {
            var index = null;
            var client = options.clients.find(function (client, i) {
                index = i;
                return client.appId == appId;
            });
            if (client) {
                client.key = this.createApiKey();
                options.clients[index] = client;
                console.log(colors.green('API Client updated!'));
            }
            else {
                client = {
                    appId: appId,
                    key: this.createApiKey()
                };
                options.clients.push(client);
                console.log(colors.green('API Client added!'));
            }
            console.log(colors.magenta('appId: ' + client.appId));
            console.log(colors.magenta('key: ' + client.key));
            this.saveConfig(options);
        }
    };
    Cli.prototype.clientRemove = function (yargs) {
        var options = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        var appId = yargs.argv._[1] || null;
        options.clients = options.clients || [];
        var index = null;
        var client = options.clients.find(function (client, i) {
            index = i;
            return client.appId == appId;
        });
        if (index >= 0) {
            options.clients.splice(index, 1);
        }
        console.log(colors.green('Client removed: ' + appId));
        this.saveConfig(options);
    };
    return Cli;
}());
exports.Cli = Cli;
