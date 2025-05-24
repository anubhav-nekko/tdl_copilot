// Auto-generated from cwBajajFinanceNC.txt
const tdl = `
[include : e:\d7comps\tprime\CommonFunctions.txt]

/**
 * SYSTEM CONFIGURATION SECTION
 * This section defines demo mode settings and date restrictions for Bajaj Finance functionality
 */
[System : formula]
cwBajajFinanceDEmoMode : NO  ;; yes to enable demo no to allow full access
cwbajajfinancedemodate : '9/2/2021'
cwbajajfinanceedudate : '9/1/2021'

/**
 * Demo mode date validation formulas
 * These formulas control access based on dates when in demo mode
 */
cwBajajFinanceDemoDt : if @@cwBajajFinanceDEmoMode then if @@CWEdu then $date <= @@cwBajajFinanceedudate else $date <= @@cwBajajFinancedemodate else yes
cwBajajFinanceMachDemoDate : if @@cwBajajFinanceDEmoMode then if @@CWEdu then $$machinedate <= @@cwBajajFinanceedudate else $$machinedate <= @@cwBajajFinancedemodate else yes
cwBajajFinanceSales : $$issales:$vouchertypename and @@cwBajajFinanceDemoDt

/**
 * Demo information display formulas
 * These formulas control what demo information is shown to users
 */
[System : Formula] ;; Demo Formula
cwShowDemoForm: @@cwBajajFinanceDEmoMode
cwShowDemoDate: @@cwBajajFinancedemodate
cwShowDemoDate2: @@cwBajajFinanceedudate

/**
 * User-Defined Field for enabling Bajaj Finance functionality
 * This is the main toggle for the entire customization
 */
[system : udf]
cwBajajFinanceEnabled : logical : 111 ;; change this value.

/**
 * COMPANY CONFIGURATION SECTION
 * This section handles UI components for company-level configuration
 */
;--------------------------------------------- Company Config

/**
 * Form definition for Company Operations
 * Contains switches for different Tally release versions
 */
[#Form: Company Operations]
                Switch   : cwBajajFinanceLowerRel  : cwBajajFinanceNotFor3.2  : ($$Number:$$ProdInfo:ProdReleaseAsStr) < 3.2
                Switch   : cwBajajFinanceCurrenRel : cwBajajFinanceFor3.2     : ($$Number:$$ProdInfo:ProdReleaseAsStr) >= 3.2

/**
 * Configuration for Tally versions below 3.2
 * Adds configuration line to CMP AccFeat Left part
 */
[!Form : cwBajajFinanceNOTFor3.2]

Local: Part : CMP AccFeat Left : Add : Line : At End : cwBajajFinanceConfig
                                
/**
 * Configuration for Tally versions 3.2 and above
 * Adds configuration line to CMP TallyShopFeatures Left part
 */
[!Form : cwBajajFinanceFor3.2]
Local  : Part  : CMP TallyShopFeatures Left        : Add :  Line : At End  : cwBajajFinanceConfig
local : line : cwTestConfig : local : field : short name field : tool tip: "Double-Click for browsing to CircuitWorld.in"

/**
 * Part definition for TallyShopFeatures Left
 * Contains the Bajaj Finance configuration line
 */
[#Part  : CMP TallyShopFeatures Left]
line:cwBajajFinanceConfig

/**
 * Configuration line definition
 * Contains fields for enabling/disabling Bajaj Finance functionality
 */
[Line : cwBajajFinanceConfig]
Field : cwBajajFinanceConfigTitle,cwBajajFinanceConfig
right field : Short name field
Local: Field: short name field : info: "sales@circuitworld.in"
Local: Field: short name field: case : normal
Local: Field: short name field: Color : blue
;;Local: Field: short name field: border : thin bottom
Local: Field: short name field: width : 0


key  : cwcwBajajFinanceBrowse

/**
 * Key definition for double-click action
 * Opens CircuitWorld website when double-clicked
 */
[key : cwcwBajajFinanceBrowse]
key : left double click
action : browse : "www.circuitworld.in"


/**
 * Field definition for configuration title
 * Displays prompt for enabling Bajaj Finance customization
 */
[Field: cwBajajFinanceConfigTitle]
Use : medium prompt
info: "Enable Bajaj Finance Limited Customization?"
width : 0

/**
 * Field definition for configuration toggle
 * Logical field that stores the enabled/disabled state
 */
[Field: cwBajajFinanceConfig]
Use: logical field
Set As: $cwBajajFinanceEnabled
storage: cwBajajFinanceEnabled

/**
 * Formula to access the enabled state from company context
 */
[System: Formula]
cwBajajFinanceEnabled :  $cwBajajFinanceEnabled:COMPANY:##SVCURRENTCOMPANY


;---------------------------------------------


/**
 * INCLUDE SECTION - UDF Definitions
 * These files contain user-defined field definitions for Bajaj Finance
 */
; UDF
[include : cwBajajFinanceUDF.txt]
[include : cwBajajFinanceUDF2.txt]

/**
 * INCLUDE SECTION - Master Changes
 * These files contain modifications to master data structures
 */
; Master Changes 

[include :ConfigChanges.txt]
[include :vouchertypechanges.txt]


/**
 * INCLUDE SECTION - Transaction Changes
 * These files contain modifications to transaction handling
 */
; Transaction Changes


[include :salesvoucherchanges.txt]

;; {28.Aug.21 18:22} [include :posvoucherchanges.txt]

[include:financeDetails.txt]

[include :invoiceprint.txt]


/**
 * INCLUDE SECTION - PDF Functionality
 * These files contain PDF generation and handling functionality
 */
;;;;;;;;;;;;; " For  PDF  start  ;;;;;;;;;;;;;;

[include :pdffield.txt]
[include : cwDSCompanyConfig.txt]
[include:pdfvouchertypechanges.txt]

[include : VoucherEntryChanges.txt]
[include : ExportforEsigning2.txt]
[include : ExportforEsigning3.txt]
[include :reportpdfselect.txt]

;;;;;;;;;;;;;;;;;;;; PDF END  ;;;;;;;;;;;;;;;;;

/**
 * INCLUDE SECTION - Function Definitions
 * This file contains delivery order details functions
 */
 [include : fnDODetails.txt]

/**
 * INCLUDE SECTION - Report Changes
 * These files contain report customizations for Bajaj Finance
 */
; Report Changes

[include : BajajReport.txt]
[include : BajajReportDetails.txt]
[include : ExportPdfBySelectingBill.txt]
[include :cwSimpleFormatInv.txt]

`;
export default tdl;
