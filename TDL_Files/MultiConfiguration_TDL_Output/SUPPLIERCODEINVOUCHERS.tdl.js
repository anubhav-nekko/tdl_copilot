// Auto-generated from SUPPLIERCODEINVOUCHERS.TXT
const tdl = `
;===============================================================================
; SUPPLIERCODEINVOUCHERS.TXT
; Created By: pg on 2012-01-07 16:25
; Purpose: Adds a "Supplier Code" (party code) field to voucher entry in Tally,
;          displays it in the consignee line, and notifies if missing when required.
;===============================================================================

;------------------------------------------------------------------------------
; ADD SUPPLIER CODE FIELD TO CONSIGNEE LINE IN VOUCHER ENTRY
;------------------------------------------------------------------------------

[#line : eiconsignee]
    add : field : sp7, snf9
    Local: Field: snf9: Skip: Yes
    Local: Field: snf9: Set As: $cwpartycode:ledger:$partyledgername
    Local: Field: snf9: storage: cwSupplierCode
    ;; {01.Jun.18 15:05} Local: Field: snf9: Border: thin box
    Local: Field: sp7: info: "Code:"
    local: field: sp7: Invisible: not @@cwShowPartyAliasinEntry

;------------------------------------------------------------------------------
; NOTIFY USER IF SUPPLIER CODE IS MISSING (ON VOUCHER TOTAL FIELD)
;------------------------------------------------------------------------------

[#field : ei value total]
    notify : CWLedgerCodeBlank : @@cwShowPartyAliasinEntry and @@cwWarnonEmptypartyCode and $$isempty:$cwSupplierCode

;------------------------------------------------------------------------------
; NOTIFICATION MESSAGE FORMULA
;------------------------------------------------------------------------------

[System: Formula]
    CWLedgerCodeBlank : "Please provide Party Code"

`;
export default tdl;
