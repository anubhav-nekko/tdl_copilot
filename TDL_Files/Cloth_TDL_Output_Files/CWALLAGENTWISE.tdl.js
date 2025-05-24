// Auto-generated from CWALLAGENTWISE.TXT
const tdl = `
;===============================================================================
; CWALLAGENTWISE.TXT
; Created By: khokan on 2022-05-24 16:30, ID:
; Purpose: Provides an "All Agent Wise Report" in Tally, summarizing key sales,
;          tax, discount, and credit note metrics for each agent/party (ledger),
;          with subtotals, totals, and flexible filtering.
;===============================================================================

## Main Features

- **Menu Integration:** Adds the report to both Gateway of Tally and Debug menu for easy access.
- **Agent/Party-wise Aggregation:** Collects and displays data for each ledger under Sundry Debtors, grouped by agent or party.
- **Comprehensive Metrics:** Shows for each agent/party:
  - Invoice Value
  - Tax Value
  - Round Off Value
  - Taxable Value
  - Discount Value
  - Net Sales
  - Credit Note values (Invoice, Tax, Discount, Round Off, Net)
  - Net Value (Net Sales - Credit Note Tax Value)
- **Subtotals and Totals:** Subtotal lines for each agent and a grand total line at the bottom.
- **Filtering:** Only ledgers with non-zero debit or credit balances are included.
- **Drilldown/Explode:** Allows expanding agent lines for further details.
- **Export/Print:** Report is exportable and printable.

## Key TDL Structure

- **Collections:**
  - \`Colcwallagentwise\`: Main collection, gathers ledgers under Sundry Debtors, fetches agent/party captions, and applies filters.
  - \`collsaleamt\` and \`cwColNetcrnotereport2new\`: Aggregate sales and credit note values for each party for detailed columns.
- **Lines and Fields:**
  - Columns for all major values (invoice, tax, discount, net sales, credit note values, net value).
  - Subtotal and total lines with proper formatting and alignment.

## Example Column Headings

| Description     | Inv. Value | Tax Value | Round Off Value | Taxable Value | Disc. Value | Net Sales | cr. Note Inv. Value | cr. Note Tax Value | cr. Note Disc. Value | cr. Note Round Off | Net cr. Note | Net Value |
|-----------------|------------|-----------|-----------------|--------------|-------------|-----------|---------------------|--------------------|----------------------|--------------------|--------------|-----------|

## Filtering Logic

- Only ledgers (parties) with non-zero debit or credit balances are included.
- Additional filters can be applied via \`cwColpartyFilter2\` and \`cwcaption1netsalesvch1filter\` as needed.

## Customization and Usage

- **Bottom Toolbar:** Standard Tally toolbar buttons for navigation, export, and printing.
- **Filter Button:** \`allagentnetsalesbotton\` can be used to further filter the report as per user input.
- **Drilldown:** Subtotal lines for each agent can be expanded for more detail.

---

**Summary:**  
CWALLAGENTWISE.TXT provides a detailed, agent-wise (or party-wise) summary report in Tally, covering all key sales, tax, discount, and credit note metrics, with subtotals, totals, and flexible filtering. The report is designed for advanced sales and receivables analysis, supporting drilldown and export/print for business review and audit[1].

`;
export default tdl;
