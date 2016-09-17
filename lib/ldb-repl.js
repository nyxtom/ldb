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

    r.defineCommand('get', {
        help: 'get: obtains the value of the given key from the database',
        action: function (key) {
            this.lineParser.reset();
            this.bufferedCommand = '';
            db.get(key, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                }

                this.displayPrompt();
            });
        }
    });

    r.defineCommand('stats', {
        help: 'stats: obtains the leveldb stats from the underlying database',
        action: function () {
            this.lineParser.reset();
            this.bufferedCommand = '';
            console.log(db.db.getProperty('leveldb.stats'));
            this.displayPrompt();
        }
    });

    r.defineCommand('sstables', {
        help: 'sstables: obtains the leveldb sstables',
        action: function () {
            this.lineParser.reset();
            this.bufferedCommand = '';
            console.log(db.db.getProperty('leveldb.sstables'));
            this.displayPrompt();
        }
    })

    r.defineCommand('count', {
        help: 'count: show the number of records in the database',
        action: function () {
            this.lineParser.reset();
            this.bufferedCommand = '';
            var stream = db.createReadStream();
            var count = 0;
            stream.on('data', (data) => {
                count++;
            }).on('error', (err) => {
                console.error(err);
            }).on('close', () => {
                console.log(count);
                this.displayPrompt();
            });
        }
    });

    r.defineCommand('size', {
        help: 'size: show the total size in bytes of the database',
        action: function () {
            this.lineParser.reset();
            this.bufferedCommand = '';
            var stream = db.createReadStream();
            var first = '';
            var last = '';
            stream.on('data', (data) => {
                if (!first) {
                    first = data.key;
                }
                last = data.key;
            }).on('error', (err) => {
                console.error(err);
            }).on('close', () => {
                db.db.approximateSize(first, last, (err, size) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(size);
                    }
                    this.displayPrompt();
                });
            });
        }
    });

    r.defineCommand('keys', {
        help: 'keys: show the list of keys in the database',
        action: function () {
            this.lineParser.reset();
            this.bufferedCommand = '';
            var stream = db.createReadStream();
            var first = '';
            var last = '';
            stream.on('data', (data) => {
                console.log(`\"${data.key}\"`);
            }).on('error', (err) => {
                console.error(err);
            }).on('close', () => {
                this.displayPrompt();
            });
        }
    });

    r.defineCommand('values', {
        help: 'Show the list of values in the leveldb database',
        action: function() {
            this.lineParser.reset();
            this.bufferedCommand = '';
            var stream = db.createReadStream();
            stream.on('data', (data) => {
                console.log(data.value);
            }).on('error', (err) => {
                console.error(err);
            }).on('close', () => {
                this.displayPrompt();
            });
        }
    });

    r.context.db = db;
});
