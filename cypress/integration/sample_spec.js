describe("Vlož prechod na plátno", () => {
  it("Prechod vložený!", () => {
    cy.visit("http://localhost:8080/");
    cy.get("#transition").click();
    cy.get(".wrapper").click();
  });
});

describe("Vlož miesto na plátno", () => {
  it("Miesto vložené!", () => {
    cy.visit("http://localhost:8080/");
    cy.get("#place").click();
    cy.get(".wrapper").click();
  });
});

describe("Prepoj hranou miesto a prechod", () => {
  it("Miesto s prechodom prepojené!", () => {
    cy.visit("http://localhost:8080/");
    cy.get("#transition").click();
    cy.get(".wrapper").click(250, 250);

    cy.get("#place").click();
    cy.get(".wrapper").click(350, 350);

    cy.get("#arc").click();
    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(350, 350);
  });
});

describe("Pridaj značku v mieste", () => {
  it("Značka pridaná!", () => {
    cy.visit("http://localhost:8080/");
    cy.get("#place").click();
    cy.get(".wrapper").click();

    cy.get("#addTokens").click();
    cy.get(".wrapper").click();
    cy.get(".wrapper").click();
    cy.get(".wrapper").click();
  });
});

describe("Odstráň značku v mieste", () => {
  it("Značka odstránená!", () => {
    cy.visit("http://localhost:8080/");
    cy.get("#place").click();
    cy.get(".wrapper").click();

    cy.get("#addTokens").click();
    cy.get(".wrapper").click();
    cy.get(".wrapper").click();
    cy.get(".wrapper").click();

    cy.get("#removeTokens").click();
    cy.get(".wrapper").click();
    cy.get(".wrapper").click();
    cy.get(".wrapper").click();
  });
});

describe("Zmeň počet značiek v mieste", () => {
  it("Značky zmenené!", () => {
    cy.visit("http://localhost:8080/");

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(44);
    });

    cy.get("#place").click();
    cy.get(".wrapper").click();

    cy.get("#changeTokens").click();
    cy.get(".wrapper").click();
  });
});

describe("Zmeň label", () => {
  it("Label zmenný!", () => {
    cy.visit("http://localhost:8080/");

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("Miestooo");
    });

    cy.get("#place").click();
    cy.get(".wrapper").click();

    cy.get("#changeLabel").click();
    cy.get(".wrapper").click();
  });
});

describe("Odstráň element z plátna", () => {
  it("Element odstránený!", () => {
    cy.visit("http://localhost:8080/");

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns(6);
    });

    cy.get("#transition").click();
    cy.get(".wrapper").click(250, 250);

    cy.get("#place").click();
    cy.get(".wrapper").click(650, 250);

    cy.get("#transition").click();
    cy.get(".wrapper").click(450, 150);

    cy.get("#place").click();
    cy.get(".wrapper").click(150, 450);

    cy.get("#delete").click();
    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(650, 250);
    cy.get(".wrapper").click(450, 150);
    cy.get(".wrapper").click(150, 450);
  });
});

describe("Vyčisti plátno", () => {
  it("Plátno vyčistené!", () => {
    cy.visit("http://localhost:8080/");

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns();
    });

    cy.makeSimpleNet();
    cy.get("#clear").click();
    cy.get(".wrapper").click();
  });
});

describe("Exportuj sieť", () => {
  it("Sieť exportovaná!", () => {
    cy.visit("http://localhost:8080/");

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("test_export");
    });
    cy.makeSimpleNet();
    cy.get("#simulation").click();

    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(250, 250);

    cy.get(".wrapper").click(450, 450);
    cy.get(".wrapper").click(450, 450);

    cy.get("#export").click();
  });
});

describe("Importuj sieť", () => {
  it("Sieť importovaná!", () => {
    cy.visit("http://localhost:8080/");

    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("test_export");
    });
    cy.makeSimpleNet();
    cy.get("#simulation").click();

    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(250, 250);

    cy.get(".wrapper").click(450, 450);
    cy.get(".wrapper").click(450, 450);

    cy.get("#export").click();
  });
});

describe("Vykonaj simuláciu", () => {
  it("Simulácia spustená!", () => {
    cy.visit("http://localhost:8080/");
    cy.makeSimpleNet();

    cy.get("#simulation").click();

    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(250, 250);
    cy.get(".wrapper").click(250, 250);

    cy.get(".wrapper").click(450, 450);
    cy.get(".wrapper").click(450, 450);
  });
});

Cypress.Commands.add("makeSimpleNet", () => {
  cy.get("#transition").click();
  cy.get(".wrapper").click(250, 250);

  cy.get("#place").click();
  cy.get(".wrapper").click(350, 350);

  cy.get("#arc").click();
  cy.get(".wrapper").click(250, 250);
  cy.get(".wrapper").click(350, 350);

  cy.get("#transition").click();
  cy.get(".wrapper").click(450, 450);

  cy.get("#place").click();
  cy.get(".wrapper").click(550, 450);

  cy.get("#arc").click();
  cy.get(".wrapper").click(450, 450);
  cy.get(".wrapper").click(550, 450);
});
