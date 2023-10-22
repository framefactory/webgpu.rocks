---
title: WebGPU
---

# WebGPU/WGSL Reference

## What's on this website?

This is a quick reference for WebGPU and WGSL, the WebGPU shading language. While the [WebGPU specification](https://gpuweb.github.io/gpuweb/) aims to describe the API as accurately and detailed as possible, the reference provides an easy to navigate API summary for daily use.
For now, this is not a detailed introduction or programming guide.

This site is free of advertising and ad-trackers. Content is provided "as is", with no warranty
of any kind. If you find errors or want to contribute, please open an issue on [Github](https://github.com/framefactory/webgpu.rocks).

## What is WebGPU?

WebGPU is a future web standard and JavaScript API for interfacing with the GPU, the graphics processing unit. It is based on concepts of other modern graphics APIs such as Vulkan, Metal, and Direct3D 12. The specification is under development.

- [WebGPU Specification, editor's draft](https://gpuweb.github.io/gpuweb/)
- [WGSL Specification, W3C working draft](https://www.w3.org/TR/WGSL/)
- [Implementation status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status)
- [Samples](https://github.com/austinEng/webgpu-samples)
- [TypeScript definitions](https://github.com/gpuweb/types) 
- [Awesome WebGPU](https://github.com/mikbry/awesome-webgpu)
- [Wgsl sandbox (compute.toys)](https://compute.toys)

## Getting started

Let's say you want to create a [`GPUDevice`](/reference/interface/gpudevice/#idl-gpudevice) object.
- Select [`GPUDevice`](/reference/interface/gpudevice/#idl-gpudevice) from the list of interfaces on the left.
- The first line(s) show you where to look for creating a [`GPUDevice`](/reference/interface/gpudevice/#idl-gpudevice). You see immediately that [`GPUAdapter`](/reference/interface/gpuadapter/#idl-gpuadapter) provides a `.requestDevice()` method.  
- Click on any method name to expand all information you need in order to prepare the arguments for calling this method.
- Click on any type name to get detailed information about it.

## Are these pages up to date?

The WebGPU specification is still under development and changes frequently. The reference pages are auto-generated regularly from the evolving [WebGPU specification](https://gpuweb.github.io/gpuweb/). If you find them outdated, [open an issue](https://github.com/framefactory/webgpu.rocks) or drop me a [message](mailto:janitor@webgpu.rocks).