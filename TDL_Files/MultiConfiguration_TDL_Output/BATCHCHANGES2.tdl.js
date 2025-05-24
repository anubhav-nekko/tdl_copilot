// Auto-generated from BATCHCHANGES2.TXT
const tdl = `
;===============================================================================
; BATCHCHANGES2.TXT
; Created By: Anil on 2023-07-12 14:05, ID:
; Created By: Akshay on 2015-05-21 10:50, ID:
; Purpose: Adds barcode, MRP, image, and up to 14 additional batch fields to
;          Tally batch and voucher lines, with company-level settings and UI enhancements.
;===============================================================================

;;----------------- Features Changes -------------------------

[Line: lncmpbarcodefrombatch]
    field: lp, cwlogical, mp2, cwlogical2, mp3, cwlogical3, mp4, fwf
    Local: Field: lp: info: "Barcode from Batch ?"
    Local: Field: mp2: info: "MRP From Batch ?"
    Local: Field: mp3: info: "Image with Batch?"
    Local: Field: mp4: info: "Image Location :"
    Local: Field: sp4: Set As: "Set MRP In Sales ?"
    Local: Field: cwlogical: storage: cwenablebarcodebatch
    Local: Field: cwlogical2: storage: cwmrpenable
    Local: Field: numf: storage: cwnumberdigit
    Local: Field: cwlogical3: storage: cwEnableImage
    Local: Field: fwf: storage: cwimagepath
    Local: Field: cwlogical4: storage: cwMRpinsalesopt
    Local: field: numf: Align: left
    Local: Field: fwf: Style: Normal Bold
    local: field: sp: inactive: not $cwEnableImage
    local: field: fwf: inactive: not $cwEnableImage
    Local: field: mp2: Width: 20
    Local: field: mp4: Width: 22
    Local: field: mp3: Width: 22
    Local: field: sp4: Width: 22

[Line: lncmpbatchfieldcaption]
    space top: .5
    field: lp, cwlogical, sp, snf, sp2, snf2, sp3, snf3, sp4, snf4, sp5, cwlogical2
    Local: Field: sp5: info: "Show in Stock Summary"
    Local: field: sp5: Width: 20
    local: field: sp5: inactive: not #cwlogical
    local: field: cwlogical2: inactive: not #cwlogical
    Local: Field: lp: info: "Additional fields in Batch ?"
    Local: field: lp: Width: 20
    Local: Field: sp: info: "Caption 1 :"
    Local: Field: sp2: info: "Caption 2 :"
    Local: Field: sp3: info: "Caption 3 :"
    Local: Field: cwlogical: storage: cwenablebatchfield
    Local: Field: cwlogical2: storage: cwshowbatchfieldinStockSummary
    Local: Field: snf: storage: cwbatchcaption1
    Local: Field: snf2: storage: cwbatchcaption2
    Local: Field: snf3: storage: cwbatchcaption3
    Local: Field: snf4: storage: cwbatchCostCodeFrom
    local: field: snf: inactive: not #cwlogical
    local: field: snf2: inactive: not #cwlogical or $$isempty:$cwbatchcaption1
    local: field: snf3: inactive: not #cwlogical or $$isempty:$cwbatchcaption2
    local: field: snf4: inactive: not #cwlogical
    local: field: sp: inactive: not #cwlogical
    local: field: sp2: inactive: not #cwlogical or $$isempty:$cwbatchcaption1
    local: field: sp3: inactive: not #cwlogical or $$isempty:$cwbatchcaption2
    local: field: sp4: inactive: not #cwlogical
    Local: Field: sp4: info: "Cost Code from:"
    Local: field: sp4: Width: 0
    Local: Field: snf4: table: cwCostCodeFrom, Not Applicable
    Local: Field: snf: Style: Normal Bold
    Local: Field: snf2: Style: Normal Bold
    Local: Field: snf3: Style: Normal Bold
    Local: Field: snf4: Style: Normal Bold
    Local: field: snf4: Width: 10

[Collection: cwCostCodeFrom]
    title: "Cost Code from"
    listname: @@cwCostCodeFromF1
    listname: @@cwCostCodeFromF2
    listname: @@cwCostCodeFromF3

[System: Formula]
    cwCostCodeFromF1: "First"
    cwCostCodeFromF2: "Second"
    cwCostCodeFromF3: "Third"
    cwenablebatchfield: $cwenablebatchfield:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle1: $cwbatchcaption1:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle2: $cwbatchcaption2:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle3: $cwbatchcaption3:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle4: $cwproductStr2x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle5: $cwproductStr3x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle6: $cwproductStr4x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle7: $cwproductStr5x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle8: $cwproductStr9x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle9: $cwproductStr10x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle10: $cwproductStr11x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle11: $cwproductStr12x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle12: $cwproductStr13x:COMPANY:##SVCURRENTCOMPANY
    cwbatchtitle13: $cwproductStr14x:COMPANY:##SVCURRENTCOMPANY
    cwenablebarcodebatch: $cwenablebarcodebatch:COMPANY:##SVCURRENTCOMPANY
    cwmrpenable: $cwmrpenable:COMPANY:##SVCURRENTCOMPANY
    cwEnableImage: $cwEnableImage:COMPANY:##SVCURRENTCOMPANY
    cwbatchCostCodeFrom: $cwbatchCostCodeFrom:COMPANY:##SVCURRENTCOMPANY

;------------------------- Sales Voucher Changes -------------------------------------------
; (Further extensions for voucher lines, batch fields, images, MRP, etc., follow the same pattern as in BATCHCHANGES.TXT)

;===============================================================================
; END OF FILE
;===============================================================================


`;
export default tdl;
