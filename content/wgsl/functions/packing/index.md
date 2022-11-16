---
Title: Packing & Unpacking
weight: 120
---

# Data packing & unpacking built-in functions

## Data Packing
{{< func "fn pack4x8snorm(e: vec4<f32>) -> u32" >}}
Converts four normalized floating point values to 8-bit signed integers,
and then combines them into one u32 value. Component `e[i]` of the input is
converted to an 8-bit twos complement integer value `⌊ 0.5 + 127 × min(1, max(-1, e[i])) ⌋`
which is then placed in bits `8 × i` through `8 × i + 7` of the result. 
{{< /func >}}

{{< func "fn pack4x8unorm(e: vec4<f32>) -> u32" >}}
Converts four normalized floating point values to 8-bit unsigned integers,
and then combines them into one u32 value. Component `e[i]` of the input is
converted to an 8-bit unsigned integer value `⌊ 0.5 + 255 × min(1, max(0, e[i])) ⌋`
which is then placed in bits `8 × i` through `8 × i + 7` of the result. 
{{< /func >}}

{{< func "fn pack2x16snorm(e: vec2<f32>) -> u32" >}}
Converts two normalized floating point values to 16-bit signed integers,
and then combines them into one u32 value. Component `e[i]` of the input is
converted to a 16-bit twos complement integer value `⌊ 0.5 + 32767 × min(1, max(-1, e[i])) ⌋`
which is then placed in bits `16 × i` through `16 × i + 15` of the result. 
{{< /func >}}

{{< func "fn pack2x16unorm(e: vec2<f32>) -> u32" >}}
Converts two normalized floating point values to 16-bit unsigned integers,
and then combines them into one u32 value. Component `e[i]` of the input is
converted to a 16-bit unsigned integer value `⌊ 0.5 + 65535 × min(1, max(0, e[i])) ⌋`
which is then placed in bits `16 × i` through `16 × i + 15` of the result. 
{{< /func >}}

{{< func "fn pack2x16float(e: vec2<f32>) -> u32" >}}
Converts two floating point values to half-precision floating point numbers,
and then combines them into one `u32` value. Component `e[i]` of the input is
converted to an IEEE-754 binary16 value, which is then placed in bits
`16 × i` through `16 × i + 15` of the result.
{{< /func >}}

## Data Unpacking

{{< func "fn unpack4x8snorm(e: u32) -> vec4<f32>" >}}
Decomposes a 32-bit value into four 8-bit chunks, then reinterprets each chunk as a
signed normalized floating point value. Component `i` of the result is `max(v ÷ 127, -1)`,
where `v` is the interpretation of bits `8×i` through `8×i + 7` of `e` as a twos-complement
signed integer. 
{{< /func >}}

{{< func "fn unpack4x8unorm(e: u32) -> vec4<f32>" >}}
Decomposes a 32-bit value into four 8-bit chunks, then reinterprets each chunk as an
unsigned normalized floating point value. Component `i` of the result is `v ÷ 255`,
where `v` is the interpretation of bits `8×i` through `8×i + 7` of e as an unsigned integer. 
{{< /func >}}

{{< func "fn unpack2x16snorm(e: u32) -> vec2<f32>" >}}
Decomposes a 32-bit value into two 16-bit chunks, then reinterprets each chunk as a
signed normalized floating point value. Component `i` of the result is `max(v ÷ 32767, -1)`,
where `v` is the interpretation of bits `16×i` through `16×i + 15` of e as a twos-complement
signed integer. 
{{< /func >}}

{{< func "fn unpack2x16unorm(e: u32) -> vec2<f32>" >}}
Decomposes a 32-bit value into two 16-bit chunks, then reinterprets each chunk as an
unsigned normalized floating point value. Component `i` of the result is `v ÷ 65535`,
where `v` is the interpretation of bits `16×i` through `16×i + 15` of e as an unsigned integer. 
{{< /func >}}

{{< func "fn unpack2x16float(e: u32) -> vec2<f32>" >}}
Decomposes a 32-bit value into two 16-bit chunks, and reinterpets each chunk as a
floating point value. Component `i` of the result is the `f32` representation of `v`,
where `v` is the interpretation of bits `16×i` through `16×i + 15` of e as an IEEE-754
binary16 value.
{{< /func >}}