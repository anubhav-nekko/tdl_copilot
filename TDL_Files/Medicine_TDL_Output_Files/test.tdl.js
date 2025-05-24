// Auto-generated from test.txt
const tdl = `
;===============================================================================
; TEST.TXT
; Created By: Anil on 2023-09-14 12:17, ID:
; Purpose: Demonstrates price level subform and date-wise price configuration
;          for stock groups in Tally, with repeat lines and subforms.
;===============================================================================

;------------------------------------------------------------------------------
; PRICE LEVELS SUBFORM IN STOCK GROUP (NO DUPLICATE LINE DEFINITION)
;------------------------------------------------------------------------------

; Do NOT define [line: cwPricelabelsLine] here if it is already defined in stockgroupchg.txt

[report: repdatePriseLevels]
    form: frmdatePriseLevels

[form: frmdatePriseLevels]
    part: datePriseLevelspart

[part: datePriseLevelspart]
    line: MPL Price Livel, datePriseLevelstitleLn2
    repeat: datePriseLevelstitleLn2: colldatepriselevel
    break on: $$isempty: $cwpriceleveldate
    height: 20% page
    width: 35% page
    common border: yes

[collection: colldatepriselevel]
    type: collpriselevel: stock group
    child of: $name

[line: datePriseLevelstitleLn2]
    right field: sdf
    Local: Field: sdf: Storage: cwpriceleveldate
    Local: Field: sdf: SubForm: repPriseLevels: not $$issysname: $cwpriceleveldate

[#line: MPL Price Livel]
    right field: sdf
    Local: Field: sdf: info: "sdf"
    local: field: sdf: type: String
    Local: field: sdf: Align: centre
    Local: Field: sdf: Style: Normal Bold

;------------------------------------------------------------------------------
; PRICE LEVEL DETAILS SUBFORM
;------------------------------------------------------------------------------

[report: repPriseLevels]
    form: frmPriseLevels

[form: frmPriseLevels]
    part: PriseLevelspart

[part: PriseLevelspart]
    line: PriseLevelstitleLn, PriseLevelstitleLn2, PriseLevelsmainLn
    repeat: PriseLevelsmainLn: collpriselevel
    break on: $$isempty: $cwLessThen
    height: 30% page
    width: 35% page
    common border: yes

[collection: collpriselevel]
    type: collpriselevel: stock group
    child of: $name

[line: PriseLevelstitleLn]
    field: fwfc
    Local: Field: fwfc: info: "Details"
    Local: Field: fwfc: Border: thin box

[line: PriseLevelstitleLn2]
    use: PriseLevelsmainLn
    border: thin bottom
    Local: Field: sdf: info: "Date"
    Local: Field: numf: info: "From"
    Local: Field: numf1: info: "Less Then"
    Local: Field: numf2: info: "Rate"
    Local: Field: numf3: info: "Disc"
    Local: Field: MPL Price Livel: info: "Price Level"

    local: field: sdf: delete: storage
    local: field: numf: delete: storage
    local: field: numf1: delete: storage
    local: field: numf2: delete: storage
    local: field: numf3: delete: storage

    local: field: sdf: delete: inactive
    local: field: numf: delete: inactive
    local: field: numf1: delete: inactive
    local: field: numf2: delete: inactive
    local: field: numf3: delete: inactive

    Local: field: sdf: Align: centre
    Local: field: numf: Align: centre
    Local: field: numf1: Align: centre
    Local: field: numf2: Align: centre
    Local: field: numf3: Align: centre

    local: field: sdf: type: String
    local: field: numf: type: String
    local: field: numf1: type: String
    local: field: numf2: type: String
    local: field: numf3: type: String

[line: PriseLevelsmainLn]
    field: sdf, numf, numf1, numf2, numf3
    Local: Field: sdf: Storage: cwDate
    Local: Field: numf: Storage: cwFrom
    Local: Field: numf1: Storage: cwLessThen
    Local: Field: numf2: Storage: cwRate
    Local: Field: numf3: Storage: cwDisc

    Local: Field: snf: table: Stock Group, Not Applicable
    Local: Field: sdf: Set As: $$owner: $cwpriceleveldate
    Local: Field: numf: Set As: if $$Line = 1 then $$value else $$PrevObj: $cwLessThen

    local: field: numf1: inactive: $$issysname: #numf
    local: field: numf2: inactive: $$issysname: numf
    local: field: numf3: inactive: $$issysname: numf

    Local: field: sdf: Align: centre
    Local: field: numf: Align: centre
    Local: field: numf1: Align: centre
    Local: field: numf2: Align: centre
    Local: field: numf3: Align: centre

    Local: Field: sdf: Border: thin left
    Local: Field: numf: Border: thin left
    Local: Field: numf1: Border: thin left
    Local: Field: numf2: Border: thin left
    Local: Field: numf3: Border: thin left

    Local: Field: sdf: Skip: Yes
    Local: Field: numf: Skip: Yes

;===============================================================================
; END OF FILE
;===============================================================================

`;
export default tdl;
