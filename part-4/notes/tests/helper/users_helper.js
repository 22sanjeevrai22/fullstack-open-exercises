const Note = require("../../models/note");
const User = require("../../models/user");

const initialUsers = [
  {
    username: "alice",
    name: "Alice Wonderland",
    passwordHash: "hash1",
    notes: [],
  },
  {
    username: "bob",
    name: "Bob Builder",
    passwordHash: "hash2",
    notes: [],
  },
  {
    username: "charlie",
    name: "Charlie Brown",
    passwordHash: "hash3",
    notes: [],
  },
  {
    username: "diana",
    name: "Diana Prince",
    passwordHash: "hash4",
    notes: [],
  },
  {
    username: "eve",
    name: "Eve Polastri",
    passwordHash: "hash5",
    notes: [],
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  nonExistingId,
  usersInDb,
};
