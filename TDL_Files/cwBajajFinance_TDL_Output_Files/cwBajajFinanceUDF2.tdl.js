// Auto-generated from cwBajajFinanceUDF2.txt
const tdl = `
;; ====================================================================================
;; Created By: pg on 2021-07-29 12:28, ID:
;; Purpose: UDFs for Bajaj Finance Invoice, Customer, Promo & Miscellaneous Details
;; ====================================================================================

[System: UDF]

;; =========================
;; Bajaj Finance Invoice Details
;; =========================
cwbfInvoiceAmount               : amount : 5001  ;; Total invoice amount
cwbfGrossLoanAmount            : amount : 5002  ;; Gross loan amount before deductions
cwbfCustomerDownPayment        : amount : 5003  ;; Customer's upfront payment
cwbfNetLoanAmount              : amount : 5004  ;; Net loan amount disbursed
cwbfOtherCharges               : amount : 5005  ;; Miscellaneous charges
cwbfSFDCLTV                    : amount : 5006  ;; SFDC Loan-to-Value
cwbfCoBrandCardCharges         : amount : 5007  ;; Co-brand card charges
cwbfSubvention                 : amount : 5008  ;; Subvention amount
cwbfMarginMoney                : amount : 5009  ;; Margin money involved
cwbfMFRSubvention              : amount : 5010  ;; Manufacturer subvention amount
cwbfBFLShare                   : amount : 5011  ;; BFL's share
cwbfProcessingFees             : amount : 5012  ;; Loan processing fees
cwbfSpecialCharges             : amount : 5013  ;; Special charges if any
cwbfEMICardFee                 : amount : 5014  ;; EMI card fees
cwbfTotalDeductions            : amount : 5015  ;; Sum of all deductions
cwbfNetDisbursement            : amount : 5016  ;; Final disbursed amount
cwbfTotalGSTOnDBD              : amount : 5017  ;; GST on Dealer Based Discount
cwbfAdvanceEMI                 : amount : 5018  ;; Advance EMI collected
cwbfProductEMI                 : amount : 5019  ;; EMI applicable on product
cwbfTotalEMI                   : amount : 5020  ;; Total EMI

;; =========================
;; Add-On Card & Promo Breakdown
;; =========================
cwbfAddOnCardRequested         : amount : 5050  ;; Add-on card requested amount
cwbfAddOnCardCharges           : amount : 5051  ;; Charges for add-on card
cwbfInstaCardActivationFees    : amount : 5052  ;; Instant card activation fee
cwbfImpsCharges                : amount : 5053  ;; IMPS charges
cwbfNetTenure                  : amount : 5054  ;; Effective loan tenure
cwbfSubventionPercentage       : amount : 5055  ;; Subvention percentage
cwbfRiskPoolAmount             : amount : 5056  ;; Risk pool amount
cwbfPromoPayableByBFLPrcent    : amount : 5057  ;; Promo percent by BFL
cwbfPromoPayableByRetailerPrcent: amount : 5058 ;; Promo percent by Retailer
cwbfPromoPayableByManufacturerPrcent : amount : 5059 ;; Promo percent by Manufacturer
cwbfPromoPayableByBFLValue     : amount : 5060  ;; Promo amount paid by BFL
cwbfPromoPayableByRetailerValue: amount : 5061  ;; Promo amount paid by Retailer
cwbfPromoPayableByManufacturerValue : amount : 5062 ;; Promo amount paid by Manufacturer
cwbfTotalPromoValue            : amount : 5063  ;; Total promotional value
cwbfUpfrontInterest            : amount : 5064  ;; Upfront interest collected
cwbfServiceCharge              : amount : 5065  ;; Any service charges
cwbfTotalPromoPrcent           : amount : 5066  ;; Total promotional percentage
cwbfDUEDAY                     : number : 5067  ;; EMI Due day
cwbfTenure                     : number : 5068  ;; Loan tenure (months)

;; =========================
;; Custom Fields / Internal Identifiers
;; =========================
cwbfParentID                   : string : 5070  ;; Internal Parent ID
cwbfField1                     : string : 5071
cwbfField2                     : string : 5072
cwbfField3                     : string : 5073
cwbfField4                     : string : 5074
cwbfField5                     : string : 5075
cwbfField6                     : string : 5076
cwbfField7                     : string : 5077
cwbfField8                     : string : 5078
cwbfField9                     : string : 5079
cwbfField10                    : string : 5080
cwbfField11                    : string : 5081
cwbfField12                    : string : 5082
cwbfField13                    : string : 5083
cwbfField14                    : string : 5084
cwbfField15                    : string : 5085
cwbfVAN                        : string : 5086  ;; VAN number if applicable
cwbfDMEID                      : string : 5087  ;; DME (sales agent) ID
cwbfSerialNo                   : string : 5088  ;; Product serial number

;; =========================
;; Customer and Dealer Info
;; =========================
cwbfDealerName                 : string : 5100  ;; Dealer name
cwbfDONumber                   : string : 5101  ;; Delivery Order number
cwbfStatus                     : string : 5102  ;; Current status of invoice
cwbfCustomerName               : string : 5103  ;; Full customer name
cwbfCustomerPhoneNo            : string : 5104  ;; Customer's phone number
cwbfAddressLine1               : string : 5105  ;; Address line 1
cwbfAddressLine2               : string : 5106  ;; Address line 2
cwbfAddressLine3               : string : 5107  ;; Address line 3
cwbfCITY                       : string : 5108  ;; Customer's city
cwbfCustomerPAN                : string : 5109  ;; PAN number
cwbfCustomerFirstName          : string : 5110  ;; Customer's first name
cwbfModelNo                    : string : 5111  ;; Product model number
cwbfMAKE                       : string : 5112  ;; Product make
cwbfassetCategory              : string : 5113  ;; Asset category (e.g. Mobile, Appliance)
cwbfCdLine                     : string : 5114  ;; CD Line for internal mapping

;; =========================
;; Dealer, Scheme & Contact Details
;; =========================
cwbfDealerCode                 : string : 5115  ;; Dealer code
cwbfCreatedOn                  : string : 5116  ;; Creation date of invoice
cwbfInvoiceExpiryDate          : string : 5117  ;; Expiry date of invoice
cwbfCustomerMiddleName         : string : 5118  ;; Customer's middle name
cwbfAppliancesLine             : string : 5119  ;; Appliance line item

cwbfDealID                     : string : 5120  ;; Deal ID
cwbfSchemeId                   : string : 5121  ;; Scheme ID applied
cwbfEMICardLimit               : string : 5122  ;; EMI Card Limit
cwbfCustomerEmailID            : string : 5123  ;; Customer's email ID
cwbfArea                       : string : 5124  ;; Customer's area
cwbfLandmark                   : string : 5125  ;; Landmark near address
cwbfPinCode                    : string : 5126  ;; Pin code
cwbfSTATE                      : string : 5127  ;; State
cwbfcustomerGSTIN              : string : 5128  ;; GST number if applicable
cwbfCustomerLastName           : string : 5129  ;; Customer's last name
cwbfCobrandCardLimit           : string : 5130  ;; Co-branded card limit
cwbfManufacturerName           : string : 5131  ;; Manufacturer name
cwbfDigitalLine                : string : 5132  ;; Digital Line (product category)

`;
export default tdl;
