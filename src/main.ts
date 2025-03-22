import VM from './vm'
import Bytecode from './bytecode';

const code = [
  // define factorial
  Bytecode.LOAD, -3,  // 0
  Bytecode.ICONST, 2, // 2
  Bytecode.ILT,       // 4
  Bytecode.BRF, 10,   // 5
  Bytecode.ICONST, 1, // 7
  Bytecode.RET,       // 9

  // ret n * fac(n-1)
  Bytecode.LOAD, -3,  // 10
  Bytecode.LOAD, -3,  // 12
  Bytecode.ICONST, 1, // 14
  Bytecode.ISUB,      // 16
  Bytecode.CALL, 0, 1,// 17
  Bytecode.IMUL,      // 20
  Bytecode.RET,       // 21


  // define main
  Bytecode.ICONST, 5, // 22
  Bytecode.CALL, 0, 1,// 24
  Bytecode.PRINT,     // 27
  Bytecode.HALT       // 28

]

const globals: Array<any> = []
const vm = new VM(code, globals, 22, true)
vm.execute()

