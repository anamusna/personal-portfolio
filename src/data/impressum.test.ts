import { getMissingImpressumFields, IMPRESSUM } from "./impressum";

describe("Impressum completeness", () => {
  const complete = {
    ...IMPRESSUM,
    address: {
      careOf: "c/o Example GmbH",
      street: "Beispielstraße 1",
      postalCode: "10115",
      city: "Berlin",
      country: "Deutschland",
    },
    contactFormPath: "/contact",
  };

  it("is publishable only with an address and a second contact channel", () => {
    expect(getMissingImpressumFields(complete)).toEqual([]);
    expect(
      getMissingImpressumFields({ ...complete, address: null }),
    ).toHaveLength(1);
    expect(
      getMissingImpressumFields({
        ...complete,
        contactFormPath: null,
        phone: null,
      }),
    ).toHaveLength(1);
  });

  it("accepts a phone number instead of a contact form", () => {
    expect(
      getMissingImpressumFields({
        ...complete,
        contactFormPath: null,
        phone: "+49 30 0000000",
      }),
    ).toEqual([]);
  });
});
