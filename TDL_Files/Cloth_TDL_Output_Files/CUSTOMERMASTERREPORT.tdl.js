// Auto-generated from CUSTOMERMASTERREPORT.TXT
const tdl = `
;; =============================================================================
;; Customer Master Report for Tally ERP
;; Created By: Khokan on 2022-02-26 15:38, ID:
;; Purpose: Generates a detailed customer master report with filtering capabilities
;; =============================================================================

;; Define text styles for report formatting
[style:style1n]
 font:"Times New Roman"
 bold:yes
 height:9

[style:style2nx]
 font:"Times New Roman"
 bold:no
 height:9

;; =============================================================================
;; MENU CONFIGURATION
;; Add report options to Tally menu system
;; =============================================================================
     [#menu: Gateway of Tally]
       ;; add: Option: CustomerMasterreportLock ;; : @@CustomerMasterreportDemoLock

     ;; Add report to debug menu
     [#menu : cw_Debug_menu]
        add: Item: before: @@locQuit: @@CustomerMasterreportReport: Display: RepCustomerMasterreport

     ;; Define menu structure for the report
     [!menu: CustomerMasterreportLock]
        add: Item: before: @@locQuit: @@CustomerMasterreportReport: Display collection : collRepCustomerMasterreport  ;;: RepCustomerMasterreport
        add: Item: before: @@locQuit: Blank

;; =============================================================================
;; SYSTEM FORMULAS
;; Define global variables and formulas
;; =============================================================================
    [System: formula]
   CustomerMasterreportReport: "Ledger Master"
;; CustomerMasterreportDemoLock: $$MachineDate < $$Date:"01/04/2013"

;; =============================================================================
;; COLLECTION DEFINITIONS
;; Define data collections used in the report
;; =============================================================================
[collection : collRepCustomerMasterreport]
 Use         : List of Groups  ;;Group
    ;;Collection  : Primary
    Variable    : Group Name
    Trigger     : GroupNamexms
	Fetch		: Name
Report: RepCustomerMasterreport

;; Group selection report for filtering by group
[Report: GroupNamexms]   ;;Auto Report
    Use     : Collection Variable
    Local   : Line : Collection Variable : Field : GroupNamexms
    Local   : Field: MV Title            : Info  : $$LocaleString:"Name of Group"

;; Field definition for group selection
[Field: GroupNamexms]
    Use         : Name Field
    Key         : Create group
    Modifies    : Group Name
    Table       :collledgrx  ;; List of ExtractLedgers
    Show Table  : Always
    CommonTable : No

;; Collection of groups for selection
[Collection: collledgrx]
   type:Group
   TITLE:"List of Group Name"
   add:filter:mycwGroup

;; Filter formula to show only Sundry Debtors and Sundry Creditors groups
[System: Formula]
   mycwGroup:$$isbelongsto:$$groupsundrydebtors or $$isbelongsto:$$groupsundrycreditors
;; {26.Feb.22 17:22}    mycwGroup:$$groupsundrydebtors or $$groupsundrycreditors

;; =============================================================================
;; MAIN REPORT DEFINITION
;; Configure the main customer master report
;; =============================================================================
[Report: RepCustomerMasterreport]
    use: Dsp Template
    Title: @@CustomerMasterreportReport
    Printset: Report Title: @@CustomerMasterreportReport
    Form: FrmCustomerMasterreport
    Export: Yes
    set  : svfromdate : ##svcurrentdate
    set  : svTodate : ##svcurrentdate
    Local: Button: RelReports: Inactive: Yes

    ;; Initialize filter variables
    variable:str1,str2,str3,str4,str5,str6,str7,str8,str9
    set:str1:""
    set:str2:""
    set:str3:""
    set:str4:""
    set:str5:""
    set:str6:""
    set:str7:""
    set:str8:""
    set:str9:""
     
;; =============================================================================
;; FORM DEFINITION
;; Define the layout and structure of the report form
;; =============================================================================
[Form: FrmCustomerMasterreport]
    use: DSP Template
    Part: DspAccTitles,PrtTitle0CustomerMasterreport,PrtCustomerMasterreport
    Width: 100% Page
    Height: 100% Page
    Background: @@SV_STOCKSUMMARY
    delete: page break
    add: page break: CustomerMasterreportbotbrk,CustomerMasterreportbotOpbrk
    Bottom Toolbar Buttons: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
    ;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
    ;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
    ;;    local : button : report config : action :modify variable: MyPLConfigure
    add:button:customerbotton

;; Page break part definition
[part: CustomerMasterreportbotBrk]
    line: EXPINV PageBreak
    border: thin top

;; Title part for page breaks
[part: CustomerMasterreportbotopbrk]
    use: dspacctitles
    add: part: CustomerMasterreportTitlePart

;; Title part definition
[part: CustomerMasterreportTitlePart]
    line: LnCustomerMasterreportTitle

;; Current period line showing group name and date
[line: LnCustomerMasterreportCurrPeriod]
    field: fwf,fwf2
    Local: field: fwf2: Align: Right
    Local: Field: fwf: Style: Style1n
    Local: Field: fwf2: Style: Style1n
    Local: Field: fwf: Set As: ##GroupName
    Local: Field: fwf2: Set As: @@dspDateStr
    Local: Field: fwf2:invisible: $$inprintmode

;; Title part for the report
[part: PrtTitle0CustomerMasterreport]
    line : LnCustomerMasterreportCurrPeriod

;; Main report part definition
[Part: PrtCustomerMasterreport]
    Line: LnCustomerMasterreportTitle,LnCustomerMasterreport
    bottom Line: LnCustomerMasterreportTotals
    repeat: LnCustomerMasterreport: ColCustomerMasterreport
    scroll:BOTH  ;; Vertical
    Common Border: YEs
    Total: Qtyf,amtf

;; =============================================================================
;; DATA COLLECTION FOR MAIN REPORT
;; Define the data source and filters for the report
;; =============================================================================
[Collection: ColCustomerMasterreport]
    type:LEDGER
    child of:##GroupName
    belongs to:yes
    filter:cwlednamefilter,cwTransportermsfilter,cwSalespersonfilter,CWASMfilter,CWAgentfilter,CWRSMfilter,CWledCityfilter,CWledZonefilter,cwLedStateNamefilter

;; =============================================================================
;; FILTER FORMULAS
;; Define formulas for filtering data in the report
;; =============================================================================
[System: Formula]
    ;; Customer name filter
    cwlednamefilter:if $$issysname:##str1 then yes else $name =##str1
    ;; Salesperson filter
    cwSalespersonfilter:if $$issysname:##str2 then yes else $cwcaption1item =##str2
    ;; ASM filter
    CWASMfilter:if $$issysname:##str3 then yes else $cwcaption2item =##str3
    ;; Agent filter
    CWAgentfilter:if $$issysname:##str4 then yes else $cwcaption3item =##str4
    ;; RSM filter
    CWRSMfilter:if $$issysname:##str5 then yes else $cwcaption4item =##str5
    ;; City filter
    CWledCityfilter:if $$issysname:##str6 then yes else $cwcaption5item =##str5
    ;; Zone filter
    CWledZonefilter:if $$issysname:##str7 then yes else $cwcaption6item =##str7
    ;; State filter
    cwLedStateNamefilter:if $$issysname:##str8 then yes else $LedStateName =##str8
    ;; Transporter filter
    cwTransportermsfilter:if $$issysname:##str9 then yes else $cwtempGSTewayTransporterName =##str9

;; =============================================================================
;; REPORT TITLE LINE
;; Define the column headers for the report
;; =============================================================================
[Line: LnCustomerMasterreportTitle]
    use: LnCustomerMasterreport
    option: titleopt
    ;;     local: field:default: set as: $$DescName

    ;; Set column header texts
    local:field: fwf: set as: "Customer Name"
    local:field: NF: set as: "Customer Code"
    local:field: NF1: set as: "Transporter Name"
    local:field: NF2: set as: "Group"
    local:field: AMTF: set as: "Credit Limit"
    local:field: SNF: set as: "Credit Days"

    ;; Dynamic captions from company settings
    local:field: NF3: set as: $cwcaption1:COMPANY:##SVCURRENTCOMPANY
    local:field: SNF2: set as: $cwcaption2:COMPANY:##SVCURRENTCOMPANY
    local:field: NF4: set as: $cwcaption3:COMPANY:##SVCURRENTCOMPANY
    local:field: NF5: set as: $cwcaption4:COMPANY:##SVCURRENTCOMPANY
    local:field: NF9: set as: $cwcaption5:COMPANY:##SVCURRENTCOMPANY
    local:field: NF10: set as: $cwcaption6:COMPANY:##SVCURRENTCOMPANY

    ;; Address and contact information headers
    local:field: NF6: set as: "Address-1"
    local:field: NF7: set as: "Address-2"
    local:field: NF8: set as: "Address-3"
    local:field: SNF3: set as: "City"
    local:field: SNF4: set as: "Zone"
    local:field: SNF5: set as: "State"
    local:field: SNF6: set as: "Pincode"
    local:field: SNF7: set as: "Country"
    local:field: SNF8: set as: "Contact Person Name"
    local:field: SNF9: set as: "Mobile No."
    local:field: SNF1: set as: "Phone No."
    local:field: SNF10: set as: "Email Address"
    local:field: SNF11: set as: "GSTN Number"
    local:field: SNF12: set as: "PAN Number"
    
    ;; Formatting for column headers
    Local: field: DEFAULT: Align:centre
    Local: field: FWF: Align:LEFT

    ;; Apply styles to column headers
    local:field: fwf:style:style1n
    local:field: NF: style:style1n
    local:field: NF1: style:style1n
    local:field: NF2:style:style1n
    local:field: AMTF:style:style1n
    local:field: SNF:style:style1n
    local:field: SNF1:style:style1n
    local:field: NF3:style:style1n
    local:field: SNF2:style:style1n
    local:field: NF4:style:style1n
    local:field: NF5:style:style1n
    local:field: NF6:style:style1n
    local:field: NF7:style:style1n
    local:field: NF8:style:style1n
    local:field: NF9:style:style1n
    local:field: NF10:style:style1n
    local:field: NF11:style:style1n
    local:field: SNF3:style:style1n
    local:field: SNF4:style:style1n
    local:field: SNF5:style:style1n
    local:field: SNF6:style:style1n
    local:field: SNF7:style:style1n
    local:field: SNF8:style:style1n
    local:field: SNF9:style:style1n
    local:field: SNF10:style:style1n
    local:field: SNF11:style:style1n
    local:field: SNF12:style:style1n

;; =============================================================================
;; REPORT DATA LINE
;; Define the data fields and their sources for each row
;; =============================================================================
[Line: LnCustomerMasterreport]
    Fields:fwf
    right field:NF,NF2,AMTF,nf1,NF3,SNF2,NF4,NF5,nf9,nf10,NF6,NF7,NF8,SNF3,SNF5,SNF6,SNF7,SNF8,snf1,SNF9,SNF10,SNF11,SNF12

    option : alter on enter
    local : field : fwf : alter : ledger : $$isledger

    ;; Basic customer information
    local:field: fwf: set as:$name ;; "Customer Name"
    local:field: NF: set as:$$ReptField:Name:2:ledger:#fwf ;;$MailingName ;; "Mailing Name"
    local:field: NF2: set as:$parent ;; "Group"
    local:field: AMTF: set as:$CreditLimit ;; "Credit Limit"
    local:field: SNF: set as:$BillCreditPeriod ;; "Credit Days"

    ;; Additional customer information
    local:field: NF1: set as:$cwtempGSTewayTransporterName ;; "Transporter Name"
    local:field: NF3: set as:$cwcaption1item ;; "Salesperson"
    local:field: SNF2: set as:$cwcaption2item ;; "ASM"
    local:field: NF4: set as:$cwcaption3item ;; "Agent"
    local:field: NF5: set as:$cwcaption4item ;; "Agent"
    local:field: NF9: set as:$cwcaption5item ;; "Agent"
    local:field: NF10: set as:$cwcaption6item ;; "Agent"

    ;; Address information
    local:field: NF6: set as:$$Collectionfield:$address:1:PartyAddressx ;; "Address-1"
    local:field: NF7: set as:$$Collectionfield:$address:2:PartyAddressx ;; "Address-2"
    local:field: NF8: set as:$$Collectionfield:$address:3:PartyAddressx ;; "Address-3"
    local:field: SNF3: set as:$cwledcity ;; "City"
    local:field: SNF4: set as:"" ;; "Zone"
    local:field: SNF5: set as:$LedStateName ;; "State"
    local:field: SNF6: set as:$pincode ;; "Pincode"
    local:field: SNF7: set as:$CountryofResidence ;; "Country"
    
    ;; Contact information
    local:field: SNF8: set as:$LedgerContact ;; "Contact Person Name"
    local:field: SNF1: set as:$LedgerPhone  ;;+" "+$LedgerMobile ;; "Contact Number"
    local:field: SNF9: set as:$LedgerMobile ;; "Contact Number"
    local:field: SNF10: set as:$EMail ;; "Email Address"
    
    ;; Tax information
    local:field: SNF11: set as:$PARTYGSTIN ;; "GSTN Number"
    local:field: SNF12: set as:$incometaxnumber ;; "PAN Number"

    ;; Formatting for data fields
    Local : field : NF6: Lines : 0
    Local : field : NF7: Lines : 0
    Local : field : NF8: Lines : 0
    Local: field: fwf: Width:50
    Local: field: nf: Width:40
    Local: Field: DEFAULT: Border: thin right
    Local: field: AMTF: Format: "DRCR"
    local: field: default : style:style2nx

;; Collection for party address information
[collection : partyaddressx]
    type : address : ledger
    child of : $name

;; =============================================================================
;; REPORT TOTALS LINE
;; Define the totals row at the bottom of the report
;; =============================================================================
[line: LnCustomerMasterreportTotals]
    use: LnCustomerMasterreport
    option: totalOpt
    
    ;; Clear all fields except totals
    local:field: fwf: set as:"" ;; "Customer Name"
    local:field: NF: set as:"" ;; "Mailing Name"
    local:field: NF1: set as:"" ;; "Mailing Name"
    local:field: NF2: set as:"" ;; "Group"
    local:field: AMTF: set as:"" ;; "Credit Limit"
    local:field: SNF: set as:"" ;; "Credit Days"
    local:field: NF3: set as:"" ;; "Salesperson"
    local:field: SNF2: set as:"" ;; "ASM"
    local:field: NF4: set as:"" ;; "Agent"
    local:field: NF5: set as:"" ;; "Address-1"
    local:field: NF6: set as:"" ;; "Address-2"
    local:field: NF7: set as:"" ;; "Address-2"
    local:field: NF8: set as:"" ;; "Address-2"
    local:field: NF9: set as:"" ;; "Address-2"
    local:field: NF10: set as:"" ;; "Address-2"
    local:field: SNF3: set as:"" ;; "City"
    local:field: SNF4: set as:"" ;; "Zone"
    local:field: SNF5: set as:"" ;; "State"
    local:field: SNF6: set as:"" ;; "Pincode"
    local:field: SNF7: set as:"" ;; "Country"
    local:field: SNF8: set as:"" ;; "Contact Person Name"
    local:field: SNF9: set as:"" ;; "Contact Number"
    local:field: SNF10: set as:"" ;; "Email Address"
    local:field: SNF11: set as:"" ;; "GSTN Number"
    local:field: SNF12: set as:"" ;; "PAN Number"
    
    ;; Set "Total" label and calculate total amount
    local: field: fwf: set as: "Total"
    local: field: amtf : set as :  $$total:amtf

    ;; Apply styles to total row
    local:field: fwf:style:style1n
    local:field: NF: style:style1n
    local:field: NF2:style:style1n
    local:field: AMTF:style:style1n
    local:field: SNF:style:style1n
    local:field: NF3:style:style1n
    local:field: SNF2:style:style1n
    local:field: NF4:style:style1n
    local:field: NF5:style:style1n
    local:field: NF6:style:style1n
    local:field: NF7:style:style1n
    local:field: NF8:style:style1n
    local:field: SNF3:style:style1n
    local:field: SNF4:style:style1n
    local:field: SNF5:style:style1n
    local:field: SNF6:style:style1n
    local:field: SNF7:style:style1n
    local:field: SNF8:style:style1n
    local:field: SNF9:style:style1n
    local:field: SNF10:style:style1n
    local:field: SNF11:style:style1n
    local:field: SNF12:style:style1n

;; =============================================================================
;; FILTER BUTTON AND FORM
;; Define the filter button and associated form
;; =============================================================================

;; Filter button definition
[button:customerbotton]
    key:f7
    title:"Filter"
    Action : Modify Variables:customerbotton

;; Filter report definition
[report:customerbotton]
    form:customerbotton

;; Filter form definition
[form:customerbotton]
    part:customerbotton
    ;; {26.Feb.22 17:54}  HEIGHT:20% PAGE
    WIDTH:30  ;;% PAGE

;; Filter form part definition
[part:customerbotton]
    line:titlelinexn,Customernameline,cwTransporternameLEDline2,Salespersonlinex,ASMlinex,Agentlinex,RSMlinex,Citylinex,Zonelinex,Statelinex

;; Filter title line
[line:titlelinexn]
    field:fwfc
    Local: Field: fwfc: info:"Filter"
    Local: Field: fwfc: Border: thin bottom
    Local: Field: fwfc: Style: Normal Bold
    space bottom:0.5

;; Customer name filter line
[line:Customernameline]
    field:sp,nf
    Local: Field: sp: Set As:"Customer Name"
    Local: Field: nf:modifies:str1
    space bottom:0.5
    Local: field: sp: Width:18
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf: table:collcCustomer,Not Applicable
    Local: Field: nf: Show table: Always

;; Collection for customer selection
[Collection: collcCustomer]
    type:ledger
    title:"List of Ledger"

;; Salesperson filter line
[line:Salespersonlinex]
    field:sp,nf
    Local: Field: sp: Set As:$cwcaption1:COMPANY:##SVCURRENTCOMPANY
    Local: Field: nf:modifies:str2
    space bottom:0.5
    Local: field: sp: Width:18
    Local: Field: sp: Style: Normal Bold
    Local: Field:nf:Table : cwcaption1tableundersc, Not Applicable:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:Table : cwcaption1tableunderled, Not Applicable:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY="ledger"

    Local: Field:nf:option:optcc:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local: Field:nf:option:optsc:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:option:optled:$cwcaption1table:COMPANY:##SVCURRENTCOMPANY="ledger"
    Local: Field: nf: Style: Normal Bold

;; ASM filter line
[line:ASMlinex]
    field:sp,nf
    Local: Field: sp: Set As:$cwcaption2:COMPANY:##SVCURRENTCOMPANY
    Local: Field: nf:modifies:str3
    space bottom:0.5
    Local: field: sp: Width:18
    Local: Field: sp: Style: Normal Bold
    Local:Field:nf:table:cwcaption2tableundercc,Not Applicable:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local:Field:nf:Show table: Always

    Local: Field:nf:Table      : cwcaption2tableundersc, Not Applicable:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:Table      : cwcaption2tableunderled, Not Applicable:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY="ledger"

    Local: Field:nf:option:optcc:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local: Field:nf:option:optsc:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:option:optled:$cwcaption2table:COMPANY:##SVCURRENTCOMPANY="ledger"
    Local: Field: nf: Style: Normal Bold

;; Agent filter line
[line:Agentlinex]
    field:sp,nf
    Local: Field: sp: Set As:$cwcaption3:COMPANY:##SVCURRENTCOMPANY
    Local: Field: nf:modifies:str4
    space bottom:0.5
    Local: field: sp: Width:18
    Local: Field: sp: Style: Normal Bold
    Local:Field:nf:table:cwcaption3tableundercc,Not Applicable:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local:Field:nf:Show table: Always
    Local: Field:nf:Table      : cwcaption3tableundersc, Not Applicable:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:Table      : cwcaption3tableunderled, Not Applicable:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY="ledger"

    Local: Field:nf:option:optcc:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local: Field:nf:option:optsc:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:option:optled:$cwcaption3table:COMPANY:##SVCURRENTCOMPANY="ledger"
    Local: Field: nf: Style: Normal Bold

;; RSM filter line
[line:RSMlinex]
    field:sp,nf
    Local: Field: sp: Set As:$cwcaption4:COMPANY:##SVCURRENTCOMPANY
    Local: Field: nf:modifies:str5
    space bottom:0.5
    Local: field: sp: Width:18
    Local: Field: sp: Style: Normal Bold
    Local:Field:nf:table:cwcaption4tableundercc,Not Applicable:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local:Field:nf:Show table: Always
    Local: Field:nf:Table      : cwcaption4tableundersc, Not Applicable:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:Table      : cwcaption4tableunderled, Not Applicable:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY="ledger"

    Local: Field:nf:option:optcc:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY="Cost Centre"
    Local: Field:nf:option:optsc:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY="Stock Category"
    Local: Field:nf:option:optled:$cwcaption4table:COMPANY:##SVCURRENTCOMPANY="ledger"
    Local: Field: nf: Style: Normal Bold

;; Transporter name filter line
[Line:cwTransporternameLEDline2]
    Field	: sp,nf
    Local   : Field : sp    : Set as	: $$LocaleString:"Transporter Name"
    Local: Field: nf: Style: Normal Bold
    Local: Field: nf: table:collTransporterled,Not Applicable
    Local: Field: nf: Show table: Always
    Local: Field: nf:modifies:str9
    space bottom:0.5
    Local: field: sp: Width:18
    Local: Field: sp: Style: Normal Bold
    Local: Field: nf:modifies:str9

`;
export default tdl;
