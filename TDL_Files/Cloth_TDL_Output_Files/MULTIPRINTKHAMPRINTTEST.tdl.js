// Auto-generated from MULTIPRINTKHAMPRINTTEST.TXT
const tdl = `
;===============================================================================
; MULTIPRINTKHAMPRINTTEST.TXT
; Created By: khokan on 2022-05-26 10:50, ID:
; Purpose: Implements a "Multi Print Kham Print Test" report in Tally,
;          allowing users to print/export outstanding (Dr/Cr) bills for a selected
;          party, with professional formatting, totals, and a filter popup.
;===============================================================================

## Main Features

- **Menu Integration:**
  - Adds "multiprintkhamprinttest" to Gateway of Tally and Debug menu for easy access.
  - Menu option and report access are controlled by date/demo logic.

- **Party (Ledger) Selection & Filtering:**
  - Users can filter the report by party (ledger) using an F7 "Filter" button.
  - The filter popup allows the user to select a ledger from a list (\`collcwledx\`).
  - The report displays bills only for the selected party.

- **Report Structure:**
  - Displays all bills (Dr and Cr) for the selected party.
  - Columns:
    - Date
    - Name (Bill Name)
    - Description (Parent)
    - Dr. Value (if debit balance)
    - Cr. Value (if credit balance)
  - Dr. and Cr. values are shown in separate columns, only if applicable.

- **Data Model and Filtering:**
  - Main collection: All bills (\`TYPE:BILLS\`), filtered by selected party (\`$parent = ##str12\`).
  - Dr/Cr logic: If \`$closingbalance\` is debit, value is shown in Dr. column; if credit, in Cr. column.

- **Layout and Styling:**
  - Bold headers, clear alignment, and "drcr" formatting for amounts.
  - Totals line at the bottom for Dr. Value.
  - Page breaks and standard Tally toolbar buttons for navigation, export, and print.

- **Technical Highlights:**
  - Uses TDL's \`repeat\`, \`scroll\`, and \`total\` features for dynamic report generation.
  - The filter popup (\`cwagentsalesbotton2\`) is modular and can be invoked anytime via F7.
  - The report is exportable and printable.

## Example Columns

| Date     | Name    | Description | Dr. Value | Cr. Value |
|----------|---------|-------------|-----------|-----------|
| 01-05-25 | INV123  | ABC Ltd.    | 10,000    |           |
| 05-05-25 | CN456   | ABC Ltd.    |           | 2,000     |
| ...      | ...     | ...         | ...       | ...       |
|          |         | Total       | 50,000    |           |

---

**Summary:**  
MULTIPRINTKHAMPRINTTEST.TXT implements a professional, filterable Kham Print-style outstanding report in Tally. It enables users to select a party and print/export all outstanding bills (Dr/Cr), with clear formatting, totals, and a user-friendly filter popup. The report is ideal for collection follow-up, audit, or customer communication, supporting efficient receivables management and documentation[1].

---
[1]: MULTIPRINTKHAMPRINTTEST.TXT (full source)

`;
export default tdl;
