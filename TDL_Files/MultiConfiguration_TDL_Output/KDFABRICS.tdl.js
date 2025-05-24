// Auto-generated from KDFABRICS.TXT
const tdl = `
;===============================================================================
; KDFABRICS.TXT
; Created By: pg on 2012-01-27 20:39
; Purpose: Customizes POS forms for KD Fabrics by hiding company and tax details
;          and adjusting layout for print or display.
;===============================================================================

[include: c:\d7comps\tcommon\nopos.txt]

;------------------------------------------------------------------------------
; ADD KDF OPTION TO POS FORMS
;------------------------------------------------------------------------------

[#Form: POS Quick Mode]
    option : kdf

[#Form: POS InPixel]
    option : kdf

[!form: kdf]
    space top : 4.5 cm
    local: part : POS CompanyDetails : invisible : yes
    local: part : POS CmpTaxNumber : invisible : yes

`;
export default tdl;
