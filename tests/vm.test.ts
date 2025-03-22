import VM from '../src/vm'
import Bytecode from '../src/bytecode';

describe('virtual machine execution', () => {
  test('test vm for printing a value', () => {
    const code = [Bytecode.ICONST, 0, Bytecode.PRINT, Bytecode.HALT]
    const data = [199]
    const vm = new VM(code, data, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(199 + '\n');
    consoleSpy.mockRestore()
  })
  test('test vm for addition and multiplication', () => {
    const code = [Bytecode.ICONST, 0, Bytecode.ICONST, 1, Bytecode.IADD, Bytecode.ICONST, 2, Bytecode.IMUL, Bytecode.PRINT, Bytecode.HALT]
    const data = [199, 99, 2]
    const vm = new VM(code, data, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(596 + '\n');
    consoleSpy.mockRestore()
  })
  test('test vm for unconditional branching', () => {
    const code = [Bytecode.ICONST, 0, Bytecode.ICONST, 1, Bytecode.BR, 11, Bytecode.IADD, Bytecode.ICONST, 2, Bytecode.IMUL, Bytecode.PRINT, Bytecode.HALT]
    const data = [199, 99, 2]
    const vm = new VM(code, data, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore()
  })
  test('test vm for conditional true branching when satisfied', () => {
    const code = [Bytecode.ICONST, 0, Bytecode.BRT, 7, Bytecode.ICONST, 1, Bytecode.IMUL, Bytecode.PRINT, Bytecode.HALT]
    const data = [true, 12]
    const vm = new VM(code, data, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(true + '\n');
    consoleSpy.mockRestore()
  })
  test('test vm for conditional true branching when not satisfied', () => {
    const code = [Bytecode.ICONST, 0, Bytecode.BRT, 7, Bytecode.ICONST, 1, Bytecode.IMUL, Bytecode.PRINT, Bytecode.HALT]
    const data = [0, 12]
    const vm = new VM(code, data, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(0 + '\n');
    consoleSpy.mockRestore()
  })
})
