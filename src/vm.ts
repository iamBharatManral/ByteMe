import Bytecode from "./bytecode";

export default class VM {
  stack: Array<number> = []
  sp = -1;
  fp = 0;
  stackSize = 100;
  constructor(private code: Array<number>, private data: Array<any>, public ip: number, private trace: boolean = false) { }
  execute() {
    let stackString = "";
    while (this.ip < this.code.length) {
      // Fetch the instruction
      const opcode = this.code[this.ip++]
      if (this.trace) {
        stackString += `${(this.ip - 1).toString().padStart(4, '0')}: ${this.getInstruction(opcode)} ${this.stack}\n`;
      }
      // Decode the instruction
      switch (opcode) {
        case Bytecode.ICONST:
          if (this.isStackFull()) {
            throw new Error("segmentation fault: maximum depth exceeded")
          }
          const operand = this.data.at(this.code[this.ip++])
          this.stack[++this.sp] = operand;
          break
        case Bytecode.PRINT:
          const val = this.stack.pop()
          console.log(val)
          break
        case Bytecode.HALT:
          break
      }
    }
    console.log(stackString)
  }
  private isStackFull(): boolean {
    return this.stack.length >= this.stackSize
  }
  getInstruction(opcode: number): string {
    let output = `${Bytecode[opcode]} `
    switch (opcode) {
      case Bytecode.ICONST:
        const operand = this.data.at(this.code[this.ip])
        output += `${operand}`
        break
    }
    return output.padEnd(15)
  }
}
