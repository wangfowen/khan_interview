function Code(ast) {
  var code = function(ast) {
    this.ast = ast;
  }

  code.prototype.mustContain = function(type) {
    console.log(this.ast);
    return this;
  };

  code.prototype.mustNotContain = function(type) {
    return this;
  };

  code.prototype.whichMustContain = function(type) {
    return this.mustContain(type);
  };

  code.prototype.whichMustNotContain = function(type) {
    return this.mustNotContain(type);
  };

  code.prototype.test = function() {
    return true;
  };

  return new code(ast);
}
