// Auto-generated from CollernerReport.txt
const tdl = `
;===============================================================================
; COLLERnERREPORT.TXT
; Created By: Khokan on 2014-05-26 10:26, ID:
; Purpose: Demonstrates auto-column repeat in Tally TDL for a party discount
;          details report, using dynamic columns for stock groups and vertical
;          lines for ledgers under Sundry Debtors.
;===============================================================================

;------------------------------------------------------------------------------
; MENU INTEGRATION: ADD REPORT TO GATEWAY OF TALLY
;------------------------------------------------------------------------------

[#menu: Gateway of Tally]
; Uncomment to add menu option if needed
; add: Option: cwPartyGroupLock: @@cwPartyGroupDemoLock

[!menu: cwPartyGroupLock]
    add: Item: before: @@locQuit: @@cwPartyGroupReport: Display: RepcwPartyGroup
    add: Item: before: @@locQuit: Blank

[System: formula]
cwPartyGroupReport: "Party Discount Details"
cwPartyGroupDemoLock: yes ;; $$MachineDate < $$Date:"02/12/2011"

;------------------------------------------------------------------------------
; MAIN REPORT AND FORM DEFINITION
;------------------------------------------------------------------------------

[Report: RepcwPartyGroup]
    use: Dsp Template
    Title: @@cwPartyGroupReport
    Printset: Report Title: @@cwPartyGroupReport
    Form: FrmcwPartyGroup
    Export: Yes
    set: svfromdate: ##svcurrentdate
    set: svTodate: ##svcurrentdate
    Repeat: MycwPartyGroup
    Variable: DoSetAutoColumn
    Set: DoSetAutoColumn: Yes
    Set: DspRepeatCollection: "MycwPartyGroup"
    Variable: SVFromDate, SVToDate
    Variable: MycwPartyGroup

[Form: FrmcwPartyGroup]
    use: DSP Template
    Part: DspAccTitles, PrtcwPartyGroup
    Width: 100% Page
    Height: 100% Page
    delete: page break
    add: page break: cwPartyGroupbotbrk, cwPartyGroupbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    option: setautovchoption: ##Dosetautocolumn AND $$SetAutoColumns:MycwPartyGroup

[System: Variable]
MycwPartyGroup: ""

[Variable: MycwPartyGroup]
    repeat: ##DspRepeatCollection
    Default: ""
    Set always: yes

;------------------------------------------------------------------------------
; COLLECTIONS FOR COLUMN REPEAT AND VERTICAL DATA
;------------------------------------------------------------------------------

[Collection: MycwPartyGroup]
    Type: stockgroup
    fetch: *
    ;; Filter: cwPartyGroupFormula

[System: Formula]
cwPartyGroupFormula: yes

[#Object: stockgroup]
    MycwPartyGroup: $Name

[Collection: ColcwPartyGroupVertical]
    Use: ledger
    child of: $$groupsundrydebtors
    belongs to: yes
    ;; Filter: ColcwPartyGroupVFilter

[system: Formula]
ColcwPartyGroupVFilter: $name starting with "Abc"

;------------------------------------------------------------------------------
; PARTS, LINES, AND FIELD REPEATS FOR AUTO-COLUMN REPORT
;------------------------------------------------------------------------------

[part: cwPartyGroupbotBrk]
    line: EXPINV PageBreak
    border: thin top

[part: cwPartyGroupbotopbrk]
    use: dspacctitles
    add: part: cwPartyGroupTitlePart

[part: cwPartyGroupTitlePart]
    line: LncwPartyGroupTitle

[Part: PrtcwPartyGroup]
    Line: LncwPartyGroupTitle, LncwPartyGroup
    repeat: LncwPartyGroup: ColcwPartyGroupVertical
    scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf, numf
    float: no

;------------------------------------------------------------------------------
; TITLE LINE: COLUMN HEADERS
;------------------------------------------------------------------------------

[Line: LncwPartyGroupTitle]
    use: LncwPartyGroup
    option: titleopt
    local: field: sdf: set as: "Date"
    local: field: snf: set as: "Bill No."
    local: field: nf: set as: "Name of Party"
    local: field: numf: set as: ##mycwPartyGroup
    local: field: default: style: normal bold
    local: field: numf: type: String
    local: field: default: align: centre
    local: field: numf: line: 0
    Local: Field: nf2: info: "Parent"

;------------------------------------------------------------------------------
; MAIN DATA LINE: LEDGER VERTICALS WITH REPEATED COLUMNS
;------------------------------------------------------------------------------

[Line: LncwPartyGroup]
    Fields: nf, nf2, numf
    Option: Alter on Enter
    local: field: qtyf: Format: "NoSymbol, Short Form, No Compact,NoZero"
    local: field: ratepf: setas: #amtf/#qtyf
    local: field: fwf: alter: voucher: $$isvoucher
    option: alter on enter
    local: field: nf: alter: ledger: $$isledger
    Local: Field: sdf: Set As: $date
    Local: Field: snf: Set As: $vouchernumber
    Local: Field: nf: Set As: $name
    Local: Field: numf: Set As: $$getDiscvalue:$name:##mycwPartyGroup
    Local: Field: nf2: Set As: $parent
    repeat: numf
    local: field: default: border: thin left

;------------------------------------------------------------------------------
; DISCOUNT VALUE FUNCTION FOR COLUMN DATA
;------------------------------------------------------------------------------

[function: getDiscvalue]
    parameter: ledgername: string
    parameter: stockgroupname: string
    returns: number
    01: log: ##ledgername
    02: log: ##stockgroupname
    20: return: $(ledger,##ledgername).cwaggrsetdiscount[1,@@sameGrp].cwSetdiscount1

[System: Formula]
samegrp: $cwSetStockGroup = ##stockgroupname

;------------------------------------------------------------------------------
; TOTALS LINE (OPTIONAL)
;------------------------------------------------------------------------------

[line: lncwPartyGrouptotals]
    use: LncwPartyGroup
    Local: Field: nf: Set As: " Total"
    local: field: numf: set as: $$total:numf
    delete: repeat
    replace: field: numf: numf5
    add: repeat: numf5
    local: field: numf5: set as: $$total:numf
    Local: Field: default: Style: Normal Bold

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
