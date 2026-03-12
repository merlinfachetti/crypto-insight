import { render, screen, fireEvent } from "@testing-library/react";
import CryptoFilter from "../CryptoFilter";
import { vi } from "vitest";
import * as cryptoStoreModule from "../../store/cryptoStore";

type SortOption = "performance" | "price" | "name";

describe("CryptoFilter Component", () => {
  const setSortByMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(cryptoStoreModule, "useCryptoStore").mockReturnValue({
      sortBy: "performance" as SortOption,
      setSortBy: setSortByMock,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the sort select with default value", () => {
    render(<CryptoFilter />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("performance");
  });

  it("calls setSortBy when a new option is selected", () => {
    render(<CryptoFilter />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "price" },
    });
    expect(setSortByMock).toHaveBeenCalledWith("price");
  });

  it("renders all three sort options", () => {
    render(<CryptoFilter />);
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options.map((o) => o.getAttribute("value"))).toEqual([
      "performance",
      "price",
      "name",
    ]);
  });
});
