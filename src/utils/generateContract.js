import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

export const generateContractPdf =
    async (
        html,
        inversionId
    ) => {

        const browser =
            await puppeteer.launch({
                headless: true
            });

        const page =
            await browser.newPage();

        await page.setContent(html);

        const filePath =
            path.join(
                'uploads/contracts',
                `contrato-${inversionId}.pdf`
            );

        await page.pdf({

            path: filePath,
            format: 'A4'
        });

        await browser.close();

        return filePath;
    };