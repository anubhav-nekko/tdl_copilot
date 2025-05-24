// Auto-generated from COMPERATIVENETSALEANDCOLLECTIONNEW.TXT
const tdl = `
;===============================================================================
; COMPERATIVENETSALEANDCOLLECTION1.TXT
; Created By: khokan on 2022-06-20 12:55, ID:
; Purpose: Provides a "Comparative Net Sales and Collection" report in Tally,
;          comparing net sales quantity, amount, and collection for parties/agents
;          across two companies and periods, with variance analysis and filtering.
;===============================================================================

## Features and Workflow

- **Menu Integration:** Adds the report to the Gateway of Tally and Debug menu for easy access[1].
- **Company & Period Selection:** Users can select two companies and specify "from" and "to" dates for each, enabling period-over-period or company-to-company comparison.
- **Party/Agent Filtering:** Filter by customer/party and agent for focused analysis.
- **Data Aggregation:** For each party/agent, the report aggregates:
  - Net Sale Quantity and Amount (for both companies/periods)
  - Collection Amount (for both companies/periods)
- **Variance Calculation:** Computes and displays absolute and percentage variations for sales and collections between the two periods/companies.
- **Totals and Subtotals:** Shows totals by agent and grand totals at the bottom.
- **Drilldown/Explode:** Subtotal lines are provided for each agent.
- **Export & Print:** The report is exportable and printable.

## Main Report Structure

| Field              | Company/Period 1        | Company/Period 2        | Variance          |
|--------------------|------------------------|-------------------------|-------------------|
| Net Sale Qty       | varnetsalesqty1        | varnetsalesqty2         | Sale Variation    |
| Net Sale Amount    | varnetsalesamt1        | varnetsalesamt2         | Sale Varn %       |
| Collection         | varnetsalescoll1       | varnetsalescoll2        | Coll Variation    |
| ...                | ...                    | ...                     | Coll Varn %       |

- **Party Name** and **Agent Name** columns identify the grouping.
- **Sale Variation** and **Sale Varn %** show the difference and percentage change in net sales amount.
- **Coll Variation** and **Coll Varn %** show the difference and percentage change in collection.

## Key TDL Logic

- **Variable Data Model:** Uses a list variable (\`varComperativeNetsale\`) to accumulate comparative data for each agent/party combination[1].
- **Data Collection:** Walks through vouchers/bills for each company and period, aggregates sales and collection values, and stores them in the variable list.
- **Variance Calculation:** For each row, calculates:
  - Sale Variation = Net Sale Amt (2) - Net Sale Amt (1)
  - Sale Varn % = 100 × (Sale Variation / Net Sale Amt (1))
  - Coll Variation = Collection (2) - Collection (1)
  - Coll Varn % = 100 × (Coll Variation / Collection (1))
- **Subtotals:** Uses TDL \`explode\` logic to provide agent-wise subtotals.
- **Filtering:** Supports customer and agent filtering via a pop-up form (F7 key).

## Example Output (Simplified)

| Agent   | Party   | Net Sale Qty1 | Net Sale Amt1 | Coll1 | Net Sale Qty2 | Net Sale Amt2 | Coll2 | Sale Var | Sale Var % | Coll Var | Coll Var % |
|---------|---------|---------------|---------------|-------|---------------|---------------|-------|----------|------------|----------|------------|
| Agent A | Party X | 100           | 50,000        | 48,000| 120           | 60,000        | 58,000| 10,000   | 20%        | 10,000   | 20.8%      |
| ...     | ...     | ...           | ...           | ...   | ...           | ...           | ...   | ...      | ...        | ...      | ...        |
| **Total**|         | ...           | ...           | ...   | ...           | ...           | ...   | ...      | ...        | ...      | ...        |

## Filtering and Customization

- **F7 Filter Button:** Opens a filter form for customer and agent selection.
- **Dynamic Titles:** The report titles and subheaders reflect the selected companies and periods.
- **Style and Alignment:** Fields are styled for readability, with alignment and bolding for headers and totals.

## Technical Highlights

- **TDL Functions:** Uses custom functions (\`cwFillDetails\`, \`cwFillCompanyDetails\`, etc.) to fetch and aggregate data from both companies/periods.
- **Collections:** Aggregates data using Tally's collection and walk constructs, with filters for date and voucher type.
- **Progress Indication:** Shows progress bars during data aggregation for user feedback.

---

**Summary:**  
This TDL script enables a powerful comparative analysis of net sales and collections across two companies or periods in Tally. It aggregates, compares, and visualizes key business metrics, supporting decision-making with variance and percentage change calculations, subtotals, and flexible filtering[1].

`;
export default tdl;
