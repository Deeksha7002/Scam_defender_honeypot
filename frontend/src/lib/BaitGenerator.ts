/**
 * BaitGenerator.ts
 * Generates fake but believable credentials to feed to scammers.
 */

export const BaitGenerator = {
    /**
     * Generates a fake Credit Card number that passes the Luhn Algorithm.
     * This ensures the scammer's basic validator doesn't reject it immediately.
     */
    generateFakeCard: (): string => {
        const prefix = "4532"; // Visa-like
        let number = prefix;

        // Generate 11 random digits
        for (let i = 0; i < 11; i++) {
            number += Math.floor(Math.random() * 10).toString();
        }

        // Calculate Checksum (Luhn)
        let sum = 0;
        let isSecond = true; // We calculate from right to left for check digit, so iterate normally is reversed logic

        // standard luhn check digit calculation
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number[i]);

            if (isSecond) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isSecond = !isSecond;
        }

        const checkDigit = (10 - (sum % 10)) % 10;
        return `${number.substring(0, 4)} ${number.substring(4, 8)} ${number.substring(8, 12)} ${number.substring(12)}${checkDigit}`;
    },

    generateFakePassword: (): string => {
        const words = ["Summer", "Winter", "Rover", "Admin", "Welcome", "Password", "Sunshine"];
        const word = words[Math.floor(Math.random() * words.length)];
        const year = new Date().getFullYear();
        return `${word}${year}!`;
    },

    generateFakeOTP: (): string => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
