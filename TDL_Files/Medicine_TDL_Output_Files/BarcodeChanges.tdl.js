// Auto-generated from BarcodeChanges.txt
const tdl = `
;===============================================================================
; BARCODECHANGES.TXT
; Created By: Anil on 2023-08-08 17:13, ID:
; Purpose: Customizes batch allocation and barcode inventory entry lines to
;          display or compute custom fields such as quantity and price, with
;          support for additional barcode-related fields.
;===============================================================================

;------------------------------------------------------------------------------
; GODOWN BATCH ALLOCATIONS LINE ENHANCEMENTS
;------------------------------------------------------------------------------

[#Line: GodBatchAllocations]

; Sets numf2 to the custom field cwrmvchpcsnew from the parent context.
Local: Field: numf2: Set As: $..cwrmvchpcsnew
    ;; If you want to default to $actualqty when cwrmvchpcsnew is empty, use:
    ;; if $$isempty:$cwrmvchpcsnew then $actualqty else $cwrmvchpcsnew

; Sets snf16 to the custom field cwrmvchpcsnew5.
Local: Field: snf16: Set As: $cwrmvchpcsnew5

; The following lines are commented out but show how to set additional fields:
;; Local: Field: numf3: Set As: $cwrateinprice
;; Local: Field: numf4: Set As: $cwrateinprice
;; Local: Field: numf5: Set As: $cwrateinprice
;; Local: Field: numf6: Set As: $cwrateinprice
;; Local: Field: numf7: Set As: $cwrateinprice

;------------------------------------------------------------------------------
; BARCODE INVENTORY ENTRIES LINE ENHANCEMENTS
;------------------------------------------------------------------------------

[#Line: MyBarCodeInvEntries]

; Sets numf2 to the custom field cwrmvchpcsnew from the parent context.
Local: Field: numf2: Set As: $..cwrmvchpcsnew
    ;; Example alternatives:
    ;; $cwrmvchpcsnew
    ;; if $$isempty:$cwrmvchpcsnew then $actualqty else $cwrmvchpcsnew

; Sets snf16 to the custom field cwrmvchpcsnew5.
Local: Field: snf16: Set As: $cwrmvchpcsnew5

; Sets numf3 to the custom field cwrateinprice.
Local: Field: numf3: Set As: $cwrateinprice

; The following lines are commented out but show how to set additional fields:
;; Local: Field: numf4: Set As: $cwrateinprice
;; Local: Field: numf5: Set As: $cwrateinprice
;; Local: Field: numf6: Set As: $cwrateinprice
;; Local: Field: numf7: Set As: $cwrateinprice

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
