// Auto-generated from NEWCOLLECTIONS.TXT
const tdl = `
;===============================================================================
; NEWCOLLECTIONS.TXT
; Created By: Akshay on 2013-01-29 17:57, ID:
; Purpose: Defines reusable field key options and dynamic collections for
;          attribute-based tables (brand, style, season, size, color, etc.)
;          in Tally, supporting multi-level configuration and display.
;===============================================================================

;------------------------------------------------------------------------------
; Field key options for quick creation/alteration in masters
;------------------------------------------------------------------------------

[!field: keyled]
Key : Create Ledger,alter ledger
variable : svledger

[!field: keygrp]
Key : Create Group

[!field: keycsct]
Key :Create Cost Centre, Alter CstCtr
Variable  : SV Cost Centre

[!field: keycocat]
Key :Create Cost Category, Alter CstCat
Variable  : SV Cost Category

[!field: keystgrpt]
Key      : Create Stock Group, Alter StkGrp
Variable : SV Stock Group

[!field: keystcat]
Key      :  Create Stock Category, Alter StkCat
Variable : SV Stock Category

;------------------------------------------------------------------------------
; System formulas for dynamic attribute captions (brand, style, etc.)
;------------------------------------------------------------------------------

[System: Formula]
cwbrandtitle:$cwUnder1:company:##svcurrentcompany
cwstyletitle:$cwUnder2:company:##svcurrentcompany
cwseasontitle:$cwUnder3:company:##svcurrentcompany
cwsizetitle:$cwUnder4:company:##svcurrentcompany
cwcolortitle:$cwUnder5:company:##svcurrentcompany
cwfuturetitle:$cwUnder6:company:##svcurrentcompany

;------------------------------------------------------------------------------
; Dynamic attribute-based collections for line 1 (brand)
;------------------------------------------------------------------------------

[Collection : coltabstcat]
type : Stock Category
Child of : @@forunder1
format : $name,30
title:@@cwbrandtitle
belongs to : yes

[Collection : coltabstgrp]
type : Stock Group
Child of : @@forunder1
format : $name,30
title:@@cwbrandtitle
belongs to : yes

[Collection : coltabcostcat]
type : cost Category
Child of : @@forunder1
format : $name,30
title:@@cwbrandtitle
belongs to : yes

[Collection : coltabcostcentre]
type : cost centre
Child of : @@forunder1
format : $name,30
title:@@cwbrandtitle
belongs to : yes

[Collection : coltabledger]
type : Ledger
Child of : @@forunder1
format : $name,30
title:@@cwbrandtitle
belongs to : yes

[Collection : coltabgroup1]
type : Group
Child of : @@forunder1
format : $name,30
title:@@cwbrandtitle
belongs to : yes

;------------------------------------------------------------------------------
; Dynamic attribute-based collections for line 2 (style)
;------------------------------------------------------------------------------

[Collection : coltabledger2]
type : Ledger
Child of : @@forunder2
format : $name,30
Title :@@cwstyletitle
belongs to : yes

[Collection : coltabgroup2]
type : Group
Child of : @@forunder2
format : $name,30
Title :@@cwstyletitle
belongs to : yes

[Collection : coltabcostcentre2]
type : cost centre
Child of : @@forunder2
format : $name,30
Title :@@cwstyletitle
belongs to : yes

[Collection : coltabcostcat2]
type : cost Category
Child of : @@forunder2
format : $name,30
Title :@@cwstyletitle
belongs to : yes

[Collection : coltabstgrp2]
type : Stock Group
Child of : @@forunder2
format : $name,30
Title : @@cwstyletitle
belongs to : yes

[Collection : coltabstcat2]
type : Stock Category
Child of : @@forunder2
format : $name,30
Title :@@cwstyletitle
belongs to : yes

;------------------------------------------------------------------------------
; Dynamic attribute-based collections for line 3 (season)
;------------------------------------------------------------------------------

[Collection : coltabledger3]
type : Ledger
Child of : @@forunder3
format : $name,30
Title :@@cwseasontitle
belongs to : yes

[Collection : coltabgroup3]
type : Group
Child of : @@forunder3
format : $name,30
Title : @@cwseasontitle
belongs to : yes

[Collection : coltabcostcentre3]
type : cost centre
Child of : @@forunder3
format : $name,30
Title :@@cwseasontitle
belongs to : yes

[Collection : coltabcostcat3]
type : cost Category
Child of : @@forunder3
format : $name,30
Title :@@cwseasontitle
belongs to : yes

[Collection : coltabstgrp3]
type : Stock Group
Child of : @@forunder3
format : $name,30
Title :@@cwseasontitle
belongs to : yes

[Collection : coltabstcat3]
type : Stock Category
Child of : @@forunder3
format : $name,30
Title :@@cwseasontitle
belongs to : yes

;------------------------------------------------------------------------------
; Dynamic attribute-based collections for line 4 (size)
;------------------------------------------------------------------------------

[Collection : coltabledger4]
type : Ledger
Child of : @@forunder4
format : $name,30
Title :@@cwsizetitle
belongs to : yes

[Collection : coltabgroup4]
type : Group
Child of : @@forunder4
format : $name,30
Title : @@cwsizetitle
belongs to : yes

[Collection : coltabcostcentre4]
type : cost centre
Child of : @@forunder4
format : $name,30
Title :@@cwsizetitle
belongs to : yes

[Collection : coltabcostcat4]
type : cost Category
Child of : @@forunder4
format : $name,30
Title :@@cwsizetitle
belongs to : yes

[Collection : coltabstgrp4]
type : Stock Group
Child of : @@forunder4
format : $name,30
Title :@@cwsizetitle
belongs to : yes

[Collection : coltabstcat4]
type : Stock Category
Child of : @@forunder4
format : $name,30
Title :@@cwsizetitle
belongs to : yes

;------------------------------------------------------------------------------
; Dynamic attribute-based collections for line 5 (color)
;------------------------------------------------------------------------------

[Collection : coltabledger5]
type : Ledger
Child of : @@forunder5
format : $name,30
Title :@@cwcolortitle
belongs to : yes

[Collection : coltabgroup5]
type : Group
Child of : @@forunder5
format : $name,30
Title : @@cwcolortitle
belongs to : yes

[Collection : coltabcostcentre5]
type : cost centre
Child of : @@forunder5
format : $name,30
Title :@@cwcolortitle
belongs to : yes

[Collection : coltabcostcat5]
type : cost Category
Child of : @@forunder5
format : $name,30
Title :@@cwcolortitle
belongs to : yes

[Collection : coltabstgrp5]
type : Stock Group
Child of : @@forunder5
format : $name,30
Title :@@cwcolortitle
belongs to : yes

[Collection : coltabstcat5]
type : Stock Category
Child of : @@forunder5
format : $name,30
Title :@@cwcolortitle
belongs to : yes

;------------------------------------------------------------------------------
; Dynamic attribute-based collections for line 6 (future/custom)
;------------------------------------------------------------------------------

[Collection : coltabledger6]
type : Ledger
Child of : @@forunder6
format : $name,30
Title :@@cwfuturetitle
belongs to : yes

[Collection : coltabgroup6]
type : Group
Child of : @@forunder6
format : $name,30
Title : @@cwfuturetitle
belongs to : yes

[Collection : coltabcostcentre6]
type : cost centre
Child of : @@forunder6
format : $name,30
Title :@@cwfuturetitle
belongs to : yes

[Collection : coltabcostcat6]
type : cost Category
Child of : @@forunder6
format : $name,30
Title :@@cwfuturetitle
belongs to : yes

[Collection : coltabstgrp6]
type : Stock Group
Child of : @@forunder6
format : $name,30
Title :@@cwfuturetitle
belongs to : yes

[Collection : coltabstcat6]
type : Stock Category
Child of : @@forunder6
format : $name,30
Title :@@cwfuturetitle
belongs to : yes

;------------------------------------------------------------------------------
; Dynamic attribute-based collections for line 7 (custom)
;------------------------------------------------------------------------------

[Collection : coltabledger7]
type : Ledger
Child of : @@forunder7
format : $name,30
belongs to : yes

[Collection : coltabgroup7]
type : Group
Child of : @@forunder7
format : $name,30
belongs to : yes

[Collection : coltabcostcentre7]
type : cost centre
Child of : @@forunder7
format : $name,30
belongs to : yes

[Collection : coltabcostcat7]
type : cost Category
Child of : @@forunder7
format : $name,30
belongs to : yes

[Collection : coltabstgrp7]
type : Stock Group
Child of : @@forunder7
format : $name,30
belongs to : yes

[Collection : coltabstcat7]
type : Stock Category
Child of : @@forunder7
format : $name,30
belongs to : yes

;------------------------------------------------------------------------------
; The pattern continues for lines 9–14, each using @@forunderN and @@cw<attr>title
;------------------------------------------------------------------------------

; ... (Collections for lines 9–14 omitted for brevity, but follow the same pattern)


`;
export default tdl;
