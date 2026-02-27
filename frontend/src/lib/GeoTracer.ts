import type { GeoLocation } from './types';

// Database of realistic fraudulent IP hotspots (Simulated)
const HOTSPOTS: Record<string, GeoLocation[]> = {
    "West Africa": [
        { country: "Nigeria", city: "Lagos", ip: "197.210.64.xxx", lat: 6.5244, lng: 3.3792, isp: "Spectranet" },
        { country: "Ghana", city: "Accra", ip: "154.160.12.xxx", lat: 5.6037, lng: -0.1870, isp: "Vodafone Ghana" }
    ],
    "Eastern Europe": [
        { country: "Russia", city: "St. Petersburg", ip: "95.161.221.xxx", lat: 59.9310, lng: 30.3609, isp: "Rostelecom" },
        { country: "Romania", city: "Bucharest", ip: "86.120.10.xxx", lat: 44.4268, lng: 26.1025, isp: "Digi Romania" }
    ],
    "South East Asia": [
        { country: "Myanmar", city: "Myawaddy", ip: "103.117.200.xxx", lat: 16.6897, lng: 98.5115, isp: "MPT" },
        { country: "Cambodia", city: "Sihanoukville", ip: "203.113.150.xxx", lat: 10.6275, lng: 103.5221, isp: "CamGSM" }
    ],
    "South Asia": [
        { country: "India", city: "Kolkata", ip: "122.163.45.xxx", lat: 22.5726, lng: 88.3639, isp: "Airtel Broadband" },
        { country: "India", city: "Noida", ip: "49.34.0.xxx", lat: 28.5355, lng: 77.3910, isp: "Reliance Jio" }
    ],
    "USA": [
        { country: "USA", city: "New York, NY", ip: "67.11.23.xxx", lat: 40.7128, lng: -74.0060, isp: "Verizon Fios" }, // Benign or Spoofed
        { country: "USA", city: "Dallas, TX", ip: "98.12.55.xxx", lat: 32.7767, lng: -96.7970, isp: "AT&T Internet" } // Benign or Spoofed
    ],
    "South America": [
        { country: "Brazil", city: "São Paulo", ip: "177.12.44.xxx", lat: -23.5505, lng: -46.6333, isp: "Claro Brasil" }
    ]
};

export class GeoTracer {
    static trace(generalRegion?: string): GeoLocation {
        // Default to a generic location if no region provided
        let region = generalRegion || "West Africa";

        // Handle vague/unknown regions in mock data
        if (!HOTSPOTS[region]) {
            // Pick a random region key
            const keys = Object.keys(HOTSPOTS);
            region = keys[Math.floor(Math.random() * keys.length)];
        }

        const options = HOTSPOTS[region];
        const selected = options[Math.floor(Math.random() * options.length)];

        // Randomize last octet for variety
        const randomizedIP = selected.ip.replace('xxx', Math.floor(Math.random() * 254).toString());

        return {
            ...selected,
            ip: randomizedIP,
            connectionType: Math.random() > 0.7 ? 'VPN' : Math.random() > 0.5 ? 'Cellular' : 'Residential',
            financials: this.generateFinancials(region)
        };
    }

    private static generateFinancials(region: string): import('./types').FinancialIntel {
        const rand = Math.floor(Math.random() * 1000);

        if (region === "South Asia" || region === "India") {
            const banks = ["okhdfcbank", "oksbi", "paytm", "apl", "ybl"];
            const bank = banks[Math.floor(Math.random() * banks.length)];
            return {
                method: 'UPI',
                identifier: `merchant.pay${rand}@${bank}`,
                institution: bank.toUpperCase(),
                flagged: true
            };
        }

        if (region === "Eastern Europe" || region === "Europe" || region === "Russia") {
            return {
                method: 'IBAN',
                identifier: `RO${rand} BTRL 0000 ${rand} ${rand}`,
                institution: "Banca Transilvania",
                flagged: true
            };
        }

        if (region === "USA" || region === "North America") {
            return {
                method: 'Wire Transfer',
                identifier: `Routing: 021${rand} | Acct: 883${rand}`,
                institution: "Bank of America",
                flagged: true // Flagged aggressively for scam context
            };
        }

        // Crypto is the fallback for global operations (West Africa, SE Asia, unknown)
        const coins = ["BTC", "ETH", "USDT", "SOL", "USDC"];
        const coin = coins[Math.floor(Math.random() * coins.length)];

        let wallet = "";
        if (coin === "BTC") wallet = `bc1q${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`;
        else if (coin === "SOL") wallet = `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 8)}`;
        else wallet = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 8)}`;

        return {
            method: 'CRYPTO WALLET',
            identifier: wallet,
            institution: `${coin} Network`,
            flagged: true
        };
    }
}
