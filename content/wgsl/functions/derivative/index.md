---
Title: Derivative
weight: 110
---

# Derivative built-in functions

## Partial Derivatives
{{< func "fn dpdx(e: T) -> T" >}}
Returns the partial derivative of `e` with respect to window `x` coordinates. The result is the same as either `dpdxFine(e)` or `dpdxCoarse(e)`. 
{{< /func >}}

{{< func "fn dpdxCoarse(e: T) -> T" >}}
Returns the partial derivative of `e` with respect to window `x` coordinates using local differences. This may result in fewer unique positions that `dpdxFine(e)`. 
{{< /func >}}

{{< func "fn dpdxFine(e: T) -> T" >}}
Returns the partial derivative of `e` with respect to window `x` coordinates. 
{{< /func >}}

{{< func "fn dpdy(e: T) -> T" >}}
Returns the partial derivative of `e` with respect to window `y` coordinates. The result is the same as either `dpdyFine(e)` or `dpdyCoarse(e)`. 
{{< /func >}}

{{< func "fn dpdyCoarse(e: T) -> T" >}}
Returns the partial derivative of `e` with respect to window `y` coordinates using local differences. This may result in fewer unique positions that `dpdyFine(e)`. 
{{< /func >}}

{{< func "fn dpdyFine(e: T) -> T" >}}
Returns the partial derivative of `e` with respect to window `y` coordinates. 
{{< /func >}}

{{< func "fn fwidth(e: T) -> T" >}}
Returns `abs(dpdx(e)) + abs(dpdy(e))`. 
{{< /func >}}

{{< func "fn fwidthCoarse(e: T) -> T" >}}
Returns `abs(dpdxCoarse(e)) + abs(dpdyCoarse(e))`. 
{{< /func >}}

{{< func "fn fwidthFine(e: T) -> T" >}}
Returns `abs(dpdxFine(e)) + abs(dpdyFine(e))`. 
{{< /func >}}


{{< func "" >}}

{{< /func >}}