// Auto-generated from cwDSCompanyConfig.txt
const tdl = `
; Created By: suman on 2021-07-29 14:17
; Created By: Pg on 2018-08-17 12:00

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Form Definition Switches based on Tally Release Version
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
[#Form: Company Operations]
;; Conditional loading of form elements depending on Tally release version
;; For versions < 3.2
Switch : cwDSLowerRel  : cwDSNotFor3.2  : ($$Number:$$ProdInfo:ProdReleaseAsStr) < 3.2
;; For versions >= 3.2
Switch : cwDSCurrenRel : cwDSFor3.2     : ($$Number:$$ProdInfo:ProdReleaseAsStr) >= 3.2

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Form Definitions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Form for Tally versions NOT compatible with 3.2
[!Form : cwDSNOTFor3.2]
Local: Part : CMP AccFeat Left : Add : Line : At End : cwDSConfig;;,cwdocformatline

;; Form for Tally versions compatible with 3.2
[!Form : cwDSFor3.2]
Local : Part : CMP TallyShopFeatures Left : Add : Line : At End : cwDSConfig;;,cwdocformatline
local : Line : cwTestConfig : local : field : short name field : tool tip: "Double-Click for browsing to CircuitWorld.in"

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Line Definitions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[Line : cwDSConfig]
Field : cwdsConfigPathTitle,cwdsConfigPath
;; Email contact shown on the field
Local: Field: short name field : info: "sales@circuitworld.in"
Local: Field: short name field: case : normal
Local: Field: short name field: Color : blue
Local: Field: short name field: width : 0
key  : cwcwDSBrowse
Local: field: cwdsConfigPathTitle: Width:35
Local: field: cwdsConfigPath: full Width:yes
space top:.5
;; Optional field inactive setting (commented)
;;local: field: default: inactive:$cwBajajFinanceEnabled="no"
local: field: default: inactive:$cwSepratepatnerid

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Field Definitions for Config Path
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[field : cwdsConfigPathTitle]
use : short prompt
info: "Path for Saving PDF [for Upload to BFL]:"
width : 0

[field : cwdsConfigPath]
use : name field
;; Field is inactive if $cwDSEnabled is false
;;inactive: not $cwDSEnabled
storage : cwDSConfigPath
Style: Normal

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Browse Action Key Definition
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[key : cwcwDSBrowse]
key : left double click
action: browse : "www.circuitworld.in"

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Fields to Enable Document e-Signing
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[Field: cwDSConfigTitle]
Use : medium prompt
info: "Enable Document e-Signing?"
width : 0

[Field: cwDSConfig]
Use : logical field
Set As: $cwDSEnabled
storage: cwDSEnabled

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Formula Definitions for Company-level Field Access
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[System: Formula]
cwDSEnabled     : $cwDSEnabled:COMPANY:##SVCURRENTCOMPANY
cwDSConfigPath  : $cwDSConfigPath:COMPANY:##SVCURRENTCOMPANY

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Line for Document Formatting Fields
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[line:cwdocformatline]
field:cwdocformatstrfd,cwdocformatstrfd2

[Field: cwdocformatstrfd]
Use : medium prompt
info: "Format Document e-Signing?"
width : 0
inactive:not $cwDSEnabled

[Field: cwdocformatstrfd2]
Use: logical field
inactive:not $cwDSEnabled
storage: cwdocformatstr
SubForm : cwdocformatlrep : $$value

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Subform for Document Format Configuration
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[report:cwdocformatlrep]
form:cwdocformatlfrom

[form:cwdocformatlfrom]
part:cwdocformatlpart
width:25% page

[part:cwdocformatlpart]
line:cwdocformatlheightline,cwdocformatlwidthline

[line:cwdocformatlwidthline]
field:cwdocformatlwidthfld,cwdocformatlwidthfld2

[Field: cwdocformatlwidthfld]
Use : short prompt
info: "Width"
width : 0

[Field: cwdocformatlwidthfld2]
Use: number field
storage: cwdocformatlwidthnumf

[line:cwdocformatlheightline]
field:cwdocformatlheightfld,cwdocformatlheightfld2
space bottom:0.5

[Field: cwdocformatlheightfld]
Use : short prompt
info: "Height"
width : 0

[Field: cwdocformatlheightfld2]
Use: number field
storage: cwdocformatlheightnum

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Formula Definitions for Document Format Dimensions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[System: Formula]
cwdocformatlwidthnumfform  : $cwdocformatlwidthnumf:vouchertype:$vouchertypename
cwdocformatlheightnumform : $cwdocformatlheightnum:vouchertype:$vouchertypename

`;
export default tdl;
