// Auto-generated from NEWWORKS.TXT
const tdl = `
;===============================================================================
; NEWWORKS.TXT
; Modified by: Suman on 2012-12-18 17:21, ID:
; Created By: Mukesh Singh on 2011-10-31 13:50
; Purpose: Customizes batch entry in Tally to auto-set ActualQty and BilledQty
;          during voucher creation for sales and delivery note vouchers.
;===============================================================================

;------------------------------------------------------------------------------
; Add option "s2" to STKVCH Batch2 line for create mode in sales/delivery note
;   - Applies only if the batch is a system name (e.g., auto-generated).
;------------------------------------------------------------------------------

[#Line: STKVCH Batch2] ;; $date < $$date:"02/12/2011" and 
add : option : s2 : $$increatemode and (@@isdelnote or @@issales and $$issysname:#VCHBATCHTrack)

;------------------------------------------------------------------------------
; Option "s2": Set ActualQty and BilledQty fields in batch allocations
;------------------------------------------------------------------------------

[!line : s2]
local:field:VCHBATCH ActualQty: set as : #vchbatchbilledqty ;; Set ActualQty from BilledQty
local:field:VCHBATCH BilledQty: set as : if  $$increatemode AND $$ISEMPTY:$$vALUE  then $$asqty:1 else $$value ;; Default BilledQty to 1 if empty
local:field:VCHBATCH ActualQty: set always : yes
;;local:field:VCHBATCH BilledQty: border : thin box

;------------------------------------------------------------------------------
; (Commented) Additional logic for inventory info lines and field behaviors
;   - Includes examples for setting ActualQty and BilledQty in entry lines.
;------------------------------------------------------------------------------

;;[#Line: EI InvInfo]
;;local:field:VCH ActualQty:set by condition : $$increatemode :  #vchbilledqty
;;local:field:VCH ActualQty: set always : yes
;;local:field:VCH BilledQty:set by condition : $$increatemode : $$asqty:1

;;local:Field:VCH BilledQty:setas:if $$IsFieldEdited OR NOT @@InvoiceInCreate then $$Value else +
;;                                if $$IsEmpty:$$Value then $ActualQty else $$Value
;;local:field:VCH ActualQty:setas:if $DiffActualQty then $$Value else $BilledQty

`;
export default tdl;
