import React from 'react'
import SearchBar from './SearchBar'

describe('<SearchBar />', () => {

  it('renders with a label', () => {
    cy.mount(<SearchBar label='Test Search Bar label' description='Test Seach Bar Description' isAsync={false} />)
    cy.contains('Test Search Bar label')
    cy.contains('Test Seach Bar Description')
  })

  it('shows the dropdown, populated with all the countries, when focused', () => {
    cy.mount(<SearchBar label='Test Search Bar label' description='Test Seach Bar Description' isAsync={false} />)
    cy.get('input').focus()
    cy.get('div').contains('Afghanistan')
    cy.get('div').contains('Zimbabwe')
  })

  it('shows "Afghanistan", "Central African Republic" and "South Africa" when "Af" is typed', () => {
    cy.mount(<SearchBar label='Test Search Bar label' description='Test Seach Bar Description' isAsync={false} />)
    cy.get('input').type('Af')
    cy.get('div').contains('Afghanistan')
    cy.get('div').contains('Zimbabwe').should('not.exist')
  })

  it('the checkbox is checked when "Afghanistan" is clicked', () => {
    cy.mount(<SearchBar label='Test Search Bar label' description='Test Seach Bar Description' isAsync={false} />)
    cy.get('input').type('Af')
    // click on the div that contains "Afghanistan"
    cy.get('div').contains('Afghanistan').click()
    // check if the checkbox is checked
    cy.get('input').should('be.checked')
  })

  it('the checkbox is unchecked when "Afghanistan" is clicked twice', () => {
    cy.mount(<SearchBar label='Test Search Bar label' description='Test Seach Bar Description' isAsync={false} />)
    cy.get('input').type('Af')
    // click on the div that contains "Afghanistan"
    cy.get('div').contains('Afghanistan').click()
    // click on the div that contains "Afghanistan" again
    cy.get('div').contains('Afghanistan').click()
    // check if the checkbox is unchecked
    cy.get('input').should('not.be.checked')
  })

  it('typing "Chi" and then pressing the down arrow key selects "Chile"', () => {
    cy.mount(<SearchBar label='Test Search Bar label' description='Test Seach Bar Description' isAsync={false} />)
    cy.get('input').type('Chi')
    cy.get('div').contains('Chi').type('{downarrow}{downarrow}')
    // look for the div with key "Chile" and check if its parent has the background color rgb(219, 234, 254)
    cy.get('div').contains('Chile').parent().should('have.css', 'background-color', 'rgb(219, 234, 254)')
  })

  
  // async tests 

  // when something is typed in the searchbar, the loading spinner appears
  it('when something is typed in the searchbar, the loading spinner appears', () => {
    cy.mount(<SearchBar label='Test Search Bar label' description='Test Seach Bar Description' isAsync={true} />)
    cy.get('input').type('Chi')
      // the loading spinner has id "loading-spinner"
    cy.get('#loading-spinner').should('exist')  
  })
})