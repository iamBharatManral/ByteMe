import VM from './vm'
import Bytecode from './bytecode';

const code = [Bytecode.ICONST, 0, Bytecode.BRT, 7, Bytecode.ICONST, 7, Bytecode.IMUL, Bytecode.PRINT, Bytecode.HALT]
// const code = [Bytecode.ICONST, 0, Bytecode.ICONST, 1, Bytecode.IADD, Bytecode.ICONST, 2, Bytecode.IMUL, Bytecode.PRINT, Bytecode.BR, Bytecode.HALT]
const globals = [true, 99, 2]
const vm = new VM(code, globals, 0, true)
vm.execute()

