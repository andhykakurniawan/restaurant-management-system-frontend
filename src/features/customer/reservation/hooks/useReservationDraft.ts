import { useMemo, useState } from "react";
import { ReservationDraft } from "../../type";
import { reservationTablesMock } from "../data/tables.mock";

const initialDraft: ReservationDraft = {
  date: new Date().toISOString().slice(0, 10),
  time: "19:45",
  guestCount: 2,
  tableId: "t-04",
  customerName: "",
  email: "",
  specialRequest: "",
};

export function useReservationDraft() {
  const [draft, setDraft] = useState<ReservationDraft>(initialDraft);

  const selectedTable = useMemo(
    () => reservationTablesMock.find((table) => table.id === draft.tableId) ?? reservationTablesMock[0],
    [draft.tableId],
  );

  function updateDraft(nextDraft: Partial<ReservationDraft>) {
    setDraft((current) => ({ ...current, ...nextDraft }));
  }

  function selectTable(tableId: string) {
    const table = reservationTablesMock.find((item) => item.id === tableId);
    if (!table || table.status === "occupied") return;

    updateDraft({ tableId });
  }

  return {
    draft,
    tables: reservationTablesMock,
    selectedTable,
    reservationFee: 50000,
    updateDraft,
    selectTable,
  };
}
