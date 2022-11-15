---
Title: Numeric
weight: 100
---

# Numeric built-in functions

## Trigonometric
{{< func "fn degrees(e1: T) -> T" >}}
Converts radians to degrees, approximating `e1 × 180 ÷ π`.
{{< /func >}}

{{< func "fn radians(e1: T) -> T" >}}
Converts degrees to radians, approximating `e1 × π ÷ 180`.
{{< /func >}}

{{< func "fn cos(e: T) -> T" >}}
Returns the cosine of `e`, where `e` is in radians. Component-wise when `T` is a vector. 
{{< /func >}}

{{< func "fn cosh(e: T) -> T" >}}
Returns the hyperbolic cosine of `e`, where `e` is a hyperbolic angle in radians. 
{{< /func >}}

{{< func "fn acos(e: T) -> T" >}}
Returns the principal value, in radians, of the inverse cosine of `e`.
{{< /func >}}

{{< func "fn acosh(e: T) -> T" >}}
Returns the inverse hyperbolic cosine of `e`, as a hyperbolic angle in radians.
{{< /func >}}

{{< func "fn sin(e: T) -> T" >}}
Returns the sine of `e`, where `e` is in radians. Component-wise when `T` is a vector. 
{{< /func >}}

{{< func "fn sinh(e: T) -> T" >}}
Returns the hyperbolic sine of `e`, where `e` is a hyperbolic angle in radians. 
{{< /func >}}

{{< func "fn asin(e: T) -> T" >}}
Returns the principal value, in radians, of the inverse sine of `e`.
{{< /func >}}

{{< func "fn asinh(e: T) -> T" >}}
Returns the inverse hyperbolic sine of `e`, as a hyperbolic angle in radians.
{{< /func >}}

{{< func "fn tan(e: T) -> T" >}}
Returns the tangent of `e`, where `e` is in radians.
{{< /func >}}

{{< func "fn tanh(e: T) -> T" >}}
Returns the hyperbolic tangent of `e`, where `e` is a hyperbolic angle in radians. 
{{< /func >}}

{{< func "fn atan(e: T) -> T" >}}
Returns the principal value, in radians, of the inverse tangent of `e`.
{{< /func >}}

{{< func "fn atanh(e: T) -> T" >}}
Returns the inverse hyperbolic tangent of `e`, as a hyperbolic angle in radians.
{{< /func >}}

{{< func "fn atan2(y: T, x: T) -> T" >}}
Returns an angle, in radians, in the interval [-π, π] whose tangent is `y÷x`.
{{< /func >}}

{{< func "fn exp(e1: T) -> T" >}}
Returns the natural exponentiation of `e1`. Component-wise when `T` is a vector. 
{{< /func >}}

{{< func "fn exp2(e: T) -> T" >}}
Returns 2 raised to the power `e`.
{{< /func >}}

{{< func "fn inverseSqrt(e: T) -> T" >}}
Returns the reciprocal of `sqrt(e)`.
{{< /func >}}

{{< func "fn log(e: T) -> T" >}}
Returns the natural logarithm of `e`. 
{{< /func >}}

{{< func "fn log2(e: T) -> T" >}}
Returns the base-2 logarithm of `e`.
{{< /func >}}

{{< func "fn pow(e1: T, e2: T) -> T" >}}
Returns `e1` raised to the power `e2`.
{{< /func >}}

{{< func "fn sqrt(e: T) -> T" >}}
Returns the square root of `e`.
{{< /func >}}

## Linear Algebra
{{< func "fn cross(e1: vec3<T>, e2: vec3<T>) -> vec3<T>" >}}
Returns the cross product of `e1` and `e2`. 
{{< /func >}}

{{< func "fn determinant(e: matCxC<T>) -> T" >}}
Returns the determinant of `e`. 
{{< /func >}}

{{< func "fn distance(e1: T, e2: T) -> S" >}}
Returns the distance between `e1` and `e2`, e.g. `length(e1 - e2)`. 
{{< /func >}}

{{< func "fn dot(e1: vecN<T>, e2: vecN<T>) -> T" >}}
Returns the dot product of `e1` and `e2`. 
{{< /func >}}

{{< func "fn faceForward(e1: vecN<T>, e2: vecN<T>, e3: vecN<T>) -> vecN<T>" >}}
Returns `e1` if `dot(e2, e3)` is negative, and `-e1` otherwise. 
{{< /func >}}

{{< func "fn fma(e1: T, e2: T, e3: T) -> T" >}}
Fused multiply add, returns `e1 * e2 + e3`. Component-wise when `T` is a vector.  
{{< /func >}}

{{< func "fn length(e: T) -> S" >}}
Returns the 2-norm of `e`. Evaluates to the absolute value of `e` if `T` is scalar.
{{< /func >}}

{{< func "fn normalize(e: vecN<T> ) -> vecN<T>" >}}
Returns a unit vector in the same direction as `e`. 
{{< /func >}}

{{< func "fn reflect(e1: T, e2: T) -> T" >}}
For the incident vector `e1` and surface orientation `e2`, returns the reflection direction `e1 - 2 * dot(e2, e1) * e2`. 
{{< /func >}}

{{< func "fn refract(e1: T, e2: T, e3: I) -> T" >}}
For the incident vector `e1` and surface normal `e2`, and the ratio of indices of refraction `e3`, let `k = 1.0 - e3 * e3 * (1.0 - dot(e2, e1) * dot(e2, e1))`. If `k < 0.0`, returns the refraction vector `0.0`, otherwise return the refraction vector `e3 * e1 - (e3 * dot(e2, e1) + sqrt(k)) * e2`. 
{{< /func >}}

{{< func "fn transpose(e: matRxC<T>) -> matCxR<T>" >}}
Returns the transpose of `e`. 
{{< /func >}}

## Round, Limit, Mix, Compare
{{< func "fn abs(e: T ) -> T" >}}
The absolute value of `e`. Component-wise when `T` is a vector. 
{{< /func >}}

{{< func "fn sign(e: T) -> T" >}}
Returns `1.0` when `e > 0`, `0.0` when `e = 0`, and `-1.0` when `e < 0`. 
{{< /func >}}

{{< func "fn fract(e: T) -> T" >}}
Returns the fractional part of `e`, computed as `e - floor(e)`.
{{< /func >}}

{{< func "fn trunc(e: T) -> T" >}}
Returns the nearest whole number whose absolute value is less than or equal to `e`.
{{< /func >}}

{{< func "fn modf(e: T) -> __modf_result" >}}
Splits `e` into fractional and whole number parts. The fractional part is `e % 1.0`, and the whole part is `e` minus the whole part. Returns the `__modf_result` or `__modf_result_f16` built-in structure.
{{< /func >}}

{{< func "fn ceil(e: T) -> T" >}}
Returns the ceiling of `e`. Component-wise when `T` is a vector. 
{{< /func >}}

{{< func "fn floor(e: T) -> T" >}}
Returns the floor of `e`. Component-wise when `T` is a vector.
{{< /func >}}

{{< func "fn round(e: T) -> T" >}}
Returns the integer `k` nearest to `e`, as a floating point value. When `e` lies
halfway between integers `k` and `k + 1`, the result is `k` when `k` is even, and
`k+1` when `k` is odd.
{{< /func >}}

{{< func "fn clamp(e: T, low: T, high: T) -> T" >}}
Restricts the value of `e` within a range. The result is `min(max(e, low), high)`.
{{< /func >}}

{{< func "fn saturate(e: T) -> T" >}}
Returns `clamp(e, 0.0, 1.0)`.
{{< /func >}}

{{< func "fn step(edge: T, x: T) -> T" >}}
Returns `1.0` if `edge ≤ x`, and `0.0` otherwise. 
{{< /func >}}

{{< func "fn smoothstep(low: T, high: T, x: T) -> T" >}}
Returns the smooth Hermite interpolation between `0` and `1`. For scalar `t`,
the result is `t * t * (3.0 - 2.0 * t)`, where `t = clamp((x - low) / (high - low), 0.0, 1.0)`.
{{< /func >}}

{{< func "fn max(e1: T, e2: T) -> T" >}}
Returns `e2` if `e1` is less than `e2`, and `e1` otherwise.
{{< /func >}}

{{< func "fn min(e1: T, e2: T) -> T" >}}
Returns `e2` if `e2` is less than `e1`, and `e1` otherwise.
{{< /func >}}

{{< func "fn mix(e1: T, e2: T, e3: T) -> T" >}}
Returns the (component-wise) linear blend of `e1` and `e2`, e.g. `e1 * (1 - e3) + e2 * e3)`.
{{< /func >}}

{{< func "fn frexp(e: T) -> __frexp_result" >}}
Splits `e` into a fraction and an exponent so that `e = fraction * 2^exponent`. The fraction is `0.0` or its magnitude is in the range `[0.5, 1.0)`. Returns the `__frexp_result` or `__frexp_result_f16` built-in structure.
{{< /func >}}

{{< func "fn ldexp(e1: T, e2: I) -> T" >}}
Returns `e1 * 2^e2`.
{{< /func >}}

{{< func "fn quantizeToF16(e: T) -> T" >}}
Quantizes a 32-bit floating point value e as if e were converted to a IEEE 754 binary16 value, and then converted back to a IEEE 754 binary32 value.
{{< /func >}}

## Bit
{{< func "fn countLeadingZeros(e: T) -> T" >}}
The number of consecutive `0` bits starting from the most significant bit of `e`.
{{< /func >}}

{{< func "fn countOneBits(e: T) -> T" >}}
The number of `1` bits in the representation of `e`, also known as "population count".
{{< /func >}}

{{< func "fn countTrailingZeros(e: T) -> T" >}}
The number of consecutive `0` bits starting from the least significant bit of `e`.
{{< /func >}}

{{< func "fn extractBits(e: T, offset: u32, count: u32) -> T" >}}
If `T` is **signed**, reads bits with sign extension. Bits `0...c-1` of the result are copied from bits `o...o+c-1` of `e`. Other bits of the result are the same as bit `c-1` of the result. 

If `T` is **unsigned**, reads bits without sign extension. Bits `0...c-1` of the result are copied from bits `o...o+c-1` of `e`. Other bits of the result are `0`. 
{{< /func >}}

{{< func "fn firstLeadingBit(e: T) -> T" >}}
if `T` is **signed**: returns `-1` if `e` is `0` or `-1`, otherwise the position of the most significant bit in `e` that is different from `e`'s sign bit.

If `T` is **unsigned**: returns `T(-1)` if `e` is zero, otherwise the position of the most significant `1` bit in `e`. 
{{< /func >}}

{{< func "fn firstTrailingBit(e: T) -> T" >}}
Returns `T(-1)` if `e` is zero, otherwise the position of the least significant `1` bit in `e`. 
{{< /func >}}

{{< func "fn insertBits(e: T, newbits: T, offset: u32, count: u32) -> T" >}}
Sets bits in an integer. The result is `e` if `c` is `0`. Otherwise, bits `o...o+c-1` of the result are copied from bits `0...c-1` of `newbits`. Other bits of the result are copied from `e`. 
{{< /func >}}

{{< func "fn reverseBits(e: T) -> T" >}}
Reverses the bits in `e`: The bit at position `k` of the result equals the bit at position `31 -k` of `e`.
{{< /func >}}
