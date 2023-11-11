describe('bar chart', () => {
  it('bars chart behaviors', () => {
    cy.visit('https://main-enterprise.demo.design.infor.com/components/bar/example-disable-selection-state.html')
    cy.get('#bar-example > svg > g > g.series-group > g > rect').then($bars => {
      const bars = cy.wrap($bars)
      // check if there are 3 bars
      bars.should('have.length', 3)
      // check initial state of the tool tip
      cy.get('#svg-tooltip').then($toolTip => {
        cy.wrap($toolTip).should('have.class', 'is-hidden')
      })

      // bar selection enabled behavior:
      // if bar is selected another class 'is-selected' is added
      // if not, opacity is decreased to 0.6;
      bars.each(($bar, oIndex) => {
        let bar = cy.wrap($bar)
        // prints the data-automation-id
        cy.wrap($bar).invoke('attr',  'data-automation-id').then($value => {
          cy.log('bar: ' + $value)
        })
        // validate corresponding y-axis to each bar
        let yIndex, yText;
        switch(oIndex){
          case 0: yIndex = 2; yText = 'Category A'; break;
          case 1: yIndex = 3; yText = 'Category B'; break;
          case 2: yIndex = 4; yText = 'Category C'; break;
        }
        cy.get(`#bar-example > svg > g > g.axis.y > g:nth-child(${yIndex})`).should('have.text', yText)
        // hover mouse to element and validate
        bar.trigger('mouseover')
        bar.trigger('mouseenter')
        cy.get('#svg-tooltip').then($toolTip => {
          var toolTip = cy.wrap($toolTip)
          toolTip.should('not.have.class', 'is-hidden')
          cy.log($toolTip.text())
        })
        // click element
        bar.click()
        bar.should('not.have.class', 'is-selected')
          .should('have.css', 'opacity', '1')
        // check other bars if something happened after clicking
        bars.each(($otherBar, iIndex) => {
          let otherBar = cy.wrap($otherBar)
          if (oIndex !== iIndex) {
            otherBar.should('not.have.css', 'opacity', '0.6')
          }
        })
      })
    })
    
    // x-axis
    cy.get('#bar-example > svg > g > g.axis.x > g.tick').then($ticks => {
      cy.wrap($ticks).each(($tick) => {
        cy.log('x-axis:' + $tick.text())
      })
    })

  })
})

describe('tables', () => {
  let data = ['205', '2542205', '2642210', 'compressor', '2015', 'repair'];
  data.forEach(currentData => {
    it('table behavior', () => {
      // change filter
      let filter = currentData
      filter = filter.toLowerCase();
      cy.visit('https://main-enterprise.demo.design.infor.com/components/datagrid/example-keyword-search.html')
      cy.get('#gridfilter').click()
      cy.get('#gridfilter').type(filter).type('{enter}')
  
      // this is tricky as there are two tables, but this will only highlight elements which are similar with the filter variable
      // get the first table, if no element found - filter didn't yield anything, no highlighting to be done
      cy.get('#datagrid th[data-automation-id="custom-automation-id-col-productid"]').parents('table').then($table => {
        // if filter yielded something, proceed on highlighting the other table
        cy.wrap($table).find('tbody tr').then($rows => {
          if ($rows.length > 0){
            // highlighting in 1st table
            cy.wrap($rows).each($row => {
              cy.wrap($row).find('td > div').then($div => {
                if ($div.text().toLowerCase().includes(filter)){
                  $div.css('border', '1px solid red')
                }
              })
            })
            // highlighting in 2nd table
            cy.get('#datagrid th[data-automation-id="custom-automation-id-col-productname"]').parents('table').then($table => {
              // assumes that this table contains rows
              cy.wrap($table).find('tbody tr > td > div').then($divs => {
                cy.wrap($divs).each($div => {
                  if ($div.text().toLowerCase().includes(filter)){
                    $div.css('border', '1px solid red')
                  }
                })
              })
            })
          }
        })
      }) 
    })
  })
  
})

describe('app menu', () => {
  it('app menu behavior', () => {
    cy.visit('https://main-enterprise.demo.design.infor.com/components/applicationmenu/test-personalized-role-switcher-long-title')
    // since navigation menu is open, close it first
    cy.get('#application-menu').should('be.visible')
    // closes it
    cy.get('#header-hamburger').click({ force: true })
    cy.get('#header-hamburger').should('have.attr', 'aria-controls', 'application-menu').should('have.attr', 'aria-expanded', 'false')
    cy.get('#application-menu').should('not.be.visible')
    // open the menu
    cy.get('#header-hamburger').click({ force: true })
    cy.get('#application-menu').should('be.visible')
    // Some extra-long title or maybe too long
    cy.get('#expandable-area-0-content').should('not.be.visible')
    cy.get('#trigger-btn').click({ force: true })
    cy.get('#expandable-area-0-content').should('be.visible')
    cy.get('#trigger-btn').click({ force: true })
    cy.get('#expandable-area-0-content').should('not.be.visible')
    // multiple data
    let data = ['My Team', 'employee', 'recruiter', 'ace']
    data.forEach(cDate => {
      let search = cDate
      search = search.toLowerCase();
      cy.get('#application-menu-searchfield').type(search).type('{enter}')
      // give time for the elements to change
      cy.wait(500)
      // validation of the accordion panels
      for (let i = 1; i <= 6; i += 2) {
        cy.get(`#application-menu > div.application-menu-content > div.accordion.panel.inverse.has-icons > div:nth-child(${i})`).then($div => {
          cy.log($div.text())
          cy.wrap($div).invoke('attr', 'class').then($class => {
            if ($class.includes('has-filtered-children')) {
              cy.wrap($div).should('be.visible')
              cy.get(`#application-menu > div.application-menu-content > div.accordion.panel.inverse.has-icons > div:nth-child(${i + 1}) > div > a`).then($links => {
                cy.wrap($links).each($link => {
                  cy.log($link.text())
                  if ($link.text().toLowerCase().includes(search)) {
                    cy.wrap($link).should('be.visible')
                  } else {
                    cy.wrap($link).should('not.be.visible')
                  }
                })
              })
            } else {
              if ($div.text().toLowerCase().includes(search)) {
                cy.wrap($div).should('be.visible')
              } else {
                cy.wrap($div).should('not.be.visible')
              }

            }
          })

        })
      }
      cy.get('#application-menu-searchfield + button').click({ force: true })
    })
  })
})


