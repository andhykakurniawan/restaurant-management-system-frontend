import { ReservationTable } from "../../type";

export const reservationTablesMock: ReservationTable[] = [
  { id: "t-01", label: "T-01", area: "Main Hall", capacity: 2, status: "available", shape: "round" },
  { id: "t-02", label: "T-02", area: "Main Hall", capacity: 4, status: "occupied", shape: "wide" },
  { id: "t-03", label: "T-03", area: "Main Hall", capacity: 2, status: "available", shape: "round" },
  { id: "t-04", label: "T-04", area: "Garden View", capacity: 4, status: "selected", shape: "wide" },
  { id: "t-05", label: "T-05", area: "Main Hall", capacity: 2, status: "available", shape: "round" },
  { id: "t-06", label: "T-06", area: "Private Wing", capacity: 4, status: "occupied", shape: "wide" },
  { id: "t-07", label: "T-07", area: "Private Wing", capacity: 2, status: "available", shape: "round" },
  { id: "b-01", label: "B-1", area: "Bar", capacity: 1, status: "available", shape: "bar" },
  { id: "b-02", label: "B-2", area: "Bar", capacity: 1, status: "available", shape: "bar" },
  { id: "b-03", label: "B-3", area: "Bar", capacity: 1, status: "available", shape: "bar" },
];
