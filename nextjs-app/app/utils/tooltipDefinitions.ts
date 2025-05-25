// Tooltip definitions for the calculator and other UI elements
export const tooltipDefinitions: Record<string, string> = {
  paymentType: `
    <strong>Type of payment</strong><br/>
    <u>Guaranteed Payments</u><br/>
    These are fixed payments that come on specific dates for a set period — like 10 or 15 years. They don't depend on your age or health.<br/><br/>
    <u>Life Contingent Payments</u><br/>
    These are payments that only continue while you're living. Their value depends on things like your age, lifestyle, and health habits.<br/><br/>
    <u>I Don't Know</u><br/>
    That's okay! If you're unsure, we'll treat your payments like they might be life contingent and ask a few basic questions to help estimate value.<br/><br/>
    <span style="color:#888;">🔒 We don't ask for personal info — this tool is just to give you a quick estimate of what your payments could be worth.</span>
  `,
  paymentMode: `
    <strong>Payment Mode</strong><br/>
    This refers to how often you're scheduled to receive your structured settlement payments.<br/>
    • Monthly – You receive a payment every month<br/>
    • Quarterly – One payment every 3 months<br/>
    • Semi-Annually – One payment every 6 months<br/>
    • Annually – One payment per year<br/>
    • Lump Sum – A one-time future payment, not recurring<br/>
    <br/>
    <span style="color:#888;">💡 Choose the option that matches how your payments are set up in your settlement.</span>
  `,
  amount: `
    <strong>Payment Amount</strong><br/>
    This is the amount you receive each time — like every month or quarter. You can enter the full amount or a partial amount you'd like to exchange.<br/>
    <span style="color:#888;">💵 Example: If you receive $1,000 per month but want to exchange only $500 of that, you can enter 500.<br/>
    (Some insurance companies allow partial exchanges, some don't — but go ahead and enter the amount you want to work with.)</span>
  `,
  increaseRate: `
    <strong>Annual Increase</strong><br/>
    This is the percentage your payments go up each year, usually starting on your policy's anniversary date (often tied to your birthday).<br/>
    <span style="color:#888;">📈 Example: If your payment is $1,000 and has a 3% annual increase, it would go up to $1,030 the next year.</span>
  `,
  startDate: `
    <strong>Payment Start Date</strong><br/>
    This is the month and year when the future payments you want to exchange for a lump sum today begin.<br/>
    <span style="color:#888;">🗓️ Example: If today is 2025 and you want to sell payments starting in 2030, your start date would be sometime in 2030.<br/>
    You don't need the exact day — just the month and year is enough.</span>
  `,
  endDate: `
    <strong>Payment End Date</strong><br/>
    This is the final month and year of the future payments you want to exchange for a lump sum today.<br/>
    After this date, any remaining payments you didn't sell will go back to you.<br/>
    <span style="color:#888;">🧾 Example: If you want to sell payments from January 2030 through December 2040, then your end date would be December 2040. After that, any future payments — if your policy continues — will still be yours.<br/>
    Whether your payments are for life or for a fixed number of years, this just sets the boundary for what you're choosing to sell — not your entire settlement.</span>
  `,
  annualRate: 'The annual interest or discount rate used in the calculation.',
  discountRate: 'The discount rate used for guaranteed NPV calculations.',
  lcpKeys: 'Profile factors that affect the life-contingent NPV calculation.'
}; 