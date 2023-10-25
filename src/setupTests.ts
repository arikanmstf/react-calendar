// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

process.env.TZ = "UTC";

jest.mock("./services/events");

jest.useFakeTimers().setSystemTime(new Date("2023-10-20"));

// @ts-ignore
function storageMock() {
  // @ts-ignore
  const _self = this;
  _self.__memory = {};
  _self.getItem = jest.fn((key) => _self.__memory[key]);
  _self.setItem = jest.fn((key, value) => {
    _self.__memory[key] = value;
  });
  _self.removeItem = jest.fn();
  _self.clear = jest.fn(() => {
    _self.__memory = {};
  });
}
// @ts-ignore
window.sessionStorage = storageMock;
