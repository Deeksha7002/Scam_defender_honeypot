import { ForensicsService } from './src/lib/ForensicsService';

async function verifyDeterministic() {
    const testCases = [
        { name: 'image.png', size: 50000 },
        { name: 'download.jpg', size: 123456 },
        { name: 'midjourney_v4.png', size: 1024 },
        { name: 'IMG_2024.jpg', size: 4000000 },
        { name: 'unknown_file.webp', size: 500 }
    ];

    console.log("--- Deterministic Consistency Audit ---");
    for (const test of testCases) {
        // Run twice to ensure same result
        // @ts-ignore
        const r1 = ForensicsService.runImageAnalysis(test.name, test.size);
        // @ts-ignore
        const r2 = ForensicsService.runImageAnalysis(test.name, test.size);

        const match = r1.authenticityScore === r2.authenticityScore;
        console.log(`[${test.name}] Score 1: ${r1.authenticityScore}%, Score 2: ${r2.authenticityScore}% -> ${match ? 'CONSISTENT ✅' : 'INCONSISTENT ❌'}`);
        console.log(`   Verdict: ${r1.recommendation}`);
    }
}

verifyDeterministic();
