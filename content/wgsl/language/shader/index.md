---
Title: Shader
---

# Shader
WGSL defines three shader stages, corresponding to the programmable stages of pipelines:
vertex, fragment, and compute.

## Vertex Shader
A vertex shader program maps input attributes for a single vertex into output attributes for the vertex. The `@vertex` attribute denotes a vertex shader entry point. 
{{< wgsl >}}
@vertex
fn vert_main() -> @builtin(position) vec4<f32> {
  return vec4<f32>(0.0, 0.0, 0.0, 1.0);
}
{{< /wgsl >}}

## Fragment Shader
A fragment shader program processes each fragment, possibly producing a fragment output.
The `@fragment` attribute denotes a fragment shader entry point. 
{{< wgsl >}}
@fragment
fn frag_main(@builtin(position) coord_in: vec4<f32>) -> @location(0) vec4<f32> {
  return vec4<f32>(coord_in.x, coord_in.y, 0.0, 1.0);
}
{{< /wgsl >}}

## Compute Shader
A compute shader program runs over a logical grid of points with a controllable
amount of parallelism, while reading and possibly updating buffer and image resources.
The `@compute` attribute together with the `@workgroup_size` denote a compute
shader entry point. 
{{< wgsl >}}
@compute @workgroup_size(1)
fn comp_main() {
}
{{< /wgsl >}}