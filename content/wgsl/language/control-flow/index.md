---
title: Control Flow
weight: 120
---

# Control flow

## If
An `if` statement has an `if` clause, followed by zero or more `else if` clauses,
followed by an optional `else` clause.
{{< wgsl >}}
var a: i32 = 2;
if a == 2 {
    a = a + 4;
else {
    a = a - 1;
}
{{< /wgsl >}}

## Switch
A `switch` statement transfers control to one of a set of case clauses, or to the
default clause, depending on the evaluation of a selector expression.
{{< wgsl >}}
const c = 2;
var a : i32;
let x : i32 = generateValue();
switch x {
  case 0: {
    a = 1;
  }
  case 1, c { // Const-expression can be used in case selectors
    a = 3;
  }
  case 3, default { // The default keyword can be used with other clauses
    a = 4;
  }
}
{{< /wgsl >}}
## Loop
A loop statement repeatedly executes a loop body. This repetition can be interrupted
by a `break` or `return` statement. Optionally, the last statement in the loop body
may be a `continuing` statement.

A `continue` statement transfers control in the nearest-enclosing loop:
forward to the `continuing` statement at the end of the body of that loop, if it exists,
otherwise backward to the first statement in the loop body, starting the next iteration.
{{< wgsl >}}
var a: i32 = 2;
var i: i32 = 0;
loop {
  if i >= 4 {
    break;
  }

  let step: i32 = 1;
  i = i + step;
  if i % 2 == 0 {
    continue;
  }

  a = a * 2;
}
{{< /wgsl >}}
### Loop with coninuing and break-if
{{< wgsl >}}
var a: i32 = 2;
var i: i32 = 0;
loop {
  let step: i32 = 1;

  if i % 2 == 0 { continue; }

  a = a * 2;

  continuing {
    i = i + step;
    break if i >= 4;
  }
}
{{< /wgsl >}}

## For
The `for` statement takes the form `for (initializer; condition; update_part) { body }`
and is syntactic sugar on top of a `loop` statement with the same body.
{{< wgsl >}}
for (var i: i32 = 0; i < 4; i++) {
  if a == 0 {
    continue;
  }
  a = a + 2;
}
{{< /wgsl >}}

## While
The while statement is a kind of loop parameterized by a condition. At the start of
each loop iteration, a boolean condition is evaluated. If the condition is false,
the while loop ends execution. Otherwise, the rest of the iteration is executed.
{{< wgsl >}}
var i: i32 = 0;
while (i < 5) {
    i++;
}
{{< /wgsl >}}