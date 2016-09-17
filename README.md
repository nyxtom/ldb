# ldb

Simple command line repl for leveldb databases

## Installation

```
npm install -g ldb-repl
```

## Usage

If you have a leveldb database, simply load the utility with:

```
ldb-repl ~/mydatabase.ldb
```

The directory above is the name of the directory for the leveldb database.


## Help/commands

This utility is built using the `repl` package from `node`. The following commands are
available within this utility by using the `.help` `.` prefixed command syntax.

```
/Users/nyxtom/_data.ldb> .help
break	Sometimes you get stuck, this gets you out
clear	Break, and also clear the local context
count	count: show the number of records in the database
del	del: removes a key from the leveldb database
editor	Entering editor mode (^D to finish, ^C to cancel)
exit	Exit the repl
get	get: obtains the value of the given key from the database
help	Show repl options
keys	keys: show the list of keys in the database
load	Load JS from a file into the REPL session
save	Save all evaluated commands in this REPL session to a file
size	size: show the total size in bytes of the database
sstables	sstables: obtains the leveldb sstables
stats	stats: obtains the leveldb stats from the underlying database
values	Show the list of values in the leveldb database
```

## LICENCE

The MIT License (MIT)

Copyright (c) 2016 Thomas Holloway

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
