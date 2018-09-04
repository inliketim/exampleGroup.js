# exampleGroup.js
Well-named and safe shortcut method for iterating through an example group in jasmine or other javascript testing frameworks. An example group is an array where each item provides values for test setup and expectations, and we iterate through the array to actually define a test for each example.

It's very easy in javascript to accidentally refer only to the last value of a for-loop iteration when defining a function for each member of the array. This can be especially dangerous in the context of testing suites,since all examples will pass as long as the last one does.

ExampleGroup.js handles closure and scoping concerns when iterating through an array of examples, so javascript testing developers don't have to remember to do so. 
It also provides a nice expressive name instead of having to write a possibly cryptic for-each loop every time an example-group concept is desired.

### (Broken!) example group in jasmine without this method:
```

    var examples = [
      {setup: 1, expectation: 150},
      {setup: 2, expectation: "xyz"},
      {setup: 3, expectation: 3}
    ];
    for(var i = 0; i<examples.length; i++){
      var example = examples[i]
      beforeEach(function(){
        window.myValue = example.setup;
      });
      // All examples will pass, even though the first two shouldn't, 
      // due to variable scoping/closure rules in javascript!
      // the last example ends up getting used in all 3 jasmine "it" blocks.
      it("finds the expected value at window.myValue", function(){
        expect(window.myValue).toEqual(example.expectation);
      });
    };       

```

### Working example group using exampleGroup() helper function:
```

    var examples = [
      {setup: 1, expectation: 150},
      {setup: 2, expectation: "xyz"},
      {setup: 3, expectation: 3}
    ];
    // Only the last example will pass, and the others will fail as they should.
    // The exampleGroup() function handles the necessary variable scoping to ensure the right example gets passed to each jasmine beforeEach and it block.
    exampleGroup(examples, function(example){
      beforeEach(function(){
        window.myValue = example.setup;
      });
      it("finds the expected value at window.myValue", function(){
        expect(window.myValue).toEqual(example.expectation);
      });
    });

```
