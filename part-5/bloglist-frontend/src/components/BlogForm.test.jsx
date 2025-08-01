import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

vi.mock("../services/blogService", () => ({
  create: vi.fn((title, author, url, likes) =>
    Promise.resolve({ title, author, url, likes })
  ),
}));

test("The form calls eventhandler it received as props with the right details when a new blog is created.", async () => {
  const mockHandler = vi.fn();
  const mockHandler2 = vi.fn();
  const user = userEvent.setup();

  const { container } = render(
    <BlogForm
      blogs={[]}
      setBlogsWrapper={mockHandler}
      setErrorMessageWrapper={mockHandler2}
    />
  );
  const titleInput = container.querySelector("#input-title");
  const authorInput = container.querySelector("#input-author");
  const urlInput = container.querySelector("#input-url");

  const submitButton = container.querySelector(".submit-button");

  await user.type(titleInput, "What is the title?");
  await user.type(authorInput, "Who is the author?");
  await user.type(urlInput, "What is the url?");
  await user.click(submitButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toEqual([
    expect.objectContaining({
      title: "What is the title?",
      author: "Who is the author?",
      url: "What is the url?",
    }),
  ]);
});
