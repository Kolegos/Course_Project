const md5 = require("md5");

const defaultState = {
  session: {
    authenticated: false
  },
  users: [
    {
      id: "U1",
      name: "Edgaras",
      passwordHash: md5("TUPLES")
    },
    {
      id: "U2",
      name: "Evaldas",
      passwordHash: md5("PROFITING")
    },
    {
      id: "U3",
      name: "Tomas",
      passwordHash: md5("GRYBAS")
    },
    {
      id: "U4",
      name: "Audi fanas",
      passwordHash: md5("AUDI")
    }
  ],
  posts: [
    {
      id: "P1",
      name: "BMW e39",
      price: "5",
      owner: "U4",
      bajeris: false
    },
    {
      id: "P2",
      name: "Peugeuot 406",
      price: "999999",
      owner: "U3",
      bajeris: false
    },
    {
      id: "P3",
      name: "Peugeot 307",
      owner: "U1",
      price: "0.5",
      bajeris: true
    },
    {
      id: "P4",
      name: "Audi A3",
      owner: "U2",
      price: "0.5",
      bajeris: true
    }
  ]
};
