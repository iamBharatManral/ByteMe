import VM from './vm'
import Bytecode from './bytecode';

const code = [Bytecode.ICONST, 0, Bytecode.GSTORE, 1, Bytecode.GLOAD, 1, Bytecode.PRINT, Bytecode.HALT]
const globals = [199]
const vm = new VM(code, globals, 0, true)
vm.execute()

