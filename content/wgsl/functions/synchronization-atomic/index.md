---
title: Synchronization & Atomic
weight: 130
---

# Synchronization and atomic built-in functions

## Synchronization
All synchronization functions execute a control barrier with Acquire/Release memory ordering. That is, all synchronization functions, and affected memory and atomic operations are ordered in program order relative to the synchronization function.

Additionally, the affected memory and atomic operations program-ordered before the synchronization function must be visible to all other threads in the workgroup before any affected memory or atomic operation program-ordered after the synchronization function is executed by a member of the workgroup.

All synchronization functions use the Workgroup memory scope. All synchronization functions have a Workgroup execution scope. All synchronization functions must only be used in the compute shader stage.

{{< func "fn storageBarrier()" >}}
Affects memory and atomic operations in the **storage** address space.
{{< /func >}}

{{< func "fn workgroupBarrier()" >}}
Affects memory and atomic operations in the **workgroup** address space.
{{< /func >}}

## Atomic
{{< func "fn atomicLoad(atomic_ptr: ptr<AS, atomic<T>, read_write>) -> T" >}}
Returns the atomically loaded value pointed to by `atomic_ptr`. It does not modify the object.
{{< /func >}}

{{< func "fn atomicStore(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T)" >}}
Atomically stores the value `v` in the atomic object pointed to by `atomic_ptr`.
{{< /func >}}

{{< func "fn atomicAdd(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomic Read-modify-write. Returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicSub(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomic Read-modify-write. Returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicMax(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomic Read-modify-write. Returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicMax(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomic Read-modify-write. Returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicAnd(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomic Read-modify-write. Returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicOr(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomic Read-modify-write. Returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicXor(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomic Read-modify-write. Returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicExchange(atomic_ptr: ptr<AS, atomic<T>, read_write>, v: T) -> T" >}}
Atomically stores the value `v` in the atomic object pointed to `atomic_ptr` and returns the original value stored in the atomic object.
{{< /func >}}

{{< func "fn atomicCompareExchangeWeak(atomic_ptr: ptr<AS, atomic<T>, read_write>, cmp: T, v: T) -> __atomic_compare_exchange_result<T>" >}}
Load the original value pointed to by `atomic_ptr`, then compare the original value to the value `cmp` using an equality operation. Store the value `v` only if the result of the equality comparison was true.

Returns a two member structure, where the first member, `old_value`, is the original value of the atomic object and the second member, `exchanged`, is whether or not the comparison succeeded.
{{< /func >}}
