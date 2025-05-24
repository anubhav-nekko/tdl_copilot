module.exports = {
  TDL: `
;; =============================================================================
;;  KHAM PRINT CONFIGURATION 
;;  Author : Khokan  Created : 2021-08-26 12:54
;; =============================================================================

;; Top-level trigger line displayed in any parent form
[Line: cwinvprintingline2newKham]
    Field: long prompt, cwlogical
    Local: Field: long prompt: Info: "Printing Configuration (Kham)"
    Local: Field: long prompt: Width: 32.5
    Local: Field: cwlogical: SubForm: PrintingConfrep2Kham: $$value
    Local: Field: long prompt: Color: Blue
    Local: Field: cwlogical: Color: Blue
    Local: Field: long prompt: Style: Normal Bold
    Local: Field: cwlogical: Style: Normal Bold

;; SUB-REPORT that pops up when user toggles the logical field
[Report: PrintingConfrep2Kham]
    Form: PrintingConfform2Kham

;; POP-UP FORM
[Form: PrintingConfform2Kham]
    Part: PrintingConfpart2Kham
    Width: 20
    Height: 50

;; FORM PART – lists all margin / space settings
[Part: PrintingConfpart2Kham]
    Line: cwinvprintingline2xKham, heightnewlineKham, widthnewlineKham, topnewlineKham

;; Heading inside the pop-up
[Line: cwinvprintingline2xKham]
    Field: fwfc
    Local: Field: fwfc: Info: "Printing Configuration"
    Local: Field: fwfc: Border: Thin Bottom
    Local: Field: fwfc: Width: 20
    Local: Field: fwfc: Style: Normal Bold

;; PAGE HEIGHT
[Line: heightnewlineKham]
    Field: sp, spaceHeightnewKham
    Local: Field: sp: Set As: "Space Height (Inches)"
    Local: Field: sp: Width: 24
    Space Top: 0.5

[Field: spaceHeightnewKham]
    Use: Number Field
    Modifies: spaceHeightnewKham
    Set As: ##spaceHeightnewKham

[Variable: spaceHeightnewKham]
    Persistent: Yes
    Type: Number

;; PAGE WIDTH
[Line: widthnewlineKham]
    Field: sp, spacewidthnewKham
    Local: Field: sp: Set As: "Space Width (Inches)"
    Local: Field: sp: Width: 24
    Space Top: 0.5

[Field: spacewidthnewKham]
    Use: Number Field
    Modifies: spacewidthnew
    Set As: ##spacewidthnew

[Variable: spacewidthnewKham]
    Persistent: Yes
    Type: Number

;; LEFT MARGIN (reserved for future use)
[Line: LeftnewlineKham]
    Field: sp, spaceLeftnewKham
    Local: Field: sp: Set As: "Space Left (Inches)"
    Local: Field: sp: Width: 24
    Space Top: 0.5

[Field: spaceLeftnewKham]
    Use: Number Field
    Modifies: spaceLeftnewKham
    Set As: ##spaceLeftnewKham

[Variable: spaceLeftnewKham]
    Persistent: Yes
    Type: Number

;; RIGHT MARGIN (reserved for future use)
[Line: RightnewlineKham]
    Field: sp, spaceRightnewKham
    Local: Field: sp: Set As: "Space Right (Inches)"
    Local: Field: sp: Width: 24
    Space Top: 0.5

[Field: spaceRightnewKham]
    Use: Number Field
    Modifies: spaceRightnewKham
    Set As: ##spaceRightnewKham

[Variable: spaceRightnewKham]
    Persistent: Yes
    Type: Number

;; TOP MARGIN
[Line: topnewlineKham]
    Field: sp, spacetopnewKham
    Local: Field: sp: Set As: "Space Top (Inches)"
    Local: Field: sp: Width: 24
    Space Top: 0.5

[Field: spacetopnewKham]
    Use: Number Field
    Modifies: spacetopnewKham
    Set As: ##spacetopnewKham

[Variable: spacetopnewKham]
    Persistent: Yes
    Type: Number

;; SYSTEM DEFAULTS
[System: Variables]
    spaceHeightnewKham: 12.50
    spacewidthnewKham: 8.10
    spaceLeftnewKham: 0.50
    spaceRightnewKham: 0.50
    spacetopnewKham: 3
  `
}
