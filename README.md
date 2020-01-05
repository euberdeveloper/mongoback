[![Build Status](https://travis-ci.org/euberdeveloper/mongoback.svg?branch=master)](https://travis-ci.org/euberdeveloper/mongoback)
[![Coverage Status](https://coveralls.io/repos/github/euberdeveloper/mongoback/badge.svg?branch=master)](https://coveralls.io/github/euberdeveloper/mongoback?branch=master)
[![Codecov Status](https://codecov.io/gh/euberdeveloper/mongoback/branch/master/graph/badge.svg)](https://codecov.io/gh/euberdeveloper/mongoback)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/mongoback/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/mongoback?targetFile=package.json)
[![dependencies Status](https://david-dm.org/euberdeveloper/mongoback/status.svg)](https://david-dm.org/euberdeveloper/mongoback)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/mongoback.svg)](https://github.com/euberdeveloper/mongoback/issues)
[![License](https://img.shields.io/npm/l/mongoback.svg?color=blue)](https://github.com/euberdeveloper/mongoback/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/euberdeveloper/mongoback.svg)](https://github.com/euberdeveloper/mongoback/stargazers)
![npm](https://img.shields.io/npm/v/mongoback.svg)

# mongoback
The most powerful npm module to export your MongoDB.

This is a wrapper of the **mongoexport** tool and comes because of the annoy of typing 
everything in the command line, repeating the task for every collection to export.

This module allows to call it in a more comfortable way and to export **multiple** collections at a time. It allows you to select collections in a powerful way and saves the exported files in an organized and customizable directory.

## Install

Before installing mongoback, you need the `mongoexport` installed and its path added to the envinronments variables. This should automatically happen when installing **MongoDB**.

To install mongoback as a local module:

```bash
$ npm install mongoback
```

## Usage (local module)

### A first example

This tiny code (main.js):

```js
const { mongoExport } = require('mongoback');
const options = { all: true };

await mongoExport(options);
```

Will result in this:

...video...

And the created exported directory will be like this:

```
exported
 ├─> 12345
 │   ├── first.json
 │   └── second.json
 └─> animals
     ├── cats.json
     ├── dogs.json
     ├── horses.json
     ├── lions.csv
     ├── pinguins.json
     └── tigers.csv
```

### Features

The module allows you to:
* Specify all the mongodb __connection__ uri and options
* Specify in a powerful way the __collections__ to export
* By using __RegExp__ and __functions__, export collections you do not know they exist
* Specify in a powerful way all the __mongoexport options__ for each collection
* Specify in a powerful way in which __path__ end with which __file name__ will every collection be saved
* Specify the output __directory__ and its __structure__
* Specify if and how show the function __logs__
* Specify if an __error__ will be thrown in case not all collections can be fetched/exported

### How it works

The module:
* Checks if mongoexport is installed
* Parses the options and, connecting to the mongodb, gets all the name of the collections that you want to export
* By calling mongoexport, exports the collections and saves them in a directory structure customizable by the options
* Returns an object containing information about what has been exported

To learn well to use the module, it is suggested to see the examples below before reading the API.

## Examples

### Specify the mongodb connection


#### This will export all the collections in `mongodb://myhost:27017`.

```js
const { mongoExport } = require('mongoback');
const options = { 
    uri: 'mongodb://user:secret@myhost:27017',
    all: true 
};

await mongoExport(options);
```

#### This will export all the collections in `mongodb://myhost:8080`

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    all: true 
};

await mongoExport(options);
```

#### This will add username and password:

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    username: 'me',
    password: 'secret',
    auhenticationDatabase: 'administrator',
    all: true 
};

await mongoExport(options);
```

#### This will add srv (`mongodb+srv//myhost:8080`):

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    srv: true,
    all: true 
};

await mongoExport(options);
```

#### This will use a replica set connection:

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: [
        { host: 'localhost', port: 27017 },
        { host: 'myhost': port: 23023 }
    ],
    replicaSetName: 'replicas',
    all: true 
};

await mongoExport(options);
```

### Specify what is to be exported

#### This will export all the collections in `mongodb://localhost:27017`:

```js
const { mongoExport } = require('mongoback');
const options = { all: true };

await mongoExport(options);
```

#### This will export all the collections of database `animals`:

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: 'animals'
};

await mongoExport(options);
```

#### This will export all the databases beginning with `test`:

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: /^test/
};

await mongoExport(options);
```

#### This will export the `animals` database and the ones beginning with `test`:

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: ['animals', /^test/]
};

await mongoExport(options);
```

#### This will export all the databases beginning with `test`. Every exported collection will have also the `--jsonArray` mongoexport option.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: { 
        databases: /^test/, 
        jsonArray: true 
    }
};

await mongoExport(options);
```

#### This will export the `animals` database and the ones beginning with `test`. All collections exported by the animals database will have also the `--jsonArray` mongoexport option.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: [
        /^test/,
        { databases: 'animals', jsonArray: true }
    ]
};

await mongoExport(options);
```

#### This will export the database `animals` and all the databases whose length is `4` 

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: [
        'animals',
        (db) => (db.length === 4)
    ]
};

await mongoExport(options);
```

#### This will export all the databases whose length is `4`, adding the `--pretty` and `--limit=5` mongoexport options to each of them. 

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: function(db) {
        if (db.length === 4) {
            return {
                pretty: true,
                limit: 5
            };
        }
    }
};

await mongoExport(options);
```

#### This will export all the collections. The ones of the database `animals` will be the only one to be of type `json`. This is because the exporting options specified inside databases overwrite the general ones.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    type: 'csv',
    fields: ['timestamp', 'name'],
    databases: {
        databases: 'animals',
        type: 'json'
    }
};

await mongoExport(options);
```

#### This will export all the collections (in any database) whose name is `kebab`

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    collections: 'kebab'
};

await mongoExport(options);
```

#### This will export all the collections (in any database) whose name is `kebab` or that begin with `test`

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    collections: ['kebab', /^test/]
};

await mongoExport(options);
```

#### This will export all the collections whose database begins with `a` and whose name is of length greater than `5`. All these collections will have also the `--pretty` mongoexport option.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    collections: function(db, collection) {
        if (db[0] === 'a' && collection.length > 5) {
            return {
                pretty: true
            };
        }
    }
};

await mongoExport(options);
```

#### This will export all the collections in database `animals` and all the collections beginning with `a` or `b`. All the collections have the `--pretty` option. The collections of database `animals` will have the `--jsonFormat=canonical` option. The collections beginning with `a` will have the `--jsonFormat=relaxed` option, even if they are in the database animals. This is because the collections exporting options overwrite the database ones.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    pretty: true,
    databases: {
        databases: 'animals',
        jsonFormat: 'canonical'
    },
    collections: [
        {
            collections: /^a/,
            jsonFormat: 'relaxed'
        },
        /^b/
    ]
};

await mongoExport(options);
```

#### This will export the collections `tiger` and the ones beginning with `c` or `C` of the database `animals`, the collections `students` and `teachers` of the database `people` and the collection `valdagno` of the database `cities`.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    collections: {
        animals: ['tiger', /^c/i],
        people: ['sutdents', 'teachers'],
        cities: 'valdagno'
    }
};

await mongoExport(options);
```

#### This will export the collections `wombats` and the ones whose name length is lower than `5` of the database `animals`.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    collections: {
        animals: [
            'wombats',
            (_db, collection) => collection.length < 5
        ]
    }
};

await mongoExport(options);
```

#### This will export the collections `tigers`, `pinguins` and `bears` of the database `animals` and the collection `students` of the database `people`. Almost all collections will have the ``--pretty` option. All the collections of `animals` will not have the `--jsonArray` option. All the collections of `animals` will have the `--pretty` option, except for `bears`. This is because the exporting options specified in a collection overwrite the ones specified in a database that overwrite the ones specified in the options.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    pretty: true,
    collections: {
        animals: {
            collections: [
                'tigers',
                'pinguins',
                {
                    collections: 'bears',
                    pretty: true
                }
            ],
            pretty: false,
            jsonArray: true
        }
    }
};

await mongoExport(options);
```

#### This will export all the collections of the database `animals`. All the collections will have the `--jsonArray` options, except for the `tigers` and `pinguins` that will have the `--pretty` option instead. 

This is because order of which the collections are exported is:

* collections bound to a database
* collections bound to no database
* databases
* all

If, as in this case, the collections `tigers` and `pinguins` are matched by the `databases` option but are already matched by the `collections` one, they are ignored and the exporting options in `databases` will not worth for them. 

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    databases: {
        databases: 'animals',
        jsonArray: true
    },
    collections: {
        animals: {
            collections:  ['tigers', 'pinguins'],
            pretty: true
        }
    }
};

await mongoExport(options);
```

#### This will export the collections `tigers` and `lions` of the database `animals`, the collection `students` and all the collections beginning with `p` or `s` of the database `people` and all the collections whose database name length is greater than `6` and whose name begins with `t`. All the collections beginning with `p` or `s` of the database `people` will be exported as csv and the `students` one will also have the `--noHeaderLine` option. All the collections whose database name length is greater than `5` and whose collection name begins with `t` will have the `--skip=20` option, except for `tigers` that is already exported without that option.

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    pretty: true,
    collections: [
        {
            animals: ['tigers', 'lions'], 
            people: {
                collections: [
                    {
                        collections: 'students',
                        noHeaderLine: true
                    },
                    /^p/, 
                    /^s/
                ],
                type: 'csv',
                fields: 'timestamp'
            }
        },
        (db, collection) => {
            if (db.length > 6 && collection[0] === 't') {
                return { skip: 20 };
            }
        }
    ]
};

await mongoExport(options);
```

#### This seems exactly the same example of the one directly above, but its result is actually different. In this example, the collection `students` of the database `people` will not have the `--noHeaderLine` option. This is because the order of the elements of an array matters for the `mongoExport` function. I this case, the object containing `noHeaderLine` and bound to the collection `students` of the database `people` comes after the RegExp `/^s/`. Matching that RegExp, `students` will be already exported when the object containing `noHeaderLine` will be considered, hence the object will be ignored. 

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    pretty: true,
    collections: [
        {
            animals: ['tigers', 'lions'], 
            people: {
                collections: [
                    /^p/, 
                    /^s/,
                    {
                        collections: 'students',
                        noHeaderLine: true
                    }
                ],
                type: 'csv',
                fields: 'timestamp'
            }
        },
        (db, collection) => {
            if (db.length > 5 && collection[0] === 't') {
                return { skip: 20 };
            }
        }
    ]
};

await mongoExport(options);
```

#### This seems exactly the same example of the one directly above, but its result is actually different. In this example, the collection `students` of the database `people` will not have the `--noHeaderLine` option. This is because the order of the elements of an array matters for the `mongoExport` function. I this case, the object containing `noHeaderLine` and bound to the collection `students` of the database `people` comes after the RegExp `/^s/`. Matching that RegExp, `students` will be already exported when the object containing `noHeaderLine` will be considered, hence the object will be ignored. 

```js
const { mongoExport } = require('mongoback');
const options = { 
    host: 'myhost',
    port: 8080,
    pretty: true,
    collections: [
        {
            animals: ['tigers', 'lions'], 
            people: {
                collections: [
                    /^p/, 
                    /^s/,
                    {
                        collections: 'students',
                        noHeaderLine: true
                    }
                ],
                type: 'csv',
                fields: 'timestamp'
            }
        },
        (db, collection) => {
            if (db.length > 5 && collection[0] === 't') {
                return { skip: 20 };
            }
        }
    ]
};

await mongoExport(options);
```

This will export all the collections, including even the system collections.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    systemCollections: true
};

await mongoExport(options);
```

### Specify errors and warning options

#### This will export all the collections. An error will be thrown wether it was not possible (probably for lack of permissions) to list the databases or the collections of a database. Usually, when this happens, those collections are ignored and all what could be fetched are exported.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    throwIfLackOfPermissions: true
};

await mongoExport(options);
```

#### This will export all the collections. An error will be thrown wether there was an error in one of the mongoexport executions. Usually, when this happens, the error is ignored and the result code will be PARTIAL (1) instead of TOTAL (0).

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    throwIfOneFails: true
};

await mongoExport(options);
```

#### This will export all the collections. A warning message is logged wether there was a lack of permissions error or a mongoexport error.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    warnIfLackOfPermissions: true,
    warnIfOneFails: true
};

await mongoExport(options);
```

### Specifying were will the files be saved

#### This will export all the collections. The result files will be saved in the directory `./backup` and not in the path `./exported` as per default. Per default, a folder will be created for each database and for every exported collection the file name will be the collection name and location in the folder bound to its database name.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    outDir: './backup'
};

await mongoExport(options);
```

#### This will export all the collections. Instead of creating a folder for each database, the collections files will be saved directly in the `backup` folder and the file name will be `database_collection.extension`.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    outType: 'flat',
    outDir: './backup'
};

await mongoExport(options);
```

#### This will export all the collections of `animals` and `people`. The files of the collections `students` and `teacher` of the database `people` will be prepended by the database name. The file of the `tigers` collection of the database `animals` will be `tigri.json`. The file of the `pinguins` collection of the database `animals` will be `pinguins.animals.json`.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    databases: [`animals`, `people`],
    collections: {
        animals: [
            {
                collections: 'tigers',
                fileName: 'tigri'
            },
            {
                collections: 'pinguins',
                fileName: (db, collection, type) => `${collection}.${db}.${type}`
            }
        ],
        people: {
            collections: ['students', 'teachers'],
            prependDbName: true
        }
    },
    outDir: './backup'
};

await mongoExport(options);
```

#### This will export all the collections of `animals` and `people`. The files of the collections `students` and `teacher` of database `people` will be in a path `./database/collection/collection.json`, relative to the `outDir` folder. The file of the `tigers` collection of the database `animals` will be saved in the `Desktop`.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    databases: [`animals`, `people`],
    collections: {
        animals: {
            collections: 'tigers',
            filePath: `/home/user/Desktop/tigers.json`,
            absoultePath: true
        },
        people: {
            collections: ['students', 'teachers'],
            filePath: function(db, collection, type) {
                return `${db}/${collection}/${collection}.${type}`;
            }
        }
    },
    outDir: './backup'
};

await mongoExport(options);
```

### Specifying what is to be logged by the function

#### This will export all the collections of the database. Instead of the default `base` log, the mongoexport commands and the mongoexport logs will be logged.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    logs: ['commands', 'mongoexport']
};

await mongoExport(options);
```

The log will be similar to this:

// VIDEO

#### This will export all the collections of the database. Instead of the default `base` log, the fetched collections and the correctly exported collections are logged.

```js
const { mongoExport } = require('mongoback');
const options = { 
    all: true,
    logs: ['expectedCollections', 'actualCollections']
};

await mongoExport(options);
```

The log will be similar to this:

// VIDEO 

## Project structure

Made with **[dree](https://www.npmjs.com/package/dree)**.

```
mongoback
 ├─> source
 │   ├─> bin
 │   ├─> lib
 │   │   ├─> errors
 │   │   ├── index.ts
 │   │   ├─> interfaces
 │   │   └─> utils
 │   └── tsconfig.json
 ├─> test
 │   ├─> complete
 │   ├─> getCommand
 │   ├─> getMongoConnection
 │   ├─> mock
 │   ├── test.ts
 │   ├── tsconfig.json
 │   └─> utils
 ├─> dist
 │   ├─> source
 │   └─> test
 ├─> docs
 │   ├─> assets
 │   └─> tree
 │       ├── dree.config.json
 │       └── tree.txt
 ├── package-lock.json
 ├── package.json
 └── tslint.json
```

## Build

To build the module make sure you have Typescript installed or install the dev dependencies. After this, run:

```bash
$ npm run transpile
```

The `source` folder will be compiled in the `dist` folder.

## Dev

Make sure you have the dev dependencies installed.

To lint the code go to the package root in your CLI and run

```bash
$ npm run lint
```

To run tests go to the package root in your CLI and run

```bash
$ npm test
```

**Note: Running tests will delete permanently your MongoDB data. Do not do it if you have important data on it.**