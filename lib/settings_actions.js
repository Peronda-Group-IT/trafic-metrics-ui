'use server'

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getSession, updateCompanyInSessionCookie } from './session';
const sql = require('mssql');
const { default: dbInstance } = require("@/database/db");

const secureCookies = process.env.HTTP_COOKIE === "https";

export async function updateLanguage(language) {
    try {

        const { success } = await updateLanguageInDB(language);

        if (!success) {
            return { success: false, error: 'Failed to update language in DB' };
        }

        const cookieStore = await cookies();
        
        cookieStore.delete("userLang")

        await cookieStore.set({
            name: "userLang",
            value: language,
            httpOnly: true,
            secure: secureCookies,
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365 // 1 year
        });

        revalidatePath('/home/settings');
        return { success: true };
    } catch (error) {
        console.error('Error updating language:', error);
        return { success: false, error: 'Failed to update language' };
    }
} 

async function updateLanguageInDB(language) {

    try {
        const session = await getSession();

        const db = await dbInstance.getConnection()
        const request = new sql.Request(db);

        request.input('username', sql.VarChar, session.username);
        request.input('language', sql.VarChar, language);

        const result = await request.query('UPDATE usuarios SET lang = @language WHERE username = @username');

        if (!result || result.rowsAffected[0] !== 1) {
            // This could mean the company with the given codigo was not found
            throw new Error(`Failed to update languate of ${session.username} to ${language}. Record not found or zero/multiple rows affected.`);
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating language in DB:', error);
        return { success: false, error: 'Failed to update language in DB' };
    }
}

export async function updateCompanyInDB(company) {
    try {
        const session = await getSession();
        const db = await dbInstance.getConnection();
        const request = new sql.Request(db);

        // Update the 'empresa' column in 'usuarios' table for the current user
        request.input('username', sql.VarChar, session.username);
        request.input('empresa', sql.VarChar, company);

        const result = await request.query(
            'UPDATE usuarios SET empresa = @empresa WHERE username = @username'
        );

        if (!result || result.rowsAffected[0] !== 1) {
            throw new Error(`Failed to update empresa for user ${session.username}. Record not found or zero/multiple rows affected.`);
        }

        await updateCompanyInSessionCookie(company)

        return { success: true };
    } catch (error) {
        console.error('Error updating empresa in usuarios:', error);
        return { success: false, error: 'Failed to update empresa in usuarios' };
    }
}