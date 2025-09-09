import { describe, it, expect } from "vitest";
import { add, remove, edit, filterByQuery } from "../src/logic.js";

describe("logic", () => {
  it("add() trims and prepends", () => {
    const now = 1000;
    const entries = [{ t: 1, v: "old" }];
    const out = add(entries, "  hello  ", now);
    expect(out[0]).toEqual({ t: now, v: "hello" });
    expect(out[1]).toEqual({ t: 1, v: "old" });
  });

  it("remove() deletes by timestamp", () => {
    const entries = [{ t: 3, v: "a" }, { t: 2, v: "b" }, { t: 1, v: "c" }];
    const out = remove(entries, 2);
    expect(out).toEqual([{ t: 3, v: "a" }, { t: 1, v: "c" }]);
  });

  it("edit() updates text", () => {
    const entries = [{ t: 2, v: "old" }];
    const out = edit(entries, 2, "new text");
    expect(out).toEqual([{ t: 2, v: "new text" }]);
  });

  it("filterByQuery() is case-insensitive and returns all on empty", () => {
    const entries = [{ t: 3, v: "Deploy" }, { t: 2, v: "tests" }, { t: 1, v: "docs" }];
    expect(filterByQuery(entries, "")).toEqual(entries);
    expect(filterByQuery(entries, "TE")).toEqual([{ t: 2, v: "tests" }]);
  });
});
