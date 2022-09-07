export function getTestElement(selector: string) {
  return cy.get(`[data-testid="${selector}"]`);
}
