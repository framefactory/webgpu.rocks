---
title: Types
weight: 110
---

# Types
## Scalar
| | |
|-|-|
| `bool` | Boolean, values `true` and `false`. |
| `i32` | 32-bit signed integer. |
| `u32` | 32-bit unsigned integer. |
| `f32` | 32-bit floating point of IEEE-754 binary32 (single precision) format. |
| `f16` | 16-bit floating point of IEEE-754 binary16 (half precision) format. |

### Type inference for literals
{{< wgsl >}}
var a = 1i;    // holds an i32
var b = 1u;    // holds an u32
var c = 1f;    // holds an f32
var d = 1;     // holds an i32
var e = 1.0;   // holds an f32
var f = true;  // holds a bool
{{< /wgsl >}}

### All type conversions must be done explicitly.
{{< wgsl >}}
var a = 1i;
var b = f32(a);
{{< /wgsl >}}
## Vector
A vector is a grouped sequence of 2, 3, or 4 scalar components. `vecN<T>` denotes
a vector of `N` components of type `T`. `N` must be in `{2, 3, 4}` and `T` must be
one of the scalar types. `T` is the *component type* of the vector.
{{< wgsl >}}
var a: vec3<f32> = vec3<f32>(1.0, 2.2, 3.1);
{{< /wgsl >}}


## Matrix
A matrix is a grouped sequence of 2, 3, or 4 floating point vectors. `matCxR<T>`
denotes a matrix of `C` columns and `R` rows of type `T`, where `C` and `R` are
both in `{2, 3, 4}`, and `T` must be a scalar floating point type.
Equivalently, it can be viewed as `C` column vectors of type `vecR<T>`. 
{{< wgsl >}}
mat2x3<f32>  // This is a 2 column, 3 row matrix of 32-bit floats.
             // Equivalently, it is 2 column vectors of type vec3<f32>.
{{< /wgsl >}}

## Atomic
An atomic type encapsulates a concrete integer scalar type. `atomic<T>` denotes
an atomic of type `T`. `T` must be either `u32` or `i32`. 

Atomic objects provide certain guarantees to concurrent observers. The only
valid operations on atomic objects are the atomic builtin functions.
{{< wgsl >}}
// TODO: Examples
{{< /wgsl >}}

## Struct
A structure is a named grouping of named member values. Two members of the same
structure type must not have the same name. A structure member type can be
a scalar, vector, matrix, atomic type, or an array or structure type with a
creation-fixed footprint. The last member may also be a runtime-sized array.
{{< wgsl >}}
struct Data {
  a: i32,
  b: vec2<f32>,
  c: array<i32,10>, // last comma is optional
}

// Declare a variable storing a value of type Data.
var<private> some_data: Data;
{{< /wgsl >}}

## Array
An array is an indexable grouping of element values. `array<E,N>` denotes a
fixed-size array with `N` elements of type `E`. `N` is called the element count
of the array. `array<E>` denotes a runtime-sized array of elements of type E.
These may only appear in specific contexts.

The element type `E` can be a scalar, vector, matrix, atomic type, or an
array or structure type with a creation-fixed footprint.
{{< wgsl >}}
// a and b are different types
var<private> a: array<f32,8>;
var<private> b: array<i32,8>;

// fixed-size array sized by a constant
const width = 8;
var<private> d: array<i32,width>;

// workgroup array sized by an overridable constant
override blockSize = 16;
var<workgroup> odds: array<i32,blockSize>;
{{< /wgsl >}}