/*
MIT License

Copyright (c) 2018 Tim Rozycki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

exampleGroup = function(examples, testBuildingFunction){
  // It's very easy in javascript to accidentally refer only to the last value of a for-loop iteration when there's any complexity to variable scoping!
  // This can be especially dangerous in the context of testing suites, since all examples will pass as long as the last one does.
  // This method handles closure (scoping) concerns when iterating through an array of examples, so javascript testing developers don't have to remember to do so. 
  // It also provides a nice expressive name instead of having to write a possibly cryptic for-each loop every time an example-group concept is desired.
  for(var i = 0; i<examples.length; i++){
    example = examples[i];
    testBuildingFunction.call(this, example);
  };
};