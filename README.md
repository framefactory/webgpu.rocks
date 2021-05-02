# [WebGPU.rocks](https://webgpu.rocks)

[Quick reference and documentation](https://webgpu.rocks) for [WebGPU](https://gpuweb.github.io/gpuweb/) and [WGSL](https://gpuweb.github.io/gpuweb/wgsl/). WebGPU is a web API for interfacing with the graphics processing unit, and WGSL is the shading language for WebGPU.

The site is auto-built from the WebGPU specification, parsing the spec's IDL and converting it to HTML snippets. The Hugo static site generator is used to build the final site.

:warning: This is work in progress. The WebGPU spec updates often and the reference is in an early state with moving and missing parts.

## Getting started

- Prerequisites: [Node.js and NPM](https://nodejs.org) installed
- Install the [Hugo static site generator](https://github.com/gohugoio/hugo/releases) (extended version)
- Clone the respository. The WebGPU spec is included as a submodule, don't forget to clone with submodules included:   
`git clone --recurse-submodules https://github.com/framefactory/webgpu.rocks.git`
- Install dependencies  
 `npm install`

## Scripts
```bash
# builds and executes the HTML generator, then starts the Hugo development server
npm run dev

# starts the Hugo development server only
npm run dev:site

# builds and executes the HTML generator, then builds the website to /public
npm run build

# builds the HTML generator only
npm run build:generator

# executes Hugo to build the website
npm run build:site
```

## To Do
- Improved styling
- CI / deployment
- WGSL reference
- ...

## Key 3rd party components :heart:
- [webidl2.js](https://github.com/w3c/webidl2.js)
- [Bikeshed-to-ts](https://github.com/darionco/bikeshed-to-ts)
- [Hugo](https://gohugo.io)
