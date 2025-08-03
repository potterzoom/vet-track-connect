describe('Pet Management Flow', () => {
  beforeEach(() => {
    // Mock authentication
    cy.window().then((win) => {
      win.localStorage.setItem('auth-token', 'mock-jwt-token')
    })
    
    // Visit pets page
    cy.visit('/mascotas')
  })

  it('should display pets list', () => {
    cy.get('[data-testid="pets-table"]').should('be.visible')
    cy.get('[data-testid="pet-row"]').should('have.length.greaterThan', 0)
  })

  it('should filter pets by status', () => {
    // Click on "Saludable" filter
    cy.get('[data-testid="filter-saludable"]').click()
    
    // Verify filtered results
    cy.get('[data-testid="pet-status"]').each(($el) => {
      cy.wrap($el).should('contain.text', 'saludable')
    })
  })

  it('should search pets by name', () => {
    const searchTerm = 'Max'
    
    cy.get('[data-testid="search-input"]').type(searchTerm)
    
    cy.get('[data-testid="pet-name"]').each(($el) => {
      cy.wrap($el).should('contain.text', searchTerm)
    })
  })

  it('should create new pet appointment', () => {
    // Mock user login
    cy.loginVet('vet@veterinaria.com', 'password123')
    
    // Click create appointment button
    cy.get('[data-testid="create-appointment"]').click()
    
    // Fill appointment form
    cy.get('[data-testid="pet-select"]').select('Max (ID: 1)')
    cy.get('[data-testid="appointment-date"]').type('2024-08-15')
    cy.get('[data-testid="appointment-time"]').type('10:00')
    cy.get('[data-testid="appointment-type"]').select('consulta')
    cy.get('[data-testid="appointment-notes"]').type('Revisión general')
    
    // Submit form
    cy.get('[data-testid="submit-appointment"]').click()
    
    // Verify success message
    cy.get('[data-testid="success-toast"]')
      .should('be.visible')
      .and('contain.text', 'Cita creada exitosamente')
  })

  it('should update pet medical record', () => {
    // Click on first pet
    cy.get('[data-testid="pet-row"]').first().click()
    
    // Click medical record tab
    cy.get('[data-testid="medical-record-tab"]').click()
    
    // Add new visit
    cy.get('[data-testid="add-visit"]').click()
    
    // Fill visit form
    cy.get('[data-testid="visit-date"]').type('2024-08-05')
    cy.get('[data-testid="visit-weight"]').type('28.5')
    cy.get('[data-testid="visit-temperature"]').type('38.5')
    cy.get('[data-testid="visit-diagnosis"]').type('Estado general bueno')
    cy.get('[data-testid="visit-treatment"]').type('Vacunación rutinaria')
    
    // Submit visit
    cy.get('[data-testid="submit-visit"]').click()
    
    // Verify visit was added
    cy.get('[data-testid="visit-item"]')
      .should('contain.text', 'Estado general bueno')
  })

  it('should handle vaccination scheduling', () => {
    cy.visit('/vacunas')
    
    // Click schedule vaccination
    cy.get('[data-testid="schedule-vaccine"]').click()
    
    // Fill vaccination form
    cy.get('[data-testid="vaccine-pet"]').select('Luna (ID: 2)')
    cy.get('[data-testid="vaccine-type"]').select('Rabia')
    cy.get('[data-testid="vaccine-date"]').type('2024-08-20')
    cy.get('[data-testid="vaccine-batch"]').type('RAB001234')
    
    // Submit vaccination
    cy.get('[data-testid="submit-vaccine"]').click()
    
    // Verify vaccination scheduled
    cy.get('[data-testid="success-toast"]')
      .should('contain.text', 'Vacunación programada')
  })

  it('should display calendar view', () => {
    cy.visit('/calendar')
    
    // Verify calendar is loaded
    cy.get('[data-testid="calendar-view"]').should('be.visible')
    
    // Check different view modes
    cy.get('[data-testid="calendar-day-view"]').click()
    cy.get('[data-testid="calendar-day-view"]').should('have.class', 'active')
    
    cy.get('[data-testid="calendar-week-view"]').click()
    cy.get('[data-testid="calendar-week-view"]').should('have.class', 'active')
    
    cy.get('[data-testid="calendar-month-view"]').click()
    cy.get('[data-testid="calendar-month-view"]').should('have.class', 'active')
  })

  it('should handle error states gracefully', () => {
    // Mock API error
    cy.intercept('GET', '/api/pets', { statusCode: 500 }).as('getPetsError')
    
    cy.visit('/mascotas')
    
    // Wait for error request
    cy.wait('@getPetsError')
    
    // Verify error message is displayed
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain.text', 'Error al cargar mascotas')
    
    // Verify retry button works
    cy.intercept('GET', '/api/pets', { fixture: 'pets.json' }).as('getPetsRetry')
    cy.get('[data-testid="retry-button"]').click()
    cy.wait('@getPetsRetry')
    
    cy.get('[data-testid="pets-table"]').should('be.visible')
  })
})

// Custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      loginVet(email: string, password: string): Chainable<void>
      createAppointment(data: { pet: string; date: string; time?: string }): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginVet', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password }
  }).then((response) => {
    window.localStorage.setItem('auth-token', response.body.token)
  })
})

Cypress.Commands.add('createAppointment', (data) => {
  cy.get('[data-testid="create-appointment"]').click()
  
  if (data.pet) {
    cy.get('[data-testid="pet-select"]').select(data.pet)
  }
  
  if (data.date) {
    cy.get('[data-testid="appointment-date"]').type(data.date)
  }
  
  if (data.time) {
    cy.get('[data-testid="appointment-time"]').type(data.time)
  }
  
  cy.get('[data-testid="submit-appointment"]').click()
})