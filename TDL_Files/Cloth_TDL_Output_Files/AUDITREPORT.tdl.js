// Auto-generated from AUDITREPORT.TXT
const tdl = `
; Tally Report Configuration and Customization Script
; Created By: joy on 2021-03-27 12:35
; Modified By: suman on 2020-08-03 17:08

;================================================================================
; Menu Configuration for Gateway of Tally
;================================================================================

[#menu: Gateway of Tally]
;; Add option "vchregreportLock" under certain conditions for user "cwOwner"
;; Option visible only if username is "yes" and some flags are not set
add: Option: vchregreportLock  ;;:@@cwOwner  ;;$$myusername="yes"  ;;:not @@MYcwskipyesno2NEW;; : @@vchregreportDemoLock

; Define the menu "vchregreportLock" with items before quit option
[!menu: vchregreportLock]
    ; Add report display item before quit option, visible based on username and flags
    add: Item: before: @@locQuit: @@vchregreportReport: Display: Repvchregreport   ;;:$$myusername or $$myusername2 ;;and @@cwNormal3  ;;@@MYcwskipyesno2NEW
    ; Add a blank line before quit option
    add: Item: before: @@locQuit: Blank

;================================================================================
; System Formulas
;================================================================================

[System: formula]
; Report title formula
vchregreportReport: "Audit Report"
;; Example of a demo lock condition on machine date (commented out)
;; vchregreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;================================================================================
; Report Definition: Repvchregreport
;================================================================================

[Report: Repvchregreport]
    use: Dsp Template                ; Use standard display template
    Title: @@vchregreportReport     ; Title set from formula
    Printset: Report Title: @@vchregreportReport ; Print title same as report title
    Form: Frmvchregreport            ; Use form defined below
    Export: Yes                     ; Allow export of report
    set  : svfromdate : ##svcurrentdate  ; Initialize from date variable
    set  : svTodate : ##svcurrentdate    ; Initialize to date variable
    Local : Button : RelReports : Inactive : Yes ; Disable related reports button

    ; Declare variables used in the report
    variable: mydate, sdf1, sdf2, logi1
    set : mydate : ""               ; Initialize mydate variable (empty string)
    set : sdf1 : ""                 ; Initialize sdf1 variable (empty string)
    set : sdf2 : ""                 ; Initialize sdf2 variable (empty string)
    set : logi1 : yes              ; Logical flag set to yes

;================================================================================
; Form Definition: Frmvchregreport
;================================================================================

[Form: Frmvchregreport]
    use: DSP Template               ; Use display template
    Part: DspAccTitles, PrtTitle0vchregreport, Prtvchregreport ; Parts included in form
    Width: 100% Page               ; Full page width
    Height: 100% Page              ; Full page height
    ; Background: @@SV_STOCKSUMMARY ; (Commented out background setting)
    delete: page break             ; Remove default page breaks
    add: page break: vchregreportbotbrk, vchregreportbotOpbrk ; Add custom page breaks at bottom

    ; Bottom toolbar buttons included (various standard and custom buttons)
    Bottom Toolbar Buttons  : BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11, BottomToolBarBtn12
    ;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5, BottomToolBarBtn6, BottomToolBarBtn7, ; Buttons commented out
    ;; Button functions: 1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
    ;; Local button for report config modification (commented out)
    ;; {04.Oct.18 12:38} delete : button :ChangeDybkDate
    ;; {04.Oct.18 13:21} add : button :before : ChangePeriod : MachDate
    ;; {16.Jul.21 18:18} add : button :MachDate,cwBtnHideShow
    add : button :MachDate, cwHideBtn, cwShowBtn ; Add buttons for date modification and hide/show

    ; Local field print styles for company and report header fields
    local:Part:DSPCompanyName:local:line:DSPCompanyName: Local: Field: DSPCompanyName:PrintStyle:styleCalisto2
    local:Part:DSPCompanyAddress:local:line:DSPCompanyAddress: Local: Field: DSPCompanyAddress:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportName: Local: Field: DSPReportName:PrintStyle:style3n
    local:Part:DSPReportSubTitle:local:line:DSPReportSubTitle: Local: Field: DSPReportSubTitle:PrintStyle:style2n
    local:Part:DSPReportTitle:local:line:DSPReportPeriod:Local: Field: DSPReportPeriod:PrintStyle:style2n  ;; Local: Field: DSPReportPeriod:border:thin box  ;;PrintStyle:style2
    local:Part:DSPPageNo:local:line:DSPPageNo: Local: Field:DSPPageNo:PrintStyle:style2n

;================================================================================
; Parts for Page Breaks and Titles
;================================================================================

[part: vchregreportbotBrk]
    line: EXPINV PageBreak          ; Page break line with thin top border
    border: thin top

[part: vchregreportbotopbrk]
    use: dspacctitles              ; Use account titles part
    add: part: vchregreportTitlePart ; Add report title part

[part: vchregreportTitlePart]
    line: LnvchregreportTitle      ; Line for report title

;================================================================================
; Lines and Fields for Report Headers and Data
;================================================================================

[line: LnvchregreportCurrPeriod]
    field: fwf, fwf2               ; Two fields in this line
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: normal bold
    Local: Field: fwf2: Style: normal bold
    Local: Field: fwf2: Set As: @@dspDateStr ; Display date string
    invisible: $$inprintmode       ; Invisible in print mode

[part: PrtTitle0vchregreport]
    line : LnvchregreportCurrPeriod ; Part showing current period line

[Part: Prtvchregreport]
    Line: LnvchregreportTitle, Lnvchregreport ; Lines included for report data
    bottom Line: LnvchregreportTotals          ; Bottom line for totals
    repeat: Lnvchregreport: Colvchregreport   ; Repeat line for each voucher record
    scroll: Vertical                          ; Enable vertical scrolling
    Common Border: Yes                       ; Use common border
	
[Collection: Colvchregreport]

    ; Collection of vouchers with filters and fetches
    Use: Vouchers of Company
     delete: filter : daybookfilter
     Filter:myfilterenddate,myfilterenddate2,IsNonOptionalCancelledVchs,cwnewemptyfilter;;,cwalterfilter
     add:filter:cwhideFilter
   fetch:cwusernamenew,cwusernamenew2
   compute : lastchangedate : $$cwgetvalue:$cwusername ;new

;================================================================================
; System Formulas for Filters and Variables
;================================================================================

[system: Formula]
; Filter to hide lines based on logical flag and selection
cwhideFilter: if ##logi1 then not $cwSelectedLine else Yes

; Get last change date for user
lastdt: $$cwgetvalue:$cwusernamenew

; Filter vouchers based on last date and emptiness checks
ColvchregreportFilter: not $$isempty:@@lastdt ;; if $$isempty:##mydate then yes else $lastchangedate = ##mydate

; Filter vouchers by start date
myfilterenddate: if $$issysname:##sdf1 then yes else $$cwgetvalue:$cwusernamenew >= ##sdf1

; Filter vouchers by end date
myfilterenddate2: if $$issysname:##sdf2 then yes else $$cwgetvalue:$cwusernamenew <= ##sdf2

; Filter for empty new entries
cwnewemptyfilter: if not $$isempty:##sdf1 then not $$isempty:($$cwgetvalue:$cwusernamenew) else yes

; Secondary filter for vouchers based on date and voucher status
cwvchsecfilter2: if $$isempty:##mydate then yes else if $$isvoucher then $lastchangedate = ##mydate else yes

; Filter for alternate entries based on username
cwalterfilter: not $$isempty:$cwusernamenew

;================================================================================
; Line Definition: LnvchregreportTitle (Report Header Line)
;================================================================================

[Line: LnvchregreportTitle]
    use: Lnvchregreport             ; Base line format
    option: titleopt                ; Option for title display

    ; Set field captions for report header
    local:field: sdf: set as: "Date"
    local:field: fwf: set as: "Particulars"
    local:field: nf: set as: "Vch Type"
    local:field: nf2: set as: "Vch No."
    Local: Field: amtf2: Set As: "Actual Value"
    Local: Field: snf2: Set As: "Create By"
    Local: Field: snf3: Set As: "Create Date"
    local:field: amtf: set as: "Last Alter Value"
    local:field: fwf2: set as: "Audit Trail"
    local:field: nf4: set as: "Last Alter By"
    local:field: snf: set as: "Alter Count"
    local:field: nf5: set as: "Last Time"
    local:field: nf3: set as: "Alter On"

    Local: field: default: Lines : 0 ; Default line count

    ; Set styles for header fields
    local: field: SDF : style: styleCalisto2
    local: field: fwf : style: styleCalisto2
    local: field: nf : style: styleCalisto2
    local: field: nf2 : style: styleCalisto2
    local: field: amtf2 : style: styleCalisto2
    local: field: snf : style: styleCalisto2
    local: field: snf1 : style: styleCalisto2
    local: field: snf2 : style: styleCalisto2
    local: field: snf3 : style: styleCalisto2
    local: field: amtf : style: styleCalisto2
    local: field: nf3 : style: styleCalisto2
    local: field: nf4 : style: styleCalisto2
    local: field: nf5 : style: styleCalisto2
    local: field: fwf2 : style: styleCalisto2

    ; Set alignment for fields
    Local: field: default: Align: centre
    Local: field: fwf: Align: left
    Local: field: fwf2: Align: left
    Local: field: fwf5: Align: left

;================================================================================
; System Formula: List of User Alter Logs
;================================================================================

[System: Formula]
cwUserAlterLog: $$fulllist:cwusername:$cwusername

;================================================================================
; Line Definition: Lnvchregreport (Report Data Line)
;================================================================================

[Line: Lnvchregreport]
    Fields: sdf, fwf                 ; Left side fields: date and particulars
    right field: nf, nf2, amtf2, snf2, snf3, nf4, nf3, nf5, amtf, snf, fwf2, fwf3 ; Right side fields

    Option: Alter on Enter           ; Allow alteration on enter key

    ; Formatting for quantity field
    local:field: qtyf : Format : "NoSymbol, Short Form, No Compact, NoZero"

    ; Calculate rate per piece field
    local:field: ratepf : setas  : #amtf / #qtyf

    ; Allow alteration of voucher field if it is a voucher
    local: field: fwf: alter : voucher : $$isvoucher

    ; Set field values from voucher data
    local:field: sdf: set as: $date
    local:field: fwf: set as: $partyledgername
    local:field: nf: set as: $vouchertypename
    local:field: nf2: set as: $vouchernumber

    ; Set amount field if last alter by field is not empty
    local:field: amtf: set as: if not $$isempty:#nf4 then $amount else ""

    ; Set user fields
    local:field: fwf2: set as: $cwusername
    local:field: fwf3: set as: $cwusernamenew2

    Local: Field: fwf2: Lines : 0

    ; Set alteration and creation date/time fields
    Local: Field: nf3: Set As: $lastchangedate
    Local: Field: sdf5: Set As: $lastchangedate
    Local: Field: amtf2: Set As: $cworiginalamt

    ; List of all usernames for alteration
    Local: Field: fwf5: Set As: if not $$increatemode then $$fulllist:cwusername:$cwusername else ""

    ; Set last alter by field based on conditions
    local:field: nf4: set as: if #snf = "0" then "" else $$cwgetvaluelastby:@@cwUserAlterLog

    ; Set alteration count field
    local:field: snf: set as: if not $$isempty:#nf4 then $$RoundDown:($$cwgetvaluelastcount:@@cwUserAlterLog):1 else "0"

    ; Set last alter time field
    local:field: nf5: set as: $$cwgetvaluelasttime:#fwf2

    ; Set create by and create date fields
    Local: Field: snf2: Set As: $cwCreatebyms
    Local: Field: snf3: Set As: $$string:$cwCreatedatems + " , " + $$string:$cwCreattimems

    ; Set width for date/time fields
    Local: field: nf3: Width: 14
    Local: field: nf5: Width: 14

    Local: Field: sdf2: Set As: $lastchangedate

    ; Set borders for default field
    Local: Field: default: Border: thin left
    Border: thin bottom

    ; Hide some fields in certain modes
    local: field: fwf3: Invisible: yes

    ; Set width and style for fields
    Local: field: snf3: Width: 18
    Local: Field: default: Style: styleCalisto

    ;; {13.Jul.21 16:20} invisible:IF ($$NumItems:ReportSelectedLines > 0) then yes else no
    ;; {13.Jul.21 16:23} local: field: nf4: Invisible: ##logi1

;================================================================================
; System Formulas for Date and Time Extraction Functions
;================================================================================

[System: Formula]
; Extract fast create time date part from string
cwcreatetime: $$cwgetfastdate:#fwf3
; Extract fast create time time part from string
cwcreatetime2: $$cwgetfasttime:#fwf3

;================================================================================
; Function: cwgetvalue (Extract last token from comma-separated string)
[function : cwgetvalue]
parameter : str : string
variable : mystr : string
variable : ctr : number : 0
variable : tempstr : string

10  : for token : tokenvar:##str: ","          ; Loop through tokens separated by comma
20 : log: ##tokenvar                           ; Log token (for debugging)
21a: incr : ctr                               ; Increment token count
21 : set : mystr : ##tokenvar                  ; Set current token
30 : end for

40 : set : tempstr : $$stringwordex:##str:",":(##ctr-1) ; Get second last token

;; {04.Oct.18 12:22} 50 : set : mystr : $$date:##tempstr

;; {04.Oct.18 12:22} 51 : return : ##mystr

41 : if : $$date:##tempstr <> 0
42 : return : $$date:##tempstr                  ; Return date if valid
43 : end if

45 : return :##tempstr                          ; Otherwise return token string

;================================================================================
; Function: cwgetcreateby (Extract first token from comma-separated string)
[function : cwgetcreateby]
parameter : str : string
variable : mystr : string
variable : ctr : number : 0
variable : tempstr : string

10  : for token : tokenvar:##str: ","
20 : log: ##tokenvar
21a: incr : ctr
21 : set : mystr : ##tokenvar
30 : end for

40 : set : tempstr : $$stringwordex:##str:",":1  ; Get first token

;; {04.Oct.18 12:22} 50 : set : mystr : $$date:##tempstr

;; {04.Oct.18 12:22} 51 : return : ##mystr

45 : return :##tempstr

;================================================================================
; Function: cwgetvaluelastby (Extract second last token from comma-separated string)
[function : cwgetvaluelastby]
parameter : str : string
variable : mystr : string
variable : ctr : number : 0
variable : tempstr : string

10  : for token : tokenvar:##str: ","
;; {30.Mar.21 15:17} 20 : log: ##tokenvar
21a: incr : ctr
21 : set : mystr : ##tokenvar
30 : end for

40 : set : tempstr :$$stringwordex:##str:",":(##ctr-2) ; Get second last token
41 : log: ##tempstr
;; {04.Oct.18 12:22} 50 : set : mystr : $$date:##tempstr

;; {04.Oct.18 12:22} 51 : return : ##mystr

45 : return :##tempstr

;================================================================================
; Function: cwgetvaluelasttime (Extract last token from comma-separated string)
[function : cwgetvaluelasttime]
parameter : str : string
variable : mystr : string
variable : ctr : number : 0
variable : tempstr : string

10  : for token : tokenvar:##str: ","
20 : log: ##tokenvar
21a: incr : ctr
21 : set : mystr : ##tokenvar
30 : end for

40 : set : tempstr : $$stringwordex:##str:",":##ctr ; Get last token

;; {04.Oct.18 12:22} 50 : set : mystr : $$date:##tempstr

;; {04.Oct.18 12:22} 51 : return : ##mystr

45 : return :##tempstr

;================================================================================
; Function: cwgetvaluelastcount (Count tokens and divide by 4)
[function : cwgetvaluelastcount]
parameter : str : string
variable : mystr : string
variable : ctr : number : 0
variable : tempstr : string

10  : for token : tokenvar:##str: ","
20 : log: ##tokenvar
21a: incr : ctr
21 : set : mystr : ##tokenvar
30 : end for

45 : return :##ctr / 4

;================================================================================
; Function: cwgetfastdate (Extract second token as date from comma-separated string)
[function : cwgetfastdate]
parameter : str : string
variable : mystr : string
variable : ctr : number : 0
variable : tempstr : string

10  : for token : tokenvar:##str: ","
20 : log: ##tokenvar
21a: incr : ctr
21 : set : mystr : ##tokenvar
30 : end for

40 : set : tempstr : $$stringwordex:##str:",":2  ; Get second token

;; {04.Oct.18 12:22} 50 : set : mystr : $$date:##tempstr

;; {04.Oct.18 12:22} 51 : return : ##mystr

41 : if : $$date:##tempstr <> 0
42 : return : $$date:##tempstr
43 : end if

45 : return :##tempstr

;================================================================================
; Function: cwgetfasttime (Extract third token as time from comma-separated string)
[function : cwgetfasttime]
parameter : str : string
variable : mystr : string
variable : ctr : number : 0
variable : tempstr : string

10  : for token : tokenvar:##str: ","
20 : log: ##tokenvar
21a: incr : ctr
21 : set : mystr : ##tokenvar
30 : end for

40 : set : tempstr : $$stringwordex:##str:",":3 ; Get third token

;; {04.Oct.18 12:22} 50 : set : mystr : $$date:##tempstr

;; {04.Oct.18 12:22} 51 : return : ##mystr

45 : return :##tempstr

;================================================================================
; Line Definition: LnvchregreportTotals (Totals line for report)
;================================================================================

[line: LnvchregreportTotals]
    use: Lnvchregreport               ; Use base line format
    option: totalOpt                  ; Option for totals display

    ; Align total label to right and style bold
    local: field: fwf: align: right
    local: field: default : style: normal bold

    ; Set total quantities and amounts
    local: field: qtyf: set as: $$total:qtyf
    local: field: fwf: set as: "Total"
    Local: Field: snf: Set As: ""
    local: field: amtf : set as : $$total:amtf

    ; Apply consistent styles for all fields
    local: field: SDF : style: styleCalisto2
    local: field: fwf : style: styleCalisto2
    local: field: nf : style: styleCalisto2
    local: field: nf2 : style: styleCalisto2
    local: field: amtf2 : style: styleCalisto2
    local: field: snf : style: styleCalisto2
    local: field: snf1 : style: styleCalisto2
    local: field: snf2 : style: styleCalisto2
    local: field: snf3 : style: styleCalisto2
    local: field: amtf : style: styleCalisto2
    local: field: nf3 : style: styleCalisto2
    local: field: nf4 : style: styleCalisto2
    local: field: nf5 : style: styleCalisto2
    local: field: fwf : style: styleCalisto2

;================================================================================
; Button Definition: MachDate (Button to modify date variable)
;================================================================================

[button : MachDate]
    title : "Modified On"            ; Button title
    key : f7                        ; Shortcut key F7
    Action : Modify Variables : mydate ; Action to modify variable mydate

;================================================================================
; Variable Definition: mydate (Date variable for filtering)
;================================================================================

[variable : mydate]
    type : date                    ; Variable type is date
    volatile : yes                 ; Value not persisted
    persistent : no                ; Not saved between sessions

[system : variable]
    mydate: ""                    ; Initialize mydate as empty string

;================================================================================
; Report for modifying variable mydate
;================================================================================

[report : mydate]
    use : modifyvariables          ; Use modify variables template
    Title : $$LocaleString:"View for Date"
    Local : Part : Modify Variables : Lines : mydate
    Local : Field: MV Title : Info : $$LocaleString:"Change Date"
    Local : Field: Medium Prompt : Invisible : Yes
    Title : $$LocaleString:"View for Change Date"

[Line: mydate]
    Field : Medium Prompt, sp, mydate, sp2, mydate2 ; Fields for date range input
    Local : Field: Medium Prompt : Info : $$LocaleString:"Change Date:"
    Local: Field: sp: Set As: "From:"
    Local: Field: sp2: Set As: "To:"
    Local: field: sp: Width: 6
    Local: field: sp2: Width: 6

    ;; {04.Oct.18 15:08}  local:field:sdf2:modifies:sdf1
    ;; {04.Oct.18 15:08}  local:field:sdf3:modifies:sdf2

[Field: mydate]
    Use : Short Date Field          ; Use short date input field
    ;; {04.Oct.18 14:39}  Set as : ##mydate - 1
    Modifies : sdf1                 ; Modifies sdf1 on change

[Field: mydate2]
    Use : Short Date Field          ; Use short date input field
    ;; {04.Oct.18 14:39}  Set as : ##mydate - 1
    Modifies : sdf2                 ; Modifies sdf2 on change

;================================================================================
; Button Definition: cwBtnHideShow (Button to hide/show UI elements)
;================================================================================

[Button : cwBtnHideShow]
    add: option: cwBtnHideShowopt: @@cwOwnerLevel ; Add option based on owner level

[!Button:cwBtnHideShowopt]
    KEY : Alt+ H                   ; Shortcut Alt + H
    ;; {16.Jul.21 19:43} TITLE : if not ##logi1 then "Show" else "Hide "
    TITLE : "Hide "               ; Button title is "Hide"
    ;; {16.Jul.21 17:18}

`;
export default tdl;
