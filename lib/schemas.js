import { z } from 'zod';
import { loadTranslations } from './server-utils';

// Function to get schema with translations
/*
export async function getCompanySchema() {
  const translations = await loadTranslations();
  const CompanySchema = z.object({
    razon: z.string().trim().min(1, { message: translations['error_company_razon_message'] }),
    nombreAbreviado: z.string().trim().optional(),
    cif: z.string().trim().optional(), // Add specific NIF validation if needed
    pais: z.string().min(1, { message: translations['error_company_pais_message'] }),
    comunidadAutonoma: z.string().optional(),
    provincia: z.string().optional(),
    poblacion: z.string().trim().optional(),
    direccion: z.string().trim().optional(),
    cp: z.string().trim().optional(), // Add specific CP validation if needed
    telefono: z.string().trim().optional(),
    email: z.string().trim().email({ message: translations['error_company_email_message'] }).optional().or(z.literal('')), // Allow empty string or valid email
    fax: z.string().trim().optional(),
    moneda: z.string().optional(),
    idioma: z.string().optional(),
    fechaAlta: z.string().min(1, {message: translations['error_company_fechaAlta_message']}).max(19, {message: translations['error_company_fechaAlta_format_message']}), // Coerce string/number to Date
    web: z.string().trim().max(50, {message: translations['error_company_web_message']}).optional(),
    descripcion: z.string().trim().max(255, {message: translations['error_company_descripcion_message']}).optional(),
    usuario: z.string().trim()
  });
  return CompanySchema;
}
*/
