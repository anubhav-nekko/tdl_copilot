// Auto-generated from CWITEMAUTOQTY.TXT
const tdl = `
;===============================================================================
; CWITEMAUTOQTY.TXT
; Created By: Suman on 2013-07-30 16:53, ID:
; Purpose: Automatically sets the billed and actual quantity fields in batch and
;          voucher entry screens in Tally, using the custom UDF $cwAutoQuantity
;          from the stock item master, especially for sales and delivery notes.
;===============================================================================

;------------------------------------------------------------------------------
; System formulas to control when auto-quantity logic applies
;------------------------------------------------------------------------------

[System: Formula]
cwSetBqty      : @@issales or @@isdelnote          ;; Enable for sales or delivery note
cwSetBqtyJrnl  : no                                ;; Disable for journals

;------------------------------------------------------------------------------
; Add auto-quantity option to batch billed quantity fields
;------------------------------------------------------------------------------

[#field: VCHBATCH NrmlBQty]
add : option : cwSetBQty : @@cwSetBqty

[#Field: VCHBATCH JrnlBQty]
add : option : cwSetBQty : @@cwSetBqtyJrnl

[!field : cwSetBQty]
set as: if $$isempty:$$value then $$asqty:$cwAutoQuantity:stockitem:$stockitemname else $$value

;------------------------------------------------------------------------------
; Add auto-quantity logic to batch billed and actual quantity fields for sales/delnote
;------------------------------------------------------------------------------

[#field: VCHBATCH BilledQty]
add: option: cwvchbill: @@issales or @@isdelnote

[!field: cwvchbill]
set as: if $$isempty:$$value then $$asqty:$cwAutoQuantity:stockitem:$stockitemname else $$value

[#field: VCHBATCH ActualQty]
add: option: cwvchbillactual: @@issales or @@isdelnote or (not @@isoutwardtype and @@isbatchautoIn)

[!field: cwvchbillactual]
set as: if $$isempty:$$value then $$asqty:$cwAutoQuantity:stockitem:$stockitemname else $$value

;------------------------------------------------------------------------------
; Add auto-quantity logic to voucher billed quantity field for sales/delnote
;------------------------------------------------------------------------------

[#field: VCH BilledQty]
add: option: cwvchbilledqty : (@@issales or @@isdelnote)

[!field: cwvchbilledqty]
; Remove any existing set as/set by condition logic
delete: set as
delete: set by condition
; Add new set by condition to auto-fill from $cwAutoQuantity if empty
add: set by condition: yes: if $$isempty:$$value then $$asqty:$cwAutoQuantity:stockitem:$stockitemname else $$value
Skip Forward: yes
; Optionally add border for clarity
; border: thin box

;------------------------------------------------------------------------------
; Add skip forward logic to value field for sales/delnote
;------------------------------------------------------------------------------

[#field: VCH Value]
add: option: cwvchvalue: @@issales or @@isdelnote

[!field: cwvchvalue]
Skip Forward: yes

`;
export default tdl;
