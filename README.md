#Challenge Framework#

Test out the framework at http://wangfowen.github.io/khan_interview

Please only enter one statement into the Advanced Unit Test box. code is a Code 
object with _ast_ being the parsed version of what's in Student Code. Test 
Result should reflect your test case.

##Framework API##

- Code(_ast_) - _ast_ is an abstract syntax tree as specified by the [Mozilla parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API) (can be output by both Acorn and Esprima). Creates a Code object upon which you find all the other methods below

- mustContain(_type_) - _type_ is a string which matches one of the Node object 
  types found in the [Mozilla parser 
  API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects). 
  Tests to see if the Node object of type _type_ is within the AST wrapped by 
  the Code object - essentially a whitelist of functionality.

    ```javascript
    code.mustContain("ForStatement");
    code.mustContain("VariableDeclaration");
    ```
    is equivalent to "This program MUST use a 'for loop' and a 'variable declaration'."

- mustNotContain(_type_) - same situation as mustContain, except returns false 
if the Node object is within the AST. Used to test for a blacklist of 
  functionality.

    ```javascript
    code.mustNotContain("WhileStatement");
    code.mustNotContain("IfStatement");
    ```
    is equivalent to "This program MUST NOT use a 'while loop' or an 'if statement'."

- whichMustContain(_type_) - an alias for mustContain. Sounds better when you 
callback to determine the rough structure of a program.

    ```javascript
    code.mustContain("ForStatement", whichMustContain("IfStatement"))
    ```
    is equivalent to "There should be a 'for loop' and inside of it there should 
    be an 'if statement'."

- whichMustNotContain(_type_) - an alias for mustNotContain.

##Improvements To Make##

Given more time, I'd add some security checks to make sure the students aren't 
abusing the Advanced Unit Test console. I'd drop the eval since that's dangerous 
and parse the input instead to see which methods to be running.

Additionally, I'd make it be able to chain functions. I originally tried that, 
but couldn't make it work in a nice way. It'd also be neat if it could test 
multiple conditions at once, stylistically the way d3 chains.  For example:

```javascript
code.mustContain("ForStatement")
      .whichMustContain("IfStatement")
    .andMustContain("WhileStatement")
      .whichMustContain("VariableDeclaration")
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
  second, Acorn is better, thus that was the library I ended up going with.
