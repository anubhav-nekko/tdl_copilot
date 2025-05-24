// Auto-generated from MULTIPRINTAGENTWISEOUTSTANDINGREPORT2.TXT
const tdl = `
;===============================================================================
; MULTIPRINTAGENTWISEOUTSTANDINGREPORT2.TXT
; Created By: Khokan on 2021-08-30 18:36, ID:
; Purpose: Implements a "Multi Print Agent Wise Outstanding Report 2" in Tally,
;          allowing users to print/export agent-wise outstanding bills for all
;          ledgers under Sundry Debtors, with both Dr (debit) and Cr (credit)
;          sides, subtotals, and professional formatting.
;===============================================================================

## Main Features

- **Menu Integration:**
  - Adds "Multi print AGENT WISE OutstandingReport2" to the Gateway of Tally and Debug menu for easy access.
  - Accessible via both the main and debug menus for convenience[1].

- **Report Structure:**
  - The report is titled "Multi print AGENT WISE OutstandingReport2".
  - Uses a standard Tally display template, with export and print support.
  - The main form (\`FrmmultiprintAGENTWISEOutstandingReport2\`) includes company details, page breaks, and a bottom toolbar for navigation/export.

- **Agent-wise Ledger Listing:**
  - The main collection (\`ColmultiprintAGENTWISEOutstandingReport2X\`) lists all ledgers (parties) under Sundry Debtors.
  - For each ledger, outstanding bills are shown in detail.

- **Outstanding Bills (Dr Side):**
  - For each ledger, the report lists all bills with a debit (Dr) closing balance.
  - Columns include: Date, Name, Description (parent), and Dr. Value.
  - Subtotals are provided for each ledger.

- **Credit Bills (Cr Side):**
  - In a separate part, the report lists all bills with a credit (Cr) closing balance for the same ledgers.
  - Columns include: Date, Name, Description (parent), and Cr. Value.
  - Subtotals are provided for each ledger.

- **Filtering and Customization:**
  - Filters ensure only relevant ledgers and bills are shown:
    - Only non-empty closing balances are included.
    - Dr/Cr side is determined by the sign of the closing balance.
    - Additional filtering by agent (example: \`$cwcaption1item="MAHESH MODI,BIS"\` for Cr side).
  - Totals for each side are shown at the bottom.

- **Layout and Styling:**
  - All columns are styled for clarity, with bold headers and alignment.
  - Page breaks and toolbar buttons included for navigation, export, and print.
  - Each ledger's bills are exploded (expanded) for detailed view.

## Example Columns

| Date      | Name    | Description | Dr. Value | (Cr. Value in Cr side) |
|-----------|---------|-------------|-----------|------------------------|
| 01-08-21  | INV123  | ABC Ltd.    | 10,000    |                        |
| ...       | ...     | ...         | ...       | ...                    |
|           | Total   |             | 50,000    |                        |

## Usage

- **Purpose:**  
  Use this report to print or export agent-wise outstanding bills for all parties, with both debit and credit sides, suitable for collection follow-up, audit, or management review.

- **Navigation:**  
  Access from Gateway of Tally or Debug menu. Use toolbar buttons for export, print, or navigation.

---

**Summary:**  
MULTIPRINTAGENTWISEOUTSTANDINGREPORT2.TXT implements a professional, multi-print agent-wise outstanding report in Tally. It lists all ledgers under Sundry Debtors, showing both debit and credit outstanding bills with subtotals and totals, supporting efficient receivables management and reporting[1].

---
[1]: Attached file MULTIPRINTAGENTWISEOUTSTANDINGREPORT2.TXT

`;
export default tdl;
