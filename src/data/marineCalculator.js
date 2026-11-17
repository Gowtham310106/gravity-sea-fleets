export const MAJOR_PORTS = [
  { id: "singapore", name: "Singapore Port (SGSIN)", region: "Southeast Asia", lat: 1.290270, lng: 103.851959 },
  { id: "fujairah", name: "Port of Fujairah (AEFJR)", region: "Middle East / Gulf of Oman", lat: 25.1288, lng: 56.3265 },
  { id: "ras_tanura", name: "Ras Tanura (SARST)", region: "Arabian Gulf", lat: 26.6385, lng: 50.1587 },
  { id: "rotterdam", name: "Port of Rotterdam (NLRTM)", region: "Northwest Europe", lat: 51.9244, lng: 4.4777 },
  { id: "houston", name: "Port of Houston (USHOU)", region: "US Gulf Coast", lat: 29.7604, lng: -95.3698 },
  { id: "richards_bay", name: "Richards Bay (ZARCB)", region: "South Africa", lat: -28.7997, lng: 32.0383 },
  { id: "mundra", name: "Mundra Port (INMUN)", region: "West Coast India", lat: 22.8396, lng: 69.7042 },
  { id: "shanghai", name: "Port of Shanghai (CNSHA)", region: "East Asia", lat: 31.2304, lng: 121.4737 },
  { id: "port_hedland", name: "Port Hedland (AUPHE)", region: "Western Australia", lat: -20.3167, lng: 118.5760 }
];

// Approximate nautical distance table between major global hubs (in Nautical Miles - nm)
export const NAUTICAL_DISTANCES = {
  "fujairah-singapore": 3280,
  "singapore-fujairah": 3280,
  "ras_tanura-singapore": 3650,
  "singapore-ras_tanura": 3650,
  "richards_bay-mundra": 4420,
  "mundra-richards_bay": 4420,
  "rotterdam-houston": 4820,
  "houston-rotterdam": 4820,
  "ras_tanura-rotterdam": 6430, // via Suez
  "rotterdam-ras_tanura": 6430,
  "port_hedland-shanghai": 3310,
  "shanghai-port_hedland": 3310,
  "singapore-rotterdam": 8280,
  "rotterdam-singapore": 8280,
  "houston-singapore": 10150,
  "singapore-houston": 10150,
  "fujairah-mundra": 890,
  "mundra-fujairah": 890,
  "shanghai-singapore": 2240,
  "singapore-shanghai": 2240
};

export const VESSEL_CLASSES = [
  { id: "ultramax", name: "Ultramax Bulk Carrier (63,500 DWT)", avgSpeedKnots: 13.0, dailyFuelMT: 17.5, fuelType: "VLSFO", capacityNote: "5 Holds / Grabs Equipped" },
  { id: "kamsarmax", name: "Kamsarmax Bulk Carrier (82,500 DWT)", avgSpeedKnots: 13.2, dailyFuelMT: 20.0, fuelType: "VLSFO", capacityNote: "7 Holds Gearless High-Cubic" },
  { id: "aframax", name: "Aframax Crude Oil Tanker (115,000 DWT)", avgSpeedKnots: 13.5, dailyFuelMT: 28.5, fuelType: "VLSFO", capacityNote: "Coated Tanks / Inert Gas" },
  { id: "mr2", name: "MR2 Clean Product Tanker (50,000 DWT)", avgSpeedKnots: 13.0, dailyFuelMT: 18.0, fuelType: "VLSFO", capacityNote: "12 Segregations Framo Pumps" },
  { id: "feeder", name: "Geared Container Feeder (2,800 TEU)", avgSpeedKnots: 16.5, dailyFuelMT: 32.0, fuelType: "VLSFO", capacityNote: "550 Reefer Plugs / Cranes" },
  { id: "ahts", name: "DP2 Anchor Handling Tug (165t BP)", avgSpeedKnots: 12.0, dailyFuelMT: 11.0, fuelType: "MGO", capacityNote: "Waterfall Winch / DP2" }
];
