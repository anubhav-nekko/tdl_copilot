// Auto-generated from ITEMMASTER.TXT
const tdl = `
;===============================================================================
; ITEMMASTER.TXT
; Created By: Taniya on 2019-11-29 11:59, ID:
; Purpose: Adds image management features to the Stock Item master in Tally,
;          allowing users to store and view item images using a custom UDF and
;          a dedicated subform for display.
;===============================================================================

;------------------------------------------------------------------------------
; Extend the Stock Item Units part with image option if document management is enabled
;------------------------------------------------------------------------------

[#Part: STKI Units]
add: option: cwSTKIUnitsimgopt: @@cwdocManagementEnable

;------------------------------------------------------------------------------
; When the image option is enabled, add a line for image name and view
;------------------------------------------------------------------------------

[!part: cwSTKIUnitsimgopt]
add: line: cwstkitemimageline

;------------------------------------------------------------------------------
; Line for entering image name and viewing the image
;------------------------------------------------------------------------------

[line: cwstkitemimageline]
field: medium prompt, snf5, sp, cwlogical

Local: Field: medium prompt: info: "Image Name"
Local: Field: sp: info: "View"
Local: Field: snf5: storage: cwdoc
Local: Field: cwlogical: SubForm: photoreporta: $$value

;------------------------------------------------------------------------------
; Report and form for displaying the item image
;------------------------------------------------------------------------------

[report: photoreporta]
form: photoformaa

[form: photoformaa]
part: photopartax2x, photopartax22, photopartaa

;------------------------------------------------------------------------------
; Part: Display item name in the image form
;------------------------------------------------------------------------------

[part: photopartax2x]
line: photopartaxline2x

[line: photopartaxline2x]
field: sp, nf
Local: Field: sp: info: "Item Name"
Local: Field: nf: Set As: $stockitemname
Local: field: nf: read only: yes
Local: Field: nf: Style: Normal Bold

;------------------------------------------------------------------------------
; Part: Display base path for images in the image form
;------------------------------------------------------------------------------

[part: photopartax22]
line: photopartaxline22

[line: photopartaxline22]
field: sp, nf
Local: Field: sp: info: "Base Path"
Local: Field: nf: Set As: @@cwphotoform
Local: field: nf: read only: yes
Local: Field: nf: Style: Normal Bold

;------------------------------------------------------------------------------
; Part: Display the image itself (graph type)
;------------------------------------------------------------------------------

[part: photopartaa]
line: photoimalinea

graph type: @@cwphotoforma

[line: photoimalinea]
field: fwf
Local: Field: fwf: set as: ""

;------------------------------------------------------------------------------
; System formulas for constructing the image path and graph type
;------------------------------------------------------------------------------

[System: Formula]
cwphotoforma: @@cwBasePath + @@cwbasepathlogoa
cwbasepathlogoa: $cwdoc

`;
export default tdl;
