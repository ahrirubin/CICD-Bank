/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "./page";

it("App Router: Works with Client Components (React State)", () => {
  render(<Page />);

  screen.debug();
  const headings = screen.queryAllByRole("heading");
  expect(headings).toHaveLength(2);
  expect(headings[0]).toHaveTextContent("Ahri Banken");
  expect(headings[1]).toHaveTextContent("Skaffa låga lånelöften");
 
});