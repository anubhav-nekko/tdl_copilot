// Auto-generated from MONTHTOMONTHNETSALESREPORT.TXT
const tdl = `
;; ===================================================================
;; MONTH TO MONTH NET SALES REPORT FOR TALLY
;; ===================================================================
;; Created By: Khokan on 2022-08-19 10:19, ID: 
;; Last Modified: 2022-08-19 17:47
;; Purpose: This TDL code creates a monthly sales analysis report that shows
;;          gross sales, returns, net sales, and collections for each month
;;          of the financial year (April to March)
;; ===================================================================

;; ===================================================================
;; MENU CONFIGURATION SECTION
;; Adds the report option to Tally's Gateway menu and Debug menu
;; ===================================================================
     [#menu: Gateway of Tally]
;; {19.Aug.22 17:47}         add: Option: MonthtomonthnetsalesreportLock ;; : @@MonthtomonthnetsalesreportDemoLock
       
     ;; Add report to debug menu for testing purposes
     [#menu : cw_Debug_menu]   
        add: Item: before: @@locQuit: @@MonthtomonthnetsalesreportReport: Display: RepMonthtomonthnetsalesreport

     ;; Define menu structure for the report access
     [!menu: MonthtomonthnetsalesreportLock]
        add: Item: before: @@locQuit: @@MonthtomonthnetsalesreportReport: Display: RepMonthtomonthnetsalesreport
        add: Item: before: @@locQuit: Blank
        
    ;; ===================================================================
    ;; SYSTEM FORMULAS SECTION
    ;; Defines report title and any system-level variables
    ;; ===================================================================
    [System: formula]
   MonthtomonthnetsalesreportReport: "Month to month net sales report"
;; MonthtomonthnetsalesreportDemoLock: $$MachineDate < $$Date:"01/04/2013"
     
    ;; ===================================================================
    ;; MAIN REPORT DEFINITION
    ;; Configures the report properties, form, and export capabilities
    ;; ===================================================================
    [Report: RepMonthtomonthnetsalesreport]
        use: Dsp Template                                ;; Use display template for formatting
      Title: @@MonthtomonthnetsalesreportReport          ;; Set report title from system formula
   Printset: Report Title: @@MonthtomonthnetsalesreportReport
       Form: FrmMonthtomonthnetsalesreport               ;; Link to form definition
     Export: Yes                                         ;; Enable export functionality
    ;; set  : svfromdate : ##svcurrentdate               ;; Commented out from date setting
     set  : svTodate : ##svcurrentdate                   ;; Set to date as current date
    Local       : Button   : RelReports        : Inactive : Yes  ;; Disable related reports button
     
    ;; ===================================================================
    ;; FORM DEFINITION
    ;; Defines the layout and structure of the report form
    ;; ===================================================================
      [Form: FrmMonthtomonthnetsalesreport]
        use: DSP Template                                ;; Use display template
       Part: DspAccTitles,PrtTitle0Monthtomonthnetsalesreport,PrtMonthtomonthnetsalesreport  ;; Include parts
      Width: 100% Page                                   ;; Set width to full page
     Height: 100% Page                                   ;; Set height to full page
;; Background: @@SV_STOCKSUMMARY                         ;; Background setting commented out
     delete: page break                                  ;; Remove default page breaks
        add: page break: Monthtomonthnetsalesreportbotbrk,MonthtomonthnetsalesreportbotOpbrk  ;; Add custom page breaks
Bottom Toolbar Buttons 	: BottomToolBarBtn1, BottomToolBarBtn3, BottomToolBarBtn8, BottomToolBarBtn9, BottomToolBarBtn10, BottomToolBarBtn11,BottomToolBarBtn12
;; BottomToolBarBtn2, BottomToolBarBtn4, BottomToolBarBtn5,BottomToolBarBtn6, BottomToolBarBtn7,
;;                        1 Quit, 2 Accept, 3 Delete, 4 Cancel, 5 Duplicate Voucher, 6 Add Voucher, 7 Insert Voucher, 8 Remove Line, 9 Restore Line, 10 Restore all, 11 Select, 12 Select All
;;    local : button : report config : action :modify variable: MyPLConfigure

      ;; ===================================================================
      ;; PAGE BREAK PARTS
      ;; Define custom page break components for the report
      ;; ===================================================================
      [part: MonthtomonthnetsalesreportbotBrk]
       line: EXPINV PageBreak                           ;; Line for page break
     border: thin top                                   ;; Add thin top border

      [part: Monthtomonthnetsalesreportbotopbrk]
        use: dspacctitles                               ;; Use account titles display
  add: part: MonthtomonthnetsalesreportTitlePart        ;; Add title part

      [part: MonthtomonthnetsalesreportTitlePart]
       line: LnMonthtomonthnetsalesreportTitle          ;; Include title line
       
      ;; ===================================================================
      ;; CURRENT PERIOD LINE DEFINITION
      ;; Shows the current period information in the report header
      ;; ===================================================================
      [line: LnMonthtomonthnetsalesreportCurrPeriod]
      field: fwf,fwf2                                   ;; Define fields for this line
      Local: field: fwf2: Align: Right                  ;; Right align second field
      Local: Field: fwf: Style: normal bold             ;; Bold style for first field
      Local: Field: fwf2: Style: normal bold            ;; Bold style for second field
      Local: Field: fwf2: Set As: @@dspDateStr          ;; Display date string
  invisible: $$inprintmode                              ;; Hide in print mode

      [part: PrtTitle0Monthtomonthnetsalesreport]
      line : LnMonthtomonthnetsalesreportCurrPeriod     ;; Include current period line
      
      ;; ===================================================================
      ;; MAIN REPORT CONTENT PART
      ;; Defines the main body of the report with monthly data lines
      ;; ===================================================================
      [Part: PrtMonthtomonthnetsalesreport]
       Line: LnMonthtomonthnetsalesreportTitle,LnAPRIL,LnMAY,LnJUNE,LnJULY,LnAUG,LnSEPt,LnOCT,LnNOV,LnDEC,LnJAN,LnFEB,LnMAR
;; {19.Aug.22 10:48}        Line: LnAPRIL,LnMAY,LnJUNE,LnJULY,LnAUG,LnSEPt,LnOCT,LnNOV,LnDEC,LnJAN,LnFEB,LnMAR
       
;;bottom Line: LnMonthtomonthnetsalesreportTotals        ;; Bottom totals line commented out
    ;; repeat: LnMonthtomonthnetsalesreport: ColMonthtomonthnetsalesreport  ;; Repeat line commented out
     scroll: Vertical                                    ;; Enable vertical scrolling
;; {19.Aug.22 10:48}  Common Border: YEs                 ;; Common border commented out
      Total: Qtyf,amtf                                   ;; Total these fields
;; {19.Aug.22 10:47}      border:thin box                ;; Border commented out
;; {19.Aug.22 10:54} height:19                           ;; Height commented out

;; ===================================================================
;; COLLECTION DEFINITION
;; Defines the data source for the report
;; ===================================================================
[Collection: ColMonthtomonthnetsalesreport]
        Use: Vouchers of Company                         ;; Use company vouchers as base
     delete: filter : daybookfilter                      ;; Remove daybook filter
     Filter: ColMonthtomonthnetsalesreportFilter,IsNonOptionalCancelledVchs  ;; Apply custom filters

    [system: Formula]
ColMonthtomonthnetsalesreportFilter: Yes                 ;; Default filter formula returns true

      ;; ===================================================================
      ;; REPORT TITLE LINE DEFINITION
      ;; Defines the column headers for the report
      ;; ===================================================================
      [Line: LnMonthtomonthnetsalesreportTitle]
        use: LnAPRIL                                     ;; Base on April line
     option: titleopt                                    ;; Use title option
;;     local: field:default: set as: $$DescName          ;; Default field commented out

;; Define column headers
local:field: fwf: set as: "Month"
local:field: numf: set as:"Gross Sale Pcs"
local:field: amtf: set as:"Gross Sale Amt"
local:field: numf2: set as:"Gross Return Pcs"
local:field: amtf2: set as:"Gross Return Amt"
local:field: numf3: set as:"Net Sale Pcs"
local:field: amtf3: set as:"Net Sale Amt"
local:field: amtf4: set as:"Net Sale Amt Without GST"
local:field: amtf5: set as:"Collection"
;; {19.Aug.22 10:40} Local: Field:default: Skip: Yes     ;; Skip default field commented out

;; Apply Calisto2 style to all fields for consistent formatting
local: field: fwf : style:styleCalisto2
local: field: numf : style:styleCalisto2
local: field: numf1 : style:styleCalisto2
local: field: numf2 : style:styleCalisto2
local: field: numf3 : style:styleCalisto2
local: field: amtf : style:styleCalisto2
local: field: amtf1 : style:styleCalisto2
local: field: amtf2 : style:styleCalisto2
local: field: amtf3 : style:styleCalisto2
local: field: amtf4 : style:styleCalisto2
local: field: amtf5 : style:styleCalisto2
Local : field : default: Lines : 0                       ;; Set default lines to 0
Local: field: default: Align: centre                     ;; Center align by default
Local: Field: fwf: delete:Border: thin right             ;; Remove right border from first field
Local: Field: numf: Border: thin left right              ;; Add borders to numeric field
Local: field: numf: Width:8.2                            ;; Set width for numeric field

;; ===================================================================
;; APRIL DATA LINE DEFINITION
;; Defines the data line for April with all calculations
;; ===================================================================
[Line: LnAPRIL]
Fields:fwf                                               ;; Define first field
right field:numf,amtf,numf2,amtf2,numf3,amtf3,amtf4,amtf5,amtf6 ;;,amtf10,amtf11  ;; Define right-aligned fields

;; Set field values and calculations
local:field: fwf: set as:"April"                         ;; Month name
local:field: numf: set as:$$reportobject:$$collectionfieldbykey:$salesbilledqty:"April":Coltes1111  ;; Gross sales quantity
local:field: amtf: set as:$$nettamount:@@cwGrossSaleAmtmosalesnew:@@cwGrossSaleAmtmosales  ;; Gross sales amount
;; {19.Aug.22 14:58} local:field: amtf: set as:$$nettamount:#amtf10:#amtf11  ;; Alternative calculation commented out

local:field: numf2: set as:$$reportobject:$$collectionfieldbykey:$salescrbilledqty:"April":Coltes1111  ;; Gross returns quantity
local:field: amtf2: set as:$$nettamount:@@crnoteinvamtAmtmosales:@@crnoteinvamtAmtmosalesnew  ;; Gross returns amount
local:field: numf3: set as:#numf-#numf2                  ;; Net sales quantity (sales - returns)
local:field: amtf3: set as:#amtf-#amtf2                  ;; Net sales amount (sales - returns)
local:field: amtf4: set as:#amtf3-#amtf6                 ;; Net sales amount without GST
local:field: amtf6: set as:(#amtf3*5)/100                ;; Calculate GST amount (5% of net sales)

local:field: amtf5: set as:$$reportobject:$$collectionfieldbykey:$rcptvalue:"April":Colreceiptmnet  ;; Collection amount

;; Intermediate calculations for GST
local:field: amtf10: set as:$$nettamount:@@salesinvamt1valueApril:@@salesdiscamt1valueApril
local:field: amtf11: set as:(#amtf10*5)/100

local: field: amtf6: Invisible: yes                      ;; Hide GST calculation field

;; Apply Calisto style to all fields
local: field: fwf : style:styleCalisto
local: field: numf : style:styleCalisto
local: field: numf1 : style:styleCalisto
local: field: numf2 : style:styleCalisto
local: field: numf3 : style:styleCalisto
local: field: amtf : style:styleCalisto
local: field: amtf1 : style:styleCalisto
local: field: amtf2 : style:styleCalisto
local: field: amtf3 : style:styleCalisto
local: field: amtf4 : style:styleCalisto
local: field: amtf5 : style:styleCalisto

Local: Field: default: Border: thin right                ;; Add right border to all fields
height:1.5                                               ;; Set line height

;; ===================================================================
;; APRIL CALCULATION FORMULAS
;; System formulas for April data calculations
;; ===================================================================
[System: Formula]
;; Get sales invoice amount and discount amount for April
salesinvamt1valueApril:$$reportobject:$$collectionfieldbykey:$salesinvamt1:"April":Coltes1111
salesdiscamt1valueApril:$$reportobject:$$collectionfieldbykey:$cwsalesdiscamt1x:"April":Coltes1111

;; Calculate gross sale amount (invoice amount minus discount)
cwGrossSaleAmtmosales:$$nettamount:@@salesinvamt1valueApril:@@salesdiscamt1valueApril

;; Calculate GST component (5% of gross sales)
cwGrossSaleAmtmosalesnew:(@@cwGrossSaleAmtmosales*5)/100

;; Calculate credit note (returns) amount
crnoteinvamtAmtmosales:$$nettamount:@@crnoteinvamt1allApril:@@cwcrnotediscamt1allApril
crnoteinvamtAmtmosalesnew:(@@crnoteinvamtAmtmosales*5)/100

;; Get credit note invoice and discount amounts
crnoteinvamt1allApril:$$reportobject:$$collectionfieldbykey:$crnoteinvamt1:"April":Coltes1111
cwcrnotediscamt1allApril:$$reportobject:$$collectionfieldbykey:$cwcrnotediscamt1x:"April":Coltes1111


;; ===================================================================
;; SALES DATA COLLECTION DEFINITIONS
;; Collection hierarchy for gathering and aggregating sales data
;; ===================================================================

[Collection: Coltes1111]
source Collection: sourColtes1111                        ;; Define source collection
By : FullMonthName1 	: $FullMonthName1x                ;; Group by month name
;; Aggregate calculations for sales quantities
aggr compute:salesbilledqty:sum:$salesbilledqty1        ;; Sum sales quantities
aggr compute:salescrbilledqty:sum:$salescrbilledqtyx    ;; Sum return quantities

;; Aggregate calculations for sales amounts
aggr compute:salesamount:sum:$salesamountx              ;; Sum sales amounts
aggr compute:salesinvamt1:sum:$salesinvamt1x            ;; Sum invoice amounts

;; Aggregate calculations for return amounts
aggr compute:salescramount:sum:$salescramountx          ;; Sum return amounts
aggr compute:crnoteinvamt1:sum:$crnoteinvamt1x          ;; Sum credit note amounts

;; Aggregate calculations for discounts
aggr compute:cwsalesdiscamt1x:sum:$cwsalesdiscamt1xx    ;; Sum sales discounts
aggr compute:cwcrnotediscamt1x:sum:$cwcrnotediscamt1xx  ;; Sum return discounts

search key:$FullMonthName1                              ;; Set search key to month name


[Collection: sourColtes1111]
source Collection: sourColallAREAWISEnetsalesReport     ;; Define source collection
by:partyledgername:$partyledgername                     ;; Group by party ledger name
;;by:vouchernumber1:$vouchernumber                      ;; Voucher number grouping commented out

;;by:cwcaption1vch1:$..cwcaption1vch                    ;; Caption grouping commented out
by:parent1:$parent:ledger:$partyledgername              ;; Group by parent ledger
by:parent2:$grandparent:ledger:$partyledgername         ;; Group by grandparent ledger
By : FullMonthName1x 	: $$FullMonthName:$date          ;; Group by month name from date

;; Calculate sales quantities based on voucher type
aggr compute:salesbilledqty1:sum:if $$issales:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"
;;compute:vouchertypename1:$vouchertypename             ;; Voucher type computation commented out
compute:cwEnableNetSalesReport1:$cwEnableNetSalesReport:vouchertype:$vouchertypename

;; Calculate return quantities based on voucher type
aggr compute:salescrbilledqtyx:sum:if $$IsCreditNote:$vouchertypename then @@salesbilledqty2 else $$InitValue:"Quantity"

;; Calculate sales amounts based on voucher type
aggr compute:salesamountx:sum:if $$issales:$vouchertypename then $amount else $$InitValue:"amount"
aggr compute:salesinvamt1x:sum:if $$issales:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"

;; Calculate return amounts based on voucher type
aggr compute:salescramountx:sum:if $$IsCreditNote:$vouchertypename then $amount else $$InitValue:"amount"
aggr compute:crnoteinvamt1x:sum:if $$IsCreditNote:$vouchertypename then @@salesinvamt2 else $$InitValue:"amount"

;; Calculate discount amounts with proportional allocation
aggr compute:cwsalesdiscamt1xx:sum:if $$issales:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"  ;;(($cwsalesdiscamt1/$cwinvamt1)*$salesinvamt1)
aggr compute:cwcrnotediscamt1xx:sum:if $$IsCreditNote:$vouchertypename then (@@cwsalesdiscamt/@@cwinvamt)*@@salesinvamt2 else $$InitValue:"amount"  ;;(($cwsalesdiscamt1/$cwinvamt1)*$salesinvamt1)

;; {14.Jul.22 11:47} filter:cwGroupsundrydebtorsfilter,cwallpartyfilter  ;; Filters commented out

search key:$FullMonthName1                              ;; Set search key to month name

;; ===================================================================
;; RECEIPT COLLECTION DEFINITIONS
;; Collections for gathering and aggregating receipt/collection data
;; ===================================================================

[Collection: Colreceiptmnet]
source Collection: sourColreceiptmnet                    ;; Define source collection

By : FullMonthName1 	:$FullMonthName1x ;; $$FullMonthName:$date  ;; Group by month name

aggr compute:rcptvalue:sum:$rcptvalue1                  ;; Sum receipt values

search key:$FullMonthName1                              ;; Set search key to month name

[Collection: sourColreceiptmnet]
 source Collection: Colreceiptsou                        ;; Define source collection

by:partyledgername:$partyledgername                     ;; Group by party ledger name
By : FullMonthName1x 	: $$FullMonthName:$date          ;; Group by month name from date

aggr compute:rcptvalue1:sum:$amount                     ;; Sum receipt amounts
;; {19.Aug.22 16:33} aggr compute:rcptvalue:sum:$amount  ;; Direct sum commented out

filter:cwcashreceiptfilterxx3                           ;; Apply filter for sundry debtors
;; {19.Aug.22 16:33} search key:$FullMonthName1x         ;; Search key commented out


[System: Formula]
Aprilfil:"April"                                         ;; Define April filter value
;; Filter to check if object belongs to sundry debtors group
cwcashreceiptfilterxx3:$$isobjectbelongsto:group:($parent:ledger:$partyledgername):$$Groupsundrydebtors

;; ===================================================================
;; MAY DATA LINE DEFINITION
;; Defines the data line for May with all calculations
;; ===================================================================
[Line: LnMAY]
use:LnAPRIL                                              ;; Base on April line definition

;; Set field values and calculations for May
local:field: fwf: set as:"May"                           ;; Month name
local:field: numf: set as:$$reportobject:$$collectionfieldbykey:$salesbilledqty:"May":Coltes1111  ;; Gross sales quantity
local:field: amtf: set as:$$nettamount:@@cwGrossSaleAmtmosalesnewMay:@@cwGrossSaleAmtmosalesMay  ;; Gross sales amount
;; {19.Aug.22 14:58} local:field: amtf: set as:$$nettamount:#amtf10:#amtf11  ;; Alternative calculation commented out

local:field: numf2: set as:$$reportobject:$$collectionfieldbykey:$salescrbilledqty:"May":Coltes1111  ;; Gross returns quantity
local:field: amtf2: set as:$$nettamount:@@crnoteinvamtAmtmosalesMay:@@crnoteinvamtAmtmosalesnewMay  ;; Gross returns amount
local:field: numf3: set as:#numf-#numf2                  ;; Net sales quantity (sales - returns)
local:field: amtf3: set as:#amtf-#amtf2                  ;; Net sales amount (sales - returns)
local:field: amtf4: set as:#amtf3-#amtf6                 ;; Net sales amount without GST
local:field: amtf6: set as:(#amtf3*5)/100                ;; Calculate GST amount (5% of net sales)

local:field: amtf5: set as:$$reportobject:$$collectionfieldbykey:$rcptvalue:"May":Colreceiptmnet  ;; Collection amount

;; Intermediate calculations for GST
local:field: amtf10: set as:$$nettamount:@@salesinvamt1valueMay:@@salesdiscamt1valueMay
local:field: amtf11: set as:(#amtf10*5)/100

;; ===================================================================
;; MAY CALCULATION FORMULAS
;; System formulas for May data calculations
;; ===================================================================
[System: Formula]
;; Get sales invoice amount and discount amount for May
salesinvamt1valueMay:$$reportobject:$$collectionfieldbykey:$salesinvamt1:"May":Coltes1111
salesdiscamt1valueMay:$$reportobject:$$collectionfieldbykey:$cwsalesdiscamt1x:"May":Coltes1111

;; Calculate gross sale amount (invoice amount minus discount)
cwGrossSaleAmtmosalesMay:$$nettamount:@@salesinvamt1valueMay:@@salesdiscamt1valueMay

;; Calculate GST component (5% of gross sales)
cwGrossSaleAmtmosalesnewMay:(@@cwGrossSaleAmtmosalesMay*5)/100

;; Calculate credit note (returns) amount
crnoteinvamtAmtmosalesMay:$$nettamount:@@crnoteinvamt1allMay:@@cwcrnotediscamt1allMay
crnoteinvamtAmtmosalesnewMay:(@@crnoteinvamtAmtmosalesMay*5)/100

;; Get credit note invoice and discount amounts
crnoteinvamt1allMay:$$reportobject:$$collectionfieldbykey:$crnoteinvamt1:"May":Coltes1111
cwcrnotediscamt1allMay:$$reportobject:$$collectionfieldbykey:$cwcrnotediscamt1x:"May":Coltes1111

;; ===================================================================
;; JUNE DATA LINE DEFINITION
;; Defines the data line for June with all calculations
;; ===================================================================
[Line: LnJUNE]
use:LnAPRIL                                              ;; Base on April line definition

;; Set field values and calculations for June
local:field: fwf: set as:"June"                          ;; Month name
local:field: numf: set as:$$reportobject:$$collectionfieldbykey:$salesbilledqty:"June":Coltes1111  ;; Gross sales quantity
local:field: amtf: set as:$$nettamount:@@cwGrossSaleAmtmosalesnewJune:@@cwGrossSaleAmtmosalesJune  ;; Gross sales amount
;; {19.Aug.22 14:58} local:field: amtf: set as:$$nettamount:#amtf10:#amtf11  ;; Alternative calculation commented out

local:field: numf2: set as:$$reportobject:$$collectionfieldbykey:$salescrbilledqty:"June":Coltes1111  ;; Gross returns quantity
local:field: amtf2: set as:$$nettamount:@@crnoteinvamtAmtmosalesJune:@@crnoteinvamtAmtmosalesnewJune  ;; Gross returns amount
local:field: numf3: set as:#numf-#numf2                  ;; Net sales quantity (sales - returns)
local:field: amtf3: set as:#amtf-#amtf2                  ;; Net sales amount (sales - returns)
local:field: amtf4: set as:#amtf3-#amtf6                 ;; Net sales amount without GST
local:field: amtf6: set as:(#amtf3*5)/100                ;; Calculate GST amount (5% of net sales)

local:field: amtf5: set as:$$reportobject:$$collectionfieldbykey:$rcptvalue:"June":Colreceiptmnet  ;; Collection amount

;; Intermediate calculations for GST
local:field: amtf10: set as:$$nettamount:@@salesinvamt1valueJune:@@salesdiscamt1valueJune
local:field: amtf11: set as:(#amtf10*5)/100

;; ===================================================================
;; JUNE CALCULATION FORMULAS
;; System formulas for June data calculations
;; ===================================================================
[System: Formula]
;; Get sales invoice amount and discount amount for June
salesinvamt1valueJune:$$reportobject:$$collectionfieldbykey:$salesinvamt1:"June":Coltes1111
salesdiscamt1valueJune:$$reportobject:$$collectionfieldbykey:$cwsalesdiscamt1x:"June":Coltes1111

;; Calculate gross sale amount (invoice amount minus discount)
cwGrossSaleAmtmosalesJune:$$nettamount:@@salesinvamt1valueJune:@@salesdiscamt1valueJune

;; Calculate GST component (5% of gross sales)
cwGrossSaleAmtmosalesnewJune:(@@cwGrossSaleAmtmosalesJune*5)/100

;; Calculate credit note (returns) amount
crnoteinvamtAmtmosalesJune:$$nettamount:@@crnoteinvamt1allJune:@@cwcrnotediscamt1allJune
crnoteinvamtAmtmosalesnewJune:(@@crnoteinvamtAmtmosalesJune*5)/100

;; Get credit note invoice and discount amounts
crnoteinvamt1allJune:$$reportobject:$$collectionfieldbykey:$crnoteinvamt1:"June":Coltes1111
cwcrnotediscamt1allJune:$$reportobject:$$collectionfieldbykey:$cwcrnotediscamt1x:"June":Coltes1111

;; ===================================================================
;; JULY DATA LINE DEFINITION
;; Defines the data line for July with all calculations
;; ===================================================================
[Line: LnJULY]
use:LnAPRIL                                              ;; Base on April line definition

;; Set field values and calculations for July
local:field: fwf: set as:"July"                          ;; Month name
local:field: numf: set as:$$reportobject:$$collectionfieldbykey:$salesbilledqty:"July":Coltes1111  ;; Gross sales quantity
local:field: amtf: set as:$$nettamount:@@cwGrossSaleAmtmosalesnewJuly:@@cwGrossSaleAmtmosalesJuly  ;; Gross sales amount
;; {19.Aug.22 14:58} local:field: amtf: set as:$$nettamount:#amtf10:#amtf11  ;; Alternative calculation commented out

local:field: numf2: set as:$$reportobject:$$collectionfieldbykey:$salescrbilledqty:"July":Coltes1111  ;; Gross returns quantity
local:field: amtf2: set as:$$nettamount:@@crnoteinvamtAmtmosalesJuly:@@crnoteinvamtAmtmosalesnewJuly  ;; Gross returns amount
local:field: numf3: set as:#numf-#numf2                  ;; Net sales quantity (sales - returns)
local:field: amtf3: set as:#amtf-#amtf2                  ;; Net sales amount (sales - returns)
local:field: amtf4: set as:#amtf3-#amtf6                 ;; Net sales amount without GST
local:field: amtf6: set as:(#amtf3*5)/100                ;; Calculate GST amount (5% of net sales)

local:field: amtf5: set as:$$reportobject:$$collectionfieldbykey:$rcptvalue:"July":Colreceiptmnet  ;; Collection amount

;; Intermediate calculations for GST
local:field: amtf10: set as:$$nettamount:@@salesinvamt1valueJuly:@@salesdiscamt1valueJuly
local:field: amtf11: set as:(#amtf10*5)/100

;; ===================================================================
;; JULY CALCULATION FORMULAS
;; System formulas for July data calculations
;; ===================================================================
[System: Formula]
;; Get sales invoice amount and discount amount for July
salesinvamt1valueJuly:$$reportobject:$$collectionfieldbykey:$salesinvamt1:"July":Coltes1111
salesdiscamt1valueJuly:$$reportobject:$$collectionfieldbykey:$cwsalesdiscamt1x:"July":Coltes1111

;; Calculate gross sale amount (invoice amount minus discount)
cwGrossSaleAmtmosalesJuly:$$nettamount:@@salesinvamt1valueJuly:@@salesdiscamt1valueJuly

;; Calculate GST component (5% of gross sales)
cwGrossSaleAmtmosalesnewJuly:(@@cwGrossSaleAmtmosalesJuly*5)/100

;; Calculate credit note (returns) amount
crnoteinvamtAmtmosalesJuly:$$nettamount:@@crnoteinvamt1allJuly:@@cwcrnotediscamt1allJuly
crnoteinvamtAmtmosalesnewJuly:(@@crnoteinvamtAmtmosalesJuly*5)/100

;; Get credit note invoice and discount amounts
crnoteinvamt1allJuly:$$reportobject:$$collectionfieldbykey:$crnoteinvamt1:"July":Coltes1111
cwcrnotediscamt1allJuly:$$reportobject:$$collectionfieldbykey:$cwcrnotediscamt1x:"July":Coltes1111

;; ===================================================================
;; AUGUST DATA LINE DEFINITION
;; Defines the data line for August with all calculations
;; ===================================================================
[Line: LnAUG]
use:LnAPRIL                                              ;; Base on April line definition
local:field: fwf: set as:"August"                        ;; Month name
local:field: numf: set as:$$reportobject:$$collectionfieldbykey:$salesbilledqty:"August":Coltes1111  ;; Gross sales quantity

`;
export default tdl;
