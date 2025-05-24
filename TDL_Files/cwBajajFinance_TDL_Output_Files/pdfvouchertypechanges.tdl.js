// Auto-generated from pdfvouchertypechanges.txt
const tdl = `
; Created By: suman on 2021-07-29 14:01, ID: 
; Created By: Pg on 2018-09-11 18:12, ID:

;-----------------------------------------
; System level formula definitions
;-----------------------------------------
[System: Formula]
; Mapping voucher type flags to specific voucher type fields
cwVchdsEnabled : $cwDSEnabled:Vouchertype:##SVVoucherType
cwREgdsEnabled : $cwDSEnabled:Vouchertype:##VoucherTypeName

;-----------------------------------------
; Part definition: Voucher Type (VTYP) Behaviour
;-----------------------------------------
[#Part: VTYP Behaviour]

;; {30.Jul.21 11:30} Added option cwVtypeEnabledocEsign linked to cwBajajFinanceEnabled and cwDSEnabled
;; {15.Sep.18 13:01} Set local field default border to thick box using cwDSEnabled flag

;-----------------------------------------
; Part: cwVtypeEnabledocEsign
; This part adds a line to enable document e-sign upload option
;-----------------------------------------
[!part : cwVtypeEnabledocEsign]
add : line:  cwVtypeEnabledocEsign

;-----------------------------------------
; Line definition: cwVtypeEnabledocEsign
; Defines the fields and layout for the e-sign upload option
;-----------------------------------------
[line: cwVtypeEnabledocEsign]
field: long prompt,logical field

; Long prompt field setup
Local: Field: long prompt: info: "Upload to BF?"          ; Label shown to user
Local: field: long prompt: Width: @@longwidth              ; Width based on global variable

; Logical field configuration
Local: Field: logical field : storage: cwDSEnabled          ; Stores the boolean toggle

; Subform setup linking logical field to subform cwDocdetails with value propagation
Local: Field : logical field : SubForm : cwDocdetails: $$value

; Width for the prompt field
Local: Field : long prompt :width:25

; Layout adjustments
space top : .5                                           ; Add vertical space above
invisible : yes                                         ; Field is invisible by default

;-----------------------------------------
; Report: cwDocdetails
; Form to handle document uploading details
;-----------------------------------------
[Report: cwDocdetails]
   form: FrmcwDocdetails
   title: "Uploading Document..."

;-----------------------------------------
; Form: FrmcwDocdetails
; Small sized form containing part prtcwDocdetails
;-----------------------------------------
[form: FrmcwDocdetails]
 option: small size form
 part: prtcwDocdetails

;-----------------------------------------
; Part: prtcwDocdetails
; Contains lines for various document details
;-----------------------------------------
[part: prtcwDocdetails]
 line: lncwDocdetails
 line : lncwDocdetailsx,cwposition1,cwposition2Title,cwposition2,cwPDFSignatureOn ,cwPDFCopies  , cwActionTitle,cwAction,cwAction2,cwesignAction,cwesignAction2

;-----------------------------------------
; Line: lncwDocdetails
; Fields for template selection and optional info
;-----------------------------------------
[line: lncwDocdetails]
field: fsp,fsnf,fsnf3
Local: Field: fsp: info: "Template:"                     ; Label for template field
Local: Field: fsnf: storage: cwVchTemplate               ; Template storage variable
Local: Field: fsnf3: info: "(Optional)"                   ; Optional info label
border : thin bottom                                      ; Bottom border for separation

;-----------------------------------------
; Line: lncwDocdetailsx
; Field for signature position info with styling
;-----------------------------------------
[line:lncwDocdetailsx]
 field: fsnf
 Local: Field: fsnf: info: "Signature Position :"        ; Label for signature position
 Local: Field: fsnf: border:thin bottom                   ; Bottom border style
 Local: Field: fsnf: width:0                               ; Zero width (hidden?)

;-----------------------------------------
; Line: cwposition1
; Fields for specifying left and top positions
;-----------------------------------------
[line: cwposition1]
 space top : 0.5
 field : fsp,fnumf,fsp2,fnumf2
 Local: Field: fsp: info: "Left"                          ; Label for left position
 Local: Field: fsp2: info: "Top"                          ; Label for top position
 Local: Field: fnumf: storage: cwLeft                      ; Storage variable for left pos
 Local: Field: fnumf2: storage: cwTop                      ; Storage variable for top pos

;-----------------------------------------
; Line: cwposition2Title
; Single field line for position title
;-----------------------------------------
[line : cwposition2Title]
 field : fsnf
 Local: Field: fnf: info: "Position"                      ; Label for position section

;-----------------------------------------
; Line: cwposition2
; Reuses cwposition1 fields for bottom and right positions, with bottom border
;-----------------------------------------
[line: cwposition2]
 use :cwposition1
 Local: Field: fsp: info: "Bottom"                        ; Label for bottom position
 Local: Field: fsp2: info: "Right"                        ; Label for right position
 Local: Field: fnumf: storage: cwBottom                   ; Storage for bottom pos
 Local: Field: fnumf2: storage: cwRight                   ; Storage for right pos
 border : thin bottom

;-----------------------------------------
; Line: cwPDFCopies
; Fields for specifying number of copies to print
;-----------------------------------------
[line: cwPDFCopies]
 field: fsp ,fnumf
 Local: Field: fsp: info: "Copies:"                        ; Label for copies
 Local: Field: fnumf: storage: cwPrintCopies               ; Storage for copies count

;-----------------------------------------
; Line: cwPDFSignatureOn
; Fields to select where to put signature on PDF
;-----------------------------------------
[line: cwPDFSignatureOn]
 field : fsp,fsnf
 local: field : fsp : info: "Put Signature on:"            ; Label
 Local: Field: fsnf: table: cwPutSignatureOn,Not Applicable ; Dropdown from collection cwPutSignatureOn
 Local: Field: fsp: width: 0                               ; Width zero (hidden)
 Local: Field: fsnf: Set As: if $$isempty:$$value then @@cwDSLastPage else $$value ; Default value logic
 Local: Field: fsnf: storage:cwPutSignatureOn             ; Storage for selection

;-----------------------------------------
; Collection: cwPutSignatureOn
; Options for signature placement on pages
;-----------------------------------------
[collection : cwPutSignatureOn]
 title:"Signature on Page"
 listname : @@cwDSLastPage
 listname : @@cwDSfirstPage
 listname : @@cwDSAllPages

;-----------------------------------------
; System formulas for page names used in signature placement
;-----------------------------------------
[System: Formula]
 cwDSLastPage : "Last Page"
 cwDSfirstPage: "First Page"
 cwDSAllPages:"All Pages"

;-----------------------------------------
; Line: cwActiontitle
; Field for action title with border
;-----------------------------------------
[line : cwActiontitle]
 field : fsnf
 Local: Field: fsnf: info: "Action to take:"              ; Label for action selection
 Local: Field: fsnf: Border: thin bottom                   ; Bottom border

;-----------------------------------------
; Line: cwaction
; Fields for print and email options with storage bindings
;-----------------------------------------
[line : cwaction]
 field : fsp,flogical,fsp2,flogical2
 Local: Field: fsp: info: "Print:"                         ; Label for print option
 Local: Field: fsp2: info: "E-Mail to Party:"              ; Label for email option
 Local: Field: flogical: storage: cwPrint                   ; Storage for print flag
 Local: Field: flogical2: storage: cwEmail                   ; Storage for email flag

;-----------------------------------------
; Line: cwaction2
; Fields for moving to folder with logical and text storage
;-----------------------------------------
[line : cwaction2]
 field : fsp,flogical,fsp2,fsnf
 Local: Field: fsp: info: "Move to:"                       ; Label for move action
 Local: Field: fsp2: info: "Folder:"                       ; Label for folder name
 Local: Field: flogical: storage: cwMovetoFolder            ; Flag to move to folder
 Local: Field: fsnf: storage: cwMovePath                     ; Folder path storage
 Local: Field: fsnf: Skip: not #flogical                     ; Skip if move flag not set

;-----------------------------------------
; Line: cwesignAction
; Field for invoice dimension label with border and width settings
;-----------------------------------------
[line:cwesignAction]
 field : fsnf
 Local: Field: fsnf: info: "Invoice Dimension (in inches) :" ; Label for invoice size
 Local: Field: fsnf: Border: thin bottom
 Local: Field: fsnf: width:0

;-----------------------------------------
; Line: cwesignAction2
; Fields for specifying height and width of document format
;-----------------------------------------
[line:cwesignAction2]
 space top : 0.5
 field : fsp,fnumf,fsp2,fnumf2
 Local: Field: fsp: info: "Height"                         ; Label for height
 Local: Field: fsp2: info: "Width"                          ; Label for width
 Local: Field: fnumf: storage: cwdocformatlheightnum        ; Height storage
 Local: Field: fnumf2: storage: cwdocformatlwidthnumf       ; Width storage

 Local: Field: fnumf: align:left                            ; Left align height field
 Local: Field: fnumf2: align:left                           ; Left align width field

`;
export default tdl;
