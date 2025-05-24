// Auto-generated from REPCMPMASTER.TXT
const tdl = `
;===============================================================================
; REPCMPMASTER.TXT
; Purpose: Implements a "Company Master" report in Tally, listing all companies
;          with address and statutory details for each, supporting export, print,
;          and professional formatting.
;===============================================================================

;; --------------------------
;; Menu Integration Section
;; --------------------------

[#Menu: Gateway of Tally]
    ;; Add the Company Master report to the Gateway of Tally menu
    Add: Item: Before: @@locQuit: "CmpMaster": Display: RepCmpMaster

[#Menu: cw_Debug_menu]
    ;; Add the Company Master report to the Debug menu for quick access
    Add: Item: Before: @@locQuit: "CmpMaster": Display: RepCmpMaster

;; --------------------------
;; Report Title Formula
;; --------------------------

[System: Formula]
    ;; Set the display title for the report
    CmpMasterReportTitle: "Company Master"

;; --------------------------
;; Main Report Definition
;; --------------------------

[Report: RepCmpMaster]
    ;; Use the standard display template for consistency
    Use        : DSP Template
    Title      : @@CmpMasterReportTitle
    PrintSet   : Report Title: @@CmpMasterReportTitle
    Form       : FrmCmpMaster
    Export     : Yes
    ;; Set the report period to the current date by default
    Set        : SVFromDate : ##SVCurrentDate
    Set        : SVToDate   : ##SVCurrentDate
    ;; Disable related reports button for this report
    Local      : Button: RelReports: Inactive: Yes
    ;; Use the company master collection for the report
    MultiObjects: ColCmpMaster

;; --------------------------
;; Form Definition
;; --------------------------

[Form: FrmCmpMaster]
    ;; Use the standard display template for layout
    Use     : DSP Template
    ;; Include company details, title, and the main report part
    Part    : DSPCompanyName, DSPCompanyAddress, DSPReportTitle, PrtCmpMaster
    Width   : 100% Page
    Height  : 100% Page
    ;; Set background style for the report
    Background: @@SV_STOCKSUMMARY
    ;; Add page breaks for print/export formatting
    Add     : Page Break: CmpMasterBotBrk, CmpMasterBotOpBrk
    ;; Add bottom toolbar buttons for navigation/export/print
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    ;; Style company name and address for print
    Local   : Part: DSPCompanyName: Local: Line: DSPCompanyName: Local: Field: DSP CompanyName: PrintStyle: styleCalisto2
    Local   : Part: DSPCompanyAddress: Local: Line: DSPCompanyAddress: Local: Field: DSPCompanyAddress: PrintStyle: style2n
    Local   : Part: DSPReportTitle: Local: Line: DSPReportName: Local: Field: DSPReportName: PrintStyle: style3n

;; --------------------------
;; Page Break Parts (for print/export)
;; --------------------------

[Part: CmpMasterBotBrk]
    ;; Page break part for report layout
    Line: CmpMasterPageBreak
    Border: Thin Top

[Part: CmpMasterBotOpBrk]
    ;; Optional page break part for report layout
    Use: DSPAccTitles
    Add: Part: CmpMasterTitlePart

[Part: CmpMasterTitlePart]
    ;; Title part for report period display
    Line: LnCmpMasterTitle

[Line: LnCmpMasterCurrPeriod]
    ;; Line to display the current period (date)
    Field: fwf, fwf2
    Local: Field: fwf2: Align: Right
    Local: Field: fwf: Style: style3x
    Local: Field: fwf2: Style: style3x
    Local: Field: fwf2: Set As: @@dspDateStr
    Invisible: $$InPrintMode
    Local: Field: Default: Skip: Yes

[Part: PrtCmpMaster]
    ;; Main part: includes title and data lines, repeats for each company
    Line: LnCmpMasterTitle, LnCmpMaster
    Repeat: LnCmpMaster: ColCmpMaster
    Scroll: Vertical
    Common Border: Yes

;; --------------------------
;; Company Master Collection
;; --------------------------

[Collection: ColCmpMaster]
    ;; Collection of all companies in the Tally data
    Type: Company
    Fetch: Name, Address1, Address2, Address3, Address4, Address5, GSTIN, StateName, PinCode

;; --------------------------
;; Title Line Definition
;; --------------------------

[Line: LnCmpMasterTitle]
    ;; Header line for the report columns
    Use: LnCmpMaster
    Option: TitleOpt
    Local: Field: Sdf: Set As: "Name"
    Local: Field: Sdf2: Set As: "Address1"
    Local: Field: Snf: Set As: "Address2"
    Local: Field: Fwf: Set As: "Address3"
    Local: Field: Snf2: Set As: "Address4"
    Local: Field: Snf3: Set As: "Address5"
    Local: Field: Snf4: Set As: "GST IN"
    Local: Field: Snf5: Set As: "State Name"
    Local: Field: Snf6: Set As: "Pin Code"
    Local: Field: Default: Style: Normal Bold
    Local: Field: Default: Align: Centre

;; --------------------------
;; Data Line Definition
;; --------------------------

[Line: LnCmpMaster]
    ;; Data line for each company in the report
    Fields: Sdf, Sdf2, Snf, Fwf, Snf2, Snf3, Snf4, Snf5, Snf6
    Local: Field: Sdf: Set As: $Name
    Local: Field: Sdf2: Set As: $Address1
    Local: Field: Snf: Set As: $Address2
    Local: Field: Fwf: Set As: $Address3
    Local: Field: Snf2: Set As: $Address4
    Local: Field: Snf3: Set As: $Address5
    Local: Field: Snf4: Set As: $GSTIN
    Local: Field: Snf5: Set As: $StateName
    Local: Field: Snf6: Set As: $PinCode
    Local: Field: Default: Border: Thin Right
    Local: Field: Default: Style: Style3x

;; --------------------------
;; End of REPCMPMASTER.TXT
;; --------------------------

`;
export default tdl;
