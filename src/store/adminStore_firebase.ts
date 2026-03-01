// ============================================
// src/store/adminStore.ts
// Firebase Firestore based CRUD store
// localStorage wala version replace ho gaya
// ============================================

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../lab/firebase';
import { AdminProduct, AdminCategory, Sale } from '../types/admin';

// ---- Collection names ----
const COLLECTIONS = {
  CATEGORIES: 'categories',
  PRODUCTS:   'products',
  SALES:      'sales',
};

// ---- Timestamp helper ----
function tsToIso(ts: any): string {
  if (!ts) return new Date().toISOString();
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  return String(ts);
}

// ---- ID generator ----
function makeSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// ============================================
// CATEGORIES
// ============================================
export const categoriesStore = {

  async getAll(): Promise<AdminCategory[]> {
    const snap = await getDocs(
      query(collection(db, COLLECTIONS.CATEGORIES), orderBy('createdAt', 'asc'))
    );
    return snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<AdminCategory, 'id'>),
      createdAt: tsToIso(d.data().createdAt),
      updatedAt: tsToIso(d.data().updatedAt),
    }));
  },

  async getById(id: string): Promise<AdminCategory | null> {
    const snap = await getDoc(doc(db, COLLECTIONS.CATEGORIES, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<AdminCategory, 'id'>), createdAt: tsToIso(snap.data().createdAt), updatedAt: tsToIso(snap.data().updatedAt) };
  },

  async create(data: Omit<AdminCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminCategory> {
    const slug = data.slug || makeSlug(data.name);
    // Use slug as doc ID so URL stays clean
    const docRef = doc(db, COLLECTIONS.CATEGORIES, slug);
    const now = serverTimestamp();
    await setDoc(docRef, { ...data, slug, createdAt: now, updatedAt: now });
    return { id: slug, ...data, slug, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  },

  async update(id: string, data: Partial<AdminCategory>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.CATEGORIES, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  async delete(id: string): Promise<void> {
    // Delete category
    await deleteDoc(doc(db, COLLECTIONS.CATEGORIES, id));
    // Delete all products in this category
    const productsSnap = await getDocs(
      query(collection(db, COLLECTIONS.PRODUCTS), where('categoryId', '==', id))
    );
    const deletePromises = productsSnap.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);
  },
};

// ============================================
// PRODUCTS
// ============================================
export const productsStore = {

  async getAll(): Promise<AdminProduct[]> {
    const snap = await getDocs(
      query(collection(db, COLLECTIONS.PRODUCTS), orderBy('createdAt', 'asc'))
    );
    return snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<AdminProduct, 'id'>),
      createdAt: tsToIso(d.data().createdAt),
      updatedAt: tsToIso(d.data().updatedAt),
    }));
  },

  async getByCategory(categoryId: string): Promise<AdminProduct[]> {
    const snap = await getDocs(
      query(collection(db, COLLECTIONS.PRODUCTS), where('categoryId', '==', categoryId))
    );
    return snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<AdminProduct, 'id'>),
      createdAt: tsToIso(d.data().createdAt),
      updatedAt: tsToIso(d.data().updatedAt),
    }));
  },

  async getById(id: string): Promise<AdminProduct | null> {
    const snap = await getDoc(doc(db, COLLECTIONS.PRODUCTS, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<AdminProduct, 'id'>), createdAt: tsToIso(snap.data().createdAt), updatedAt: tsToIso(snap.data().updatedAt) };
  },

  async create(data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdminProduct> {
    const now = serverTimestamp();
    const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return { id: docRef.id, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  },

  async update(id: string, data: Partial<AdminProduct>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.PRODUCTS, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, id));
  },
};

// ============================================
// SALES
// ============================================
export const salesStore = {

  async getAll(): Promise<Sale[]> {
    const snap = await getDocs(
      query(collection(db, COLLECTIONS.SALES), orderBy('createdAt', 'desc'))
    );
    return snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<Sale, 'id'>),
      createdAt: tsToIso(d.data().createdAt),
    }));
  },

  async getById(id: string): Promise<Sale | null> {
    const snap = await getDoc(doc(db, COLLECTIONS.SALES, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...(snap.data() as Omit<Sale, 'id'>), createdAt: tsToIso(snap.data().createdAt) };
  },

  async create(data: Omit<Sale, 'id' | 'createdAt'>): Promise<Sale> {
    const docRef = await addDoc(collection(db, COLLECTIONS.SALES), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...data, createdAt: new Date().toISOString() };
  },

  async update(id: string, data: Partial<Sale>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.SALES, id), data);
  },

  async updateStatus(id: string, status: Sale['status']): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.SALES, id), { status });
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.SALES, id));
  },
};

// ============================================
// SEED UTILITY
// Existing products.ts data ko Firestore mein
// ek baar import karne ke liye
// ============================================
export async function seedFirestoreFromProducts(): Promise<{ categories: number; products: number }> {
  // Dynamic import taake bundle chhota rahe
  const { allCategories } = await import('../data/products');
  const now = serverTimestamp();

  let catCount = 0;
  let prodCount = 0;

  for (const cat of allCategories) {
    // Category add karo (if not exists)
    const catRef = doc(db, COLLECTIONS.CATEGORIES, cat.id);
    const catSnap = await getDoc(catRef);
    if (!catSnap.exists()) {
      await setDoc(catRef, {
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        createdAt: now,
        updatedAt: now,
      });
      catCount++;
    }

    // Products add karo
    for (const p of cat.products) {
      // Check if product already exists with same title to avoid duplicates
      const existingQuery = query(
        collection(db, COLLECTIONS.PRODUCTS),
        where('title', '==', p.title)
      );
      const existingSnap = await getDocs(existingQuery);
      if (existingSnap.empty) {
        await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
          title: p.title,
          shortTitle: p.shortTitle,
          discountPrice: p.discountPrice,
          originalPrice: p.originalPrice,
          detail: p.detail,
          features: p.features,
          images: p.images,
          categoryId: cat.id,
          createdAt: now,
          updatedAt: now,
        });
        prodCount++;
      }
    }
  }

  return { categories: catCount, products: prodCount };
}
