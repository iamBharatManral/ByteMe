import VM from '../src/vm'
import Bytecode from '../src/bytecode';

describe('virtual machine execution', () => {
  test('test vm for printing a value', () => {
    const code = [Bytecode.ICONST, 199,
    Bytecode.PRINT,
    Bytecode.HALT
    ];

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(199 + '\n');
    consoleSpy.mockRestore()
  })

  test('test vm for addition and multiplication', () => {
    const code = [Bytecode.ICONST, 199,
    Bytecode.ICONST, 99,
    Bytecode.IADD,
    Bytecode.ICONST, 2,
    Bytecode.IMUL,
    Bytecode.PRINT,
    Bytecode.HALT];

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(596 + '\n');
    consoleSpy.mockRestore()
  })

  test('test vm for unconditional branching', () => {
    const code = [Bytecode.ICONST, 199,
    Bytecode.ICONST, 99,
    Bytecode.BR, 11,
    Bytecode.IADD,
    Bytecode.ICONST, 2,
    Bytecode.IMUL,
    Bytecode.PRINT,
    Bytecode.HALT]

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore()
  })

  test('test vm for conditional true branching when satisfied', () => {
    const code = [Bytecode.ICONST, 1,
    Bytecode.BRT, 7,
    Bytecode.ICONST, 12,
    Bytecode.IMUL,
    Bytecode.PRINT,
    Bytecode.HALT]

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(1 + '\n');
    consoleSpy.mockRestore()
  })

  test('test vm for conditional true branching when not satisfied', () => {
    const code = [Bytecode.ICONST, 0,
    Bytecode.BRT, 7,
    Bytecode.ICONST, 12,
    Bytecode.IMUL,
    Bytecode.PRINT,
    Bytecode.HALT]

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(0 + '\n');
    consoleSpy.mockRestore()
  })

  test('test vm for conditional true branching when not satisfied', () => {
    const code = [Bytecode.ICONST, 0,
    Bytecode.BRT, 7,
    Bytecode.ICONST, 12,
    Bytecode.IMUL,
    Bytecode.PRINT,
    Bytecode.HALT]

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(0 + '\n');
    consoleSpy.mockRestore()
  })

  test('test vm for less than instruction', () => {
    const code = [Bytecode.ICONST, 0,
    Bytecode.ICONST, 12,
    Bytecode.ILT,
    Bytecode.PRINT,
    Bytecode.HALT]

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(1 + '\n');
    consoleSpy.mockRestore()
  })

  test('test vm for equal instruction', () => {
    const code = [Bytecode.ICONST, 12,
    Bytecode.ICONST, 13,
    Bytecode.IEQ,
    Bytecode.PRINT,
    Bytecode.HALT]

    const globals: Array<any> = []
    const vm = new VM(code, globals, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(0 + '\n');
    consoleSpy.mockRestore()
  })

  test('test vm for call instruction (factorital base condition)', () => {
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
      Bytecode.ICONST, 1, // 22
      Bytecode.CALL, 0, 1,// 24
      Bytecode.PRINT,     // 27
      Bytecode.HALT       // 28

    ]
    const globals: Array<any> = []
    const vm = new VM(code, globals, 22)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(1 + '\n');
    consoleSpy.mockRestore()
  })
  test('test vm for call instruction (factorial of 5)', () => {
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
    const vm = new VM(code, globals, 22)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(120 + '\n');
    consoleSpy.mockRestore()
  })
})
