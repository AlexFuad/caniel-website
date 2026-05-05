import { z } from 'zod';
import { VALIDATION, ROLES } from '@/config/constants';

/**
 * User validation schemas
 */
export const userSchema = z.object({
  fullName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Nama minimal ${VALIDATION.NAME_MIN_LENGTH} karakter`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Nama maksimal ${VALIDATION.NAME_MAX_LENGTH} karakter`),
  email: z
    .string()
    .email('Email tidak valid')
    .regex(VALIDATION.EMAIL_REGEX, 'Format email tidak valid'),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password minimal ${VALIDATION.PASSWORD_MIN_LENGTH} karakter`)
    .optional()
    .or(z.literal('')),
  role: z.enum([ROLES.ADMIN, ROLES.EDITOR, ROLES.VIEWER], {
    errorMap: () => ({ message: 'Role tidak valid' }),
  }),
  status: z.enum(['active', 'inactive', 'suspended'], {
    errorMap: () => ({ message: 'Status tidak valid' }),
  }),
  avatar: z.string().optional().or(z.literal('')),
});

export const userCreateSchema = userSchema.extend({
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password minimal ${VALIDATION.PASSWORD_MIN_LENGTH} karakter`),
});

export const userUpdateSchema = userSchema.partial();

/**
 * Login validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email('Email tidak valid')
    .regex(VALIDATION.EMAIL_REGEX, 'Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password harus diisi'),
});

/**
 * Blog post validation schema
 */
export const blogPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Judul minimal 5 karakter')
    .max(200, 'Judul maksimal 200 karakter'),
  slug: z
    .string()
    .min(1, 'Slug harus diisi')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung'),
  content: z
    .string()
    .min(10, 'Konten minimal 10 karakter'),
  excerpt: z.string().optional(),
  category: z.string().min(1, 'Kategori harus dipilih'),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1, 'Penulis harus diisi'),
  image: z.string().url('URL gambar tidak valid').optional().or(z.literal('')),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  date: z.string().optional(),
});

/**
 * Product validation schema
 */
export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama produk minimal 3 karakter')
    .max(100, 'Nama produk maksimal 100 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  price: z
    .number()
    .min(0, 'Harga tidak boleh negatif')
    .or(z.string().transform(val => parseFloat(val))),
  category: z.string().min(1, 'Kategori harus dipilih'),
  status: z.enum(['draft', 'published', 'archived'], {
    errorMap: () => ({ message: 'Status tidak valid' }),
  }),
  image: z.string().url('URL gambar tidak valid').optional().or(z.literal('')),
  features: z.array(z.string()).optional(),
  techStack: z.array(z.string()).optional(),
});

/**
 * Service validation schema
 */
export const serviceSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama layanan minimal 3 karakter')
    .max(100, 'Nama layanan maksimal 100 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  category: z.string().min(1, 'Kategori harus dipilih'),
  price: z
    .number()
    .min(0, 'Harga tidak boleh negatif')
    .or(z.string().transform(val => parseFloat(val))),
  priceUnit: z.string().optional(),
  features: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Status tidak valid' }),
  }),
  image: z.string().url('URL gambar tidak valid').optional().or(z.literal('')),
});

/**
 * Settings validation schema
 */
export const settingsSchema = z.object({
  siteName: z.string().min(1, 'Nama situs harus diisi'),
  siteDescription: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  siteUrl: z.string().url('URL situs tidak valid'),
  contactEmail: z.string().email('Email kontak tidak valid'),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  socialMedia: z.object({
    facebook: z.string().url('URL Facebook tidak valid').optional().or(z.literal('')),
    twitter: z.string().url('URL Twitter tidak valid').optional().or(z.literal('')),
    instagram: z.string().url('URL Instagram tidak valid').optional().or(z.literal('')),
    linkedin: z.string().url('URL LinkedIn tidak valid').optional().or(z.literal('')),
  }).optional(),
});
