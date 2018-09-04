// Tested against Jasmine 3.2.1 to demonstrate the possible pitfalls with home-brewed example groups.
// Should work equally well with other javascript test frameworks.
// The problem being solved is related to iteration and scoping/closures, not anything specific to jasmine.

describe("NOTE: Be sure to read the test output carefully, since a broken ExampleGroup.js could fail by showing all tests as passing (just like the broken approach it's intented to replace).", function(){
  it("In case of bad ExampleGroup.js code,  the test descriptions may fail to make sense, providing a clue that something isn't right.", function(){
    expect(true).toEqual(true)
  });
});
describe("unsafe example group (iterating through an array of examples instead of using exampleGroup function)", function(){
  describe("when the last example should succeed but all others should fail", function(){
    var examples = [
      {setup: 1, expectation: 150},
      {setup: 2, expectation: "xyz"},
      {setup: 3, expectation: 3}
    ];
    var example;
    for(var i = 0; i<examples.length; i++){
      example = examples[i]
      describe("for the example with setup " + example.setup + " and expectation " + example.expectation, function(){
        beforeEach(function(){
          window.setupValue = example.setup;
        });
        it("shows each example as succeeding, though all but one should fail",function(){
          expect(window.setupValue).toEqual(example.expectation);
        });
      });
    }    
  });
  
  describe("when the last example should fail but all others should succeed", function(){
    var examples = [
      {setup: 1, expectation: 1},
      {setup: 2, expectation: 2},
      {setup: 3, expectation: 999}
    ];
    var example;
    for(var i = 0; i<examples.length; i++){
      example = examples[i]
      describe("for the example with setup " + example.setup + " and expectation " + example.expectation, function(){
        beforeEach(function(){
          window.setupValue = example.setup;
        });
        it("would show each example as failing, though all but one should succeed",function(){
          // Because this is a test suite, we don't want to verify by causing any actual failures.
          // We will do the next best thing by inverting the expectation with a .not modifier.
          // This gives us a high level of confidence that the original expectation would fail if we removed the .not.
          expect(window.setupValue).not.toEqual(example.expectation);
        });
      });
    }     
  });
});

describe("safe example group using exampleGroup() method to iterate through an array of examples", function(){
  describe("when the last example should succeed but all others should fail", function(){
    var examples = [
      {setup: 1, expectation: 150},
      {setup: 2, expectation: ""},
      {setup: 3, expectation: 3}
    ];
    exampleGroup(examples, function(example){
      // Because this is a test suite, we don't want to verify by causing any actual failures.
      // We will do the next best thing by inverting the expectation with a .not modifier.
      // This gives us a high level of confidence that the original expectation would fail if we removed the .not.
      var shouldInvertExpectationToVerifyFailure = (example.setup != example.expectation)
      describe("for the example with setup " + example.setup + " and expectation " + example.expectation, function(){
        beforeEach(function(){
          window.setupValue = example.setup;
        });
        if(shouldInvertExpectationToVerifyFailure){
          it("would fail as it should (tested by inverting the expectation with a .not)",function(){
            expect(window.setupValue).not.toEqual(example.expectation); 
          });
        }
        else{
          it("succeeds as it should",function(){
            expect(window.setupValue).toEqual(example.expectation);
          });
        };
      });
    });
  });

    describe("when the last example should fail but all others should succeed", function(){
    var examples = [
      {setup: 1, expectation: 1},
      {setup: 2, expectation: 2},
      {setup: 3, expectation: 999}
    ];
    exampleGroup(examples, function(example){
      // Because this is a test suite, we don't want to verify by causing any actual failures.
      // We will do the next best thing by inverting the expectation with a .not modifier.
      // This gives us a high level of confidence that the original expectation would fail if we removed the .not.
      var shouldInvertExpectationToVerifyFailure = (example.setup != example.expectation)
      describe("for the example with setup " + example.setup + " and expectation " + example.expectation, function(){
        beforeEach(function(){
          window.setupValue = example.setup;
        });
        if(shouldInvertExpectationToVerifyFailure){
          it("would fail as it should (tested by inverting the expectation with a .not)",function(){
            expect(window.setupValue).not.toEqual(example.expectation); 
          });
        }
        else{
          it("succeeds as it should",function(){
            expect(window.setupValue).toEqual(example.expectation);
          });
        };
      });
    });
  });
});