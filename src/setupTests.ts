// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { ReactNode } from "react";

jest.mock("@splidejs/react-splide", () => ({
  Splide: ({ children }: { children: ReactNode }) => children,
  SplideSlide: ({ children }: { children: ReactNode }) => children,
}));

jest.mock("./services/events");

jest.useFakeTimers().setSystemTime(new Date("2023-10-20"));

// @ts-ignore
const storageMock = {
  __memory: {},
  getItem: jest.fn((key) => storageMock.__memory[key]),
  setItem: jest.fn((key, value) => (storageMock.__memory[key] = value)),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
// @ts-ignore
global.sessionStorage = storageMock;
