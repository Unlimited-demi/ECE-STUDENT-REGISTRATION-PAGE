let obj = { a: "080567", b: 2, c: 3, d: 4 };

const newss = {
  ...obj,
  ["a"]: obj.a.startsWith("+") ? Number("0" + obj.a.slice(4)) : Number(obj.a),
};

console.log(newss);
