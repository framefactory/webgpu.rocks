---
title: Reference
---

{{< grid/row >}}
  {{< class "GPUAdapter" "navigator.gpu.requestAdapter" >}}
    {{< method "GPUDevice" "requestDevice" "descriptor" >}}{{< /method >}}
    {{< attrib "string[]" "features" >}}
    {{< attrib "object" "limits" >}}
  {{< /class >}}

  {{< class "GPUDevice" "GPUAdapter.requestDevice" >}}
    {{< method "GPUBuffer" "createBuffer" "descriptor" >}}
    {{< object "GPUBufferDescriptor" >}}
    {{< /method >}}
    {{< method "GPUTexture" "createTexture" "descriptor" >}}{{< /method >}}
    {{< method "GPUSampler" "createSampler" "descriptor" >}}{{< /method >}}
    {{< attrib "string[]" "features" >}}
    {{< attrib "object" "limits" >}}
  {{< /class >}}

{{< /grid/row >}}

{{< grid/row >}}
  {{< class "GPUBuffer" "GPUDevice.createBuffer" >}}
    {{< method "Promise<undefined>" "mapAsync" "mode, offset, size" >}}{{< /method >}}
    {{< method "ArrayBuffer" "getMappedRange" "offset, size" >}}{{< /method >}}
    {{< method "void" "unmap" >}}{{< /method >}}
    {{< method "void" "destroy" >}}{{< /method >}}
  {{< /class >}}
{{< /grid/row >}}
