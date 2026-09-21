import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  DocumentData,
  QueryConstraint,
  increment,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { COLLECTIONS } from "@/lib/constants";
import {
  Template,
  Order,
  Invitation,
  Guest,
  Wish,
  OrderStatus,
} from "@/types";

// ============================================
// TEMPLATE OPERATIONS
// ============================================

export async function getTemplates(activeOnly = true): Promise<Template[]> {
  const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
  if (activeOnly) {
    constraints.unshift(where("isActive", "==", true));
  }

  const q = query(collection(db, COLLECTIONS.TEMPLATES), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Template[];
}

export async function getTemplateById(id: string): Promise<Template | null> {
  const docRef = doc(db, COLLECTIONS.TEMPLATES, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Template;
}

export async function getTemplateBySlug(slug: string): Promise<Template | null> {
  const q = query(
    collection(db, COLLECTIONS.TEMPLATES),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docData = snapshot.docs[0];
  return { id: docData.id, ...docData.data() } as Template;
}

export async function createTemplate(data: Omit<Template, "id" | "createdAt" | "updatedAt" | "usageCount">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.TEMPLATES), {
    ...data,
    usageCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateTemplate(id: string, data: Partial<Template>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TEMPLATES, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ============================================
// ORDER OPERATIONS
// ============================================

export async function createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const docRef = doc(db, COLLECTIONS.ORDERS, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Order;
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, COLLECTIONS.ORDERS),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  additionalData?: Partial<Order>
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ORDERS, id);
  await updateDoc(docRef, {
    status,
    ...additionalData,
    updatedAt: serverTimestamp(),
  });
}

export async function getAllOrders(limitCount = 50): Promise<Order[]> {
  const q = query(
    collection(db, COLLECTIONS.ORDERS),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
}

// ============================================
// INVITATION OPERATIONS
// ============================================

export async function createInvitation(
  data: Omit<Invitation, "id" | "createdAt" | "updatedAt" | "viewCount" | "uniqueViewCount">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.INVITATIONS), {
    ...data,
    viewCount: 0,
    uniqueViewCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getInvitationBySlug(slug: string): Promise<Invitation | null> {
  const q = query(
    collection(db, COLLECTIONS.INVITATIONS),
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docData = snapshot.docs[0];
  return { id: docData.id, ...docData.data() } as Invitation;
}

export async function getInvitationById(id: string): Promise<Invitation | null> {
  const docRef = doc(db, COLLECTIONS.INVITATIONS, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Invitation;
}

export async function getInvitationsByUserId(userId: string): Promise<Invitation[]> {
  const q = query(
    collection(db, COLLECTIONS.INVITATIONS),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Invitation[];
}

export async function updateInvitation(
  id: string,
  data: Partial<Invitation>
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.INVITATIONS, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function incrementViewCount(id: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.INVITATIONS, id);
  await updateDoc(docRef, {
    viewCount: increment(1),
  });
}

export async function isSlugAvailable(slug: string): Promise<boolean> {
  const invitation = await getInvitationBySlug(slug);
  return invitation === null;
}

// ============================================
// GUEST OPERATIONS
// ============================================

export async function addGuest(
  data: Omit<Guest, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.GUESTS), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getGuestsByInvitationId(invitationId: string): Promise<Guest[]> {
  const q = query(
    collection(db, COLLECTIONS.GUESTS),
    where("invitationId", "==", invitationId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Guest[];
}

export async function updateGuestRSVP(
  id: string,
  rsvpStatus: string,
  rsvpCount: number
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.GUESTS, id);
  await updateDoc(docRef, {
    rsvpStatus,
    rsvpCount,
    rsvpAt: serverTimestamp(),
  });
}

export async function deleteGuest(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.GUESTS, id));
}

export async function addGuestsBulk(
  invitationId: string,
  guests: { name: string; phone?: string }[]
): Promise<void> {
  const promises = guests.map((guest) =>
    addGuest({
      invitationId,
      name: guest.name,
      slug: guest.name.toLowerCase().replace(/\s+/g, "+"),
      phone: guest.phone,
      rsvpStatus: "pending",
      rsvpCount: 0,
      rsvpAt: null,
      viewedAt: null,
    })
  );
  await Promise.all(promises);
}

// ============================================
// WISH OPERATIONS
// ============================================

export async function addWish(
  data: Omit<Wish, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTIONS.WISHES), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getWishesByInvitationId(invitationId: string): Promise<Wish[]> {
  const q = query(
    collection(db, COLLECTIONS.WISHES),
    where("invitationId", "==", invitationId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Wish[];
}

export async function getApprovedWishes(invitationId: string): Promise<Wish[]> {
  const q = query(
    collection(db, COLLECTIONS.WISHES),
    where("invitationId", "==", invitationId),
    where("isApproved", "==", true),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Wish[];
}

export async function updateWishApproval(id: string, isApproved: boolean): Promise<void> {
  const docRef = doc(db, COLLECTIONS.WISHES, id);
  await updateDoc(docRef, { isApproved });
}
