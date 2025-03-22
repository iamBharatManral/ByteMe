## ByteMe: Stack based bytecode interpreter

## 📌 **Bytecode Instructions**

### 🔹 **Arithmetic Operations**
- `IADD`  → **Integer addition**
- `ISUB`  → **Integer subtraction**
- `IMUL`  → **Integer multiplication**

### 🔹 **Comparison Operations**
- `ILT`  → **Integer less than**
- `IEQ`  → **Integer equality check**

### 🔹 **Branching & Control Flow**
- `BR`   → **Unconditional branch**
- `BRT`  → **Branch if true**
- `BRF`  → **Branch if false**
- `CALL` → **Call a function**
- `RET`  → **Return from function**

### 🔹 **Memory Operations**
- `ICONST`  → **Load constant integer**
- `LOAD`    → **Load from local memory**
- `GLOAD`   → **Load from global memory**
- `STORE`   → **Store in local memory**
- `GSTORE`  → **Store in global memory**

### 🔹 **Stack Operations**
- `PRINT` → **Print top of stack**
- `POP`   → **Remove top value from stack**

### 🔹 **Execution Control**
- `HALT`  → **Stop execution**

## 📌 Tracing Support

```
Stack trace:
0022: ICONST    1                    stack=[], sp=-1, fp=0
0024: CALL      0                    stack=[1], sp=0, fp=0
0000: LOAD      -2                   stack=[1,1,27,0], sp=3, fp=3
0002: ICONST    2                    stack=[1,1,27,0,1], sp=4, fp=3
0004: ILT                            stack=[1,1,27,0,1,2], sp=5, fp=3
0005: BRF       10                   stack=[1,1,27,0,1,2], sp=4, fp=3
0007: ICONST    1                    stack=[1,1,27,0,1,2], sp=4, fp=3
0009: RET                            stack=[1,1,27,0,1,1], sp=5, fp=3
0027: PRINT                          stack=[1,1,27,0,1,1], sp=0, fp=0
0028: HALT                           stack=[1,1,27,0,1,1], sp=-1, fp=0

globals:

```

