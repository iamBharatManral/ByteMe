export default class VM {
  stack: Array<number> = []
  sp: number = -1;
  fp: number = 0;
  stackSize: number = 100;
  constructor(private code: Array<number>, public ip: number) { }
  execute() {
    for (const ins of this.code) {
      console.log(ins)
    }
  }
}
