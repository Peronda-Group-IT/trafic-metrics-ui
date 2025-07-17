"use server";

import { destroySession, getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserLangCookie } from "./session";

const sql = require("mssql");
const { default: dbInstance } = require("@/database/db");

const en = require("../locales/en.json");
const es = require("../locales/es.json");

const dictionaries = { en, es };

/*
export async function getNextTableId(table_name) {
  const session = await getSession();
  const empresa = session.empresa;

  try {
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    request.input("empresa", sql.VarChar(5), empresa);

    const sqlQuery = `SELECT COALESCE(MAX(CAST(codigo AS INT)), 0) AS codigo FROM ${table_name} WHERE empresa = @empresa`;

    const result = await request.query(sqlQuery);

    const { codigo } = result.recordset[0];

    return codigo + 1;
  } catch (error) {
    console.error("SQL ERROR", error);
    return -1;
  }
}
*/

export async function handleLogout() {
  const success = await destroySession();
  if (success) redirect("/login");
}


export async function getUserLanguageByUsername(username) {
  try {
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    request.input("username", sql.VarChar, username);

    const sqlQuery = `SELECT lang FROM usuarios WHERE username = @username`;

    const result = await request.query(sqlQuery);

    return result.recordset[0].lang;
  } catch (error) {
    console.error("SQL ERROR", error);
    return "en";
  }
}

export async function getUserRole(username) {
  try {
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    request.input("username", sql.VarChar, username);

    const sqlQuery = `SELECT rol FROM crm_usuarios_roles WHERE usuario = @username`;

    const result = await request.query(sqlQuery);

    return result.recordset[0]?.rol || null;
  } catch (error) {
    console.error("SQL ERROR", error);
    return null;
  }
}

export async function deleteSession() {
  try {
    const session = await getSession();
    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    request.input("username", sql.VarChar, session.username);

    const sqlQuery = `DELETE FROM sessions WHERE username = @username`;

    await request.query(sqlQuery);
    return true;
  } catch (error) {
    console.error("SQL ERROR", error);
    return false;
  }
}

export async function loadTranslations() {
  const lang = await getUserLangCookie();
  return dictionaries[lang] || dictionaries["en"];
}

export async function getGeminiApiKey() {
  try {
    const session = await getSession();
    const username = session.username;

    const db = await dbInstance.getConnection();
    const request = new sql.Request(db);

    request.input("username", sql.VarChar, username);

    const sqlQuery = `SELECT gemini_api_key FROM usuarios_tokens WHERE username = @username`;

    const result = await request.query(sqlQuery);

    return result.recordset[0]?.gemini_api_key || null;
  } catch (error) {
    console.error("SQL ERROR", error);
    return null;
  }
}
