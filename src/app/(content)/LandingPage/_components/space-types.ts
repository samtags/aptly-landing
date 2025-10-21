/**
 * Type definitions for Space playground components.
 */

export type ClientStatus = "active" | "inactive";

export type ClientInfo = {
  id: string;
  name: string;
  status: ClientStatus;
};

export type ClientsMap = {
  [key: string]: ClientInfo;
};

export type SpaceMessage = {
  type: "active" | "heartbeat" | "inactive" | "mousemove";
  id: string;
  name: string;
  x?: number;
  y?: number;
};
