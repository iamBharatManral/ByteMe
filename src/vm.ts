import Bytecode from "./bytecode";

export default class VM {
  private stack: Array<number> = []
  private fp = 0;
  private stackSize = 100;
  private _sp = -1
  get sp() {
    return this._sp
  }
  set sp(val: number) {
    if (val >= this.stackSize) {
      throw new Error("segmentation fault: maximum depth exceeded")
    }
    this._sp = val;
  }
  constructor(private code: Array<number>, private globals: Array<any>, public ip: number, private trace: boolean = false) { }
  execute() {
    let stackString = "Stack trace:\n";
    while (this.ip < this.code.length) {
      // Fetch the instruction
      const opcode = this.code[this.ip++]
      if (this.trace) {
        stackString += `${(this.ip - 1).toString().padStart(4, '0')}: ${this.getInstruction(opcode)} stack=${JSON.stringify(this.stack)}\n`;
      }
      // Decode the instruction
      switch (opcode) {
        case Bytecode.ICONST:
          const operand = this.globals[this.code[this.ip++]]
          this.stack[++this.sp] = operand;
          break
        case Bytecode.GSTORE: {
          const addr = this.code[this.ip++];
          this.globals[addr] = this.stack[this.sp--]
          break
        }
        case Bytecode.GLOAD: {
          const addr = this.code[this.ip++]
          const val = this.globals[addr]
          this.stack[++this.sp] = val;
          break
        }
        case Bytecode.POP:
          this.sp--
          break
        case Bytecode.IADD: {
          const second = this.stack[this.sp--]
          const first = this.stack[this.sp--]
          this.stack[++this.sp] = first + second
          break
        }
        case Bytecode.ISUB: {
          const second = this.stack[this.sp--]
          const first = this.stack[this.sp--]
          this.stack[++this.sp] = first - second
          break
        }
        case Bytecode.IMUL: {
          const second = this.stack[this.sp--]
          const first = this.stack[this.sp--]
          this.stack[++this.sp] = first * second
          break
        }
        case Bytecode.BR: {
          const addr = this.code[this.ip++];
          this.stack[++this.sp] = this.ip
          this.ip = addr
          break
        }
        case Bytecode.BRT: {
          const val = this.stack[this.sp]
          if (val) {
            const addr = this.code[this.ip++];
            this.ip = addr
          } else {
            this.ip++
          }
          break
        }
        case Bytecode.BRF: {
          const val = this.stack[this.sp]
          if (!val) {
            const addr = this.code[this.ip++];
            this.ip = addr
          } else {
            this.ip++
          }
          break
        }
        case Bytecode.STORE: {
          const offset = this.code[this.ip++]
          const addr = this.fp + offset
          this.stack[addr] = this.stack[this.sp--]
          break
        }
        case Bytecode.LOAD: {
          const offset = this.code[this.ip++]
          const addr = this.fp + offset
          this.stack[++this.sp] = this.stack[addr]
          break
        }
        case Bytecode.CALL: {
          const addr = this.code[this.ip++]
          const numOfArgs = this.code[this.ip++]
          this.stack.push(this.ip)
          this.stack.push(this.fp)
          this.fp = this.sp
          for (let i = 1; i <= numOfArgs; i++) { }
          this.ip = addr
          break
        }
        case Bytecode.RET: {
          this.sp = this.fp
          this.fp = this.stack[this.sp--]
          this.ip = this.stack[this.sp--]
          break
        }
        case Bytecode.PRINT:
          const val = this.stack[this.sp--]
          console.log(val + '\n')
          break
        case Bytecode.HALT:
          break
      }
    }
    stackString += this.globalsString()
    this.trace && console.log(stackString)
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
      case Bytecode.STORE:
      case Bytecode.LOAD:
      case Bytecode.BR:
      case Bytecode.BRT:
      case Bytecode.BRF:
        {
          const operand = this.code[this.ip]
          output += `${operand}`.padEnd(5)
          break
        }
      case Bytecode.IADD:
      case Bytecode.ISUB:
      case Bytecode.IMUL:
      case Bytecode.CALL:
        {
          const operand2 = this.stack.at(-1)
          const operand1 = this.stack.at(-2)
          output += `${operand1} ${operand2}`.padEnd(5)
          break
        }
    }
    return output.padEnd(30)
  }
  private globalsString(): string {
    let string = "\nglobals:\n"
    for (const key in this.globals) {
      string += `${key}`.padStart(4, '0') + `: ${this.globals[key]}\n`
    }
    return string
  }
}
