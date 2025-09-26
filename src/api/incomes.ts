import { fetchData } from "./data";
export async function getIncomes(limit: number = 30, page: number, dateFrom: string, dateTo: string) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("dateTo", dateTo.toString());
  params.append("dateFrom", dateFrom.toString());
  params.append("limit", limit.toString());
  return await fetchData(`/incomes?${params.toString()}`);
}
