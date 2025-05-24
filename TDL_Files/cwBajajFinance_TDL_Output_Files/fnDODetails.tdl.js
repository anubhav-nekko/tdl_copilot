// Auto-generated from fnDODetails.txt
const tdl = `
; Created By: pg on 2021-07-29 12:32, ID: 

;; CHANGE HISTORY
;; {30.Jul.21 15:09} local : part : EI BaseInfo: add : line : at beginning : cwFinanceDetailsOpt
;; {29.Jul.21 18:55} button : cwCreateLoanAccount


;; KEY DEFINITION SECTION
;; Defines a keyboard shortcut (Alt+R) to call the cwGETDODetails function
[key: cwGetDODetails]
title:"Get Details"
key : alt  + r
action : call : cwGETDODetails


;; SYSTEM CONFIGURATION SECTION
;; Defines base URL and other system variables for API connectivity
[System: Formula]
;cwBaseUrl : "http://103.205.67.69/cwbajajapi"    ;; Commented out previous API endpoint
;cwBaseUrl : "http://saleszing.in/cwbajajapi"     ;; Commented out previous API endpoint
cwBaseUrl : "http://103.107.66.50/cwbajajapi"     ;; Current active API endpoint

;; System variables for API request parameters
cwdealid : $cwdealid ;; "B105818652"              ;; Deal ID parameter from system variable
cwpartner : if @@cwsperateparnewridenbopt then $cwvchpartnerid:Vouchertype:##SVVoucherType else $cwpartenerid:COMPANY:##SVCURRENTCOMPANY ;;"testpartner"
;;cwDODetailsApiUrl : "https://bfl-api-dev.azure-api.net/POSReinventDOWS/DODetails?dealId="+@@cwdealid+"&partner="+@@cwpartner    ;; Commented out previous API URL
cwDODetailsApiUrl : @@cwBaseURL+"/cwbajajdetails.php?dealId="+@@cwdealid+"&partner="+@@cwpartner    ;; Current API URL construction
cwSubscriptionKey:if @@cwsperateparnewridenbopt then $cwsubprimarykey:Vouchertype:##SVVoucherType else $cwsubprimarykey:COMPANY:##SVCURRENTCOMPANY ;; "5e82a7b9e73447b4bf182cc5f7668dcb"


;; HTTP COLLECTION DEFINITION SECTION
;; Defines the HTTP JSON collection for API request with headers
[Collection: cwGetDODetails]
	
	Data Source	 : HTTP JSON: @@cwDODetailsApiUrl    ;; API endpoint URL
	Export Header	: "Accept:application/json"        ;; HTTP header - Accept JSON response
	Export Header	: "Accept-Charset:utf-8"           ;; HTTP header - Character encoding
	Export Header	: "Connection:keep-alive"          ;; HTTP header - Connection type
	Export Header	: "Cache-control:no-cache"         ;; HTTP header - Caching behavior
	Export Header	: "Content-Type:application/json"  ;; HTTP header - Content type
	Export Header	: "Accept-Encoding:identity"       ;; HTTP header - Encoding type
	Export Header	: "Ocp-Apim-Subscription-Key:"+@@cwSubscriptionKey    ;; HTTP header - API subscription key
;; {29.Jul.21 12:41}         RemoteRequest:RepcwHTTPJSON: UTF8    ;; Previous remote request configuration
;; {30.Jul.21 15:43} 	JSON Object Path : "DoDetails:1"          ;; Previous JSON path configuration
	

;; MAIN FUNCTION DEFINITION
;; Function to retrieve DO (Delivery Order) details from API
[Function: cwgetDODetails]
00 : refresh tdl    ;; Refresh TDL (Tally Definition Language) before execution
;; {31.Jul.21 13:19} 05 : log : @@cwDODetailsApiUrl    ;; Commented out logging of API URL
10 : walk collection : cwGetDODetails    ;; Execute API request by walking through the collection
;; {04.Aug.21 15:44} 50 : log object    ;; Commented out object logging
;; {30.Jul.21 15:15} 51 : set target : ..    ;; Commented out target setting

; ---- Start of values

;; RESPONSE VALIDATION SECTION
;; Log and validate API response
;; {30.Jul.21 15:59} 100 : log : $ResponseCode    ;; Commented out response code logging
;; {30.Jul.21 15:59} 110 : log : $ResponseMessage    ;; Commented out response message logging
;; {30.Jul.21 15:46} 120 : log object    ;; Commented out object logging

;; {29.Jul.21 17:03} ddfd : log : $TotalEMI    ;; Commented out TotalEMI logging
;; {29.Jul.21 17:03} ddfd2: log : $$asamount:$TotalEMI    ;; Commented out formatted TotalEMI logging

;; {04.Aug.21 15:28} 504 : log : $responseCode    ;; Commented out response code logging
;; {04.Aug.21 15:28} 500a: log : $responseMessage    ;; Commented out response message logging

;; Error handling for API response
500 : if : $responseCode <> "00"    ;; Check if response code is not successful (00)
501 : msgbox : "Error!!" : $responseMessage    ;; Display error message to user
502 : return    ;; Exit function on error
503 : end if    ;; End of error handling block


;; DATA MAPPING SECTION
;; Map API response values to system variables
5000 : walk : dodetails    ;; Iterate through DO details from response
;; Financial information mapping
5001 :  set value : cwbfInvoiceAmount : $$asamount:$InvoiceAmount    ;; Set formatted invoice amount
5002 :  set value : cwbfGrossLoanAmount : $$asamount:$GrossLoanAmount    ;; Set formatted gross loan amount
5003 :  set value : cwbfCustomerDownPayment : $$asamount:$CustomerDownPayment    ;; Set formatted customer down payment
5004 :  set value : cwbfNetLoanAmount : $$asamount:$NetLoanAmount    ;; Set formatted net loan amount
5005 :  set value : cwbfOtherCharges : $$asamount:$OtherCharges    ;; Set formatted other charges
5006 :  set value : cwbfSFDCLTV : $$asamount:$SFDCLTV    ;; Set formatted SFDC LTV (Loan-to-Value)
5007 :  set value : cwbfCoBrandCardCharges : $$asamount:$CoBrandCardCharges    ;; Set formatted co-brand card charges
5008 :  set value : cwbfSubvention : $$asamount:$Subvention    ;; Set formatted subvention amount
5009 :  set value : cwbfMarginMoney : $$asamount:$MarginMoney    ;; Set formatted margin money
5010 :  set value : cwbfMFRSubvention : $$asamount:$MFRSubvention    ;; Set formatted manufacturer subvention
5011 :  set value : cwbfBFLShare : $$asamount:$BFLShare    ;; Set formatted BFL share
5012 :  set value : cwbfProcessingFees : $$asamount:$ProcessingFees    ;; Set formatted processing fees
5013 :  set value : cwbfSpecialCharges : $$asamount:$SpecialCharges    ;; Set formatted special charges
5014 :  set value : cwbfEMICardFee : $$asamount:$EMICardFee    ;; Set formatted EMI card fee
5015 :  set value : cwbfTotalDeductions : $$asamount:$TotalDeductions    ;; Set formatted total deductions
5016 :  set value : cwbfNetDisbursement : $$asamount:$NetDisbursement    ;; Set formatted net disbursement
5017 :  set value : cwbfTotalGSTOnDBD : $TotalGSTOnDBD    ;; Set total GST on DBD
5018 :  set value : cwbfAdvanceEMI : $AdvanceEMI    ;; Set advance EMI
5019 :  set value : cwbfProductEMI : $ProductEMI    ;; Set product EMI
5020 :  set value : cwbfTotalEMI : $TotalEMI    ;; Set total EMI

;; Additional financial and card information mapping
5050 :  set value : cwbfAddOnCardRequested : $AddOnCardRequested    ;; Set add-on card requested flag
5051 :  set value : cwbfAddOnCardCharges : $AddOnCardCharges    ;; Set add-on card charges
5052 :  set value : cwbfInstaCardActivationFees : $InstaCardActivationFees    ;; Set insta-card activation fees
5053 :  set value : cwbfImpsCharges : $ImpsCharges    ;; Set IMPS charges
5054 :  set value : cwbfNetTenure : $NetTenure    ;; Set net tenure
5055 :  set value : cwbfSubventionPercentage : $SubventionPercentage    ;; Set subvention percentage
5056 :  set value : cwbfRiskPoolAmount : $RiskPoolAmount    ;; Set risk pool amount
5057 :  set value : cwbfPromoPayableByBFLPrcent : $PromoPayableByBFLPrcent    ;; Set promo payable by BFL percentage
5058 :  set value : cwbfPromoPayableByRetailerPrcent : $PromoPayableByRetailerPrcent    ;; Set promo payable by retailer percentage
5059 :  set value : cwbfPromoPayableByManufacturerPrcent : $PromoPayableByManufacturerPrcent    ;; Set promo payable by manufacturer percentage
5060 :  set value : cwbfPromoPayableByBFLValue : $PromoPayableByBFLValue    ;; Set promo payable by BFL value
5061 :  set value : cwbfPromoPayableByRetailerValue : $PromoPayableByRetailerValue    ;; Set promo payable by retailer value
5062 :  set value : cwbfPromoPayableByManufacturerValue : $PromoPayableByManufacturerValue    ;; Set promo payable by manufacturer value
5063 :  set value : cwbfTotalPromoValue : $TotalPromoValue    ;; Set total promo value
5064 :  set value : cwbfUpfrontInterest : $UpfrontInterest    ;; Set upfront interest
5065 :  set value : cwbfServiceCharge : $ServiceCharge    ;; Set service charge
5066 :  set value : cwbfTotalPromoPrcent : $TotalPromoPrcent    ;; Set total promo percentage
5067 :  set value : cwbfDUEDAY : $DUEDAY    ;; Set due day
5068 :  set value : cwbfTenure : $Tenure    ;; Set tenure

;; Custom field mapping
5070 :  set value : cwbfParentID : $ParentID    ;; Set parent ID
5071 :  set value : cwbfField1 : $Field1    ;; Set custom field 1
5072 :  set value : cwbfField2 : $Field2    ;; Set custom field 2
5073 :  set value : cwbfField3 : $Field3    ;; Set custom field 3
5074 :  set value : cwbfField4 : $Field4    ;; Set custom field 4
5075 :  set value : cwbfField5 : $Field5    ;; Set custom field 5
5076 :  set value : cwbfField6 : $Field6    ;; Set custom field 6
5077 :  set value : cwbfField7 : $Field7    ;; Set custom field 7
5078 :  set value : cwbfField8 : $Field8    ;; Set custom field 8
5079 :  set value : cwbfField9 : $Field9    ;; Set custom field 9
5080 :  set value : cwbfField10 : $Field10    ;; Set custom field 10
5081 :  set value : cwbfField11 : $Field11    ;; Set custom field 11
5082 :  set value : cwbfField12 : $Field12    ;; Set custom field 12
5083 :  set value : cwbfField13 : $Field13    ;; Set custom field 13
5084 :  set value : cwbfField14 : $Field14    ;; Set custom field 14
5085 :  set value : cwbfField15 : $Field15    ;; Set custom field 15
5086 :  set value : cwbfVAN : $VAN    ;; Set VAN (Virtual Account Number)
5087 :  set value : cwbfDMEID : $DMEID    ;; Set DMEID
5088 :  set value : cwbfSerialNo : $SerialNo    ;; Set serial number

;; Customer and dealer information mapping
5100 :  set value : cwbfDealerName : $DealerName    ;; Set dealer name
5101 :  set value : cwbfDONumber : $DONumber    ;; Set DO number
5102 :  set value : cwbfStatus : $Status    ;; Set status
5103 :  set value : cwbfCustomerName : $CustomerName    ;; Set customer name
5104 :  set value : cwbfCustomerPhoneNo : $CustomerPhoneNo    ;; Set customer phone number
5105 :  set value : cwbfAddressLine1 : $AddressLine1    ;; Set address line 1
5106 :  set value : cwbfAddressLine2 : $AddressLine2    ;; Set address line 2
5107 :  set value : cwbfAddressLine3 : $AddressLine3    ;; Set address line 3
5108 :  set value : cwbfCITY : $CITY    ;; Set city
5109 :  set value : cwbfCustomerPAN : $CustomerPAN    ;; Set customer PAN
5110 :  set value : cwbfCustomerFirstName : $CustomerFirstName    ;; Set customer first name
5111 :  set value : cwbfModelNo : $ModelNo    ;; Set model number
5112 :  set value : cwbfMAKE : $MAKE    ;; Set make
5113 :  set value : cwbfassetCategory : $assetCategory    ;; Set asset category
5114 :  set value : cwbfCdLine : $CdLine    ;; Set CD line

5115 :  set value : cwbfDealerCode : $DealerCode    ;; Set dealer code
5116 :  set value : cwbfCreatedOn : $CreatedOn    ;; Set created on date
5117 :  set value : cwbfInvoiceExpiryDate : $InvoiceExpiryDate    ;; Set invoice expiry date
5118 :  set value : cwbfCustomerMiddleName : $CustomerMiddleName    ;; Set customer middle name
5119 :  set value : cwbfAppliancesLine : $AppliancesLine    ;; Set appliances line

5120 :  set value : cwbfDealID : $DealID    ;; Set deal ID
5121 :  set value : cwbfSchemeId : $SchemeId    ;; Set scheme ID

5122 :  set value : cwbfEMICardLimit : $EMICardLimit    ;; Set EMI card limit
5123 :  set value : cwbfCustomerEmailID : $CustomerEmailID    ;; Set customer email ID
5124 :  set value : cwbfArea : $Area    ;; Set area
5125 :  set value : cwbfLandmark : $Landmark    ;; Set landmark
5126 :  set value : cwbfPinCode : $PinCode    ;; Set pin code
5127 :  set value : cwbfSTATE : $STATE    ;; Set state
5128 :  set value : cwbfcustomerGSTIN : $customerGSTIN    ;; Set customer GSTIN
5129 :  set value : cwbfCustomerLastName : $CustomerLastName    ;; Set customer last name

5130 :  set value : cwbfCobrandCardLimit : $CobrandCardLimit    ;; Set co-brand card limit
5131 :  set value : cwbfManufacturerName : $ManufacturerName    ;; Set manufacturer name
5132 :  set value : cwbfDigitalLine : $DigitalLine    ;; Set digital line

;; Serial number special handling
;; {02.Aug.21 17:24} 5133 : log : $cwbfSerialNo    ;; Commented out serial number logging
5134 : set value : cwSerialNo : $$tgtobject:$cwbfSerialNo    ;; Set serial number to target object

;; {02.Aug.21 17:24} 5136 : log : $$tgtobject:$cwSerialNo    ;; Commented out target object serial number logging
5200 : end walk    ;; End of DO details walk

;--- end of values
60 : end walk    ;; End of collection walk

`;
export default tdl;
