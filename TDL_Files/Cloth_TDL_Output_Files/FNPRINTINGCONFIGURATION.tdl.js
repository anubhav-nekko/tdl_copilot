// printing-config.tdl.js
// Author: Converted from TDL text by ChatGPT
// Description: Loads Printing Configuration Sub-Form TDL into TallyPrime

const fs = require('fs');

const tdlCode = `
; =============================================================================
;  PRINTING CONFIGURATION SUB-FORM (F/N toggle)
;  ---------------------------------------------------------------------------
;  Original Code  : Khokan • 2021-06-21 12:09
; =============================================================================

; ================== TRIGGER LINE IN PARENT REPORT ============================
;  Adds a Boolean “Printing Configuration (F/N)” switch that opens this sub-form
; -----------------------------------------------------------------------------
[line:cwinvprintingline2new]
 field:long prompt,cwlogical

 Local: Field: long prompt: info:"Printing Configuration (F/N)"
 Local: field: long prompt : Width:32.5
 Local: Field : cwlogical : SubForm :PrintingConfrep2: $$value   ; open pop-up
 Local: Field: long prompt: Color : blue
 Local: Field: cwlogical: Color : blue
 Local: Field: long prompt: Style: Normal Bold
 Local: Field: cwlogical: Style: Normal Bold

; ======================== SUB-REPORT DEFINITIONS =============================
[report:PrintingConfrep2]
 form:PrintingConfform2

[form:PrintingConfform2]
 part : PrintingConfpart2
 width:20
 height:50

; ----------------------------- MAIN PART -------------------------------------
[part:PrintingConfpart2]
 line:cwinvprintingline2x, heightnewline,widthnewline,Leftnewline,Rightnewline,topnewline

; ----------------------------- TITLE LINE ------------------------------------
[line:cwinvprintingline2x]
 field:fwfc
 Local: Field: fwfc: info:"Printing Configuration"
 Local: Field: fwfc: Border: thin bottom
 Local: field: fwfc: Width:20
 Local: Field: fwfc: Style: Normal Bold

; ========================= ACTIVE INPUT LINES ================================
[line:heightnewline]
 field:sp,spaceHeightnew
 Local: Field: sp: Set As:"Sapce Height (Inches)"
 Local: field: sp: Width:24
 SPACE TOP:0.5

[Field:spaceHeightnew]
 Use      : Number Field
 Modifies : spaceHeightnew

[Variable: spaceHeightnew]
 Persistent: Yes
 Type      : Number

[line:widthnewline]
 field:sp,spacewidthnew
 Local: Field: sp: Set As:"Sapce Width (Inches)"
 Local: field: sp: Width:24
 SPACE TOP:0.5

[Field:spacewidthnew]
 Use      : Number Field
 Modifies : spacewidthnew

[Variable : spacewidthnew]
 Persistent: Yes
 Type      : Number

[line:Leftnewline]
 field:sp,spaceLeftnew
 Local: Field: sp: Set As:"Sapce Left (Inches)"
 Local: field: sp: Width:24
 SPACE TOP:0.5

[Field:spaceLeftnew]
 Use      : Number Field
 Modifies : spaceLeftnew

[Variable : spaceLeftnew]
 Persistent: Yes
 Type      : Number

[line:Rightnewline]
 field:sp,spaceRightnew
 Local: Field: sp: Set As:"Sapce Right (Inches)"
 Local: field: sp: Width:24
 SPACE TOP:0.5

[Field:spaceRightnew]
 Use      : Number Field
 Modifies : spaceRightnew

[Variable: spaceRightnew]
 Persistent: Yes
 Type      : Number

[line:topnewline]
 field:sp,spacetopnew
 Local: Field: sp: Set As:"Sapce Top (Inches)"
 Local: field: sp: Width:24
 SPACE TOP:0.5

[Field:spacetopnew]
 Use      : Number Field
 Modifies : spacetopnew

[Variable : spacetopnew]
 Persistent: Yes
 Type      : Number

; ================== DEFAULT VALUES FOR VARIABLES =============================
[System: Variables]
spaceHeightnew : 10
spacewidthnew  : 8.10
spaceLeftnew   : 0.50
spaceRightnew  : 0.50
spacetopnew    : 0.50
`;

function exportTDL() {
  fs.writeFileSync('printing-config-exported.tdl', tdlCode);
  console.log('TDL Code written to printing-config-exported.tdl');
}

module.exports = {
  exportTDL
};
