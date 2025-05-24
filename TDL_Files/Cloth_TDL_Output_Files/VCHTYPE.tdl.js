// Auto-generated from VCHTYPE.TXT
const tdl = `
;===============================================================================
; VCHTYPE.TXT
; Created By: Khokan on 2021-04-27 16:29, ID:
; Purpose: Adds system date, invoice customization, and cost customization
;          enablement options to Voucher Type Behaviour in Tally, with
;          company-specific logic and professional formatting.
;===============================================================================

;;------------------------------------------------------------------------------
;; SYSTEM DATE OPTION: Add "System date?" field to Voucher Type Behaviour
;;------------------------------------------------------------------------------

[#Part: VTYP Behaviour]
    add:option:newVTYPBehaviourmsopt:@@MinuSareeEnabled

[!part:newVTYPBehaviourmsopt]
    add:line:cwSystemdateline

[line:cwSystemdateline]
    field:long prompt,cwlogical
    Local: Field: long prompt: Set As:"System date?"
    Local: Field: cwlogical: storage:cwSystemdatems
    Local: Field: default: Style: Normal Bold

[System: Formula]
    cwSystemdatemsopt: $cwSystemdatems:vouchertype:$vouchertypename
    issaletop: $$issales:$parent

;;------------------------------------------------------------------------------
;; INVOICE CUSTOMIZATION OPTION: Enable invoice customization for sales vouchers
;;------------------------------------------------------------------------------

[#Part: VTYP Behaviour]
    add:option:cwEnableInvoiceCostopt:@@issaletop and @@MinuSareeEnabled

[!part:cwEnableInvoiceCostopt]
    add:line:cwEnableInvoiceCost

[line:cwEnableInvoiceCost]
    field:long prompt,cwlogical
    Local: Field: long prompt: Set As:"Enable Invoice Costomization?"
    Local: Field: cwlogical: storage:cwEnableInvoiceCost
    Local: Field: default: Style: Normal Bold

;;------------------------------------------------------------------------------
;; GENERAL COST CUSTOMIZATION OPTION: Enable cost customization for all vouchers
;;------------------------------------------------------------------------------

[#Part: VTYP Behaviour]
    add:option:cwEnableCostnwopt:@@MinuSareeEnabled

[!part:cwEnableCostnwopt]
    add:line:cwEnableCostnw

[line:cwEnableCostnw]
    field:long prompt,cwlogical
    Local: Field: long prompt: Set As:"Enable Costomization?"
    Local: Field: cwlogical: storage:cwEnableCostnw
    Local: Field: default: Style: Normal Bold

;;===============================================================================
; End of VCHTYPE.TXT (with documentation comments)
;===============================================================================

`;
export default tdl;
