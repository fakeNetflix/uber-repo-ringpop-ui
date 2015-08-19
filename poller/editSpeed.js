// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

'use strict';
var fs = require('fs');
var async = require('async');
var path = require('path');
var config = require('./poller-config.json');
var _ = require('lodash');
var readline = require('readline');

console.log("Current Polling Speed: "+config.pollingSpeed);

var pollingSpeed = config.pollingSpeed;
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Please enter the new polling speed: ", function(answer) {
    console.log("New polling speed: ", answer);
    console.log("\n");
    pollingSpeed = answer;
    rl.close();
    finished();
});

function finished() {
    var json = {serviceName: config.serviceName, datacenterName: config.datacenterName, address: config.address, pollingSpeed: pollingSpeed};
    fs.writeFile(path.join(__dirname, './poller-config.json'), JSON.stringify(json), function(err) {
          if(err) {
              console.log('Error');
          }
          console.log("Thank you! Have a nice day!");
    });
}