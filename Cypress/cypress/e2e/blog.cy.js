describe("Culture.ee Blog UI Tests", () => {
  beforeEach(() => {
    cy.visit("https://culture.ee/en/blog/");
  });

  it("should display the blog page correctly", () => {
    console.log(cy.title());
    cy.title().should("include", "Blog - Culture.ee");

    cy.get("h1").should("contain.text", "Blog");
  });

  it("should list blog posts", () => {
    cy.get(".blog__item.blog-card").should("have.length.greaterThan", 0);

    cy.get(".blog__item.blog-card")
      .first()
      .within(() => {
        cy.get("h3").should("exist");
        cy.get("a").should("have.attr", "href");
      });
  });

  it("should navigate to a blog post", () => {
    cy.get(".blog__item.blog-card").first().find("a.more-link").click();

    cy.get(".post-content").should("exist");
  });

  it("should paginate through all numbered pages", () => {
    cy.get(".pagination__button").then(($buttons) => {
      const total = $buttons.length;

      function clickPage(index) {
        if (index >= total) return;

        cy.get(".pagination__button").eq(index).click();

        cy.get(".blog__item").should("have.length.gt", 0);

        clickPage(index + 1);
      }

      clickPage(0);
    });
  });

  it("should allow searching blog posts", () => {
    cy.get(".header__mobile-toggle").click();

    cy.get('input[type="search"]').type("Art{enter}");

    cy.get(".search-results__items").should("have.length.greaterThan", 0);
    cy.get(".search-results__items").first().contains("Art");
  });
});
