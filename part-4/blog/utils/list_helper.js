const totalLikes = (blogs) => {
  return blogs.reduce((acc, currentValue) => {
    return acc + currentValue.likes;
  }, 0);
};

module.exports = {
  totalLikes,
};
