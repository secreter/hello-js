function Person() {
  if (!(this instanceof Person)) return new Person;
  this.name=''
  this.age=0
}
console.log(Person())
console.log(new Person())