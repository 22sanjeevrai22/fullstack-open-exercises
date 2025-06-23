const totalLikes = (blogs) => {
  return blogs.reduce((acc, currentValue) => {
    return acc + currentValue.likes;
  }, 0);
};

const favouriteBlog = (blogList) => {
  return blogList.reduce((acc, currentBlog) => {
    return currentBlog.likes > acc.likes ? currentBlog : acc;
  }, blogList[0]);
};

const mostBlogs = (blogList) => {
  if (blogList.length === 0) return null;
  const count = {};
  blogList.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });
  let maxAuthor = null;
  let maxBlogs = 0;

  for (const author in count) {
    if (count[author] > maxBlogs) {
      maxBlogs = count[author];
      maxAuthor = author;
    }
  }
  return { author: maxAuthor, blogs: maxBlogs };
};

const mostLikes = (blogList) => {
  if (blogList.length === 0) return null;
  const likeCount = {};
  blogList.forEach((blog) => {
    // likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes;
    if (!likeCount[blog.author]) {
      likeCount[blog.author] = blog.likes;
    } else {
      likeCount[blog.author] += blog.likes;
    }
  });

  let maxAuthor = null;
  let maxLikes = 0;

  for (const author in likeCount) {
    if (likeCount[author] > maxLikes) {
      maxLikes = likeCount[author];
      maxAuthor = author;
    }
  }
  return { author: maxAuthor, likes: maxLikes };
};

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
