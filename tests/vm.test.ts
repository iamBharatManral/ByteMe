import VM from '../src/vm'
import Bytecode from '../src/bytecode';

describe('virtual machine execution', () => {
  test('test vm for printing a value', () => {
    const code = [Bytecode.ICONST, 0, Bytecode.PRINT, Bytecode.HALT]
    const data = [199]
    const vm = new VM(code, data, 0)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    vm.execute()
    expect(consoleSpy).toHaveBeenCalledWith(199);
    consoleSpy.mockRestore()
  })
})
