// Auto-generated from BARCODEFOREACHQTY.TXT
const tdl = `
;===============================================================================
; BARCODEFOREACHQTY.TXT
; Created By: Akshay on 2014-08-08 11:37, ID:
; Purpose: Enables auto-creation of batches for each quantity, barcode settings
;          on voucher save, and related UI and logic for Tally.
;===============================================================================

;------------------------------------------------------------------------------
; MAIN CONFIGURATION LINE FOR "AUTO CREATE BATCH FOR EACH QTY"
;------------------------------------------------------------------------------

[Line: lnbcodeforeachqty]
    field: lp, cwlogical, sp, numf, sp2, numf2, sp3, cwlogical2
    Local: Field: lp : info: "Auto Create Batch for Each Qty.(1 qty / batch.) ?"
    Local: Field: sp : info: "Prefill with Zeros :"
    Local: Field: sp2 : info: "Starting No.:"
    Local: Field: cwlogical : storage: cwbarcodeeachqty
    Local: Field: numf: storage: cwnumzerofill
    Local: Field: numf2: storage: cwbcodestnox
    Local: Field: numf: Style: Normal Bold
    Local: Field: numf2: Style: Normal Bold
    Local: field: lp: Width: 42
    Local: field: sp: Width: 20
    Local: field: sp2: Width: 14
    local: field: sp: inactive: not $cwbarcodeeachqty
    local: field: sp2: inactive: not $cwbarcodeeachqty
    local: field: numf: inactive: not $cwbarcodeeachqty
    local: field: numf2: inactive: not $cwbarcodeeachqty
    Local: field: numf: Align: left
    Local: field: numf2: Align: left
    Local: Field: sp3: info: "Skip Auto Fill (1 Barcode for All Qty)?"
    Local: field: sp3: Width: 0
    local: field: cwlogical2: inactive: not $cwbarcodeeachqty
    Local: Field: cwlogical2: storage: cwBatchQtyOne
    border: thin box

;------------------------------------------------------------------------------
; VOUCHER TYPE BEHAVIOUR: BARCODE AUTO-INVOKE & OPTIONS
;------------------------------------------------------------------------------

[#Part: VTYP BehaviourMain]
    ADD : OPTION : CWBARCODEAUTOINVOKE : @@cwCustomizationEnabled
    add : option : prtgeneratebarcodeqty : @@cwbarcodeeachqty
    add : option : cwFillCusumptionFromBOM : @@cwCustomizationEnabled

[!PART : CWBARCODEAUTOINVOKE]
    ADD : LINE : AT BEGINNING : CWBARCODETITLE, CWBARCODEINVOKEFROMVCH, CWBARCODEINVOKEFROMVCH2, cwWarnonEmptypartyCode, cwFillCusumptionFromBOM
    add : option: cwVchtypeTempate : $cwBarcodeTemplatebyVchType:COMPANY:##SVCURRENTCOMPANY

[!part : cwVchtypeTempate]
    add : line : after : cwWarnonEmptypartyCode : cwBarcodeTemplate

[line: cwBarcodeTemplate]
    field: sp, snf
    Local: Field: sp: info: "Barcode Template Name:"
    Local: field: sp: Width: 30
    Local: Field: snf: storage: cwBarcodeTemplatename
    Local: Field: default: Style: Normal Bold
    local: field: snf: Case: Normal

[LINE: CWBARCODETITLE]
    Line: Form SubTitle
    Local: Field: Form SubTitle: Info: $$LocaleString:"Barcode Settings"

[LINE: CWBARCODEINVOKEFROMVCH]
    field: long prompt, cwlogical
    Local: Field: long prompt: info: "Generate Barcode on Save (New Entry)?"
    Local: field: long prompt: Width: 40
    Local: Field: long prompt: Style: Normal Bold
    Local: Field: cwlogical: storage: GenBarCodeOnSave

[LINE: CWBARCODEINVOKEFROMVCH2]
    field: long prompt, cwlogical
    Local: Field: long prompt: info: "Generate Barcode on Save (Editing)?"
    Local: field: long prompt: Width: 40
    Local: Field: long prompt: Style: Normal Bold
    Local: Field: cwlogical: storage: GenBarCodeOnSaveEdit

[line: cwWarnonEmptypartyCode]
    use: CWBARCODEINVOKEFROMVCH
    Local: Field: long prompt: info: "Warn on Blank Party Code"
    Local: Field: cwlogical: storage: cwWarnonEmptypartyCode
    local: field: cwlogical: inactive: not @@cwShowPartyAliasinEntry

[line: cwGenOnOut]
    field: sp, cwlogical
    Local: Field: sp: info: "Generate Barcode on Outward?"
    Local: Field: cwlogical: storage: cwGenerateBarcodeOnOutward
    Local: field: sp: Width: 30
    invisible: not $$IsJobMaterialIssue:$parent
    Local: Field: sp: Style: Normal Bold

[System: Formula]
    GenBarCodeOnSave: ($$increatemode and $GenBarCodeOnSave:vouchertype:##SVVouchertype) or (not $$increatemode and $GenBarCodeOnSaveEdit:vouchertype:##SVVouchertype)
    GenBarCodeOnSaveEdit: $GenBarCodeOnSaveEdit:vouchertype:##SVVouchertype
    cwWarnonEmptypartyCode: $cwWarnonEmptypartyCode:Vouchertype:##SVVoucherType

[!Part: prtgeneratebarcodeqty]
    ADD: LINE: before: Form SubTitle: lnbcodeforeachqtyvch

[Line: lnbcodeforeachqtyvch]
    field: long prompt, cwlogical
    Local: Field: long prompt: info: "Auto Fill Batch for Each Qty.?"
    Local: Field: cwlogical: storage: cwbarcodeeachqty
    Local: Field: default: Style: Normal Bold
    Local: field: long prompt: Width: 30

[!part: cwFillCusumptionFromBOM]
    line: cwFillCusumptionFromBOM

[line: cwFillCusumptionFromBOM]
    field: long prompt, cwlogical
    Local: Field: long prompt: info: "Fill Items from BOM?"
    Local: Field: cwlogical: storage: cwFillItemsFromBOM
    local: field: default: inactive: not $$isstockjrnl:$parent
    Local: Field: default: style: normal bold
    invisible: not ##UseBoM

;------------------------------------------------------------------------------
; LINE NUMBER AND BATCH DETAILS FIELDS FOR INVENTORY LINES
;------------------------------------------------------------------------------

[#line: ei invinfo]
    add: option: mylineno

[#line: ci invinfo]
    add: option: mylineno

[#line: SJDetailsA]
    add: option: mylineno

[#line: SJDetailsC]
    add: option: mylineno

[!line: mylineno]
    add: field: at beginning: snfLineNo
    add: field: after: VCH StockItem: snfbatchdets

[field: snfLineNo]
    use: numf
    set as: $$line
    skip: yes
    invisible: yes
    storage: cwline

[field: snfbatchdets]
    use: nf
    set as: if $$line = 1 then "" else $$Getfromprev:$$line:$stockitemname
    skip: yes
    border: thick box
    invisible: yes

[System: Formula]
    cwBatchName2024: $batchName

[function: Getfromprev]
    parameter: myline: number
    parameter: myitemname: string
    returns: string
    variable: str: string: ""
    variable: id: number: 1
    00: walk Collection: AllInventory Entries
    01: do if: ##id >= ##myline: return: ##str
    02: if: $stockitemname = ##myitemname
    03: set: str: $$collectionfield:@@cwBatchName2024:(-1):BatchAllocations
    05: end if
    06: incr: id
    07: end walk
    08: return: ##str

;------------------------------------------------------------------------------
; SUBFORM AND BATCH ENTRY LOGIC (ABRIDGED)
;------------------------------------------------------------------------------

[#Field: VCH StockItem]
    add: Sub Form: itembarcodedet: @@cwbarcodeeachqty and ($$number:$actualqty=0) and (@@HasBatchWise) and @@cwbarcodeeachqtyx and not @@IsStockJrnl
    add: Sub Form: itembarcodedet2: @@cwbarcodeeachqty and ($$number:$actualqty=0) and (@@HasBatchWise) and @@cwbarcodeeachqtyx and $isdeemedpositive and @@IsStockJrnl and NOT $$IsMultiGodownOn

[#Line: SJDetailsC]
    Local: Field: VCH Godown: add: Sub Form: before: Mfgr SJBatchAllocations: itembarcodedet2: @@cwbarcodeeachqty and ($$number:$actualqty=0) and (@@HasBatchWise) and @@cwbarcodeeachqtyx and $isdeemedpositive and @@IsStockJrnl and $$IsMultiGodownOn
    add: field: cwxline

[#Field: mvchgodown]
    add: Sub Form: itembarcodedet2: @@cwbarcodeeachqty and ($$number:$actualqty=0) and (@@HasBatchWise) and @@cwbarcodeeachqtyx and $isdeemedpositive and @@IsStockJrnl and $$IsMultiGodownOn

[field: cwxline]
    use: number field
    set as: $$line
    skip: yes
    invisible: yes

;------------------------------------------------------------------------------
; UDF DECLARATIONS FOR BARCODE BATCH FEATURES
;------------------------------------------------------------------------------

[System: UDF]
    cwbarcodeeachqty: Logical: 6001
    cwnumzerofill: number: 6002
    cwnewgodownname: string: 6003
    cwnewbcodeqty: number: 6004
    cwnewrate: number: 6005
    cwnewdis: number: 6006
    cwnewamount: number: 6007
    cwbcodestnox: number: 6008
    cwautotr: string: 6009
    cwautoor: string: 60010
    cwordue: duedate: 60011
    cwmfddt: date: 60012
    cwfillvalcaption1: string: 60013
    cwfillvalcaption2: string: 60014
    cwfillvalcaption3: string: 60015
    cwnewsl: string: 60016

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
