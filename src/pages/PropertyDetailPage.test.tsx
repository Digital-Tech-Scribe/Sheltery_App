import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { PropertyDetailPage } from "./PropertyDetailPage";

function renderDetailPage() {
  return render(
    <MemoryRouter initialEntries={["/properties/sales/hutu-exclusive"]}>
      <Routes>
        <Route
          path="/properties/:category/:slug"
          element={<PropertyDetailPage />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe("PropertyDetailPage", () => {
  it("puts the Hutu identity, supplied summary, factual metadata, and WhatsApp action beneath the media lead", () => {
    renderDetailPage();

    expect(
      screen.getByRole("heading", { name: "Hutu Exclusive", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Spacious plots of land (150sqm – 1000sqm) ideal for custom builds. Exquisitely designed residences from 1-Bedroom Apartments to expansive 7-Bedroom Maisonettes.",
      ),
    ).toBeInTheDocument();
    const highlights = screen.getByLabelText("Property highlights");
    expect(within(highlights).getByText("150SQM – 1000SQM")).toBeInTheDocument();
    expect(within(highlights).getByText("Residential")).toBeInTheDocument();
    const whatsappAction = screen
      .getAllByRole("link", { name: /chat on whatsapp/i })
      .find((link) => link.classList.contains("property-whatsapp-cta"));
    expect(whatsappAction).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/2348092799692"),
    );
    expect(
      screen.getByRole("region", { name: /hutu exclusive media preview/i }),
    ).toBeInTheDocument();
  });
});
