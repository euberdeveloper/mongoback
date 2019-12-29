'use strict';
const mongoback = require('../dist/index');

const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const dree = require('dree');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = require('chai').expect;

describe('MongoBack module tests', function() {

    require('./complete/complete.test')(expect, fs, path, rimraf, dree, mongoback);

});