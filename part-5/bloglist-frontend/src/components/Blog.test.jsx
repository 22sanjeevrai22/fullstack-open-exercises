import Blog from "./Blog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders only title and author", async () => {
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

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(likes).not.toBeInTheDocument(); //   expect(likes).toBeNull();
  expect(url).not.toBeInTheDocument();
});
