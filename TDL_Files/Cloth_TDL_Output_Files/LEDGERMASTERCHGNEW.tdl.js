// Auto-generated from LEDGERMASTERCHGNEW.TXT
const tdl = `
;===============================================================================
; LEDGERMASTERCHGNEW.TXT
; Created By: Khokan on 2022-02-26 15:18, ID:
; Purpose: Enhances the Ledger Master (and Cost Centre) screens in Tally
;          by adding fields for Salesperson, ASM, Agent, RSM, City, and Zone,
;          with selection from filtered lists. Supports advanced reporting,
;          grouping, and CRM-style master data management.
;===============================================================================

## Main Features

- **Additional Master Fields:**  
  - Adds the following fields to the Ledger Master (Sundry Debtors) and Cost Centre screens:
    - Salesperson
    - ASM (Area Sales Manager)
    - Agent
    - RSM (Regional Sales Manager)
    - City
    - Zone
  - Each field is a dropdown linked to a filtered list of cost centres (e.g., only those marked as Salesperson, ASM, etc.).

- **Field Storage & Table Logic:**  
  - Each field stores its value in a custom UDF (e.g., \`cwSalesperson\`, \`CWASM\`, \`CWAgent\`, \`CWRSM\`, \`CWledCity\`, \`CWledZone\`).
  - Each dropdown is dynamically populated using a collection filtered to show only relevant cost centres (e.g., only those with "Is Salesperson" enabled).
  - "Create Cost Centre" and "Alter CstCtr" keys allow quick creation or editing of master records from within the field.

- **Cost Centre Master Enhancements:**  
  - The Cost Centre master screen is also enhanced to include logical fields for:
    - Is Salesperson
    - Is ASM
    - Is Agent
    - Is RSM
    - Is City
    - Is Zone
  - This allows tagging of cost centres for use in the above dropdowns.

- **Address Section Enhancements:**  
  - In the Ledger Mailing Address part, City and Zone fields are added at the bottom for further classification.

- **Technical Details:**  
  - Uses TDL's \`ADD:OPTION\` and \`ADD:LINE\` to insert new fields into existing Tally screens, only when the MinuSaree module is enabled.
  - Filtering logic for collections ensures only tagged cost centres appear in each list.
  - All fields use bold styling for clarity and professional appearance.
  - Variables and keys are set for smooth navigation and data entry.

## Example of Enhanced Ledger Master Layout

| Field        | Source/Dropdown         | Storage UDF         |
|--------------|------------------------|---------------------|
| Salesperson  | List of Salesperson CC | \`cwSalesperson\`     |
| ASM          | List of ASM CC         | \`CWASM\`             |
| Agent        | List of Agent CC       | \`CWAgent\`           |
| RSM          | List of RSM CC         | \`CWRSM\`             |
| City         | List of City CC        | \`CWledCity\`         |
| Zone         | List of Zone CC        | \`CWledZone\`         |

## Example of Cost Centre Master Logical Fields

| Field         | Storage UDF      |
|---------------|------------------|
| Is Salesperson| \`cwSalespersonCC\`|
| Is ASM        | \`cwASMCC\`        |
| Is Agent      | \`cwAgentCC\`      |
| Is RSM        | \`cwRSMCC\`        |
| Is City       | \`cwCityCC\`       |
| Is Zone       | \`cwZoneCC\`       |

## Use Cases

- **CRM and Sales Reporting:** Enables grouping, filtering, and reporting by Salesperson, ASM, Agent, RSM, City, and Zone.
- **Master Data Management:** Ensures ledgers and cost centres can be classified for advanced analysis and business logic.
- **User Experience:** Dropdowns and quick creation/editing of cost centres streamline master maintenance.

---

**Summary:**  
LEDGERMASTERCHGNEW.TXT is a robust TDL customization that upgrades the Ledger Master and Cost Centre screens in Tally by adding CRM-style fields for Salesperson, ASM, Agent, RSM, City, and Zone. Each field is linked to a filtered cost centre list, allowing for granular classification and advanced reporting/grouping. The approach is modular, user-friendly, and designed for businesses needing detailed master data segmentation and sales tracking[1].

`;
export default tdl;
