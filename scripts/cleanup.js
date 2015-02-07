//  cleanup.js
/*
 * MIT license http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2015 Eric Elliott
 * Original author of this script: rsperberg@gmail.com
 */


var fs = require("fs");
// var doclistPath = '/Users/sperberx/dev/essential-javascript-links/misc/';
// var doclistName = 'README-short1';
// var doclistAddon = '-new';
// var doclistExtension = '.md';

/*
files I'm testing with
/Users/sperberx/dev/essential-javascript-links/misc/some-wrong-apos.md
/Users/sperberx/dev/essential-javascript-links/README.md
/Users/sperberx/dev/essential-javascript-links/misc/README-ee.md
/Users/sperberx/dev/essential-javascript-links/misc/README-short1.md
*/


//  identify each type of change, particularly for the apostrophe, since global change (e.g., /.'./g or /(\w|\d)'(\w|\d)/g) is just too risky
//  By making only known changes, stray apostrophes and quotes can be located easily
//  not yet defined:  single quotes within double quotes

var replacements = [
    { searchFor: /'d\b/g, replaceWith: "’d"},    // I'd
    { searchFor: /'ll\b/g, replaceWith: "’ll"},    //  you'll
    { searchFor: /'m\b/g, replaceWith: "’m"},    //  I'm
    { searchFor: /'re\b/g, replaceWith: "’re"},    //  you're
    { searchFor: /'s\b/g, replaceWith: "’s"},    //  it's
    { searchFor: /'t\b/g, replaceWith: "’t"},   //  don't
    { searchFor: /'ve\b/g, replaceWith: "’ve"},   //  I've
    { searchFor: /O'R/g, replaceWith: "O’R"},    //  O'Reilly
    { searchFor: /",/g, replaceWith: ',”'},    // comma outside quote mark
    { searchFor: /"\./g, replaceWith: '.”'},    // period outside quote mark (transpose only)
    { searchFor: /"\b/g, replaceWith: '“'},    //  open quote (eg, precedes a 'word boundary')
    { searchFor: /\b"/g, replaceWith: '”'},    //  close quote (eg, is preceded by a 'word boundary') needs to be set to follow punctuation as well
    { searchFor: / - /g, replaceWith: " — "}    //  em dash
];

/*  store components of path  */
// var pathAndFile = doclistPath + doclistName + doclistExtension;   //   /Users/sperberx/dev/essential-javascript-links/README.md
// var pathAndFileNew = doclistPath + doclistName+ doclistAddon + doclistExtension;   //   /Users/sperberx/dev/essential-javascript-links/README-new.md

var aFile = fs.readFile('/dev/stdin', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    //  for each object in the replacements array, go through the document and make the replacement
    function cleanUp(someFile) {
        replacements.forEach(function(replacement) {
            someFile = someFile.replace(replacement.searchFor, replacement.replaceWith);
        })
        return someFile;
   }
    var result = cleanUp(data);

    console.log(result);
//    console.log('got result back');

    // fs.writeFile(pathAndFileNew, result, function (err) {
    //   if (err) throw err;
    //   console.log('It\'s saved!');
    // });

});

