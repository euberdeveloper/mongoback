[![Build Status](https://travis-ci.org/euberdeveloper/mongoback.svg?branch=master)](https://travis-ci.org/euberdeveloper/mongoback)
[![Coverage Status](https://coveralls.io/repos/github/euberdeveloper/mongoback/badge.svg?branch=master)](https://coveralls.io/github/euberdeveloper/mongoback?branch=master)
[![Codecov Status](https://codecov.io/gh/euberdeveloper/mongoback/branch/master/graph/badge.svg)](https://codecov.io/gh/euberdeveloper/mongoback)
[![Types](https://img.shields.io/npm/types/mongoback.svg)](https://www.npmjs.com/package/mongoback)
[![Known Vulnerabilities](https://snyk.io/test/github/euberdeveloper/mongoback/badge.svg?targetFile=package.json)](https://snyk.io/test/github/euberdeveloper/mongoback?targetFile=package.json)
[![dependencies Status](https://david-dm.org/euberdeveloper/mongoback/status.svg)](https://david-dm.org/euberdeveloper/mongoback)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub issues](https://img.shields.io/github/issues/euberdeveloper/mongoback.svg)](https://github.com/euberdeveloper/mongoback/issues)
[![License](https://img.shields.io/npm/l/mongoback.svg?color=blue)](https://github.com/euberdeveloper/mongoback/raw/master/LICENSE)
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


<p align="center">
  <img src="https://github.com/euberdeveloper/mongoback/raw/master/docs/assets/mongoback_base_log.gif">
</p>


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

## Usage (global module)

Executing the command:

`$ mongoback export`

<p align="center">
  <img src="https://github.com/euberdeveloper/mongoback/raw/master/docs/assets/mongoback_cli.gif">
</p>

Execute the help command for more informaition:

`$ mongoback --help`

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
        match: /^test/, 
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
        { match: 'animals', jsonArray: true }
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
        match: 'animals',
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
        match: 'animals',
        jsonFormat: 'canonical'
    },
    collections: [
        {
            match: /^a/,
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
                    match: 'bears',
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
        match: 'animals',
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
                        match: 'students',
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
                        match: 'students',
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

#### This will export all the collections, including even the system collections.

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
                match: 'tigers',
                fileName: 'tigri'
            },
            {
                match: 'pinguins',
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


<p align="center">
  <img src="https://github.com/euberdeveloper/mongoback/raw/master/docs/assets/mongoback_mongoexport_log.gif">
</p>


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


<p align="center">
  <img src="https://github.com/euberdeveloper/mongoback/raw/master/docs/assets/mongoback_exported_log.gif">
</p>

## API

### mongoExport

**Syntax:**

`mongoback.mongoExport(options)`

**Description:**

The function to export collections from a mongodb. You can specify the mongodb collection, the collections that will be exported, how they will be exported and where. To understand well how to use it, it is recommended reading the __Examples__ above.

**Parameters**:

* __options__: The options object of the mongoExport function.

**Options parameters:**

The Options object is the merge of other more-specific options objects, defined below.

**ConnectionOptions parameters:**

The MongoDB connection options. They will define both the options of the mongoexport command and the uri/MongoClientOptions of the connection used to list databases and collections. Most of the properties are exactly the same of the mongoexport options. Some are  slightly modified to allow a more confortable usage, without changing what will be passed as a mongoexport option. The default value of the option does not corrispond with the mongoexport one. When there is a value set to false or undefined, it means that the option is not added to the mongoexport command, not that it is the default value of mongoexport. To support the old versions of mongoexport, there are also the deprecated options.

* __uri__: Default value: `undefined`. The uri of the MongoDB connection. If it is specified, the options host, port, password, username, srv, authenticationMechanism, authenticationDatabase will be set to undefined and ignored.
* __host__: Default value: `localhost`. The host of the MongoDB connection. It can be a string or an array of ReplicaSet, objects with host and port keys. The property differs from the mongoexport one in which also an array of replica sets can be passed.
* __port__: Default value: `27017`. The port of the MongoDB connection.
* __username__: Default value: `undefined`. The username of the MongoDB connection.
* __password__: Default value: `undefined`. The password of the MongoDB connection.
* __authenticationDatabase__: Default value: `undefined`. The authenticationDatabase of the MongoDB connection.
* __authenticationMechanism__: Default value: `undefined`. The authenticationMechanism of the MongoDB connection.
* __srv__: Default value: `false`. If the connection  If the MongoDB connection uri is an srv. This property is not  present in the mongoexport options, where the "+srv" can be added manually in the host option.
* __replicaSetName__: Default value: `undefined`. The replicaSetName of the MongoDB connection. This property is not present in the mongoexport options, where the replica set name is passed in the uri options or in the host option.
* __ssl__: Default value: `false`. If the MongoDB connection uses ssl or tls.
* __sslCAFile__: Default value: `undefined`. Specifies the .pem file that contains both the TLS/SSL certificate and key.
* __sslPEMKeyFile__: Default value: `undefined`. Specify the file name of the .pem file using relative or absolute paths.
* __sslPEMKeyPassword__: Default value: `undefined`. Specifies the password to de-crypt the certificate-key file (i.e. --sslPEMKeyFile). Use the --sslPEMKeyPassword option only if the certificate-key file is encrypted. In all cases, the mongoexport will redact the password from all logging and reporting output.
* __sslCRLFile__: Default value: `undefined`. Specifies the .pem file that contains the Certificate Revocation List. Specify the file name of the .pem file using relative or absolute paths.
* __sslFIPSMode__: Default value: `false`. Directs the mongoexport to use the FIPS mode of the installed OpenSSL library. Your system must have a FIPS compliant OpenSSL library to use the --sslFIPSMode option. NB: Deprecated option of mongoexport.
* __sslAllowInvalidCertificates__: Default value: `false`. Bypasses the validation checks for server certificates and allows the use of invalid certificates. When using the allowInvalidCertificates setting, MongoDB logs as a warning the use of the invalid certificate.
* __sslAllowInvalidHostnames__: Default value: `false`. Disables the validation of the hostnames in TLS/SSL certificates. Allows mongoexport to connect to MongoDB instances even if the hostname in their certificates do not match the specified hostname.
* __gssapiServiceName__: Default value: `undefined`. Specify the name of the service using GSSAPI/Kerberos. Only required if the service does not use the default name of mongodb.
* __gssapiHostName__: Default value: `undefined`. Specify the hostname of a service using GSSAPI/Kerberos. Only required  if the hostname of a machine does not match the hostname resolved by DNS.
* __slaveOk__: Default value: `false`. Sets the Read Preference to nearest, allowing mongoexport to read data from secondary replica set members. NB: Deprecated option of mongoexport
* __readPreference__: Default value: `undefined`. Specify the read preference for mongoexport. It can be a string such as 'primary' or 'secondary' or an object. If you want to pass the json object as a string, you must manually include it in apixes.
* __journal__: Default value: `false`. Allows mongoexport operations to access the durability journal to ensure that the export is in a valid state. This option is only relevant when specifying the --dbpath option. NB: Deprecated option of mongoexport
* __ipv6__: Default value: `false`. Enables IPv6 support that allows mongoexport to connect to the MongoDB instance using an IPv6 network. All MongoDB programs and processes, including mongoexport, disable IPv6 support by default. NB: Deprecated option of mongoexport
* __dbpath__: Default value: `undefined`. Specifies the directory of the MongoDB data files. If used, the --dbpath option enables mongoexport to attach directly to local data files and insert the data without the mongod. To run with --dbpath, mongoexport needs to lock access to the data directory: as a result, no mongod can access the same path while the process runs. NB: Deprecated option of mongoexport
* __directoryperdb__: Default value: `false`. Use the --directoryperdb in conjunction with the corresponding option to mongod, which allows mongoexport to export data from MongoDB instances that have every database’s files saved in discrete directories on the disk. This option is only relevant when specifying the --dbpath option. NB: Deprecated option of mongoexport.

**ExportedOptions parameters:**

The exported options interface. It contains the options about what should be exported and what to do if it is not exported correctly.

* __all__: Default value: `false`. If all the collections of every database will be exported.
* __databases__: Default value: `[]`. The databases that will be exported. All the collections of a database will be exported. Eventual exporting options passed to this option will overwrite the default ones.
* __collections__: Default value: `[]`. The collections that will be exported. Eventual exporting options passed to this option will overwrite the default ones and the ones in the "database" option.
* __systemCollections__: Default value: `false`. If also system collections will be exported.
* __throwIfLackOfPermissions__: Default value: `false`. If for permissions causes there is an error while listing databases or collections of the MongoDB, an error will be thrown. If the value is false, the databases and collections that cannot be listed will be ignored and not be exported. NB: Actually all the errors that happen while listing databases or collections, not only the permission ones, will be thrown.
* __warnIfLackOfPermissions__: Default value: `false`. If for permissions causes there is an error while listing databases or collections of the MongoDB, a warning message will be logged. NB: Actually all the errors that happen while listing databases or collections, not only the permission ones, will be warned.
* __throwIfOneFails__: Default value: `false`. If the mongoexport of a collection fails, an error will be thrown. If the  value is false, the result of the function will have code PARTIAL(= 1), specifying that not all the expected collections were exported.
* __warnIfOneFails__: Default value: `false`. If the mongoexport of a collection fails, a warning will be logged.

**ExportingOptions parameters:**

The options about how the collections will be exported. They will define both the options of the mongoexport command and others not regarding it. See the mongoexport official documentation to further information. It is divided in `ExtendedExportingOptions` (not regarding mongoexport) and `StandardExportingOptions` (regarding mongoexport).

**ExtendedExportingOptions parameters**

Options that specify how will the options be exported and are not about the mongoexport options.

* __prependDbName__: Default value: `undefined`. If the file name will be prepended by the database of the collection. The format is: "database_filename.extension". When undefined, if the outType is 'deep' the file name is not prepended while if the outType is 'flat' it is prepended
* __fileName__: Default value: `undefined`. A string or a function returning the name of the file of the exported collection.
* __filePath__: Default value: `undefined`. A string or a function returning the path of the file of the exported collection.
* __absolutePath__: Default value: `false`. If the filePath value is absolute and not relative to the outDir option.

**StandardExportingOptions parameters**

The exporting options regarding the mongoexport command. Most of the properties are exactly the same of the mongoexport options. Some are   slightly modified to allow a more confortable usage, without changing what will  be passed as a mongoexport option. The default value of the option does not corrispond with the mongoexport one. When there is a value set to false or undefined, it means that  the option is not added to the mongoexport command, not that it is the default value of  mongoexport.    To support the old versions of mongoexport, there are also the deprecated options. See the mongoexport official documentation to further information.

* __quiet__: Default value: `false`. Runs mongoexport in a quiet mode that attempts to limit the amount of output.
* __verbose__: Default value: `false`. Increases the amount of internal reporting returned on standard output or in  log files. Increase the verbosity with the -v form by including the option  multiple times, (e.g. -vvvvv.) If the value is true, the option '--verbose' will be added. If it is a number, it will be the number of v that will be put in the command. (e.g. 3 gives -vvv).
* __type__: Default value: `undefined`. Accepted values: `"json"` or `"csv"`. Specifies the file type to export. Specify csv for CSV format or json for JSON format. If you specify csv, then you must also use either the --fields or the  --fieldFile option to declare the fields to export from the collection.
* __jsonFormat__: Default value: `undefined`. Accepted values: `"realaxed"` or `"canonical"`. Modifies the output to use either canonical or relaxed mode of the MongoDB Extended JSON (v2) format.
* __jsonArray__: Default value: `false`. Modifies the output of mongoexport to write the entire contents of the export  as a single JSON array. By default mongoexport writes data using one JSON  document for every MongoDB document.
* __pretty__: Default value: `false`. Outputs documents in a pretty-printed format JSON.
* __query__: Default value: `undefined`. Provides a query as a JSON document (enclosed in quotes) to return matching documents in the export. You must enclose the query document in single  quotes ('{ ... }') to ensure that it does not interact with your shell environment. Starting in MongoDB 4.2, the query must be in Extended JSON v2 format (either relaxed or canonical/strict mode), including enclosing the field names and operators in quotes. You can pass the argument either as a string (it will automatically be included in apixes) or as an object.
* __fields__: Default value: `undefined`. Specifies a field or fields to include in the export. Use a comma separated list of fields to specify multiple fields. If any of your field names include white space, use quotation marks to enclose the field list. For example, if you wished to export two fields, phone and user number, you would specify --fields "phone,user number". For csv output formats, mongoexport includes only the specified field(s), and the specified field(s) can be a field within a sub-document. For JSON output formats, mongoexport includes only the specified field(s) and the _id field, and if the specified field(s) is a field within a sub-document, the mongoexport includes the sub-document with all its fields, not just the specified field within the document. You can pass either a string ora an array of strings. The fields are automatically included in quotes to support whitespaces.
* __fieldFile__: Default value: `undefined`. An alternative to --fields. The --fieldFile option allows you to specify   in a file the field or fields to include in the export and is only valid   with the --type option with value csv. The file must have only one field per line, and the line(s) must end with the LF character (0x0A).
* __noHeaderLine__: Default value: `false`. By default, mongoexport includes the exported field names as the first line in a CSV output. --noHeaderLine directs mongoexport to export the data without the list of field names. --noHeaderLine is only valid with the --type option with value csv.
* __skip__: Default value: `undefined`. Use --skip to control where mongoexport begins exporting documents. See skip() for information about the underlying operation.
* __limit__: Default value: `undefined`. Specifies a maximum number of documents to include in the export. See limit() for information about the underlying operation.
* __sort__: Default value: `undefined`. Specifies an ordering for exported results. If an index does  not exist that can support the sort operation, the results  must be less than 32 megabytes.  You can pass the argument either as a string (it will automatically be included in apixes) or as an object.
* __forceTableScan__: Default value: `false`. Forces mongoexport to scan the data store directly instead of traversing the _id field index. Use --forceTableScan to skip the index.

**LogOptions parameters:**

The options about what will be logged during the function execution

* __silent__: Default value: `false`. If nothing will be logged.
* __log__: Default value: `['base']`. The log modes. If there is more than a mode, they must be specified in an array.Possible values: `base`: During exporting, the databases and collections are shown with a spinner, `command`: Logs the mongoexport command, `mongoexport`: Logs the mongoexport log, `expectedCollections`: Logs the object containing the collections expected to be exported, `actualCollections`: Logs the object containing the collections that have actually been exported

**OutOptions parameters:**

The options about the output location and the result of the function

* __outDir__: Default value: `'./exported'`. The path were the exported collections will be saved.
* __outType__: Default value: `'deep'`. The type of the saving location. It can be: 'deep': A folder will be created for each database. Each folder contains the  exported collections of that database with the collection name as file name 'flat': No folder will be created for each database. A file whose name is the  exported collection name prepended by its database name (if prependDBName is not false)  will be created for each exported collection
* __detailedResult__: Default value: `false`. If the result will contain also the exporting options of the expected/actual collections.

## Project structure

Made with **[dree](https://www.npmjs.com/package/dree)**.

```
mongoback
 ├─> source
 │ ├─> bin
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
$ npm run db:populate
$ npm test
```

**Note: Running tests will delete permanently your MongoDB data. Do not do it if you have important data on it.**