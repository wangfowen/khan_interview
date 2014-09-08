#Challenge Framework#

Test out the framework at http://wangfowen.github.io/khan_interview

Write your tests in __Advanced Unit Test__. The tests will check the code in 
__Student Code__. Student Code is parsed by Acorn (reasoning explained further 
down in documentation) and wrapped in a Code object, reference-able within 
Advanced Unit Test via the variable _code_.  Right now you can only run one test 
case at a time in Advanced Unit Test.  test() has already been appended to the 
end of what you enter into the box for niceness.  __Test Result__ should reflect 
that test().

##Framework API##

- Code(_ast_) - _ast_ is an abstract syntax tree as specified by the [Mozilla parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API) (can be output by both Acorn and Esprima). Creates a Code object upon which you find all the other methods below

- mustContain(_type_) - _type_ is a string which matches one of the Node object 
types found in the [Mozilla parser 
API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects). 
Tests to see if the Node object of type _type_ is within the AST array of the 
Code object - __essentially a whitelist of functionality__. Returns a Code 
object with the children of the _type_ Node as the AST array. Empty AST array if 
not found.

    ```javascript
    code.mustContain("ForStatement");
    code.mustContain("VariableDeclaration");
    ```
    is equivalent to "This program MUST use a 'for loop' and a 'variable declaration'."

- mustNotContain(_type_) - same situation as mustContain, except returns the 
same Code object if the Node is not in the AST and returns empty array if it is. 
__Used to test for a blacklist of functionality__.

    ```javascript
    code.mustNotContain("WhileStatement");
    code.mustNotContain("IfStatement");
    ```
    is equivalent to "This program MUST NOT use a 'while loop' or an 'if statement'."

- whichMustContain(_type_) - an alias for mustContain. Sounds better when you're 
chaining to __determine the rough structure of a program__.

    ```javascript
    code.mustContain("ForStatement")
        .whichMustContain("IfStatement");
    ```
    is equivalent to
    ```javascript
    var forStatement = code.mustContain("ForStatement");
    forStatement.mustContain("IfStatement");
    ```
    which is equivalent to "There should be a 'for loop' and inside of it there should be an 'if statement'."

- whichMustNotContain(_type_) - an alias for mustNotContain.

- test() - returns a boolean of whether the AST object is empty or not. Stick it 
at the end of your other statements to easily see whether your tests passed or 
not.

    ```javascript
    code.mustContain("ForStatement")
        .whichMustContain("IfStatement")
        .test();
    ```

##Improvements To Make##

Given more time, I'd add some security checks to make sure the students aren't 
abusing the Advanced Unit Test console. I'd drop the eval since that's dangerous 
and parse the input instead to see which methods to be running.

I'd also either rename the methods or change the way they work so that it makes 
more sense. mustContain suggests it'd return a boolean, but it doesn't unless 
you append the test().

Additionally, it'd be neat if it could test multiple conditions at once, 
stylistically the way d3 chains. For example:

```javascript
code.mustContain("ForStatement")
      .whichMustContain("IfStatement")
    .andMustContain("WhileStatement")
      .whichMustContain("VariableDeclaration")
    .test();
```

##Acorn vs Esprima##

- Acorn is 72% the size of Esprima (not minified).
- Both support ECMAScript 5. Esprima only partly supports 6.
- Acorn supports IE5 and on. Esprima only supports modern browsers.
- Acorn's continuous integration has 800+ test cases. Esprima has 900+ test 
cases and has better documentation about its test coverage and performance.
- Both are well documented enough to be easily used. Looking at them as black 
boxes, both have the same base input and output. Acorn has more optional inputs 
for customization.
- For performance comparison (ironically provided by Esprima), Acorn performed 
better for parsing smaller Javascript libraries. It didn't perform as well for 
large libraries like JQuery, but it's unlikely students' code would become so 
verbose.

The main goals in my choosing a parser is ease of use as a developer and speed 
for the end user. For the first goal, both libraries are adequate. For the 
  second, __Acorn is better, thus that was the library I ended up going with for 
  my test setup__.
