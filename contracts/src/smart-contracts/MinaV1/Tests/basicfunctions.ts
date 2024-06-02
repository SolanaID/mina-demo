import { Bool, Character, CircuitString, Field, Int64, PrivateKey, Provable, Signature, Struct, UInt32, UInt64 } from "o1js";


const num1 = UInt32.from(40);
const num2 = UInt64.from(40);

const num1EqualsNum2: Bool = num1.toUInt64().equals(num2);

console.log(`num1 === num2: ${num1EqualsNum2.toString()}`);
console.log(`Fields in num1: ${num1.toFields().length}`);

// --------------------------------------

const signedNum1 = Int64.from(-3);
const signedNum2 = Int64.from(45);

const signedNumSum = signedNum1.add(signedNum2);

console.log(`signedNum1 + signedNum2: ${signedNumSum}`);
console.log(`Fields in signedNum1: ${signedNum1.toFields().length}`);

// --------------------------------------

const char1 = Character.fromString('c');
const char2 = Character.fromString('d');
const char1EqualsChar2: Bool = char1.toField().equals(char2.toField());

console.log(`char1: ${char1}`);
console.log(`char1 === char2: ${char1EqualsChar2.toString()}`);
console.log(`Fields in char1: ${Character.toFields(char1).length}`);

const str1 = CircuitString.fromString('@.,m!12312--_asd=%$&)()"#$1leiss3Mitternach');
console.log(`str1: ${str1}`);
console.log(`Fields in str1: ${CircuitString.toFields(str1).length}`);
const {mask, length} = str1.computeLengthAndMask()
console.log(mask, length.toString())
console.log(str1.hash().toString())

// --------------------------------------

const zkAppPrivateKey = PrivateKey.random();
const zkAppPublicKey = zkAppPrivateKey.toPublicKey();

const data1 = Character.toFields(char2).concat(signedNumSum.toFields());
const data2 = Character.toFields(char1).concat(CircuitString.toFields(str1));

const signature = Signature.create(zkAppPrivateKey, data2);

const verifiedData1 = signature.verify(zkAppPublicKey, data1).toString();
const verifiedData2 = signature.verify(zkAppPublicKey, data2).toString();

console.log(`private key: ${zkAppPrivateKey.toBase58()}`);
console.log(`public key: ${zkAppPublicKey.toBase58()}`);
console.log(`Fields in private key: ${zkAppPrivateKey.toFields().length}`);
console.log(`Fields in public key: ${zkAppPublicKey.toFields().length}`);

console.log(`signature verified for data1: ${verifiedData1}`);
console.log(`signature verified for data2: ${verifiedData2}`);

console.log(`Fields in signature: ${signature.toFields().length}`);

class Point extends Struct({ x: Field, y: Field }) {
    static add(a: Point, b: Point) {
      return { x: a.x.add(b.x), y: a.y.add(b.y) };
    }
  }
  
  const point1 = { x: Field(10), y: Field(4) };
  const point2 = { x: Field(1), y: Field(2) };
  
  const pointSum = Point.add(point1, point2);
  
  console.log(`pointSum Fields: ${Point.toFields(pointSum)}`);
  
  class Points8 extends Struct({
    points: [Point, Point, Point, Point, Point, Point, Point, Point],
  }) {}
  
  const points = new Array(8)
    .fill(null)
    .map((_, i) => ({ x: Field(i), y: Field(i * 10) }));
  const points8: Points8 = { points };
  
  console.log(`points8 JSON: ${JSON.stringify(points8)}`);

  const input1 = Int64.from(10);
const input2 = Int64.from(-15);

const inputSum = input1.add(input2);

const inputSumAbs = Provable.if(
  inputSum.isPositive(),
  inputSum,
  inputSum.mul(Int64.minusOne)
);

console.log(`inputSum: ${inputSum.toString()}`);
console.log(`inputSumAbs: ${inputSumAbs.toString()}`);

const input3 = Int64.from(22);

const input1largest = input1
  .sub(input2)
  .isPositive()
  .and(input1.sub(input3).isPositive());
const input2largest = input2
  .sub(input1)
  .isPositive()
  .and(input2.sub(input3).isPositive());
const input3largest = input3
  .sub(input1)
  .isPositive()
  .and(input3.sub(input2).isPositive());

const largest = Provable.switch(
  [input1largest, input2largest, input3largest],
  Int64,
  [input1, input2, input3]
);

console.log(`largest: ${largest.toString()}`);


