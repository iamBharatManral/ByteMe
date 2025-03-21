import VM from './vm'
import Bytecode from './bytecode';

const code = [Bytecode.ICONST, 0, Bytecode.PRINT, Bytecode.HALT]
const data = [199]
const vm = new VM(code, data, 0, true)
vm.execute()

