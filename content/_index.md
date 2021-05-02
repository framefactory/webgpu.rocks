---
title: WebGPU
---

# WebGPU Quick Reference

## What is WebGPU?

WebGPU is a future web standard and JavaScript API for interfacing with the GPU, the graphics processing unit. It is based on concepts of other modern graphics APIs such as Vulkan, Metal, and Direct3D 12. The specification is under development.

- [Specification, editor's draft](https://gpuweb.github.io/gpuweb/)
- [Implementation status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status)
- [Samples](https://github.com/austinEng/webgpu-samples)
- [TypeScript definitions](https://github.com/gpuweb/types) 
- [Wikipedia](https://en.wikipedia.org/wiki/WebGPU)
- [Awesome WebGPU](https://github.com/mikbry/awesome-webgpu)

## What's on this website?

This is a quick reference for WebGPU. While the [WebGPU specification](https://gpuweb.github.io/gpuweb/) aims to describe the API as accurately and detailed as possible, this reference provides an easy to navigate API summary for daily use.

For now, this is not a detailed introduction or programming guide.

## Getting started

Let's say you want to create a [`GPUDevice`](/reference/interface/gpudevice/#idl-gpudevice) object.
- Select [`GPUDevice`](/reference/interface/gpudevice/#idl-gpudevice) from the list of interfaces on the left.
- The first line(s) show you where to look for creating a [`GPUDevice`](/reference/interface/gpudevice/#idl-gpudevice). You see immediately that [`GPUAdapter`](/reference/interface/gpuadapter/#idl-gpuadapter) provides a `.requestDevice()` method.  
- Click on any method name to expand all information you need in order to prepare the arguments for calling this method.
- Click on any type name to get detailed information about it.

## Are these pages up to date?

The WebGPU specification is still under development and changes frequently. These reference pages are auto-created regularly from the WebGPU editor's draft specification, as available on [Github](https://gpuweb.github.io/gpuweb/). If you find them outdated, drop me a [message](mailto:janitor@webgpu.rocks).