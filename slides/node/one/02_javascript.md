!SLIDE bullets incremental
# JavaScript #
* Released in 1995, designed by Brendan Eich.
* Weakly typed.
* Prototype-based.
* Multi-paradigm.

!SLIDE
# JavaScript: Functions #

    function calc(bar) {
      return bar * 2;
    }

    calc(10); // => 20

!SLIDE
# JavaScript: Object-oriented #

    function Foo(bar) {
      this.bar = bar;
    }

    Foo.prototype.calc = function() {
      return this.bar * 2;
    }

    var foo = new Foo(10);
    foo.calc(); // => 20

.notes Prototypal inheritance.

!SLIDE
# JavaScript: Functional #

    function squareSum(x) {
      return function(y) {
        return x*x + y*y;
      }
    }

    squareSum(10)(20); // => 500

.notes Functions need not have names all the time.
Functions can be assigned to variables like other values.
A function expression cqn be written and enclosed in parentheses for application later.
Functions can be passed as arguments to other functions.

!SLIDE bullets incremental
# JavaScript is simple #
* New array: var a = [1, 2, 3];
* New object: var o = {foo: 'hi', bar: 12};
* New function: var f = function(a) {return a+1;}

!SLIDE bullets incremental
# JavaScript is weird #
* 0 == '0' => true
* 0 == '' => true
* " \t\r\n" == 0 => true
* [] + [] => ""
* {} + [] => 0
* {} + {} => NaN

!SLIDE
# JavaScript is different #

    var foo = 1;
    function bar() {
      if (!foo) {
        var foo = 10;
      }
      alert(foo);
    }
    bar();

.notes Will alert 10. JavaScript has function level scopes - not block level.

!SLIDE small bullets incremental
# JavaScript survival tips #
* Use === for value AND type comparison.
* Avoid newline after return, when returning a value.
* Pay attention to scoping rules.

.notes If you include a newline, an imlicit semicolon will be inserted, and no value will actually be returned.
Curly braces are therefore usually not placed on new lines in JavaScript.
