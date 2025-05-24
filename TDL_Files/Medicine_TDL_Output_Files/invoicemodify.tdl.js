// Auto-generated from invoicemodify.txt
const tdl = `
;===============================================================================
; INVOICEMODIFY.TXT
; Created By: Taniya on 2023-08-30 10:32, ID:
; Purpose: Adds a "PCS" (pieces) column and custom quantity fields to invoice
;          columns, details, and totals in Tally (Rose Homeo scenario), for
;          sales, purchase, debit note, and credit note vouchers.
;===============================================================================

;------------------------------------------------------------------------------
; COLUMN 1: ADD "PCS" FIELD
;------------------------------------------------------------------------------

[#Line: EXPINV Column1]
add: option: cwEXPINVColumn1opt: @@RoseHomeoEnabled and (@@issales or @@ispurchase or @@isdebitnote or @@iscreditnote)

[!line: cwEXPINVColumn1opt]
add: right fields: At Beginning: numf
Local: Field: numf: info: "PCS"
Local: field: numf: Width: 10
local: field: numf: type: String
local: field: numf: align: centre
local: field: numf: border: thin left

;------------------------------------------------------------------------------
; COLUMN 2: ADD BLANK FIELD FOR ALIGNMENT
;------------------------------------------------------------------------------

[#Line: EXPINV Column2]
add: option: cwEXPINVColumn2opt: @@RoseHomeoEnabled and (@@issales or @@ispurchase or @@isdebitnote or @@iscreditnote)

[!line: cwEXPINVColumn2opt]
add: right fields: At Beginning: numf
Local: Field: numf: info: " "
Local: field: numf: Width: 10
Local: Field: numf: Style: Normal Bold
local: field: numf: type: String
local: field: numf: align: centre
local: field: numf: border: thin left

;------------------------------------------------------------------------------
; ALT QTY: ADD BLANK FIELD FOR ALIGNMENT
;------------------------------------------------------------------------------

[#Line: EXPINV AltQty]
add: option: cwEXPINVAltQtyopt: @@RoseHomeoEnabled and (@@issales or @@ispurchase or @@isdebitnote or @@iscreditnote)

[!line: cwEXPINVAltQtyopt]
add: right fields: At Beginning: numf
Local: Field: numf: info: " "
Local: field: numf: Width: 10
Local: Field: numf: Style: Normal Bold
local: field: numf: type: String
local: field: numf: align: centre
local: field: numf: border: thin left

;------------------------------------------------------------------------------
; ACCOUNT DETAILS: ADD BLANK FIELD FOR ALIGNMENT
;------------------------------------------------------------------------------

[#Line: EXPINV AccDetails]
add: option: cwEXPINVInvAccDetailsopt: @@RoseHomeoEnabled and (@@issales or @@ispurchase or @@isdebitnote or @@iscreditnote)

[!line: cwEXPINVInvAccDetailsopt]
add: right fields: At Beginning: numf
Local: Field: numf: info: " "
Local: field: numf: Width: 10
Local: Field: numf: Style: Normal Bold
local: field: numf: type: String
local: field: numf: align: centre
local: field: numf: border: thin left

;------------------------------------------------------------------------------
; INVOICE DETAILS: ADD PCS FIELD AND UNIT LOGIC
;------------------------------------------------------------------------------

[#Line: EXPINV InvDetails]
add: option: cwEXPINVInvDetailszzopt: @@RoseHomeoEnabled and (@@issales or @@ispurchase or @@isdebitnote or @@iscreditnote)

[!line: cwEXPINVInvDetailszzopt]
add: right fields: At Beginning: numf
add: right fields: after: EXPINV RatePer: snfx

Local: Field: numf: set as: $cwrmvchpcsnew1
Local: field: numf: Width: 10
local: field: numf: align: centre
local: field: numf: border: thin left
Local: field: numf: Format: "decimals:2,no zero"

Local: Field: EXPINV RatePer: invisible: yes
Local: Field: snfx: set as: if $$isempty:#numf then $baseunits:stockitem:$stockitemname else "PCS"
Local: Field: snfx: width: If $$InDraftMode then 5 else @@UnitsWidth
Local: Field: snfx: border: thin left

Local: Field: EXPINV Desc: Set As: $parent:stockitem:$stockitemname
Local: Field: EXPINV Desc: lines: 1

;------------------------------------------------------------------------------
; INVOICE TOTALS: ADD PCS TOTAL
;------------------------------------------------------------------------------

[#Line: EXPINV Totals]
add: option: cwEXPINVTotalsopt: @@RoseHomeoEnabled and (@@issales or @@ispurchase or @@isdebitnote or @@iscreditnote)

[!line: cwEXPINVTotalsopt]
add: right fields: At Beginning: numf
Local: Field: numf: set as: $$total:numf
Local: field: numf: Width: 10
Local: Field: numf: Style: Normal Bold
local: field: numf: align: centre
local: field: numf: border: thin left
Local: field: numf: Format: "decimals:2,no zero"

;------------------------------------------------------------------------------
; PART TOTALS: ENSURE PCS IS INCLUDED
;------------------------------------------------------------------------------

[#Part: EXPINV Details]
TOTALS: numf

[#Part: EXPSMP InvDetails]
TOTALS: numf

;------------------------------------------------------------------------------
; SIMPLE INVOICE: COLUMN 1, 2, DETAILS, ACC DETAILS
;------------------------------------------------------------------------------

[#Line: EXPSMP Column1]
add: right fields: before: EXPINV QtyTitle: numf
Local: Field: numf: info: "PCS"
Local: field: numf: Width: 10
local: field: numf: type: String
local: field: numf: align: centre
local: field: numf: border: thin left

[#Line: EXPSMP Column2]
add: right fields: before: EXPINV BilledQtyTitle: numf
Local: Field: numf: info: " "
Local: field: numf: Width: 10
Local: Field: numf: Style: Normal Bold
local: field: numf: type: String
local: field: numf: align: centre
local: field: numf: border: thin left

[#Line: EXPSMP InvDetails]
add: right fields: before: EXPINV Qty: numf
Local: Field: numf: set as: $cwrmvchpcsnew1
Local: field: numf: Width: 10
local: field: numf: align: centre
local: field: numf: border: thin left
Local: field: numf: Format: "decimals:2,no zero"

[#Line: EXPSMP AccDetails]
add: right fields: before: EXPINV AccQty: numf
Local: Field: numf: info: " "
Local: field: numf: Width: 10
Local: Field: numf: Style: Normal Bold
local: field: numf: type: String
local: field: numf: align: centre
local: field: numf: border: thin left

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
