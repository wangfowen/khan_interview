Challenge Framework

A comparison of Acorn to Esprima:

- Acorn is 72% the size of Esprima.
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

How does the Unit Test API look?
