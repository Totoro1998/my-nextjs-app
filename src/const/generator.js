export const SCHEMA_LABEL = `Enter your table(s) here`;
export const SCHEMA_PLACEHOLDER = `Employee (id, name, department_id);
Department (id, name, address);
Salary_Payments (id, employee_id, amount: int, date: navchar);`;

export const PROMPT_LABEL = `Request to generate SQL`;
export const PROMPT_PLACEHOLDER = `list the names of the departments which employed more than 10 employees in the last 3 months`;

export const RESULT_LABEL = `Generated result`;
export const RESULT_PLACEHOLDER = `SELECT DISTINCT d.name
FROM Department d JOIN Employee e ON d.id = e.department_id
JOIN Salary_Payments sp ON e.id = sp.employee_id
WHERE sp.date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
GROUP BY d.name
HAVING COUNT(e.id) > 10`;

export const DAILY_LIMIT_GENSQL = 20;
export const TOTAL_LIMIT_GENSQL = 50;

export const DANGER_DAILY_LIMIT_GENSQL = 5;
export const DANGER_TOTAL_LIMIT_GENSQL = 10;

export const ADD_TABLE_BY_SELECT = "selectTable";
export const ADD_TABLE_BY_MANUALLY = "manually";

export const RADIO_OPTIONS = [
  {
    text: "Select Table(s)",
    value: ADD_TABLE_BY_SELECT,
  },
  {
    text: "Manually",
    value: ADD_TABLE_BY_MANUALLY,
  },
];
