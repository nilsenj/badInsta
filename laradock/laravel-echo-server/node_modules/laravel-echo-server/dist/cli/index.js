"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var cli_1 = require("./cli");
var cli = new cli_1.Cli();
var argv = yargs.usage("$0 command")
    .command("init", "Initialize server with a config file.", function (yargs) { return cli.init(yargs); })
    .command("client:add", "Register a client that can make api requests.", function () { return cli.clientAdd(yargs); })
    .command("client:remove", "Remove a client that has been registered.", function (yargs) { return cli.clientRemove(yargs); })
    .command("start", "Start up the server.", cli.start)
    .demand(1, "Please provide a valid command.")
    .help("h")
    .alias("h", "help")
    .argv;
