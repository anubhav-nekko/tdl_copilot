module.exports = {
  TDL: `
;; ================================================================
;; LEDGER MASTER REPORT 
;; Author : Joy  Created : 2021-10-06 15:53
;; ================================================================

[#Menu: Gateway of Tally]
;; {06.Oct.21 16:12} add: Option: LedgermasterLock ;; : @@LedgermasterDemoLock

[!Menu: LedgermasterLock]
    Add: Item: Before: @@locQuit: @@LedgermasterReport: Display: RepLedgermaster
    Add: Item: Before: @@locQuit: Blank

[System: Formula]
    LedgermasterReport: "Ledgermaster"
;;    LedgermasterDemoLock: $$MachineDate < $$Date:"01/04/2013"

[Report: RepLedgermaster]
    Use: Dsp Template
    Title: @@LedgermasterReport
    PrintSet: Report Title: @@LedgermasterReport
    Form: FrmLedgermaster
    Export: Yes
    Local: Button: RelReports: Inactive: Yes
    Variable: ledgername

[Form: FrmLedgermaster]
    Use: DSP Template
    Part: DspAccTitles, PrtTitle0Ledgermaster, PrtLedgermaster
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    Delete: Page Break
    Add: Page Break: Ledgermasterbotbrk, LedgermasterbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12

[Part: LedgermasterbotBrk]
    Line: EXPINV PageBreak
    Border: Thin Top

[Part: Ledgermasterbotopbrk]
    Use: DspAccTitles
    Add: Part: LedgermasterTitlePart

[Part: LedgermasterTitlePart]
    Line: LnLedgermasterTitle

[Line: LnLedgermasterCurrPeriod]
    Field: fwf, fwf2
    Local: Field: fwf2: Align: Right
    Local: Field: fwf: Style: Normal Bold
    Local: Field: fwf2: Style: Normal Bold
    Local: Field: fwf2: Set As: @@dspDateStr
    Invisible: $$InPrintMode

[Part: PrtTitle0Ledgermaster]
    Line: LnLedgermasterCurrPeriod

[Part: PrtLedgermaster]
    Line: LnLedgermasterTitle, LnLedgermaster
    Bottom Line: LnLedgermasterTotals
    Repeat: LnLedgermaster: ColLedgermaster
    Scroll: Vertical
    Common Border: Yes
    Total: Qtyf, amtf

[Collection: ColLedgermaster]
    Type: Ledger
    Filter: ColLedgermasterFilter

[System: Formula]
    ColLedgermasterFilter: If $$IsSysName:##ledgername Then Yes Else $Name = ##ledgername

[Line: LnLedgermasterTitle]
    Use: LnLedgermaster
    Option: titleopt
    Local: Field: fwf: Set As: "Name"
    Local: Field: nf: Set As: "Address1"
    Local: Field: nf1: Set As: "Address2"
    Local: Field: nf2: Set As: "Address3"
    Local: Field: nf3: Set As: "Address4"
    Local: Field: nf4: Set As: "Price Level"
    Local: Field: nf5: Set As: "GST IN"
    Local: Field: nf6: Set As: "State Name"
    Local: Field: nf7: Set As: "Pin Code"
    Local: Field: Default: Style: Normal Bold

[Line: LnLedgermaster]
    Fields: fwf, d1
    Right Fields: nf, d2, nf1, d3, nf2, d4, nf3, d5, nf5, d7, nf6, d8, nf7, d9
    Option: Alter on Enter
    Local: Field: qtyf: Format: "NoSymbol, Short Form, No Compact, NoZero"
    Local: Field: ratepf: Set As: #amtf/#qtyf
    Local: Field: fwf: Alter: Ledger: $$IsLedger
    Local: Field: fwf: Set As: $Name
    Local: Field: nf: Set As: @@cwLedAddress1xx
    Local: Field: nf1: Set As: @@cwLedAddress2xx
    Local: Field: nf2: Set As: @@cwLedAddress3xx
    Local: Field: nf3: Set As: @@cwLedAddress4xx
    Local: Field: nf4: Set As: $PriceLevel
    Local: Field: nf5: Set As: $PartyGSTIN
    Local: Field: nf6: Set As: $LedStateName
    Local: Field: nf7: Set As: $Pincode
    Local: Field: fwf: Width: 400, Max: 600
    Local: Field: nf: Width: 400, Max: 600
    Local: Field: nf1: Width: 400, Max: 600
    Local: Field: nf2: Width: 400, Max: 600
    Local: Field: nf3: Width: 400, Max: 600

[Collection: cwRepledAdd]
    Type: Address: Ledger
    Child Of: $Name

[System: Formula]
    cwLedAddress1xx: $$CollectionField:$Address:First:cwRepledAdd
    cwLedAddress2xx: $$CollectionField:$Address:2:cwRepledAdd
    cwLedAddress3xx: $$CollectionField:$Address:3:cwRepledAdd
    cwLedAddress4xx: $$CollectionField:$Address:4:cwRepledAdd

[Line: LnLedgermasterTotals]
    Use: LnLedgermaster
    Option: totalOpt
    Local: Field: fwf: Align: Right
    Local: Field: Default: Style: Normal Bold
    Local: Field: qtyf: Set As: $$Total:qtyf
    Local: Field: fwf: Set As: ""
    Local: Field: amtf: Set As: $$Total:amtf
  `
}
