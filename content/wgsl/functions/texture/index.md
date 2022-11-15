---
title: Texture
weight: 140
---

# Texture built-in functions
## Properties
{{< func "fn textureDimensions(t: T, [level: L]) -> vecN<u32>" >}}
Returns the dimensions of a texture, or texture’s mip level in texels.
{{< /func >}}

{{< func "fn textureNumLayers(t: T) -> u32" >}}
Returns the number of layers (elements) of an array texture.
{{< /func >}}

{{< func "fn textureNumLevels(t: T) -> u32" >}}
Returns the number of mip levels of a texture.
{{< /func >}}

{{< func "fn textureNumSamples(t: T) -> u32" >}}
Returns the number samples per texel in a multisampled texture.
{{< /func >}}

## Read
{{< func "fn textureLoad(t: T, coords: vecN<C>, [sample_index: S], [array_index: A], [level: L]) -> vec4<f32>" >}}
Reads a single texel from a texture without sampling or filtering.
{{< /func >}}

{{< func "fn textureGather(c: C, t: T, s: sampler, coords: vecN<f32>, [array_index: A], [offset: vec2<i32>]) -> vec4<ST>" >}}
From the four texels that would be used in a sampling operation with linear filtering,
returns a vector with each component set to the value of component `c` of each texel.
{{< /func >}}

{{< func "fn textureGatherCompare(t: TD, s: sampler_comparison, coords: vecN<f32>, [array_index: A], depth_ref: f32, [offset: vec2<i32>]) -> vec4<f32>" >}}
Using the four texels that would be used in a sampling operation with linear filtering, performs a depth comparison in a depth texture and collects the results into a single vector.
{{< /func >}}

## Sample
{{< func "fn textureSample(t: T, s: sampler, coords: vecN<f32>, [array_index: A], [offset: vec2<i32>]) -> vec4<f32>" >}}
Samples a texture. Must only be used in a fragment shader stage. Must only be invoked in uniform control flow.
{{< /func >}}

{{< func "fn textureSampleBias(t: T, s: sampler, coords: vecN<f32>, [array_index: A], bias: f32, [offset: vec2<i32>]) -> vec4<f32>" >}}
Samples a texture with a bias to the mip level. Must only be used in a fragment shader stage. Must only be invoked in uniform control flow.
{{< /func >}}

{{< func "fn textureSampleCompare(t: TD, s: sampler_comparison, coords: vecN<f32>, [array_index: A], depth_ref: f32, [offset: vec2<i32>]) -> f32" >}}
Samples a depth texture and compares the sampled depth values against a reference value. Must only be used in a fragment shader stage. Must only be invoked in uniform control flow.
{{< /func >}}

{{< func "fn textureSampleCompareLevel(t: TD, s: sampler_comparison, coords: vecN<f32>, [array_index: A], depth_ref: f32, [offset: vec2<i32>]) -> f32" >}}
Samples a depth texture and compares the sampled depth values against a reference value. Same as `textureSampleCompare` except it always samples texels from mip level `0`.
{{< /func >}}

{{< func "fn textureSampleGrad(t: T, s: sampler, coords: vecN<f32>, [array_index: A], ddx: vec2<f32>, ddy: vec2<f32>, [offset: vec2<i32>]) -> vec4<f32>" >}}
Samples a texture using explicit gradients.
{{< /func >}}

{{< func "fn textureSampleLevel(t: T, s: sampler, coords: vecN<f32>, [array_index: A], level: f32, [offset: vec2<i32>]) -> vec4<f32>" >}}
Samples a texture using an explicit mip level.
{{< /func >}}

{{< func "fn textureSampleBaseClampToEdge(t: T, s: sampler, coords: vec2<f32>) -> vec4<f32>" >}}
Samples a texture view at its base level, with texture coordinates clamped to the edge.
{{< /func >}}

## Write
{{< func "fn textureStore(t: texture_storage_2d_array<F,write>, coords: vec2<C>, [array_index: A], value: vec4<CF>)" >}}
Writes a single texel to a texture.
{{< /func >}}

{{< func "" >}}

{{< /func >}}