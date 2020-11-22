import React, { useReducer, useState } from "react"
import styled from "styled-components"
import { addMonths, getDaysInMonth, startOfMonth, getDay, endOfMonth, addDays, isEqual } from "date-fns"

const WEEK_DAYS = [ "S", "M", "T", "W", "T", "F", "S" ] as const

const CalendarCard = styled.div`
  display: flex;
  flex-direction: column;

  background: white;
  color: black;

  padding: 1em;
  border-radius: 15px;
`

const CalendarDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const CalendarHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Day = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 24px;
  height: 24px;
  padding: 0.65ch;
`

const WeekDay = styled( Day )``

const MainDay = styled( Day )<{ active?: boolean }>`
  cursor: default;
  border-radius: 100%;

  background-color: ${ ({ active }) => active ? "#F7567C" : "transparent" };
  color: ${ ({ active }) => active ? "white" : "black" };
  box-shadow: ${ ({ active }) => active ? "1px 1px 3px 1px rgba(0, 0, 0, 0.15)" : "none" };
`

const SecondaryDay = styled( Day )`
  color: rgba(0, 0, 0, 0.6);
`

const IconButton = styled.button`
  height: 48px;
  width: 48px;
  background: none;
  border: none;
`

export const useCalendar = ( 
  defaultDay = new Date() 
): [ React.ReactNode, Date ] => {
  const [ currentDate, chanageCurrentDateTo ] = useReducer(
    ( currentDate: Date, action: "next" | "previous" ) => (
      addMonths( currentDate, action === "next" ? 1 : -1 )
    ), new Date()
  )

  const [ selectedDay, selectDay ] = useState<Date>( defaultDay )

  // Day labels
  const weeks = []
  for ( let idx = 0; idx < 7; idx++ )
    weeks.push( <WeekDay key={ "week-day-" + idx }>{ WEEK_DAYS[idx] }</WeekDay> )

  // Used to calculate the carry forward of last month
  const numberOfDaysInPrevMonth = getDaysInMonth( addMonths( currentDate, -1 ) )
  const prevMonthDays = []
  const startDateOfThisMonth = startOfMonth( currentDate )
  const numberOfDaysBeforeFirstOfMonth = getDay( startDateOfThisMonth )
  for ( let day = 0; day < numberOfDaysBeforeFirstOfMonth; day++ )
    prevMonthDays.unshift( 
      <SecondaryDay key={ "extra-beginning-day-" + day }>{ numberOfDaysInPrevMonth - day }</SecondaryDay> 
    )

  // This months main set of days
  const thisMonthDays = []
  const numberOfDaysInThisMonth = getDaysInMonth( currentDate )
  for ( let day = 0; day < numberOfDaysInThisMonth; day++ ) {
    const thisDay = addDays( startDateOfThisMonth, day )
  
    thisMonthDays.push(
      <MainDay 
        key={ "main-day-" + day }
        onClick={ () => selectDay( thisDay ) }
        active={ isEqual( thisDay, selectedDay ) }
      >{ day + 1 }</MainDay>
    )
  }

  // Extra days from next month to complete week
  const nextMonthDays = []
  const numberOfDaysLeftInLastWeek = 6 - getDay( endOfMonth( currentDate ) )
  for ( let day = 0; day < numberOfDaysLeftInLastWeek; day++ )
    nextMonthDays.push( <SecondaryDay key={ "extra-last-day-" + day }>{ day + 1 }</SecondaryDay> )

  // Component
  const Component = (
    <CalendarCard>
      <CalendarHeader>
        <IconButton onClick={ () => chanageCurrentDateTo( "previous" ) }>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </IconButton>

        <p>{ currentDate.toLocaleString( 'default', { month: 'long' }) }</p>

        <IconButton onClick={ () => chanageCurrentDateTo( "next" ) }>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </IconButton>
      </CalendarHeader>

      <CalendarDaysGrid>
        { weeks }

        { prevMonthDays }

        { thisMonthDays }

        { nextMonthDays }
      </CalendarDaysGrid>
    </CalendarCard>
  )

  return [ Component, selectedDay ]
}
