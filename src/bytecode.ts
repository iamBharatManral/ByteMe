enum Bytecode {
  IADD,
  ISUB,
  IMUL,
  ILT,
  IEQ,
  BR,
  BRT,
  BRF,
  ICONST,
  LOAD,
  GLOAD,
  STORE,
  GSTORE,
  PRINT,
  POP,
  HALT,
  CALL,
  RET
}

export default Bytecode;
