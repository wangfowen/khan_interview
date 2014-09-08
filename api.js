function Code(ast) {
  var code = function(ast) {
    this.ast = [ast];
  }

  code.prototype.traverse = function(node, func) {
    if (!node || typeof node.type !== "string") {
      return;
    }

    func(node);

    for (var property in node) {
      var child = node[property];

      if (Array.isArray(child)) {
        for (var i = 0; i < child.length; i++) {
          this.traverse(child[i], func);
        }
      } else {
        this.traverse(child, func);
      }
    }
  };

  code.prototype.mustContain = function(type) {
    var newAst = [];

    for (var i = 0; i < this.ast.length; i++) {
      this.traverse(this.ast[i], function(ast) {
        if (ast.type === type) {
          newAst.push(ast);
          return;
        }
      });
    }

    this.ast = newAst;

    return this;
  };

  code.prototype.mustNotContain = function(type) {
    var newAst = this.ast;

    for (var i = 0; i < this.ast.length; i++) {
      this.traverse(this.ast[i], function(ast) {
        if (ast.type === type) {
          newAst = [];
          return;
        }
      });
    }

    this.ast = newAst;

    return this;
  };

  code.prototype.whichMustContain = function(type) {
    return this.mustContain(type);
  };

  code.prototype.whichMustNotContain = function(type) {
    return this.mustNotContain(type);
  };

  code.prototype.test = function() {
    return this.ast.length !== 0;
  };

  return new code(ast);
}
