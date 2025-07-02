const Blog = require("../../models/blog");
const User = require("../../models/user");

const initialUsers = [
  {
    username: "alice",
    name: "Alice Wonderland",
    passwordHash: "hash1",
  },
  {
    username: "bob",
    name: "Bob Builder",
    passwordHash: "hash2",
  },
  {
    username: "charlie",
    name: "Charlie Brown",
    passwordHash: "hash3",
  },
  {
    username: "diana",
    name: "Diana Prince",
    passwordHash: "hash4",
  },
  {
    username: "eve",
    name: "Eve Polastri",
    passwordHash: "hash5",
  },
];

// const nonExistingId = async () => {
//   const note = new Note({ content: "willremovethissoon" });
//   await note.save();
//   await note.deleteOne();

//   return note._id.toString();
// };

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  //   nonExistingId,
  usersInDb,
};
