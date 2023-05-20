import React from 'react'
import Header from '../Header'
import InformationNavBar from './InformationNavBar'
import LeanKpi from './LeanKpi'
import QualityKpi from './QualityKpi'
import SatisfactionSprintHealth from './SatisfactionSprintHealth'
import StaticInformation from './StaticInformation'

function DisplayInfoBase() {
  return (
    <>
    {/* <InformationNavBar/> */}
    <StaticInformation/>
    {/* <SatisfactionSprintHealth/>
    <QualityKpi/>
    <LeanKpi/> */}
    </>
  )
}

export default DisplayInfoBase