class Memory {
  constructor() {
    this.state = {};
  }

  create(key, data) {
    const el = {
      ...data,
      _id: Date.now(),
    };
    if (this.state[key] === undefined) {
      this.state[key] = [el];
    } else {
      this.state[key].push(el);
    }
    return el;
  }

  findAll(key) {
    return this.state[key] ? this.state[key] : null;
  }

  findById(key, id) {
    const el = this.state[key]?.find((el) => el._id == id);
    return el ? el : null;
  }

  update(key, id, data) {
    const index = this.state[key]?.findIndex((el) => el._id == id);
    if (index === -1) {
      return null;
    }
    this.state[key][index] = {
      ...this.state[key][index],
      ...data,
    };
    return this.state[key][index];
  }

  delete(key, id) {
    const index = this.state[key]?.findIndex((el) => el._id == id);
    if (index === undefined || index === -1) {
      return null;
    }
    const [el] = this.state[key].splice(index, 1);
    return el;
  }
}

module.exports = new Memory();
