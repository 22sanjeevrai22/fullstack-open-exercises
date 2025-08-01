import Blog from "./Blog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders only title and author", () => {
  const blog = {
    title: "Is it the end of Software Engineers?",
    likes: 12,
    author: "Sanjeev Rai",
    url: "www.software.com",
    user: { name: "Tester" },
  };

  const { container } = render(<Blog blog={blog} />);

  const title = container.querySelector(".title");
  const author = container.querySelector(".author");
  const likes = container.querySelector(".likes");
  const url = container.querySelector(".url");

  expect(title).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(likes).not.toBeInTheDocument(); //   expect(likes).toBeNull();
  expect(url).not.toBeInTheDocument();
});

test("Likes and Url are shown when I click show", async () => {
  const blog = {
    title: "Is it the end of Software Engineers?",
    likes: 12,
    author: "Sanjeev Rai",
    url: "www.software.com",
    user: { name: "Tester" },
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = container.querySelector(".show-hide-button");

  await user.click(button);

  const likes = container.querySelector(".likes");
  const url = container.querySelector(".url");

  expect(likes).toBeInTheDocument();
  expect(url).toBeInTheDocument();
});

//This is for await update() function below
vi.mock("../services/blogService", () => ({
  update: vi.fn(() => Promise.resolve({ id: "123", likes: 13 })),
  deleteBlog: vi.fn(),
}));

test("When the like is clicked twice, the eventhandler handleClicked like is called twice", async () => {
  const blog = {
    title: "Is it the end of Software Engineers?",
    likes: 12,
    author: "Sanjeev Rai",
    url: "www.software.com",
    user: { name: "Tester" },
  };

  const user = userEvent.setup();
  const mockHandler = vi.fn();
  const mockHandler2 = vi.fn();

  const { container } = render(
    <Blog
      blog={blog}
      setBlogsWrapper={mockHandler}
      setErrorMessageWrapper={mockHandler2}
    />
  );

  const showButton = container.querySelector(".show-hide-button");
  await user.click(showButton);

  const likeButton = container.querySelector(".like-button");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
