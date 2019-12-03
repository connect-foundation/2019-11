import React from "react"

import ReportDialog from "../../components/Molecules/ReportDialog"
import ReportButton from "../../components/Atoms/ReportButton"
export default {
  title: "Modal|Report"
}
export const ReportDialogButtonToProduct = () => {
  return (
    <>
      <ReportButton isUser={false} targetId={1} />
    </>
  )
}
export const ReportDialogButtonToUser = () => {
  return (
    <>
      <ReportButton isUser={true} targetId={1} />
    </>
  )
}

export const ReportDialogDemo = () => {
  return (
    <>
      <ReportDialog />
    </>
  )
}
