/**
 * ldb
 * A command line utility for leveldb backed databases.
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 Thomas Holloway <nyxtom@gmail.com>
 */

var args = require('minimist')(process.argv);
var repl = require('repl');
var os = require('os');
var path = require('path');
var levelup = require('levelup');
var leveldown = require('leveldown');
var Debug = require('debug');

var debug = new Debug('ldb');

if (args.help || args.h || args._.length < 3) {
    console.log("Usage: ldb dir");
    return;
}

var dir = args._[2];
levelup(dir, {}, (err, db) => {
    if (err) {
        console.error(err);
        return;
    }

    var name = path.basename(dir);
    var r = repl.start({
        prompt: `${dir}> `,
        input: process.stdin,
        output: process.stdout,
        colors: true
    });

    r.context.db = db;
    r.context.count = function () {
        var stream = db.createReadStream();
        var count = 0;
        stream.on('data', (data) => {
            count++;
        }).on('error', (err) => {
            console.error(err);
        }).on('close', () => {
            console.log(count);
        });
    };
});
