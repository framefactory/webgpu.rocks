---
Title: Logic & Array
weight: 120
---

# Logic & array built-in functions

## Logic
{{< func "fn all(e: vecN<bool>) -> bool" >}}
Returns `true` if each component of `e` is true.
{{< /func >}}

{{< func "fn any(e: vecN<bool>) -> bool" >}}
Returns `true` if any component of `e` is true.
{{< /func >}}

{{< func "fn select(f: T, t: T, cond: bool) -> T" >}}
Returns `t` when `cond` is true, and `f` otherwise.
{{< /func >}}

## Array
{{< func "fn arrayLength(p: ptr<storage, array<E>, AM>) -> u32" >}}
Returns the number of elements in the runtime-sized array.
`E` is an element type for a runtime-sized array, access mode `AM` is `read` or `read_write`.
{{< /func >}}
