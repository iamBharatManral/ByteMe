import Bytecode from "./bytecode";

export default class VM {
  stack: Array<number> = []
  fp = 0;
  stackSize = 100;
  constructor(private code: Array<number>, private globals: Array<any>, public ip: number, private trace: boolean = false) { }
  get sp() {
    return this.stack.length - 1
  }
  execute() {
    let stackString = "";
    while (this.ip < this.code.length) {
      // Fetch the instruction
      const opcode = this.code[this.ip++]
      if (this.trace) {
        stackString += `${(this.ip - 1).toString().padStart(4, '0')}: ${this.getInstruction(opcode)} stack=${JSON.stringify(this.stack)}\n`;
      }
      // Decode the instruction
      switch (opcode) {
        case Bytecode.ICONST:
          if (this.isStackFull()) {
            throw new Error("segmentation fault: maximum depth exceeded")
          }
          const operand = this.globals.at(this.code[this.ip++])
          this.stack.push(operand)
          break
        case Bytecode.GSTORE: {
          const addr = this.code[this.ip++];
          this.globals[addr] = this.stack.pop()
          break
        }
        case Bytecode.GLOAD: {
          const addr = this.code[this.ip++]
          const val = this.globals[addr]
          this.stack.push(val)
          break
        }
        case Bytecode.POP:
          this.stack.pop()
          break
        case Bytecode.IADD: {
          const second = this.stack.pop()!
          const first = this.stack.pop()!
          this.stack.push(first + second)
          break
        }
        case Bytecode.ISUB: {
          const second = this.stack.pop()!
          const first = this.stack.pop()!
          this.stack.push(first - second)
          break
        }
        case Bytecode.IMUL: {
          const second = this.stack.pop()!
          const first = this.stack.pop()!
          this.stack.push(first * second)
          break
        }
        case Bytecode.PRINT:
          console.log(this.stack.pop())
          break
        case Bytecode.HALT:
          break
      }
    }
    stackString += `\nGlobals:\n${JSON.stringify(this.globals)}`
    console.log(stackString)
  }
  private isStackFull(): boolean {
    return this.stack.length >= this.stackSize
  }
  getInstruction(opcode: number): string {
    let output = `${Bytecode[opcode]} `.padEnd(10)
    switch (opcode) {
      case Bytecode.ICONST: {
        const operand = this.globals.at(this.code[this.ip])
        output += `${operand}`.padEnd(5)
        break
      }
      case Bytecode.GLOAD:
      case Bytecode.GSTORE:
        {
          const operand = this.code[this.ip]
          output += `${operand}`.padEnd(5)
          break
        }
      case Bytecode.IADD:
      case Bytecode.ISUB:
      case Bytecode.IMUL:
        {
          const operand2 = this.stack.at(-1)
          const operand1 = this.stack.at(-2)
          output += `${operand1} ${operand2}`.padEnd(5)
          break
        }
    }
    return output.padEnd(15)
  }
}
